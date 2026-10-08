import { formatAddress, telHref } from "@/lib/contact";
import { UiIcon } from "@/lib/icons";
import type { DesignPageProps } from "../../types";
import { QuoteForm } from "../components/QuoteForm";
import { ButtonLink, Container, PageHeader } from "../components/ui";

/** Contact details from config plus the quote form (#quote). */
export function Contact({ config }: DesignPageProps) {
  const { contact, serviceArea, hero, brand } = config;
  const iconStyle = brand.iconStyle;
  return (
    <>
      <PageHeader title="Contact" intro={serviceArea.summary} />
      <Container className="grid gap-10 py-14 md:grid-cols-[2fr_3fr]">
        <div className="space-y-5">
          <ButtonLink href={telHref(contact.phone)}>
            <UiIcon name="phone" iconStyle={iconStyle} />
            Call {contact.phone}
          </ButtonLink>
          <p className="flex items-center gap-2">
            <UiIcon name="envelope" iconStyle={iconStyle} className="text-primary" />
            <a href={`mailto:${contact.email}`} className="font-semibold text-primary hover:underline">
              {contact.email}
            </a>
          </p>
          <div className="flex gap-2">
            <UiIcon name="map-pin" iconStyle={iconStyle} className="mt-0.5 shrink-0 text-primary" />
            <address className="not-italic">
              {formatAddress(contact.address).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
          {contact.hours.length > 0 ? (
            <div className="flex gap-2 text-sm text-muted">
              <UiIcon name="clock" iconStyle={iconStyle} className="mt-0.5 shrink-0 text-primary" />
              <ul>
                {contact.hours.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <p className="text-sm text-muted">Service area: {serviceArea.places.join(", ")}</p>
        </div>
        <section id="quote" className="scroll-mt-28 rounded-xl border border-border bg-white/60 p-6 shadow-sm md:p-8">
          <h2 className="font-heading text-2xl font-semibold text-primary">{hero.quoteCtaLabel}</h2>
          <p className="mt-2 mb-6 text-muted">Tell us about the job and we&apos;ll get back to you.</p>
          <QuoteForm config={config} />
        </section>
      </Container>
    </>
  );
}
