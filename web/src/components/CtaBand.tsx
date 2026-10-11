import { diagnosticRequestHref } from "@/lib/site-content";

type CtaBandProps = {
  title?: string;
  body?: string;
};

export function CtaBand({
  title = "Ready to stop managing the mess and start leading the transformation?",
  body = "Book a 30-minute operator-to-operator diagnostic call. No pitch. No slides. Just a candid conversation with someone who has been exactly where you are.",
}: CtaBandProps) {
  return (
    <section className="relative overflow-hidden bg-chart-navy text-white">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.22),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(0,180,168,0.2),transparent_30%)]"
      />
      <div className="relative mx-auto grid max-w-5xl gap-8 px-4 py-14 md:grid-cols-[1fr_auto] md:items-center lg:max-w-6xl">
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-white/75">{body}</p>
          <p className="mt-4 text-sm font-semibold text-chart-gold">
            Limited fractional capacity. Current engagements are prioritized by urgency and fit.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
          <a
            href={diagnosticRequestHref}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-chart-gold px-6 py-3 text-base font-semibold text-chart-navy shadow-md transition hover:brightness-[0.95]"
          >
            Unlock AI for your Firm
          </a>
        </div>
      </div>
    </section>
  );
}
