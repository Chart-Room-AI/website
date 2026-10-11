import Image from "next/image";
import Link from "next/link";
import { CareHelmDemoForm } from "@/components/care-helm/CareHelmDemoForm";
import { careHelmConfig } from "@/lib/care-helm-config";
import { siteConfig } from "@/lib/site-config";
import {
  careHelmApproach,
  careHelmAudiences,
  careHelmBenefits,
  careHelmChallenge,
  careHelmDemo,
  careHelmHero,
  careHelmTrust,
  careHelmTrustBar,
} from "@/lib/care-helm-content";
import { brandImages } from "@/lib/site-content";

export const metadata = {
  title: "The Care Helm | Connected Care Guidance for Families and Care Organizations",
  description:
    "Clear, shift-aware care guidance at the bedside — with a secure portal for families and care organizations to author and publish updates from anywhere.",
  alternates: {
    canonical: "/care-helm",
  },
  openGraph: {
    title: "The Care Helm | Connected Care Guidance",
    description:
      "Consistent care for rotating caregivers. Peace of mind for families. Offline-first reliability at the point of care.",
    url: `${siteConfig.url}/care-helm`,
    type: "website",
  },
};

export default function CareHelmPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-chart-navy text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(0,180,168,0.2),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(212,175,55,0.18),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04)_0_1px,transparent_1px_32px)]"
        />
        <div className="relative mx-auto grid max-w-5xl gap-12 px-4 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-24 lg:max-w-6xl">
          <div>
            <p className="inline-flex rounded-full border border-chart-teal/40 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-chart-teal">
              {careHelmHero.eyebrow}
            </p>
            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              {careHelmHero.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
              {careHelmHero.subheadline}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#demo"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-chart-teal px-7 py-3 text-base font-semibold text-chart-navy shadow-xl shadow-black/20 transition hover:brightness-95"
              >
                {careHelmHero.primaryCta}
              </a>
              <a
                href="#approach"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/35 px-7 py-3 text-base font-semibold text-white transition hover:bg-white hover:text-chart-navy"
              >
                {careHelmHero.secondaryCta}
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-chart-teal/30 bg-white/[0.07] p-5 shadow-2xl shadow-black/25 backdrop-blur">
            <div className="rounded-[1.5rem] border border-chart-teal/20 bg-chart-navy/70 p-3">
              <Image
                src={brandImages.shipsWheelCompass}
                alt="Abstract helm and compass brand artwork suggesting calm navigation"
                width={800}
                height={800}
                className="h-auto w-full rounded-2xl object-cover opacity-90"
                priority
              />
              <div className="mt-4 grid gap-3">
                {careHelmTrustBar.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/10 p-4 text-sm text-white/85"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="challenge" className="scroll-mt-28 border-b border-chart-navy/10 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-teal">
            The challenge
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-chart-navy md:text-4xl">
            {careHelmChallenge.title}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-chart-ink/85">
            {careHelmChallenge.body}
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {careHelmChallenge.cards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-chart-navy/10 bg-chart-surface p-6 shadow-sm"
              >
                <h3 className="text-xl font-bold tracking-tight text-chart-navy">{card.title}</h3>
                <p className="mt-3 leading-relaxed text-chart-ink/80">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="approach" className="scroll-mt-28 bg-chart-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-teal">
                Our approach
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-chart-navy md:text-4xl">
                {careHelmApproach.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-chart-ink/85">
                {careHelmApproach.body}
              </p>
            </div>
            <div className="grid gap-4">
              {careHelmApproach.pillars.map((pillar) => (
                <article
                  key={pillar.title}
                  className="rounded-2xl border border-chart-navy/10 bg-white p-6 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-chart-navy">{pillar.title}</h3>
                  <p className="mt-3 leading-relaxed text-chart-ink/80">{pillar.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="audiences" className="scroll-mt-28 border-y border-chart-navy/10 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-teal">
            Who we serve
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-chart-navy md:text-4xl">
            Built for the people who coordinate care — and the people who deliver it.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {careHelmAudiences.map((audience) => (
              <article
                key={audience.title}
                className="rounded-2xl border border-chart-navy/10 bg-chart-surface p-6"
              >
                <h3 className="text-xl font-bold tracking-tight text-chart-navy">
                  {audience.title}
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-chart-ink/85">
                  {audience.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-chart-teal" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="benefits" className="scroll-mt-28 bg-chart-surface">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-teal">
            Benefits
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-chart-navy md:text-4xl">
            Outcomes that matter to families and care leaders.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {careHelmBenefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-2xl border border-chart-navy/10 bg-white p-6 shadow-sm"
              >
                <span className="mb-4 block h-1.5 w-12 rounded-full bg-chart-gold" />
                <h3 className="text-lg font-bold text-chart-navy">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-chart-ink/80">{benefit.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="trust"
        className="relative scroll-mt-28 overflow-hidden border-y border-chart-gold/30 bg-chart-navy text-white"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,180,168,0.12),transparent_40%)]"
        />
        <div className="relative mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-gold">
            Why Chart Room AI
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight md:text-4xl">
            {careHelmTrust.title}
          </h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/75">
            {careHelmTrust.body}
          </p>
          <figure className="mt-8 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.06] p-6 md:p-7">
            <blockquote className="border-l-4 border-chart-teal pl-5 text-base leading-relaxed text-white/85 md:text-lg">
              {careHelmTrust.callout}
            </blockquote>
          </figure>
          <Link
            href={careHelmConfig.parentSiteUrl}
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-md border border-white/20 px-5 text-sm font-semibold text-white transition hover:border-chart-teal hover:bg-white/5"
          >
            {careHelmTrust.linkLabel}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      <section id="demo" className="scroll-mt-28 bg-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-[0.95fr_1.05fr] md:items-start lg:max-w-6xl">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-chart-teal">
              Request a demo
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-chart-navy md:text-4xl">
              {careHelmDemo.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-chart-ink/85">{careHelmDemo.body}</p>
            <p className="mt-4 text-sm font-medium text-chart-ink/70">{careHelmDemo.note}</p>
            <p className="mt-8 text-sm text-chart-ink/70">
              Prefer email?{" "}
              <a
                href={`mailto:${careHelmConfig.contactEmail}?subject=${encodeURIComponent(careHelmConfig.demoMailSubject)}`}
                className="font-semibold text-chart-teal underline underline-offset-4 hover:text-chart-navy"
              >
                {careHelmConfig.contactEmail}
              </a>
            </p>
          </div>
          <CareHelmDemoForm />
        </div>
      </section>

    </>
  );
}
