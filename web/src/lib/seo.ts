import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const siteTitle = "Chart Room AI | Fractional AI Leadership for Regulated Financial Firms";

export const seoDescription =
  "Operator-led AI transformation for regulated financial firms that need governed, production-ready AI, DevOps modernization, and board-ready momentum.";

/**
 * Site-wide Open Graph defaults. Next.js merges metadata shallowly, so a page that sets
 * `openGraph` replaces the root's object entirely; spread this in and add the page's own `url`.
 * It deliberately has no `url`, so no page inherits the homepage as its og:url.
 */
export const siteOpenGraph = {
  title: siteTitle,
  description: seoDescription,
  siteName: siteConfig.name,
  locale: "en_US",
  type: "website",
} satisfies NonNullable<Metadata["openGraph"]>;

/**
 * Canonical URL and og:url for an indexable page. `path` is relative (e.g. "/about") and
 * resolves against `metadataBase` in the root layout.
 */
export function pageUrlMetadata(path: string): Pick<Metadata, "alternates" | "openGraph"> {
  return {
    alternates: { canonical: path },
    openGraph: { ...siteOpenGraph, url: path },
  };
}

/** For confirmation and error pages: keep them out of search results, no canonical. */
export const noIndexMetadata = {
  robots: { index: false },
} satisfies Pick<Metadata, "robots">;
