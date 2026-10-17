/**
 * Quote form tests: npm run test-contact
 * A sample config (config.sample, the "sample site" banner) must never call
 * the mail sender, whatever env vars the deployment holds.
 */
import assert from "node:assert/strict";
import { clientConfigs } from "../config/clients";
import { clientConfig } from "../config/index";
import { m365Provider } from "../src/lib/mail/m365";
import { gmailProvider } from "../src/lib/mail/gmail";
import { POST } from "../src/app/api/contact/route";

// Run as a dev deployment with real-looking sender secrets, like the client-template Preview env.
delete process.env.TURNSTILE_SECRET_KEY;
delete process.env.CONTACT_DELIVERY_MODE;
Object.assign(process.env, {
  NODE_ENV: "development",
  MICROSOFT_TENANT_ID: "test-tenant",
  MICROSOFT_CLIENT_ID: "test-client",
  MICROSOFT_CLIENT_SECRET: "test-secret",
  CONTACT_FROM_MAILBOX: "from@test.invalid",
  CONTACT_TO_EMAIL: "to@test.invalid",
});

let sends = 0;
let fetches = 0;
for (const provider of [m365Provider, gmailProvider]) {
  (provider as { send: unknown }).send = async () => {
    sends += 1;
  };
}
globalThis.fetch = (async () => {
  fetches += 1;
  throw new Error("network is not allowed in tests");
}) as typeof fetch;

const PII = "Pat Example";
function validSubmission(): Request {
  const form = new FormData();
  form.set("name", PII);
  form.set("email", "pat@test.invalid");
  form.set("message", "Need a quote");
  form.set("form_started_at", String(Date.now() - 10_000));
  return new Request("https://preview.test.invalid/api/contact", { method: "POST", body: form });
}

async function post(): Promise<{ response: Response; logs: string }> {
  const logged: unknown[] = [];
  const saved = { info: console.info, warn: console.warn, error: console.error, log: console.log };
  console.info = console.warn = console.error = console.log = (...args: unknown[]) => void logged.push(...args);
  try {
    return { response: await POST(validSubmission()), logs: JSON.stringify(logged) };
  } finally {
    Object.assign(console, saved);
  }
}

const tests: [string, () => Promise<void>][] = [
  ["dry-creek-sample and fairwater are registered as sample configs", async () => {
    assert.equal(clientConfigs["dry-creek-sample"].sample, true);
    assert.equal(clientConfigs.fairwater.sample, true);
  }],
  ["a sample-config submission never calls the mail sender and reports not-sent", async () => {
    clientConfig.sample = true;
    sends = 0;
    fetches = 0;
    const { response, logs } = await post();
    assert.equal(response.status, 303);
    assert.equal(new URL(response.headers.get("location") ?? "").pathname + new URL(response.headers.get("location") ?? "").search, "/contact/thank-you?sample=not-sent");
    assert.equal(sends, 0);
    assert.equal(fetches, 0);
    assert.ok(!logs.includes(PII) && !logs.includes("pat@test.invalid"), `logs must hold no PII: ${logs}`);
  }],
  ["control: the same submission on a non-sample config does call the sender", async () => {
    clientConfig.sample = false;
    sends = 0;
    const { response } = await post();
    assert.equal(response.status, 303);
    assert.equal(response.headers.get("location"), "https://preview.test.invalid/contact/thank-you");
    assert.equal(sends, 1);
  }],
];

async function main() {
  let failed = 0;
  for (const [name, run] of tests) {
    try {
      await run();
      console.log(`✓ ${name}`);
    } catch (error) {
      failed += 1;
      console.error(`✗ ${name}\n  ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  console.log(`${tests.length - failed}/${tests.length} passed`);
  if (failed) process.exit(1);
}

void main();
