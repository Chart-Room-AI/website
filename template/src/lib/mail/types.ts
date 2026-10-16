import type { ClientConfig } from "@config/schema";

export type ContactProvider = ClientConfig["contact"]["provider"];

export type OutgoingEmail = {
  subject: string;
  text: string;
  /** The person who filled in the form. */
  replyTo: { name: string; address: string };
  /** Display name for the sender, e.g. the business name. */
  fromName: string;
};

/** Sends quote-form email. Credentials come from env vars only. */
export interface MailProvider {
  readonly id: ContactProvider | "noop";
  send(email: OutgoingEmail): Promise<void>;
}

/** The provider can't send because it isn't set up (missing env vars or not implemented). */
export class MailNotConfiguredError extends Error {
  name = "MailNotConfiguredError";
}

/** Throws MailNotConfiguredError naming (never printing) any missing env vars. */
export function requireEnv<const K extends string>(provider: string, names: readonly K[]): Record<K, string> {
  const values = {} as Record<K, string>;
  const missing: string[] = [];
  for (const name of names) {
    const value = process.env[name]?.trim();
    if (value) values[name] = value;
    else missing.push(name);
  }
  if (missing.length > 0) {
    throw new MailNotConfiguredError(`${provider}: missing environment variable(s) ${missing.join(", ")}`);
  }
  return values;
}
