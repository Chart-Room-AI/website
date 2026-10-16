import { gmailProvider } from "./gmail";
import { m365Provider } from "./m365";
import { MailNotConfiguredError, type ContactProvider, type MailProvider } from "./types";

export { MailNotConfiguredError, type OutgoingEmail } from "./types";

/** One provider per contact.provider value; TypeScript fails if one is missing. */
const providers: Record<ContactProvider, MailProvider> = {
  m365: m365Provider,
  gmail: gmailProvider,
};

/** Accepts and drops mail. Only via CONTACT_DELIVERY_MODE=noop, and never in production. */
const noopProvider: MailProvider = {
  id: "noop",
  async send() {
    console.info("Quote form submission accepted in noop mode (no email sent).");
  },
};

/**
 * The provider for this site: config.contact.provider, unless
 * CONTACT_DELIVERY_MODE=noop is set for local/preview testing. noop is refused
 * in production so a misconfigured client site can't silently drop leads.
 */
export function getMailProvider(configured: ContactProvider): MailProvider {
  if (process.env.CONTACT_DELIVERY_MODE?.trim() === "noop") {
    if (process.env.VERCEL_ENV === "production") {
      throw new MailNotConfiguredError("CONTACT_DELIVERY_MODE=noop is not allowed in production");
    }
    return noopProvider;
  }
  return providers[configured];
}
