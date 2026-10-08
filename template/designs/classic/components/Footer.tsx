import Image from "next/image";
import Link from "next/link";
import { assetUrl } from "@config/assets";
import type { ClientConfig } from "@config/schema";
import { formatAddress, telHref } from "@/lib/contact";
import { sitePages } from "@/lib/routes";
import { Container } from "./ui";

const socialLabels: Record<ClientConfig["social"][number]["platform"], string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  google: "Google",
  nextdoor: "Nextdoor",
  yelp: "Yelp",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  x: "X",
};

export function Footer({ config }: { config: ClientConfig }) {
  const { business, brand, contact, serviceArea, social } = config;
  const darkLogo = brand.logo.onDark;
  return (
    <footer className="mt-auto bg-primary text-on-primary">
      <Container className="grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          {darkLogo ? (
            <Image
              src={assetUrl(config.id, darkLogo.file)}
              alt=""
              width={darkLogo.width}
              height={darkLogo.height}
              className="mb-3 h-10 w-auto"
            />
          ) : null}
          <p className="font-heading text-xl font-semibold">{business.name}</p>
          <p className="mt-2 text-sm text-on-primary/75">{business.tagline}</p>
          {social.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-3 text-sm">
              {social.map((link) => (
                <li key={link.url}>
                  <a href={link.url} className="underline-offset-4 hover:underline" rel="noopener noreferrer" target="_blank">
                    {socialLabels[link.platform]}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-on-primary/70">Contact</h2>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={telHref(contact.phone)} className="font-semibold hover:underline">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="hover:underline">
                {contact.email}
              </a>
            </li>
            <li>
              <address className="not-italic text-on-primary/80">
                {formatAddress(contact.address).map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </li>
          </ul>
          {contact.hours.length > 0 ? (
            <ul className="mt-3 space-y-1 text-sm text-on-primary/80">
              {contact.hours.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-on-primary/70">Service area</h2>
          <p className="mt-3 text-sm text-on-primary/80">{serviceArea.summary}</p>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm">
            {serviceArea.places.map((place) => (
              <li key={place} className="rounded-full border border-on-primary/25 px-3 py-1">
                {place}
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-on-primary/70">Pages</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {sitePages.map((page) => (
              <li key={page.href}>
                <Link href={page.href} className="hover:underline">
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <div className="border-t border-on-primary/15">
        <Container className="py-5 text-xs text-on-primary/70">
          © {new Date().getFullYear()} {business.name}
        </Container>
      </div>
    </footer>
  );
}
