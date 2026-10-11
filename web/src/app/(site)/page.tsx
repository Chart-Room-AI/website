import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import {
  beforeAfter,
  brandImages,
  diagnosticRequestHref,
  differentiators,
  engagementOptions,
  heroStats,
  outcomeMetrics,
  proofPoints,
  proofStories,
} from "@/lib/site-content";

export const metadata = {
  title: "Fractional AI Leadership for Regulated Financial Firms",
  description:
    "Unstick stalled AI initiatives with governed, production-ready AI transformation leadership from former CTO and CISO Marc Cheatham.",
};

export default function Home() {
  return (
    <>
      {/* Homepage funnel: Hero -> Trust -> Pain/Outcome -> Proof -> Engagement Paths -> Lead Magnet -> CTA */}
      <section className="relative overflow-hidden bg-chart-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(212,175,55,0.22),transparent_26%),radial-gradient(circle_at_80%_10%,rgba(0,180,168,0.18),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.08)_0_1px,transparent_1px_24px)]"
        />
        <div className="relative mx-auto grid max-w-5xl gap-12 px-4 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24 lg:max-w-6xl">
          <div>
            <p className="inline-flex rounded-full border border-chart-gold/40 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-chart-gold">
              Fractional AI transformation leadership for regulated financial services
            </p>
            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-[4.25rem] lg:leading-[1.02]">
              We unstick stalled AI initiatives in regulated financial firms.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
              Founder Marc Cheatham - former CTO and CISO who has had to solve these
              problems inside regulated financial environments. We bring that operating skill to
              deliver governed, production-ready AI that survives board and audit scrutiny.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={diagnosticRequestHref}
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-chart-gold px-7 py-3 text-base font-semibold text-chart-navy shadow-xl shadow-black/20 transition hover:brightness-95"
              >
                Unlock AI for your Firm
              </a>
              <Link
                href="/why-chart-room"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/35 px-7 py-3 text-base font-semibold text-white transition hover:bg-white hover:text-chart-navy"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-chart-gold/35 bg-white/[0.07] p-5 shadow-2xl shadow-black/25 backdrop-blur">
            <div className="rounded-[1.5rem] border border-chart-gold/25 bg-chart-navy/70 p-3">
              <Image
                src={brandImages.ship}
                alt="Chart Room AI nautical ship and constellation brand artwork"
                width={687}
                height={1024}
                className="h-auto w-full rounded-2xl object-cover"
                priority
              />
              <div className="mt-4 grid gap-3">
                {heroStats.map((item) => (
                  <div key={item} className="rounded-xl border border-white/10 bg-white/10 p-4 text-sm text-white/80">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-chart-navy/10 bg-white">
        <div className="mx-auto grid max-w-5xl gap-4 px-4 py-6 sm:grid-cols-2 lg:max-w-6xl lg:grid-cols-4">
          {proofPoints.map((item) => (
            <div key={item.value} className="rounded-2xl border border-chart-navy/10 bg-chart-surface p-5">
              <p className="text-2xl font-bold tracking-tight text-chart-navy">{item.value}</p>
              <p className="mt-2 text-sm leading-relaxed text-chart-ink/85">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-chart-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-teal">
            The before and after
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-chart-navy md:text-4xl">
            You already know the pain. The work is turning it into governed momentum.
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {beforeAfter.before.map((item) => (
              <article key={item.title} className="rounded-2xl border border-chart-navy/10 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-chart-bronze">
                  Before
                </p>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-chart-navy">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-chart-ink/80">{item.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid gap-8 rounded-3xl border border-chart-gold/35 bg-chart-navy p-6 text-white shadow-xl shadow-chart-navy/10 md:grid-cols-[0.9fr_1.1fr] md:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-gold">
                After
              </p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight">
                Governed agentic AI, modern DevOps, and compliance controls working together.
              </h3>
              <p className="mt-5 leading-relaxed text-white/75">
                We combine battle-tested agentic AI with proper governance, TDD, CI/CD, and your
                existing compliance controls so the capability can survive production reality.
              </p>
            </div>
            <div className="grid gap-3">
              {beforeAfter.after.map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-white/10 p-4 text-white/85">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-teal">
                Measurable outcomes
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-chart-navy md:text-4xl">
                The target is not a better demo. It is throughput you can defend.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-chart-ink">
                The right operating model makes AI useful without turning compliance into the
                enemy of velocity.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {outcomeMetrics.map((item) => (
                <div key={item.title} className="rounded-2xl border border-chart-navy/10 bg-chart-surface p-5">
                  <span className="mb-4 block h-1.5 w-12 rounded-full bg-chart-gold" />
                  <h3 className="text-lg font-bold text-chart-navy">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-chart-ink/75">
                    <span className="font-semibold text-chart-navy">Before:</span> {item.before}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-chart-ink">
                    <span className="font-semibold text-chart-navy">After:</span> {item.after}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-chart-navy/10 bg-chart-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-teal">
              Proof
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-chart-navy md:text-4xl">
              Built in the field, not invented in a workshop.
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {proofStories.map((story) => (
              <article key={story.eyebrow} className="rounded-3xl border border-chart-navy/10 bg-white p-7 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-chart-bronze">
                  {story.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-chart-navy">{story.title}</h3>
                <p className="mt-4 leading-relaxed text-chart-ink/80">{story.body}</p>
                <p className="mt-5 rounded-xl border border-chart-navy/10 bg-chart-surface p-4 text-sm font-semibold leading-relaxed text-chart-ink">
                  Control: {story.control}
                </p>
                <p className="mt-5 rounded-xl border border-chart-gold/35 bg-chart-surface p-4 font-semibold leading-relaxed text-chart-navy">
                  Result: {story.result}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <div className="grid gap-10 md:grid-cols-[0.82fr_1.18fr] md:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-teal">
                Engagement paths
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-chart-navy md:text-4xl">
                Start with the level of intervention your initiative needs.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-chart-ink">
                Each path is designed to create movement without pretending risk, controls, or
                stakeholder alignment are optional.
              </p>
              <a
                href={diagnosticRequestHref}
                className="mt-7 inline-flex min-h-11 items-center justify-center rounded-md bg-chart-navy px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-chart-navy/90"
              >
                Unlock AI for your Firm
              </a>
            </div>
            <div className="grid gap-6">
              {engagementOptions.map((item) => (
                <article key={item.title} className="rounded-2xl border border-chart-navy/10 bg-chart-surface p-6">
                  <h3 className="text-xl font-bold tracking-tight text-chart-navy">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-chart-ink/85">{item.body}</p>
                  <a
                    href={diagnosticRequestHref}
                    className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-chart-teal underline underline-offset-4 transition hover:text-chart-navy"
                  >
                    Unlock AI for your Firm
                  </a>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-8 rounded-3xl border border-chart-gold/35 bg-chart-navy p-6 text-white md:grid-cols-[0.95fr_1.05fr] md:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-gold">
                Why us
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Why not hire internally or call a big consultancy?
              </h2>
            </div>
            <div className="grid gap-3">
              {differentiators.map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-white/10 p-4 leading-relaxed text-white/85">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />

      <a
        href={diagnosticRequestHref}
        className="fixed bottom-4 left-4 right-4 z-40 inline-flex min-h-12 items-center justify-center rounded-full bg-chart-gold px-6 py-3 text-sm font-bold text-chart-navy shadow-2xl shadow-chart-navy/30 transition hover:brightness-95 md:left-auto md:right-6 md:w-auto"
      >
        Unlock AI for your Firm
      </a>
    </>
  );
}
