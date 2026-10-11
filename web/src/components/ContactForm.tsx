import { siteConfig } from "@/lib/site-config";
import { Turnstile } from "@/components/Turnstile";

export function ContactForm() {
  return (
    <form
      id="diagnostic-form"
      action={siteConfig.formEndpoint}
      method="POST"
      className="relative rounded-3xl border border-chart-gold/30 bg-white p-6 shadow-xl shadow-chart-navy/10 md:p-8"
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

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-teal">
          Request the diagnostic
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-chart-navy">
          Tell us where the AI initiative is stuck.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-chart-ink/75">
          We will look for the practical blocker, the governance or delivery gaps, and the next
          executive move worth making. No pitch sequence, no newsletter trap.
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
          Work email
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="min-h-12 rounded-md border border-chart-navy/15 px-4 text-base font-normal text-chart-ink shadow-sm"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-chart-navy">
          Firm / role
          <input
            name="firm_role"
            autoComplete="organization-title"
            className="min-h-12 rounded-md border border-chart-navy/15 px-4 text-base font-normal text-chart-ink shadow-sm"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-chart-navy">
          What needs momentum?
          <textarea
            required
            name="initiative"
            rows={5}
            className="rounded-md border border-chart-navy/15 px-4 py-3 text-base font-normal text-chart-ink shadow-sm"
            placeholder="Current stage, blockers, timeline, stakeholders, and what would make the conversation useful."
          />
        </label>
      </div>

      <Turnstile />

      <button
        type="submit"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-chart-navy px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-chart-navy/90"
      >
        Unlock AI for your Firm
      </button>
      <p className="mt-3 text-xs leading-relaxed text-chart-ink/60">
        Prefer to book directly?{" "}
        <a
          href={siteConfig.bookingHref}
          className="font-semibold text-chart-teal underline underline-offset-4 transition hover:text-chart-navy"
        >
          Choose a diagnostic time
        </a>
        .
      </p>
    </form>
  );
}
