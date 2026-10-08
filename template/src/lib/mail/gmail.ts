import { MailNotConfiguredError, type MailProvider } from "./types";

/**
 * Gmail: STUB. Not implemented until Marc decides the Gmail account type
 * (Google Workspace vs. personal Gmail) and how it signs in (#21). Until then
 * a config with contact.provider "gmail" fails safe: the route logs this error
 * and redirects to the error page. No email is sent.
 */
export const gmailProvider: MailProvider = {
  id: "gmail",
  async send() {
    throw new MailNotConfiguredError("gmail: provider not implemented yet (waiting on the Gmail account-type decision, #21)");
  },
};
