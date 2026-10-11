type ContactRequest = {
  name: string;
  email: string;
  firmRole: string;
  initiative: string;
  formContext: string;
};

type GraphTokenResponse = {
  access_token?: unknown;
};

type TurnstileVerifyResponse = {
  success?: unknown;
  action?: unknown;
  hostname?: unknown;
  "error-codes"?: unknown;
};

const THANK_YOU_PATH = "/contact/thank-you";
const BOSUN_THANK_YOU_PATH = "/bosun/thank-you";
const ERROR_PATH = "/contact/error";
const BOSUN_ERROR_PATH = "/bosun/error";
const HONEYPOT_FIELD = "fax_number";
const MIN_SUBMIT_MS = 3000;
const TURNSTILE_ACTION = "contact";

const DEFAULT_ALLOWED_HOSTNAMES = [
  "chartroomai.com",
  "www.chartroomai.com",
  "carehelm.chartroomai.com",
];

// Preview URLs for the `website` project in the `chart-room` Vercel team,
// e.g. website-git-<branch>-chart-room.vercel.app or website-<hash>-chart-room.vercel.app.
const VERCEL_PREVIEW_HOSTNAME = /^website-[a-z0-9-]+-chart-room\.vercel\.app$/;

const BLOCKED_LINK_HOSTS = [
  "tinyurl.com",
  "bit.ly",
  "t.co",
  "telegra.ph",
  "goo.gl",
];

const FIELD_LIMITS = {
  name: 100,
  firmRole: 150,
  initiative: 3000,
  email: 254,
} as const;

const URL_PATTERN = /https?:\/\/[^\s]+/gi;

export async function POST(request: Request) {
  // Default until form_context is known; Bosun submissions switch to /bosun/error.
  let errorPath = ERROR_PATH;

  try {
    const formData = await request.formData();
    // Every thank-you redirect (real or silent spam reject) uses the same page per
    // form, so the redirect target never reveals which check a bot tripped.
    const thankYouPath = getThankYouPath(formData);
    errorPath = getErrorPath(formData);

    const turnstileResult = await verifyTurnstile(request, formData);
    if (!turnstileResult.ok) {
      return redirectTo(request, errorPath);
    }

    // Spam-class rejects: silent thank-you (do not tip bots).
    if (getField(formData, HONEYPOT_FIELD)) {
      return redirectTo(request, thankYouPath);
    }

    if (isSubmittedTooFast(formData)) {
      return redirectTo(request, thankYouPath);
    }

    if (!isAllowedOrigin(request)) {
      return redirectTo(request, thankYouPath);
    }

    const contactRequest = parseContactRequest(formData);

    if (!contactRequest) {
      return redirectTo(request, errorPath);
    }

    if (!passesLengthCaps(contactRequest) || hasSpamLinks(contactRequest.initiative)) {
      return redirectTo(request, thankYouPath);
    }

    const deliveryMode = process.env.CONTACT_DELIVERY_MODE ?? "noop";

    if (deliveryMode === "microsoft_graph") {
      await sendWithMicrosoftGraph(contactRequest);
    } else if (deliveryMode !== "noop") {
      throw new Error(`Unsupported contact delivery mode: ${deliveryMode}`);
    } else {
      console.info("Contact form submission accepted in noop mode.");
    }

    return redirectTo(request, thankYouPath);
  } catch (error) {
    console.error("Contact form submission failed:", getSafeErrorMessage(error));
    return redirectTo(request, errorPath);
  }
}

