import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FeatureCard } from "@/components/FeatureCard";
import { PageIntro } from "@/components/PageIntro";
import { audience, brandImages } from "@/lib/site-content";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "About",
  description: "About Chart Room AI and Marc Cheatham, Founder and Principal.",
};

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About us" title="We chart pragmatic AI transformations.">
        <p>
          Chart Room AI helps financial services and regulated technology organizations adopt
          AI with discipline: clear roadmaps, executive alignment, security-aware delivery, and
          hands-on momentum when initiatives stall.
        </p>
      </PageIntro>

      <section className="bg-white">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 py-16 md:grid-cols-[1fr_0.9fr] lg:max-w-6xl">
          <div className="space-y-5 text-lg leading-relaxed text-chart-ink">
            <p>
              We bring the perspective of operators who have lived the full arc from regulated
              data and custody-class engineering to VC pitches, client-ready narratives, capital
              markets modeling, and production AI delivery.
            </p>
            <p>
              That background informs how we prioritize use cases, sequence delivery, and keep
              AI programs connected to the controls, decisions, and people required for adoption.
            </p>
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              <FeatureCard
                title="How we work"
                body="Focused discovery, phased priorities, co-driven execution with your leaders, and commercial terms handled offline as the engagement takes shape."
              />
              <FeatureCard
                title="Reach"
                body="United States, remote-first. On-site working sessions and travel are available by arrangement."
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

      <section className="border-y border-chart-navy/10 bg-chart-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-teal">
            Founder and Principal
          </p>
          <div className="mt-5 grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-chart-navy">Marc Cheatham</h2>
              <p className="mt-3 text-lg font-medium text-chart-ink">
                Former Fintech CTO and CEO
              </p>
              <Link
                href="/experience"
                className="mt-6 inline-flex min-h-11 items-center text-sm font-semibold text-chart-teal underline underline-offset-4 hover:text-chart-navy"
              >
                Selected leadership background
              </Link>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-chart-ink">
              <p>
                Marc is a seasoned technology executive with thirty-one years of experience,
                including eighteen years as Chief Technology Officer across multiple firms. Most
                recently, he served for four years as CTO and CEO of{" "}
                <strong>{siteConfig.priorVentureName}</strong>, a{" "}
                <strong>{siteConfig.priorVentureTagline}</strong> company focused on financial
                planning and capital market assumptions.
              </p>
              <p>
                He has guided production multi-agent AI systems in cash flow analysis, tax-aware
                planning workflows, forecasting, developer productivity automation, and evaluation
                pipelines with human verification baselines.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-teal">
            Who we serve
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-chart-navy">
            Regulated teams that need progress without pretending risk is optional.
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {audience.map((item) => (
              <div key={item} className="rounded-xl border border-chart-navy/10 bg-chart-surface p-5">
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
