import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { FeatureCard } from "@/components/FeatureCard";
import { PageIntro } from "@/components/PageIntro";
import { brandImages, expertiseCards } from "@/lib/site-content";

export const metadata = {
  title: "Expertise",
  description: "Chart Room AI expertise across AI systems, fintech platforms, security, and executive delivery.",
};

export default function ExpertisePage() {
  return (
    <>
      <PageIntro eyebrow="Expertise" title="Where AI ambition meets operating discipline.">
        <p>
          Chart Room AI works across strategy, delivery, data, security, and governance. The
          common thread is practical execution in environments where scrutiny is part of the job.
        </p>
      </PageIntro>

      <section className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-[0.85fr_1.15fr] lg:max-w-6xl">
          <div className="rounded-3xl bg-chart-navy p-6">
            <Image
              src={brandImages.sextantBoat}
              alt="Sextant, ship, compass, and constellation illustration"
              width={900}
              height={1350}
              className="h-auto w-full rounded-2xl"
            />
          </div>
          <div className="grid gap-6">
            {expertiseCards.map((item) => (
              <FeatureCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-chart-navy/10 bg-chart-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-teal">
            Engineering depth
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <FeatureCard
              title="Fintech platform depth"
              body="Capital market assumption and Monte Carlo engines, asset-liability mapping, trading systems, financial planning tools, and security master databases built for regulated financial services environments."
            />
            <FeatureCard
              title="Engineering operating model"
              body="AI-augmented project management and development workflows, test-driven development, CI/CD pipelines, release discipline, and practical production operations."
            />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-teal">
            Delivery modes
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <FeatureCard
              title="AI vision and roadmap"
              body="Shape the target state, sequence value, define decision rights, and connect the roadmap to delivery capacity."
            />
            <FeatureCard
              title="Program unblock"
              body="Diagnose why an initiative is stuck, then align sponsors, architecture, security, data, and engineering around the next practical move."
            />
            <FeatureCard
              title="Hands-on operating support"
              body="Work alongside technical teams on governance, evaluations, SDLC discipline, implementation trade-offs, and executive communication."
            />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
