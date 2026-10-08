import Image from "next/image";
import { telHref } from "@/lib/contact";
import { quoteHref } from "@/lib/routes";
import type { DesignPageProps } from "../../types";
import { ButtonLink, Container, SectionHeading, Stars } from "../components/ui";

export function Home({ config }: DesignPageProps) {
  const { business, hero, services, reviews, serviceArea, contact } = config;
  const call = telHref(contact.phone);

  return (
    <>
      {/* Hero: quote call to action + click-to-call */}
      <section className="bg-primary text-on-primary">
        <Container className="grid items-center gap-10 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-on-primary/75">{business.tagline}</p>
            <h1 className="mt-4 text-balance font-heading text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              {hero.headline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-on-primary/85">{hero.subheadline}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={quoteHref}>{hero.quoteCtaLabel}</ButtonLink>
              <ButtonLink href={call} variant="outline-light">
                Call {contact.phone}
              </ButtonLink>
            </div>
          </div>
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            width={hero.image.width}
            height={hero.image.height}
            className="h-auto w-full rounded-2xl shadow-2xl shadow-black/25"
            priority
          />
        </Container>
      </section>

      {/* Services preview */}
      <section className="py-16 md:py-20">
        <Container>
          <SectionHeading eyebrow="What we do" title="Services" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 4).map((service) => (
              <li key={service.name} className="rounded-xl border border-primary/10 bg-white/60 p-6 shadow-sm">
                <h3 className="font-heading text-xl font-semibold text-primary">{service.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">{service.summary}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink href="/services" variant="outline">
              See all services
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Reviews snippet */}
      {reviews.length > 0 ? (
        <section className="bg-primary/5 py-16 md:py-20">
          <Container>
            <SectionHeading eyebrow="Reviews" title="What customers say" />
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {reviews.slice(0, 3).map((review) => (
                <li key={review.author + review.text} className="flex flex-col rounded-xl bg-surface p-6 shadow-sm">
                  <Stars rating={review.rating} />
                  <blockquote className="mt-3 flex-1 leading-relaxed">“{review.text}”</blockquote>
                  <p className="mt-4 text-sm font-semibold text-primary">
                    {review.author}
                    {review.location ? <span className="font-normal text-foreground/70"> · {review.location}</span> : null}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink href="/reviews" variant="outline">
                Read more reviews
              </ButtonLink>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Service area + closing call to action */}
      <section className="py-16 md:py-20">
        <Container className="grid items-center gap-8 rounded-2xl bg-accent/10 p-8 md:grid-cols-[1fr_auto] md:p-12">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-primary">{serviceArea.summary}</h2>
            <p className="mt-3 text-foreground/80">{serviceArea.places.join(" · ")}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <ButtonLink href={quoteHref}>{hero.quoteCtaLabel}</ButtonLink>
            <ButtonLink href={call} variant="outline">
              Call {contact.phone}
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
