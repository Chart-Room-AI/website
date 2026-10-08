import { HONEYPOT_FIELD } from "@/lib/quote-form";
import { Turnstile } from "./Turnstile";

/**
 * Spam protection every quote form must include: an off-screen honeypot
 * field, the timing field, and the Turnstile widget. Design-agnostic.
 */
export function FormGuards() {
  return (
    <>
      <div className="pointer-events-none absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Fax number
          <input name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <Turnstile />
    </>
  );
}
