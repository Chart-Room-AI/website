"use client";

import Script from "next/script";
import { useState } from "react";
import { STARTED_AT_FIELD, TURNSTILE_ACTION } from "@/lib/quote-form";

/**
 * Cloudflare Turnstile widget + form timing field (ported from web/).
 * Without NEXT_PUBLIC_TURNSTILE_SITE_KEY only the timing field renders; the
 * server then rejects submissions in production (fail safe), and skips the
 * check in local development so `npm run dev` still works.
 */
export function Turnstile() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";
  const [startedAt] = useState(() => String(Date.now()));

  return (
    <>
      <input type="hidden" name={STARTED_AT_FIELD} value={startedAt} />
      {siteKey ? (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer />
          <div className="cf-turnstile mt-4" data-sitekey={siteKey} data-action={TURNSTILE_ACTION} />
        </>
      ) : null}
    </>
  );
}
