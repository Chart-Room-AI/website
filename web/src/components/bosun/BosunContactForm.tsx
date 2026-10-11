import { Turnstile } from "@/components/Turnstile";
import { bosunConfig } from "@/lib/bosun-config";

/**
 * Posts to the shared contact route (siteConfig.formEndpoint, default /api/contact),
 * the same path as the main contact form and the Care Helm demo form, with the same
 * bot-protection contract from #16/#18: off-screen `fax_number` honeypot, Turnstile
 * widget (which also emits `form_started_at`), and `form_context` outside the
 * aria-hidden wrapper. The route sends `form_context=bosun` leads with a Bosun
 * subject and redirects them to /bosun/thank-you.
 */
export function BosunContactForm() {
  return (
    <form
      id="bosun-contact-form"
      action={bosunConfig.formEndpoint}
      method="POST"
      className="relative rounded-3xl border border-bosun-brass/40 bg-white p-6 shadow-xl shadow-chart-navy/10 md:p-8"
    >
      <div
        className="pointer-events-none absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <label>
          Fax number
          <input name="fax_number" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="form_context" value="bosun" />

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-bosun-deep-brass">
          Get started
        </p>
        <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-chart-navy">
          Tell us about your business.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-chart-ink/75">
          A few details are enough. We will follow up to set up a free 15-minute call.
        </p>
      </div>

      <div className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-chart-navy">
          Name
          <input
            required
            name="name"
            autoComplete="name"
            className="min-h-12 rounded-md border border-chart-navy/15 px-4 text-base font-normal text-chart-ink shadow-sm"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-chart-navy">
          Email
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="min-h-12 rounded-md border border-chart-navy/15 px-4 text-base font-normal text-chart-ink shadow-sm"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-chart-navy">
          Business and trade
          <input
            name="firm_role"
            autoComplete="organization"
            placeholder="Lawn care, power washing, cleaning, handyman…"
            className="min-h-12 rounded-md border border-chart-navy/15 px-4 text-base font-normal text-chart-ink shadow-sm"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-chart-navy">
          What would help most?
          <textarea
            required
            name="initiative"
            rows={4}
            placeholder="Email, calendar, bills, a website, or all of the above…"
            className="rounded-md border border-chart-navy/15 px-4 py-3 text-base font-normal text-chart-ink shadow-sm"
          />
        </label>
      </div>

      <Turnstile />

      <button
        type="submit"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-bosun-brass px-6 py-3 text-base font-semibold text-chart-navy shadow-md transition hover:brightness-105 sm:w-auto"
      >
        Book a free 15-minute call
      </button>
    </form>
  );
}
