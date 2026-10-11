import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const seoDescription =
  "Operator-led AI transformation for regulated financial firms that need governed, production-ready AI, DevOps modernization, and board-ready momentum.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Chart Room AI | Fractional AI Leadership for Regulated Financial Firms",
    template: "%s | Chart Room AI",
  },
  description: seoDescription.substring(0, 155),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Chart Room AI | Fractional AI Leadership for Regulated Financial Firms",
    description: seoDescription,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
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
