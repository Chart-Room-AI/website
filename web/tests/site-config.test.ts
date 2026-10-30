import { test } from "node:test";
import assert from "node:assert/strict";

async function load(value: string | undefined) {
  if (value === undefined) delete process.env.NEXT_PUBLIC_BOSUN_BOOKING_URL;
  else process.env.NEXT_PUBLIC_BOSUN_BOOKING_URL = value;
  const mod = await import(`../src/lib/site-config.ts?v=${Math.random()}`);
  return mod.siteConfig.bosunBookingHref;
}

test("Bosun CTA falls back to today's contact form anchor when unset", async () => {
  assert.equal(await load(undefined), "#get-started");
});
test("Bosun CTA falls back when empty", async () => {
  assert.equal(await load(""), "#get-started");
});
test("Bosun CTA uses the configured Bookings URL when set", async () => {
  assert.equal(await load("https://example.com/book"), "https://example.com/book");
});
