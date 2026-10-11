import { CtaBand } from "@/components/CtaBand";
import { PageIntro } from "@/components/PageIntro";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Request Not Sent",
  description: "Contact form recovery options for Chart Room AI.",
};

export default function ContactErrorPage() {
  return (
    <>
      <PageIntro eyebrow="Request not sent" title="The form could not send your request.">
        <p>
          The contact page is working, but the submission could not be delivered. You can try again
          or email the details directly so the conversation is not blocked by the form.
        </p>
      </PageIntro>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <div className="rounded-2xl border border-chart-navy/10 bg-chart-surface p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-chart-navy">
              Use a direct email fallback
            </h2>
            <p className="mt-4 leading-relaxed text-chart-ink/85">
              Send your name, work email, firm or role, and the AI initiative that needs momentum to{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="font-semibold text-chart-teal underline underline-offset-4 transition hover:text-chart-navy"
              >
                {siteConfig.contactEmail}
              </a>
              .
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="/contact#diagnostic-form"
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-chart-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-chart-navy/90"
              >
                Try the form again
              </a>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="inline-flex min-h-11 items-center justify-center rounded-md border-2 border-chart-gold/90 px-5 py-3 text-sm font-semibold text-chart-navy hover:bg-chart-gold/90"
              >
                Email directly
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Prefer to schedule?"
        body="If a focused diagnostic is already the right next step, choose a time from the contact page."
      />
    </>
  );
}
