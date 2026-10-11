import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FeatureCard } from "@/components/FeatureCard";
import { PageIntro } from "@/components/PageIntro";
import { audience, brandImages } from "@/lib/site-content";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "About",
  description:
    "Chart Room AI helps businesses put AI to work: fractional AI leadership consulting, the Care Helm, and Bosun by Chart Room AI. Founded by Marc Cheatham.",
};

const offerings = [
  {
    title: "Fractional AI leadership consulting",
    body: "We act as a part-time AI and technology leadership team for regulated financial firms, turning stalled AI initiatives into governed, production-ready systems, with roadmaps leadership can take to the board.",
    href: "/why-chart-room",
    linkLabel: "Why firms work with us",
  },
  {
    title: "The Care Helm",
    body: "Clear, shift-by-shift guidance for caregivers at the point of care, with a secure portal where families or staff keep instructions up to date. Built for families, assisted living and memory care communities, and home care agencies.",
    href: "/care-helm",
    linkLabel: "Explore the Care Helm",
  },
  {
    title: "Bosun by Chart Room AI",
    body: "An office teammate for small trade and service businesses that keeps the inbox tidy, the calendar straight, and the bills tracked, plus a simple website. You approve everything that goes out.",
    href: "/bosun",
    linkLabel: "Meet Bosun",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About us" title="We chart a clear course for putting AI to work.">
        <p>
          {siteConfig.legalName} leads AI programs for regulated financial firms, makes the Care
          Helm for families and care organizations, and offers Bosun by Chart Room AI, an office
          teammate for small trade and service businesses. Whatever the size of the business, we start from the
          same place: practical AI with the right controls and people in the loop.
        </p>
      </PageIntro>

      <section className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 py-16 md:grid-cols-[1fr_0.9fr] lg:max-w-6xl">
          <div className="space-y-5 text-lg leading-relaxed text-chart-ink">
            <p>
              Our AI leadership work draws on experience across the full arc: regulated data and
              custody systems engineering, investor pitches and client narratives, capital markets
              modeling, and production AI delivery.
            </p>
            <p>
              That background shapes how we choose use cases, sequence delivery, and keep AI
              programs tied to the controls, decisions, and people adoption depends on.
            </p>
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              <FeatureCard
                title="How we work"
                body="For consulting: focused discovery, phased priorities, and hands-on execution alongside your leaders. Terms are set once the work is scoped."
              />
              <FeatureCard
                title="Reach"
                body="Based in Virginia. Our consulting work is remote-first across the United States, with on-site working sessions and travel by arrangement."
              />
            </div>
          </div>

          <div className="rounded-3xl border border-chart-navy/10 bg-chart-surface p-6">
            <Image
              src={brandImages.shipsWheelCompass}
              alt="Ship's wheel and compass rose illustration"
              width={720}
              height={960}
              className="h-auto w-full rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-chart-navy/10 bg-chart-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-teal">
            What we do
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-chart-navy">
            Three ways we put AI to work.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {offerings.map((item) => (
              <FeatureCard
                key={item.title}
                title={item.title}
                body={item.body}
                href={item.href}
                linkLabel={item.linkLabel}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-chart-navy/10 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-teal">
            Our founder
          </p>
          <div className="mt-5 grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-chart-navy">Marc Cheatham</h2>
              <p className="mt-3 text-lg font-medium text-chart-ink">
                Founder &amp; Principal Consultant
              </p>
              <p className="mt-1 text-base text-chart-ink/80">Former fintech CTO and Acting CEO</p>
              <Link
                href="/experience"
                className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-chart-teal underline underline-offset-4 hover:text-chart-navy"
              >
                Selected leadership background
              </Link>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-chart-ink">
              <p>
                Chart Room AI was founded by Marc Cheatham, who leads our technical work. Marc
                brings 31 years in technology, including 18 years as Chief Technology Officer
                across multiple firms. Most recently, he served for four years as CTO and
                Acting CEO of <strong>{siteConfig.priorVentureName}</strong>, a{" "}
                <strong>{siteConfig.priorVentureTagline}</strong> company focused on financial
                planning and capital market assumptions.
              </p>
              <p>
                He has guided production multi-agent AI systems in cash flow analysis, tax-aware
                planning workflows, forecasting, developer productivity automation, and testing
                that checks AI output against human review. That hands-on experience is the
                foundation of how Chart Room AI builds and governs AI for our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-chart-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-teal">
            Who our AI leadership work serves
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-chart-navy">
            Regulated teams that need progress without pretending risk is optional.
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {audience.map((item) => (
              <div key={item} className="rounded-xl border border-chart-navy/10 bg-white p-5">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
