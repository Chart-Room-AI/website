import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { FeatureCard } from "@/components/FeatureCard";
import { PageIntro } from "@/components/PageIntro";
import { brandImages, whyCards } from "@/lib/site-content";

export const metadata = {
  title: "Why Chart Room AI",
  description: "Why regulated teams invite Chart Room AI for AI transformation leadership.",
};

export default function WhyChartRoomPage() {
  return (
    <>
      <PageIntro eyebrow="Engagement rationale" title="Why teams invite Chart Room AI.">
        <p>
          Many AI programs optimize for vendor bake-offs or slide walls. We optimize for
          repeatable production and the organizational discipline required to keep it useful.
        </p>
      </PageIntro>

      <section className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center lg:max-w-6xl">
          <div className="grid gap-6">
            {whyCards.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
          <div className="rounded-3xl border border-chart-navy/10 bg-chart-surface p-6">
            <Image
              src={brandImages.sailingConstellation}
              alt="Sailing ship with compass and constellation illustration"
              width={720}
              height={960}
              className="h-auto w-full rounded-2xl"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-chart-navy/10 bg-chart-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <div className="rounded-2xl border border-chart-gold/35 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-teal">
              Governed throughput, not hype
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-chart-navy">
              Pilots need a path to accountability.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-chart-ink">
              We align sponsors, engineering, security, and compliance so pilots graduate with
              evaluations, rollback paths, instrumented operations, and clear ownership. The goal
              is not a better agent demo. The goal is a capability your risk and delivery teams
              can actually run.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
