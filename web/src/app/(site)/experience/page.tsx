import { CtaBand } from "@/components/CtaBand";
import { FeatureCard } from "@/components/FeatureCard";
import { PageIntro } from "@/components/PageIntro";
import { experienceHighlights } from "@/lib/site-content";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Experience",
  description: "Selected leadership background for Marc Cheatham and Chart Room AI.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageIntro
        eyebrow="Leadership trajectory"
        title="Experience calibrated for regulated AI scale."
      >
        <p>
          Marc&apos;s background sits where AI, data, and software collide with capital-markets
          sophistication, duty-of-care expectations, and durable operational risk.
        </p>
      </PageIntro>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <article className="rounded-2xl border-s-4 border-chart-teal bg-chart-surface p-8 shadow-sm md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-chart-teal">
              Recent-decade CTO scope
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-chart-navy md:text-3xl">
              Chief Technology Officer and CEO - {siteConfig.priorVentureName}
            </h2>
            <p className="mt-3 font-medium text-chart-ink">
              Approx. four-year chapter - United States - {siteConfig.priorVentureTagline} -
              buyers in regulated and institutionally discerning segments.
            </p>
            <p className="mt-5 leading-relaxed text-chart-ink">
              Dual CTO and chief executive accountability for product direction,
              engineering throughput, security posture, and revenue-bearing client delivery,
              with continuous exposure to how buyers evaluate depth on capital markets mechanics,
              solvency-style analytics, and data integrity.
            </p>
          </article>

          <div className="mt-8 rounded-2xl border border-chart-navy/10 bg-white p-7 shadow-sm">
            <h3 className="text-xl font-bold text-chart-navy">Composite reading</h3>
            <p className="mt-3 leading-relaxed text-chart-ink">
              The capability themes below blend firsthand work Marc led as Chief Technology
              Officer at Riverfront and as CTO / CEO at{" "}
              <strong>{siteConfig.priorVentureName}</strong>. Interim chief executive
              stretches, venture-facing diligence, and certain partnership / commercial narrative
              arcs skew heavily toward <strong>{siteConfig.priorVentureName}</strong>. Trading
              engineering, Monte Carlo sophistication, planning interoperability, securities-master
              rigor, modernization discipline, and client demos matured across Riverfront and{" "}
              <strong>{siteConfig.priorVentureName}</strong> alike.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {experienceHighlights.map((group) => (
              <article key={group.title} className="rounded-xl border border-chart-navy/10 bg-white p-7 shadow-sm">
                <h3 className="text-xl font-bold text-chart-navy">{group.title}</h3>
                <ul className="mt-4 list-disc space-y-2 ps-5 leading-relaxed text-chart-ink">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-chart-navy/10 bg-chart-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            <FeatureCard
              title={`Additional CTO depth beyond Riverfront and ${siteConfig.priorVentureName}`}
              body="Recurring arcs include modernizing live revenue footprints, portfolio consolidation, integrations, migrations, analytics capabilities, cloud choreography, vendor governance, cyber preparedness, and board-facing technology narrative during inflection stress."
            />
            <FeatureCard
              title="Public-copy boundaries"
              body="Granular outcome metrics, staffing contours, calendars, Riverfront chronology refinement, and Caravel timelines stay out of public copy unless authorized. We expand or walk through nuance under agreement."
            />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