async function verifyTurnstile(
  request: Request,
  formData: FormData,
): Promise<{ ok: boolean }> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  const isProduction = process.env.NODE_ENV === "production";

  if (!secret) {
    if (isProduction) {
      console.error("Turnstile secret missing in production; rejecting submission.");
      return { ok: false };
    }

    console.warn(
      "TURNSTILE_SECRET_KEY missing; skipping Turnstile verification in development.",
    );
    return { ok: true };
  }

  const token = getField(formData, "cf-turnstile-response");
  if (!token) {
    console.error("Turnstile verification failed: missing token");
    return { ok: false };
  }

  const remoteip = getClientIp(request);
  const body = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteip) {
    body.set("remoteip", remoteip);
  }

  let verifyResponse: Response;
  try {
    verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      },
    );
  } catch (error) {
    console.error(
      "Turnstile siteverify request failed:",
      getSafeErrorMessage(error),
    );
    return { ok: false };
  }

  if (!verifyResponse.ok) {
    console.error(
      `Turnstile siteverify HTTP status ${verifyResponse.status}`,
    );
    return { ok: false };
  }

  const result = (await verifyResponse.json()) as TurnstileVerifyResponse;
  const errorCodes = Array.isArray(result["error-codes"])
    ? result["error-codes"]
    : [];

  if (result.success !== true) {
    console.error("Turnstile verification failed:", { errorCodes });
    return { ok: false };
  }

  if (result.action !== TURNSTILE_ACTION) {
    console.error("Turnstile verification failed: unexpected action", {
      errorCodes,
      action: typeof result.action === "string" ? result.action : undefined,
    });
    return { ok: false };
  }

  const hostname = typeof result.hostname === "string" ? result.hostname : "";
  if (!isAllowedHostname(hostname)) {
    console.error("Turnstile verification failed: hostname not allowed", {
      errorCodes,
      hostname,
    });
    return { ok: false };
  }

  return { ok: true };
}

