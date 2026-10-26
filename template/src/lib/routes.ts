import type { ClientConfig } from "@config/schema";

/** Template-wide page set. Labels are generic UI, not client copy. */
export const sitePages = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const quoteHref = "/contact#quote";

/** Pages shown in navigation. Reviews is left out when the client has none (we never write reviews). */
export function navPages(config: Pick<ClientConfig, "reviews">) {
  return sitePages.filter((page) => page.href !== "/reviews" || config.reviews.length > 0);
}
