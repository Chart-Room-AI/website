import { formatAddress, telHref } from "@/lib/contact";
import type { DesignPageProps } from "../../types";
import { ButtonLink, Container, PageHeader } from "../components/ui";

/**
 * Stub (first slice of #21): contact details from config. The quote form
 * (Turnstile + honeypot, m365/gmail delivery) is a later slice; #quote is the
 * anchor the quote buttons already point to.
 */
export function Contact({ config }: DesignPageProps) {
  const { contact, serviceArea, hero } = config;
  return (
    <>
      <PageHeader title="Contact" intro={serviceArea.summary} />
      <Container className="grid gap-10 py-14 md:grid-cols-2">
        <div className="space-y-4">
          <ButtonLink href={telHref(contact.phone)}>Call {contact.phone}</ButtonLink>
          <p>
            <a href={`mailto:${contact.email}`} className="font-semibold text-primary hover:underline">
              {contact.email}
            </a>
          </p>
          <address className="not-italic">
            {formatAddress(contact.address).map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
          {contact.hours.length > 0 ? (
            <ul className="text-sm text-foreground/80">
              {contact.hours.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
          <p className="text-sm text-foreground/80">Service area: {serviceArea.places.join(", ")}</p>
        </div>
        <section id="quote" className="scroll-mt-28 rounded-xl border-2 border-dashed border-primary/25 p-8">
          <h2 className="font-heading text-2xl font-semibold text-primary">{hero.quoteCtaLabel}</h2>
          <p className="mt-3 text-foreground/80">
            The quote form arrives in a later template slice. Until then, call or email us.
          </p>
        </section>
      </Container>
    </>
  );
}
