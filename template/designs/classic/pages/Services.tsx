import { iconTileClass, ServiceIcon } from "@/lib/icons";
import { quoteHref } from "@/lib/routes";
import type { DesignPageProps } from "../../types";
import { ButtonLink, Container, PageHeader } from "../components/ui";

/** Stub (first slice of #21): lists config.services; final layout comes later. */
export function Services({ config }: DesignPageProps) {
  return (
    <>
      <PageHeader title="Services" intro={config.business.tagline} />
      <Container className="py-14">
        <ul className="grid gap-6 md:grid-cols-2">
          {config.services.map((service) => (
            <li key={service.name} className="rounded-xl border border-border bg-white/60 p-6">
              {service.icon ? (
                <span className={`mb-4 inline-flex h-12 w-12 items-center justify-center bg-primary/10 text-primary ${iconTileClass(config.brand.iconStyle)}`}>
                  <ServiceIcon name={service.icon} iconStyle={config.brand.iconStyle} />
                </span>
              ) : null}
              <h2 className="font-heading text-2xl font-semibold text-primary">{service.name}</h2>
              <p className="mt-2 text-foreground/80">{service.summary}</p>
              {service.details.length > 0 ? (
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">
                  {service.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
        <ButtonLink href={quoteHref} className="mt-10">
          {config.hero.quoteCtaLabel}
        </ButtonLink>
      </Container>
    </>
  );
}
