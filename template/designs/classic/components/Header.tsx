import Image from "next/image";
import Link from "next/link";
import { assetUrl } from "@config/assets";
import type { ClientConfig } from "@config/schema";
import { telHref } from "@/lib/contact";
import { quoteHref, sitePages } from "@/lib/routes";
import { ButtonLink, Container } from "./ui";

export function Header({ config }: { config: ClientConfig }) {
  const { business, brand, contact } = config;
  const logo = brand.logo.onLight;
  return (
    <header className="sticky top-0 z-40 border-b border-primary/10 bg-surface/95 backdrop-blur">
      <Container className="flex items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={assetUrl(config.id, logo.file)}
            alt={brand.logo.showName ? brand.logo.alt : business.name}
            width={logo.width}
            height={logo.height}
            className="h-10 w-auto"
            priority
          />
          {brand.logo.showName ? (
            <span className="font-heading text-lg font-semibold leading-tight text-primary md:text-xl">{business.name}</span>
          ) : null}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {sitePages.slice(1).map((page) => (
            <Link key={page.href} href={page.href} className="text-sm font-medium text-foreground/80 hover:text-primary">
              {page.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref(contact.phone)}
            aria-label={`Call ${contact.phone}`}
            className="inline-flex min-h-10 items-center rounded-md bg-primary px-3 text-sm font-semibold text-on-primary sm:bg-transparent sm:px-0 sm:text-primary sm:hover:underline"
          >
            <span className="sm:hidden">Call</span>
            <span className="hidden sm:inline">{contact.phone}</span>
          </a>
          <div className="hidden md:block">
            <ButtonLink href={quoteHref} className="min-h-10 px-4 py-2 text-sm">
              {config.hero.quoteCtaLabel}
            </ButtonLink>
          </div>
          <details className="relative lg:hidden">
            <summary className="flex min-h-10 cursor-pointer list-none items-center rounded-md border border-primary/20 px-3 text-sm font-semibold text-primary [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <nav aria-label="Mobile" className="absolute right-0 mt-2 grid w-56 gap-1 rounded-lg border border-primary/10 bg-surface p-2 shadow-xl">
              {sitePages.map((page) => (
                <Link key={page.href} href={page.href} className="rounded px-3 py-2 text-sm font-medium hover:bg-primary/5">
                  {page.label}
                </Link>
              ))}
              <a href={telHref(contact.phone)} className="rounded px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/5">
                Call {contact.phone}
              </a>
            </nav>
          </details>
        </div>
      </Container>
    </header>
  );
}
