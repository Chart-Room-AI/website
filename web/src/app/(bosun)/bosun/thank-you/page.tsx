import type { Metadata } from "next";
import Link from "next/link";
import { bosunConfig } from "@/lib/bosun-config";

export const metadata: Metadata = {
  title: {
    absolute: "Request received | Bosun by Chart Room AI",
  },
  description: "Confirmation for a Bosun by Chart Room AI request, a Chart Room AI service.",
  robots: {
    index: false,
  },
};

export default function BosunThankYouPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[linear-gradient(160deg,var(--chart-navy)_55%,var(--bosun-harbor))] text-white">
        <div className="relative mx-auto max-w-3xl px-4 py-16 md:py-20">
          <p className="inline-flex rounded-full border border-bosun-rope/40 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-bosun-rope">
            Request received
          </p>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight md:text-5xl">
            Thanks. We&apos;ve got it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            {`Your note about ${bosunConfig.fullName} came through. We'll follow up by email to set up your free 15-minute call.`}
          </p>
        </div>
        <div aria-hidden className="relative h-1.5 bg-[linear-gradient(90deg,var(--bosun-brass)_0_72%,var(--chart-teal)_72%_100%)]" />
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-4 py-16">
          <div className="rounded-2xl border border-chart-navy/10 bg-white p-6 shadow-sm md:p-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-chart-navy">
              What happens next
            </h2>
            <p className="mt-4 leading-relaxed text-chart-ink/85">
              On the call, we&apos;ll talk through your office work, which plan fits, and pricing.
              If you think of anything else in the meantime, just email{" "}
              <a
                href={`mailto:${bosunConfig.contactEmail}?subject=${encodeURIComponent(bosunConfig.contactMailSubject)}`}
                className="font-semibold text-bosun-deep-brass underline underline-offset-4 hover:text-chart-navy"
              >
                {bosunConfig.contactEmail}
              </a>
              .
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={bosunConfig.path}
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-bosun-brass px-5 py-3 text-sm font-semibold text-chart-navy transition hover:brightness-105"
              >
                Back to Bosun
              </Link>
              <Link
                href={bosunConfig.parentSiteUrl}
                className="inline-flex min-h-11 items-center justify-center rounded-md border-2 border-chart-navy/80 px-5 py-3 text-sm font-semibold text-chart-navy transition hover:bg-chart-navy hover:text-white"
              >
                Visit Chart Room AI
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
