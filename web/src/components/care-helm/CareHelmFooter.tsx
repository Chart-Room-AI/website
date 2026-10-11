import Link from "next/link";
import { careHelmConfig } from "@/lib/care-helm-config";
import { careHelmNav } from "@/lib/care-helm-content";

export function CareHelmFooter() {
  return (
    <footer className="border-t border-chart-navy/10 bg-chart-navy text-white">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-12 lg:max-w-6xl">
        <div className="grid gap-8 border-b border-white/10 pb-8 md:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold tracking-tight">{careHelmConfig.productName}</p>
            <p className="max-w-xl text-sm text-white/75">
              A {careHelmConfig.parentCompany} product — calm, connected care guidance for
              families, caregivers, and care organizations.
            </p>
            <Link
              href={careHelmConfig.parentSiteUrl}
              className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-chart-teal underline underline-offset-4 transition hover:text-white"
            >
              Visit Chart Room AI
            </Link>
          </div>
          <nav aria-label="Care Helm footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
            {careHelmNav.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-white hover:underline">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="space-y-3 text-xs leading-relaxed text-white/60">
          <p>
            <strong className="text-white/80">General.</strong> Information on this site is for
            general informational purposes only. The Care Helm is a care coordination and
            instruction tool — not a diagnostic device, EMR, or e-prescribing system.
          </p>
          <p>
            <strong className="text-white/80">Privacy.</strong> Demo requests are handled according
            to our standard business contact practices. Product privacy details are provided during
            sales and onboarding conversations.
          </p>
        </div>
      </div>
    </footer>
  );
}
