import { CtaBand } from "@/components/CtaBand";
import { PageIntro } from "@/components/PageIntro";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Diagnostic Request Received",
  description: "Confirmation for a Chart Room AI diagnostic request.",
};

export default function ContactThankYouPage() {
  return (
    <>
      <PageIntro eyebrow="Request received" title="Thanks for the context.">
        <p>
          Your diagnostic request has been received. We will review the details and follow up with
          the next practical step for the AI decision or delivery blocker you shared.
        </p>
      </PageIntro>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <div className="rounded-2xl border border-chart-navy/10 bg-chart-surface p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-chart-navy">
              What happens next
            </h2>
            <p className="mt-4 leading-relaxed text-chart-ink/85">
              We look for the practical blocker, the governance or delivery gaps, and the executive
              move worth making next. If a focused diagnostic conversation is the right next step,
              we will coordinate timing.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={siteConfig.bookingHref}
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-chart-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-chart-navy/90"
              >
                Choose a diagnostic time
              </a>
              <a
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-md border-2 border-chart-gold/90 px-5 py-3 text-sm font-semibold text-chart-navy hover:bg-chart-gold/90"
              >
                Back to contact
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Need to add something?"
        body={`Send a note to ${siteConfig.contactEmail} with any details that should be included with the request.`}
      />
    </>
  );
}
