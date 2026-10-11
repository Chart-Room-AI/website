import type { Metadata } from "next";
import { BosunContactForm } from "@/components/bosun/BosunContactForm";
import { BosunLockup } from "@/components/bosun/BosunLockup";
import { bosunConfig } from "@/lib/bosun-config";
import {
  bosunCapabilities,
  bosunCta,
  bosunDay,
  bosunFaq,
  bosunHero,
  bosunInCharge,
  bosunOnePager,
  bosunPlanNotes,
  bosunPlans,
  bosunPlansAnchor,
  bosunPricingCta,
  bosunProblem,
  bosunSteps,
  bosunTrustBar,
  bosunWebsite,
  bosunWhatABosunIs,
} from "@/lib/bosun-content";
import { siteConfig } from "@/lib/site-config";

const description =
  "Bosun by Chart Room AI, a Chart Room AI service: an office teammate for small trade and service businesses that keeps the inbox tidy, the calendar straight, and the bills tracked, plus a simple website.";

export const metadata: Metadata = {
  title: {
    absolute: "Bosun by Chart Room AI | Office help for trade businesses",
  },
  description,
  alternates: {
    canonical: bosunConfig.path,
  },
  openGraph: {
    title: "Bosun by Chart Room AI | Office help for trade businesses",
    description,
    url: `${siteConfig.url}${bosunConfig.path}`,
    siteName: siteConfig.name,
    type: "website",
  },
};

const eyebrowOnLight =
  "text-sm font-semibold uppercase tracking-[0.22em] text-bosun-deep-brass";
const headingOnLight =
  "mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-chart-navy md:text-4xl";

