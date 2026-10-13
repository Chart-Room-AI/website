import { clientConfig } from "@config/index";
import { getMailProvider, MailNotConfiguredError } from "@/lib/mail";
import {
  ERROR_PATH,
  HONEYPOT_FIELD,
  QUOTE_FIELDS,
  STARTED_AT_FIELD,
  THANK_YOU_PATH,
  TURNSTILE_ACTION,
} from "@/lib/quote-form";

/*
 * Quote form handler, ported from web/src/app/api/contact/route.ts (#16/#18):
 * Turnstile -> honeypot -> timing -> origin -> parse -> length/link caps -> send.
 *
 * - Turnstile failures and send failures: 303 to /contact/error (logged).
 * - Spam-class rejects (honeypot, too fast, foreign origin, caps/links): silent
 *   303 to /contact/thank-you, so the redirect never tells a bot which check it hit.
 * - Never returns 500. Env var values are never logged, only names.
 */

type QuoteRequest = { name: string; email: string; phone: string; service: string; message: string };
type TurnstileVerifyResponse = { success?: unknown; action?: unknown; hostname?: unknown; "error-codes"?: unknown };

const MIN_SUBMIT_MS = 3000;
const BLOCKED_LINK_HOSTS = ["tinyurl.com", "bit.ly", "t.co", "telegra.ph", "goo.gl"];
const URL_PATTERN = /https?:\/\/[^\s]+/gi;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    if (!(await verifyTurnstile(request, formData))) {
      return redirectTo(request, ERROR_PATH);
    }
    if (getField(formData, HONEYPOT_FIELD)) return redirectTo(request, THANK_YOU_PATH);
    if (isSubmittedTooFast(formData)) return redirectTo(request, THANK_YOU_PATH);
    if (!isAllowedOrigin(request)) return redirectTo(request, THANK_YOU_PATH);

    const quote = parseQuoteRequest(formData);
    if (!quote) return redirectTo(request, ERROR_PATH);
    if (!passesLengthCaps(quote) || hasSpamLinks(quote.message)) return redirectTo(request, THANK_YOU_PATH);

    const { business, contact } = clientConfig;
    await getMailProvider(contact.provider).send({
      subject: `${business.name}: quote request from ${quote.name}`,
      text: buildEmailBody(quote, business.name),
      replyTo: { name: quote.name, address: quote.email },
      fromName: business.name,
    });
    return redirectTo(request, THANK_YOU_PATH);
  } catch (error) {
    const kind = error instanceof MailNotConfiguredError ? "Quote form email is not configured" : "Quote form submission failed";
    console.error(`${kind}:`, error instanceof Error ? error.message : "Unknown error");
    return redirectTo(request, ERROR_PATH);
  }
}

async function verifyTurnstile(request: Request, formData: FormData): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error("TURNSTILE_SECRET_KEY is not set; rejecting submission.");
      return false;
    }
    console.warn("TURNSTILE_SECRET_KEY is not set; skipping Turnstile verification in development.");
    return true;
  }

  const token = getField(formData, "cf-turnstile-response");
  if (!token) {
    console.error("Turnstile verification failed: missing token");
    return false;
  }

  const body = new URLSearchParams({ secret, response: token });
  const remoteip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (remoteip) body.set("remoteip", remoteip);

  let response: Response;
  try {
    response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
  } catch (error) {
    console.error("Turnstile siteverify request failed:", error instanceof Error ? error.message : "Unknown error");
    return false;
  }
  if (!response.ok) {
    console.error(`Turnstile siteverify HTTP status ${response.status}`);
    return false;
  }

  const result = (await response.json()) as TurnstileVerifyResponse;
  const errorCodes = Array.isArray(result["error-codes"]) ? result["error-codes"] : [];
  if (result.success !== true) {
    console.error("Turnstile verification failed:", { errorCodes });
    return false;
  }
  if (result.action !== TURNSTILE_ACTION) {
    console.error("Turnstile verification failed: unexpected action", {
      action: typeof result.action === "string" ? result.action : undefined,
    });
    return false;
  }
  const hostname = typeof result.hostname === "string" ? result.hostname : "";
  if (!isAllowedHostname(hostname)) {
    console.error("Turnstile verification failed: hostname not allowed", { hostname });
    return false;
  }
  return true;
}

/**
 * The client's own domain (from config.seo.siteUrl, with and without www),
 * TURNSTILE_ALLOWED_HOSTNAMES (CSV), the project's Vercel production URL, and,
 * outside production, this deployment's own Vercel URLs.
 */
function isAllowedHostname(hostname: string): boolean {
  const normalized = hostname.trim().toLowerCase();
  if (!normalized) return false;

  const siteHost = new URL(clientConfig.seo.siteUrl).hostname.toLowerCase();
  const bareHost = siteHost.replace(/^www\./, "");
  const allowed = new Set([bareHost, `www.${bareHost}`]);
  for (const extra of (process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? "").split(",")) {
    if (extra.trim()) allowed.add(extra.trim().toLowerCase());
  }
  const vercelHosts = [process.env.VERCEL_PROJECT_PRODUCTION_URL];
  if (process.env.VERCEL_ENV !== "production") {
    vercelHosts.push(process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL);
  }
  for (const host of vercelHosts) {
    if (host?.trim()) allowed.add(host.trim().toLowerCase());
  }
  return allowed.has(normalized);
}

function isSubmittedTooFast(formData: FormData): boolean {
  const startedAt = Number(getField(formData, STARTED_AT_FIELD));
  // Missing or forged timing field: treat as a bot / non-JS scrape.
  if (!Number.isFinite(startedAt) || startedAt <= 0) return true;
  const elapsed = Date.now() - startedAt;
  return elapsed < MIN_SUBMIT_MS;
}

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  // Browsers sometimes omit Origin on same-site navigational POSTs.
  if (!origin) return true;
  let originHost: string;
  try {
    originHost = new URL(origin).hostname.toLowerCase();
  } catch {
    return false;
  }
  return originHost === new URL(request.url).hostname.toLowerCase() || isAllowedHostname(originHost);
}

function parseQuoteRequest(formData: FormData): QuoteRequest | null {
  const quote = {
    name: getField(formData, QUOTE_FIELDS.name.name),
    email: getField(formData, QUOTE_FIELDS.email.name),
    phone: getField(formData, QUOTE_FIELDS.phone.name),
    service: getField(formData, QUOTE_FIELDS.service.name),
    message: getField(formData, QUOTE_FIELDS.message.name),
  };
  if (!quote.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quote.email) || !quote.message) return null;
  return quote;
}

function passesLengthCaps(quote: QuoteRequest): boolean {
  return (Object.keys(QUOTE_FIELDS) as (keyof typeof QUOTE_FIELDS)[]).every(
    (key) => quote[key].length <= QUOTE_FIELDS[key].max,
  );
}

function hasSpamLinks(message: string): boolean {
  if ((message.match(URL_PATTERN) ?? []).length > 1) return true;
  const lower = message.toLowerCase();
  return BLOCKED_LINK_HOSTS.some((host) => lower.includes(host));
}

function buildEmailBody(quote: QuoteRequest, businessName: string): string {
  return [
    `New quote request from the ${businessName} website`,
    "",
    `Name: ${quote.name}`,
    `Email: ${quote.email}`,
    `Phone: ${quote.phone || "Not provided"}`,
    `Service: ${quote.service || "Not specified"}`,
    "",
    "Details:",
    quote.message,
  ].join("\n");
}

function getField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function redirectTo(request: Request, path: string): Response {
  return Response.redirect(new URL(path, request.url), 303);
}
