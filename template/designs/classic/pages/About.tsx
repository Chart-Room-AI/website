import { formatAddress, telHref } from "@/lib/contact";
import { UiIcon } from "@/lib/icons";
import { quoteHref } from "@/lib/routes";
import type { DesignPageProps } from "../../types";
import { ButtonLink, Container, PageHeader, Photo, SectionHeading } from "../components/ui";

/** The business story (config.about), highlights, service area, hours and contact. */
export function About({ config }: DesignPageProps) {
  const { about, business, brand, serviceArea, contact, hero } = config;
  const iconStyle = brand.iconStyle;
  return (
    <>
      <PageHeader title={about.heading} intro={business.tagline} />

      <Container className={`grid gap-10 py-14 md:py-20 ${about.image ? "md:grid-cols-2 md:items-start" : ""}`}>
        <div className="max-w-3xl space-y-5 text-lg leading-relaxed">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        {about.image ? (
          <Photo
            config={config}
            image={about.image}
            ratio={brand.imageDirection.aspectRatios.hero}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        ) : null}
      </Container>

      {about.highlights.length > 0 ? (
        <section className="bg-primary/5 py-14 md:py-20">
          <Container>
            <SectionHeading title="At a glance" />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {about.highlights.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl bg-surface p-5 font-semibold text-primary-ink shadow-sm">
                  <UiIcon name="check-circle" iconStyle={iconStyle} size={24} className="shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <section className="py-14 md:py-20">
        <Container className="grid gap-10 md:grid-cols-2">
          <div>
            <SectionHeading title="Where we work">{serviceArea.summary}</SectionHeading>
            <ul className="mt-6 flex flex-wrap gap-2">
              {serviceArea.places.map((place) => (
                <li key={place} className="rounded-full border border-on-secondary/15 bg-secondary px-4 py-2 text-sm font-semibold text-on-secondary">
                  {place}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
            <h2 className="font-heading text-2xl font-semibold text-primary">Get in touch</h2>
            <ul className="mt-5 space-y-4">
              <li className="flex gap-3">
                <UiIcon name="phone" iconStyle={iconStyle} className="mt-0.5 shrink-0 text-primary-ink" />
                <a href={telHref(contact.phone)} className="font-semibold text-primary-ink underline-offset-4 hover:underline">
                  {contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <UiIcon name="envelope" iconStyle={iconStyle} className="mt-0.5 shrink-0 text-primary-ink" />
                <a href={`mailto:${contact.email}`} className="font-semibold text-primary-ink underline-offset-4 hover:underline">
                  {contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <UiIcon name="map-pin" iconStyle={iconStyle} className="mt-0.5 shrink-0 text-primary-ink" />
                <address className="not-italic">
                  {formatAddress(contact.address).map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
              {contact.hours.length > 0 ? (
                <li className="flex gap-3">
                  <UiIcon name="clock" iconStyle={iconStyle} className="mt-0.5 shrink-0 text-primary-ink" />
                  <ul className="text-muted">
                    {contact.hours.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </li>
              ) : null}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={quoteHref}>{hero.quoteCtaLabel}</ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
