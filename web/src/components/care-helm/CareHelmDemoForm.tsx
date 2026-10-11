import { careHelmConfig } from "@/lib/care-helm-config";
import { Turnstile } from "@/components/Turnstile";

export function CareHelmDemoForm() {
  return (
    <form
      id="care-helm-demo-form"
      action={careHelmConfig.formEndpoint}
      method="POST"
      className="relative rounded-3xl border border-chart-teal/30 bg-white p-6 shadow-xl shadow-chart-navy/10 md:p-8"
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
      <input type="hidden" name="form_context" value="care-helm" />

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-teal">
          Request a demo
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-chart-navy">
          Tell us about your care setting.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-chart-ink/75">
          Share a few details and we will follow up to schedule a personalized walkthrough. No
          obligation, no generic sales sequence.
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
          Organization / role
          <input
            name="firm_role"
            autoComplete="organization-title"
            placeholder="Family author, assisted living operator, agency director…"
            className="min-h-12 rounded-md border border-chart-navy/15 px-4 text-base font-normal text-chart-ink shadow-sm"
          />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-chart-navy">
          What would you like to explore?
          <textarea
            required
            name="initiative"
            rows={4}
            placeholder="Home care for a parent, multi-site rollout, pilot for a community…"
            className="rounded-md border border-chart-navy/15 px-4 py-3 text-base font-normal text-chart-ink shadow-sm"
          />
        </label>
      </div>

      <Turnstile />

      <button
        type="submit"
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-chart-teal px-6 py-3 text-base font-semibold text-chart-navy shadow-md transition hover:brightness-95 sm:w-auto"
      >
        Request a Personalized Demo
      </button>
    </form>
  );
}
