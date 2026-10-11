import Link from "next/link";
import { diagnosticRequestHref, routes } from "@/lib/site-content";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-chart-navy/10 bg-chart-navy text-white">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-12 lg:max-w-6xl">
        <div className="grid gap-8 border-b border-white/10 pb-8 md:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold tracking-tight">{siteConfig.legalName}</p>
            <p className="max-w-xl text-sm text-white/75">
              Virginia - fractional AI transformation leadership for regulated financial firms
              that need governed, production-ready execution.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a
                href={diagnosticRequestHref}
                className="inline-flex min-h-11 items-center justify-center rounded-md bg-chart-gold px-5 py-3 text-sm font-semibold text-chart-navy transition hover:brightness-95"
              >
                Unlock AI for your Firm
              </a>
            </div>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
            {routes.map((route) => (
              <Link key={route.href} href={route.href} className="hover:text-white hover:underline">
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="space-y-3 text-xs leading-relaxed text-white/60">
          <p>
            <strong className="text-white/80">General.</strong> Information on this site
            is for general informational purposes only. It is not legal, tax,
            accounting, or investment advice, and is not a substitute for a signed
            consulting or advisory engagement.
          </p>
          <p>
            <strong className="text-white/80">Securities.</strong> Chart Room AI LLC is not
            a broker-dealer or registered investment adviser. Nothing herein is investment
            advice or a solicitation to buy or sell securities or other financial instruments.
          </p>
        </div>
      </div>
    </footer>
  );
}
