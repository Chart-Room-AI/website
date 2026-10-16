import { requireEnv, type MailProvider, type OutgoingEmail } from "./types";

/**
 * Microsoft 365 via Microsoft Graph sendMail (app-only client credentials),
 * the same path web/ uses. Env (server-only): MICROSOFT_TENANT_ID,
 * MICROSOFT_CLIENT_ID, MICROSOFT_CLIENT_SECRET, CONTACT_FROM_MAILBOX,
 * CONTACT_TO_EMAIL; optional CONTACT_FROM_NAME (defaults to the business name).
 */
export const m365Provider: MailProvider = {
  id: "m365",
  async send(email: OutgoingEmail) {
    const env = requireEnv("m365", [
      "MICROSOFT_TENANT_ID",
      "MICROSOFT_CLIENT_ID",
      "MICROSOFT_CLIENT_SECRET",
      "CONTACT_FROM_MAILBOX",
      "CONTACT_TO_EMAIL",
    ]);
    const accessToken = await getAccessToken(env.MICROSOFT_TENANT_ID, env.MICROSOFT_CLIENT_ID, env.MICROSOFT_CLIENT_SECRET);
    const fromName = process.env.CONTACT_FROM_NAME?.trim() || email.fromName;

    const response = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(env.CONTACT_FROM_MAILBOX)}/sendMail`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          message: {
            subject: email.subject,
            body: { contentType: "Text", content: email.text },
            from: { emailAddress: { address: env.CONTACT_FROM_MAILBOX, name: fromName } },
            toRecipients: [{ emailAddress: { address: env.CONTACT_TO_EMAIL } }],
            replyTo: [{ emailAddress: { address: email.replyTo.address, name: email.replyTo.name } }],
          },
          saveToSentItems: true,
        }),
      },
    );
    if (!response.ok) {
      throw new Error(`Microsoft Graph sendMail failed with status ${response.status}`);
    }
  },
};

async function getAccessToken(tenantId: string, clientId: string, clientSecret: string) {
  const response = await fetch(`https://login.microsoftonline.com/${encodeURIComponent(tenantId)}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "client_credentials",
      scope: "https://graph.microsoft.com/.default",
    }),
  });
  if (!response.ok) {
    throw new Error(`Microsoft Graph token request failed with status ${response.status}`);
  }
  const token = (await response.json()) as { access_token?: unknown };
  if (typeof token.access_token !== "string" || !token.access_token) {
    throw new Error("Microsoft Graph token response did not include an access token");
  }
  return token.access_token;
}
