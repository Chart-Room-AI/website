import { telHref } from "@/lib/contact";
import { UiIcon } from "@/lib/icons";
import { quoteHref } from "@/lib/routes";
import type { DesignPageProps } from "../../types";
import { ButtonLink, Container } from "../components/ui";

/** After a successful (or silently filtered) quote submission. */
export function ThankYou({ config }: DesignPageProps) {
  const { contact, brand } = config;
  return (
    <Container className="max-w-2xl py-20 text-center">
      <UiIcon name="check-circle" iconStyle={brand.iconStyle} size={56} className="mx-auto text-success" />
      <h1 className="mt-6 font-heading text-4xl font-semibold text-primary">Thanks. We got your request.</h1>
      <p className="mt-4 text-lg text-muted">
        We&apos;ll get back to you soon. If it&apos;s urgent, call us at{" "}
        <a href={telHref(contact.phone)} className="font-semibold text-primary underline-offset-4 hover:underline">
          {contact.phone}
        </a>
        .
      </p>
      <div className="mt-8 flex justify-center">
        <ButtonLink href="/" variant="outline">
          Back to home
        </ButtonLink>
      </div>
    </Container>
  );
}

/** When the form couldn't send. "Try again" goes back to the quote form. */
export function QuoteError({ config }: DesignPageProps) {
  const { contact, brand } = config;
  return (
    <Container className="max-w-2xl py-20 text-center">
      <UiIcon name="warning-circle" iconStyle={brand.iconStyle} size={56} className="mx-auto text-danger" />
      <h1 className="mt-6 font-heading text-4xl font-semibold text-primary">Your request didn&apos;t go through.</h1>
      <p className="mt-4 text-lg text-muted">
        Sorry about that. Please try the form again, or reach us directly by phone or email.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonLink href={quoteHref}>Try the form again</ButtonLink>
        <ButtonLink href={telHref(contact.phone)} variant="outline">
          Call {contact.phone}
        </ButtonLink>
        <ButtonLink href={`mailto:${contact.email}`} variant="outline">
          Email {contact.email}
        </ButtonLink>
      </div>
    </Container>
  );
}
