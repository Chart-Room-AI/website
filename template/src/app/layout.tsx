import type { Metadata } from "next";
import { clientConfig } from "@config/index";
import { activeDesign } from "@designs/index";
import { resolveSiteUrl } from "@/lib/site-url";
import { fontClassNames, themeStyle } from "@/lib/theme";
import "./globals.css";

const { business, seo, sample } = clientConfig;
// Previews and placeholder domains use the deployment's own URL so og:image
// resolves (src/lib/site-url.ts).
const siteUrl = resolveSiteUrl(seo.siteUrl);

// Favicon (icon.tsx) and Open Graph image (opengraph-image.tsx) are generated
// from the same config, next to this file.
export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: seo.title, template: `%s | ${business.name}` },
  description: seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: siteUrl,
    siteName: business.name,
    locale: seo.locale,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  // Sample/placeholder configs must never be indexed.
  robots: sample ? { index: false, follow: false } : undefined,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { Frame } = activeDesign;
  return (
    <html lang="en" className={`${fontClassNames(clientConfig)} h-full`} style={themeStyle(clientConfig)}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <Frame config={clientConfig}>{children}</Frame>
      </body>
    </html>
  );
}
