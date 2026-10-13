import { MailNotConfiguredError, type MailProvider } from "./types";

/**
 * Gmail: STUB. Marc decided on Oct 12, 2026 (4:37 PM ET) that quote mail is
 * Microsoft 365 for now. A config with contact.provider "gmail" fails safe:
 * the route logs this error and redirects to the error page. No email is sent.
 */
export const gmailProvider: MailProvider = {
  id: "gmail",
  async send() {
    throw new MailNotConfiguredError("gmail: provider not implemented (Marc chose Microsoft 365 for now, Oct 12, 2026, #21)");
  },
};
