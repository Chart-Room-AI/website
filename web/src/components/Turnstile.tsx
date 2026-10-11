"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

/**
 * Cloudflare Turnstile widget + form timing field.
 * Graceful no-op (timing field only) when NEXT_PUBLIC_TURNSTILE_SITE_KEY is
 * missing outside production, so local `npm run dev` still works.
 */
export function Turnstile() {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";
  const [startedAt] = useState(() => String(Date.now()));
  const isProduction = process.env.NODE_ENV === "production";

  useEffect(() => {
    if (!siteKey && isProduction) {
      console.warn(
        "Turnstile site key missing in production; form submissions will be rejected server-side.",
      );
    }
  }, [siteKey, isProduction]);

  if (!siteKey) {
    return <input type="hidden" name="form_started_at" value={startedAt} />;
  }

  return (
    <>
      <input type="hidden" name="form_started_at" value={startedAt} />
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        async
        defer
      />
      <div
        className="cf-turnstile mt-4"
        data-sitekey={siteKey}
        data-action="contact"
      />
    </>
  );
}