function isAllowedHostname(hostname: string) {
  const normalized = hostname.trim().toLowerCase();
  if (!normalized) {
    return false;
  }

  const extras = (process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  const allowlist = new Set([...DEFAULT_ALLOWED_HOSTNAMES, ...extras]);

  if (allowlist.has(normalized)) {
    return true;
  }

  // This project's own Vercel preview deployments only, and never in production.
  if (
    process.env.VERCEL_ENV !== "production" &&
    VERCEL_PREVIEW_HOSTNAME.test(normalized)
  ) {
    return true;
  }

  return false;
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (!forwarded) {
    return "";
  }

  return forwarded.split(",")[0]?.trim() ?? "";
}

function isSubmittedTooFast(formData: FormData) {
  const startedAtRaw = getField(formData, "form_started_at");
  if (!startedAtRaw) {
    // Missing timing field: treat as bot / non-JS scrape.
    return true;
  }

  const startedAt = Number(startedAtRaw);
  if (!Number.isFinite(startedAt) || startedAt <= 0) {
    return true;
  }

  const elapsed = Date.now() - startedAt;
  // Negative elapsed means a forged future timestamp.
  return elapsed < MIN_SUBMIT_MS || elapsed < 0;
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  // Browsers sometimes omit Origin on same-site navigational POSTs.
  if (!origin) {
    return true;
  }

  let originHost: string;
  try {
    originHost = new URL(origin).hostname.toLowerCase();
  } catch {
    return false;
  }

  const requestHost = new URL(request.url).hostname.toLowerCase();
  if (originHost === requestHost) {
    return true;
  }

  return isAllowedHostname(originHost);
}

function parseContactRequest(formData: FormData): ContactRequest | null {
  const name = getField(formData, "name");
  const email = getField(formData, "email");
  const firmRole = getField(formData, "firm_role");
  const initiative = getField(formData, "initiative");
  const formContext = getField(formData, "form_context");

  if (!name || !isLikelyEmail(email) || !initiative) {
    return null;
  }

  return {
    name,
    email,
    firmRole,
    initiative,
    formContext,
  };
}

function passesLengthCaps(contactRequest: ContactRequest) {
  return (
    contactRequest.name.length <= FIELD_LIMITS.name &&
    contactRequest.email.length <= FIELD_LIMITS.email &&
    contactRequest.firmRole.length <= FIELD_LIMITS.firmRole &&
    contactRequest.initiative.length <= FIELD_LIMITS.initiative
  );
}

function hasSpamLinks(message: string) {
  const matches = message.match(URL_PATTERN) ?? [];
  if (matches.length > 1) {
    return true;
  }

  const lower = message.toLowerCase();
  return BLOCKED_LINK_HOSTS.some((host) => lower.includes(host));
}

function getThankYouPath(formData: FormData) {
  return getField(formData, "form_context") === "bosun" ? BOSUN_THANK_YOU_PATH : THANK_YOU_PATH;
}

function getErrorPath(formData: FormData) {
  return getField(formData, "form_context") === "bosun" ? BOSUN_ERROR_PATH : ERROR_PATH;
}

function getFormCopy(formContext: string) {
  if (formContext === "care-helm") {
    return {
      subject: "Care Helm demo request",
      heading: "New Care Helm demo request",
      roleLabel: "Firm / role",
      question: "What would you like to explore?",
    };
  }

  if (formContext === "bosun") {
    return {
      subject: "Bosun inquiry",
      heading: "New Bosun inquiry",
      roleLabel: "Business and trade",
      question: "What would help most?",
    };
  }

  return {
    subject: "Chart Room AI diagnostic request",
    heading: "New Chart Room AI diagnostic request",
    roleLabel: "Firm / role",
    question: "What needs momentum?",
  };
}

function getField(formData: FormData, fieldName: string) {
  const value = formData.get(fieldName);
  return typeof value === "string" ? value.trim() : "";
}

function isLikelyEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function redirectTo(request: Request, path: string) {
  return Response.redirect(new URL(path, request.url), 303);
}

async function sendWithMicrosoftGraph(contactRequest: ContactRequest) {
  const accessToken = await getMicrosoftGraphAccessToken();
  const fromMailbox = requiredEnv("CONTACT_FROM_MAILBOX");
  const toEmail = requiredEnv("CONTACT_TO_EMAIL");
  const fromName = process.env.CONTACT_FROM_NAME?.trim() || "Marc Cheatham";

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(fromMailbox)}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: {
          subject: `${getFormCopy(contactRequest.formContext).subject} from ${contactRequest.name}`,
          body: {
            contentType: "Text",
            content: buildEmailBody(contactRequest),
          },
          from: {
            emailAddress: {
              address: fromMailbox,
              name: fromName,
            },
          },
          toRecipients: [
            {
              emailAddress: {
                address: toEmail,
              },
            },
          ],
          replyTo: [
            {
              emailAddress: {
                address: contactRequest.email,
                name: contactRequest.name,
              },
            },
          ],
        },
        saveToSentItems: true,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Microsoft Graph sendMail failed with status ${response.status}`);
  }
}

async function getMicrosoftGraphAccessToken() {
  const tenantId = requiredEnv("MICROSOFT_TENANT_ID");
  const clientId = requiredEnv("MICROSOFT_CLIENT_ID");
  const clientSecret = requiredEnv("MICROSOFT_CLIENT_SECRET");

  const response = await fetch(
    `https://login.microsoftonline.com/${encodeURIComponent(tenantId)}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
        scope: "https://graph.microsoft.com/.default",
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Microsoft Graph token request failed with status ${response.status}`);
  }

  const tokenResponse = (await response.json()) as GraphTokenResponse;

  if (typeof tokenResponse.access_token !== "string" || !tokenResponse.access_token) {
    throw new Error("Microsoft Graph token response did not include an access token");
  }

  return tokenResponse.access_token;
}

function requiredEnv(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function buildEmailBody(contactRequest: ContactRequest) {
  const copy = getFormCopy(contactRequest.formContext);

  return [
    copy.heading,
    "",
    `Name: ${contactRequest.name}`,
    `Email: ${contactRequest.email}`,
    `${copy.roleLabel}: ${contactRequest.firmRole || "Not provided"}`,
    "",
    copy.question,
    contactRequest.initiative,
  ].join("\n");
}

function getSafeErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unknown error";
}
