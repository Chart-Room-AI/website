import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { seoDescription, siteOpenGraph, siteTitle } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteTitle,
    template: "%s | Chart Room AI",
  },
  description: seoDescription.substring(0, 155),
  // No site-wide canonical or og:url here: each indexable page sets its own via
  // pageUrlMetadata() in @/lib/seo, and confirmation/error pages are noindex.
  openGraph: siteOpenGraph,
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.legalName,
  url: siteConfig.url,
  description: siteConfig.positioningShort,
  areaServed: "United States",
  founder: {
    "@type": "Person",
    name: "Marc Cheatham",
    jobTitle: "Founder and Principal",
  },
  serviceType: [
    "Fractional AI transformation leadership",
    "AI readiness diagnostic",
    "AI governance and roadmap sprint",
    "Regulated financial services AI advisory",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-16 rounded bg-chart-teal px-3 py-2 text-sm font-medium text-chart-navy transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
