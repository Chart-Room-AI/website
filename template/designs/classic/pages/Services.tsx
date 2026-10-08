import Link from "next/link";
import { iconTileClass, ServiceIcon, UiIcon } from "@/lib/icons";
import { quoteHref } from "@/lib/routes";
import type { DesignPageProps } from "../../types";
import { Container, CtaBand, PageHeader, slugify } from "../components/ui";

/** Every service from config.services, with an in-page jump list and a quote link per service. */
export function Services({ config }: DesignPageProps) {
  const { services, brand, serviceArea } = config;
  const iconStyle = brand.iconStyle;
  return (
    <>
      <PageHeader title="Services" intro={serviceArea.summary} />

      {services.length > 1 ? (
        <nav aria-label="Services on this page" className="border-b border-border">
          <Container className="py-4">
            <ul className="flex flex-wrap gap-2">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={`#${slugify(service.name)}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-primary/25 px-4 text-sm font-semibold text-primary transition hover:bg-primary/5"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      ) : null}

      <Container className="pt-14 md:pt-20">
        <ul className="grid gap-6">
          {services.map((service) => {
            const id = slugify(service.name);
            return (
              <li key={service.name}>
                <article
                  id={id}
                  aria-labelledby={`${id}-title`}
                  className="grid scroll-mt-28 gap-6 rounded-2xl border border-border bg-white/60 p-6 shadow-sm md:grid-cols-[auto_1fr_1fr] md:p-8"
                >
                  {service.icon ? (
                    <span
                      className={`inline-flex h-14 w-14 items-center justify-center bg-primary/10 text-primary ${iconTileClass(iconStyle)}`}
                    >
                      <ServiceIcon name={service.icon} iconStyle={iconStyle} size={32} />
                    </span>
                  ) : (
                    <span className="hidden md:block md:w-14" aria-hidden />
                  )}
                  <div>
                    <h2 id={`${id}-title`} className="font-heading text-2xl font-semibold text-primary md:text-3xl">
                      {service.name}
                    </h2>
                    <p className="mt-3 text-lg leading-relaxed text-foreground/80">{service.summary}</p>
                    <Link
                      href={quoteHref}
                      className="mt-5 inline-flex min-h-11 items-center gap-1 font-semibold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
                    >
                      Ask about {service.name.toLowerCase()}
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                  {service.details.length > 0 ? (
                    <div className="md:border-l md:border-border md:pl-6">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">What&apos;s included</h3>
                      <ul className="mt-3 space-y-2">
                        {service.details.map((detail) => (
                          <li key={detail} className="flex gap-2">
                            <UiIcon name="check-circle" iconStyle={iconStyle} className="mt-0.5 shrink-0 text-primary" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ul>
      </Container>

      <CtaBand config={config} />
    </>
  );
}