export default function BosunPage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-[linear-gradient(160deg,var(--chart-navy)_55%,var(--bosun-harbor))] text-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]"
        />
        <div className="relative mx-auto grid max-w-5xl gap-12 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-24 lg:max-w-6xl">
          <div>
            <p className="inline-flex rounded-full border border-bosun-rope/40 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-bosun-rope">
              {bosunHero.eyebrow}
            </p>
            <div className="mt-6">
              <BosunLockup size="hero" />
              <p className="mt-2 text-sm text-white/70">{bosunConfig.displayAddress}</p>
            </div>
            <h1 className="mt-8 text-balance font-display text-4xl font-semibold tracking-tight md:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              {bosunHero.headlineLead}{" "}
              <span className="text-chart-gold">{bosunHero.headlineHighlight}</span>{" "}
              {bosunHero.headlineTail}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl">
              {bosunHero.subheadline}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#get-started"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-bosun-brass px-7 py-3 text-base font-semibold text-chart-navy shadow-xl shadow-black/20 transition hover:brightness-105"
              >
                {bosunHero.primaryCta}
              </a>
              <a
                href="#plans"
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/35 px-7 py-3 text-base font-semibold text-white transition hover:bg-white hover:text-chart-navy"
              >
                {bosunHero.secondaryCta}
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-bosun-rope/25 bg-white/[0.07] p-5 shadow-2xl shadow-black/25 backdrop-blur">
            <div className="rounded-[1.5rem] border border-bosun-rope/20 bg-chart-navy/70 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bosun-rope">
                What a bosun is
              </p>
              <p className="mt-4 text-lg leading-relaxed text-white/90">
                {bosunWhatABosunIs}
              </p>
              {/* 2. Trust bar */}
              <ul className="mt-6 grid gap-3" aria-label="Why owners trust Bosun">
                {bosunTrustBar.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 rounded-xl border border-white/10 bg-white/10 p-4 text-sm text-white/85"
                  >
                    <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-bosun-brass" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div aria-hidden className="relative h-1.5 bg-[linear-gradient(90deg,var(--bosun-brass)_0_72%,var(--chart-teal)_72%_100%)]" />
      </section>

      {/* 3. The problem */}
      <section id="problem" className="scroll-mt-28 border-b border-chart-navy/10">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <p className={eyebrowOnLight}>The problem</p>
          <h2 className={headingOnLight}>{bosunProblem.title}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-chart-ink/85">
            {bosunProblem.body}
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {bosunProblem.cards.map((card) => (
              <article
                key={card.title}
                className="rounded-2xl border border-chart-navy/10 bg-white p-6 shadow-sm"
              >
                <span aria-hidden className="mb-4 block h-1.5 w-12 rounded-full bg-bosun-brass" />
                <h3 className="text-xl font-bold tracking-tight text-chart-navy">{card.title}</h3>
                <p className="mt-3 leading-relaxed text-chart-ink/80">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. A day with Bosun */}
      <section id="day" className="scroll-mt-28 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <p className={eyebrowOnLight}>{bosunDay.example}</p>
          <h2 className={headingOnLight}>{bosunDay.title}</h2>
          <ol className="mt-10 grid overflow-hidden rounded-2xl border border-chart-navy/10 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
            {bosunDay.slots.map((slot, index) => {
              const isLast = index === bosunDay.slots.length - 1;
              return (
                <li
                  key={slot.time}
                  className={
                    isLast
                      ? "bg-chart-navy p-6 text-white"
                      : "border-b border-dashed border-chart-navy/15 bg-bosun-sailcloth p-6 sm:border-r lg:border-b-0"
                  }
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.18em] ${isLast ? "text-bosun-rope" : "text-bosun-deep-brass"}`}
                  >
                    {slot.when}
                  </p>
                  <p
                    className={`mt-1 font-display text-2xl font-semibold ${isLast ? "text-chart-gold" : "text-chart-navy"}`}
                  >
                    {slot.time}
                  </p>
                  <p
                    className={`mt-3 text-sm leading-relaxed ${isLast ? "text-white/85" : "text-chart-ink/85"}`}
                  >
                    {slot.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* 5. What it does */}
      <section id="what-it-does" className="scroll-mt-28 border-y border-chart-navy/10">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <p className={eyebrowOnLight}>What it does</p>
          <h2 className={headingOnLight}>{bosunCapabilities.title}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {bosunCapabilities.tiles.map((tile) => (
              <article
                key={tile.title}
                className="rounded-2xl border border-chart-navy/10 border-t-4 border-t-bosun-brass bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-chart-navy">{tile.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-chart-ink/80">{tile.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Websites */}
      <section id="websites" className="scroll-mt-28 bg-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center lg:max-w-6xl">
          <div>
            <p className={eyebrowOnLight}>Websites</p>
            <h2 className={headingOnLight}>{bosunWebsite.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-chart-ink/85">{bosunWebsite.body}</p>
            <ul className="mt-6 space-y-3 text-chart-ink/85">
              {bosunWebsite.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-bosun-brass" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-chart-navy p-8 text-white shadow-xl shadow-chart-navy/15">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bosun-rope">
              Simple website
            </p>
            <p className="mt-3 font-display text-3xl font-semibold">{bosunWebsite.priceAnchor}</p>
            <p className="mt-2 text-white/75">{bosunWebsite.pricingNote}</p>
            <a
              href="#get-started"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-bosun-brass px-5 py-3 text-sm font-semibold text-chart-navy transition hover:brightness-105"
            >
              Ask about a website
            </a>
          </div>
        </div>
      </section>

      {/* 7. How it works */}
      <section id="how-it-works" className="scroll-mt-28 border-y border-chart-navy/10">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <p className={eyebrowOnLight}>How it works</p>
          <h2 className={headingOnLight}>Set up, train, and we stay with you.</h2>
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {bosunSteps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-2xl border border-chart-navy/10 bg-white p-6 shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-navy font-display text-lg font-semibold text-bosun-rope">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-bold text-chart-navy">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-chart-ink/80">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. Plans */}
      <section id="plans" className="scroll-mt-28 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl">
          <p className={eyebrowOnLight}>Plans</p>
          <h2 className={headingOnLight}>Support plans</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-chart-ink/85">
            Every plan keeps Bosun checked up and your website looked after. Pick the level of
            help that fits your business.
          </p>
          <p className="mt-4 inline-flex rounded-full border border-bosun-brass/50 bg-bosun-sailcloth px-4 py-2 font-display text-lg font-semibold text-chart-navy">
            {bosunPlansAnchor}
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {bosunPlans.map((plan) => (
              <article
                key={plan.name}
                className={
                  plan.recommended
                    ? "relative flex flex-col rounded-2xl border-2 border-bosun-brass bg-white p-6 shadow-xl shadow-chart-navy/10"
                    : "flex flex-col rounded-2xl border border-chart-navy/10 bg-bosun-sailcloth p-6 shadow-sm"
                }
              >
                {plan.recommended ? (
                  <p className="absolute -top-3 left-6 rounded-full bg-chart-navy px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-bosun-rope">
                    Recommended
                  </p>
                ) : null}
                <h3 className="font-display text-2xl font-semibold text-chart-navy">{plan.name}</h3>
                <p className="mt-3 text-sm font-semibold text-bosun-deep-brass">
                  {plan.priceAnchor ?? bosunPricingCta.label}
                </p>
                <dl className="mt-6 grid gap-3 border-t border-chart-navy/10 pt-5 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-chart-ink/70">Included help</dt>
                    <dd className="text-right font-semibold text-chart-navy">{plan.includedHelp}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-chart-ink/70">Response</dt>
                    <dd className="text-right font-semibold text-chart-navy">{plan.response}</dd>
                  </div>
                </dl>
                <ul className="mt-6 flex-1 space-y-2 border-t border-chart-navy/10 pt-5 text-sm text-chart-ink/85">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bosun-deep-brass" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#get-started"
                  className={
                    plan.recommended
                      ? "mt-6 inline-flex min-h-11 items-center justify-center rounded-md bg-bosun-brass px-5 py-3 text-sm font-semibold text-chart-navy transition hover:brightness-105"
                      : "mt-6 inline-flex min-h-11 items-center justify-center rounded-md border-2 border-chart-navy/80 px-5 py-3 text-sm font-semibold text-chart-navy transition hover:bg-chart-navy hover:text-white"
                  }
                >
                  {bosunPricingCta.button}
                </a>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-6 rounded-2xl bg-chart-navy p-6 text-white shadow-xl shadow-chart-navy/15 md:flex-row md:items-center md:justify-between md:p-8">
            <div>
              <p className="font-display text-2xl font-semibold">{bosunPricingCta.label}</p>
              <p className="mt-2 max-w-2xl text-white/80">{bosunPricingCta.body}</p>
              {bosunPlanNotes.map((note) => (
                <p key={note} className="mt-3 text-sm text-bosun-rope">
                  {note}
                </p>
              ))}
            </div>
            <a
              href="#get-started"
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md bg-bosun-brass px-7 py-3 text-base font-semibold text-chart-navy shadow-xl shadow-black/20 transition hover:brightness-105"
            >
              {bosunPricingCta.button}
            </a>
          </div>
        </div>
      </section>

      {/* 9. You stay in charge */}
      <section id="in-charge" className="relative scroll-mt-28 overflow-hidden bg-chart-navy text-white">
        <div className="mx-auto max-w-5xl px-4 py-16 lg:max-w-6xl lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-bosun-rope">
            Peace of mind
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {bosunInCharge.title}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {bosunInCharge.points.map((point) => (
              <article
                key={point.title}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-6"
              >
                <span aria-hidden className="mb-4 block h-1.5 w-12 rounded-full bg-bosun-brass" />
                <h3 className="text-lg font-bold text-white">{point.title}</h3>
                <p className="mt-3 leading-relaxed text-white/80">{point.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section id="faq" className="scroll-mt-28">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <p className={eyebrowOnLight}>FAQ</p>
          <h2 className={headingOnLight}>Common questions</h2>
          <div className="mt-8 divide-y divide-chart-navy/10 rounded-2xl border border-chart-navy/10 bg-white">
            {bosunFaq.map((item) => (
              <details key={item.question} className="group p-5">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-chart-navy [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <span
                    aria-hidden
                    className="text-xl text-bosun-deep-brass transition group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed text-chart-ink/85">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Final CTA */}
      <section id="get-started" className="scroll-mt-28 border-t border-chart-navy/10 bg-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 py-16 md:grid-cols-[0.95fr_1.05fr] md:items-start lg:max-w-6xl">
          <div>
            <p className={eyebrowOnLight}>Get started</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-chart-navy md:text-4xl">
              {bosunCta.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-chart-ink/85">{bosunCta.body}</p>
            <p className="mt-8 text-sm text-chart-ink/70">
              Prefer email?{" "}
              <a
                href={`mailto:${bosunConfig.contactEmail}?subject=${encodeURIComponent(bosunConfig.contactMailSubject)}`}
                className="font-semibold text-bosun-deep-brass underline underline-offset-4 hover:text-chart-navy"
              >
                {bosunConfig.contactEmail}
              </a>
            </p>
            <p className="mt-3 text-sm text-chart-ink/70">
              <a
                href={bosunOnePager.href}
                download
                className="inline-flex min-h-11 items-center gap-2 rounded-md font-semibold text-chart-navy underline decoration-bosun-brass decoration-2 underline-offset-4 hover:text-bosun-deep-brass"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-4 w-4 shrink-0 fill-none stroke-bosun-deep-brass stroke-2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v12M7 10l5 5 5-5M5 21h14" />
                </svg>
                <span>
                  {bosunOnePager.label}{" "}
                  <span className="font-normal text-chart-ink/70">{bosunOnePager.meta}</span>
                </span>
              </a>
            </p>
          </div>
          <BosunContactForm />
        </div>
      </section>
    </>
  );
}
