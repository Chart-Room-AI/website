import Image from "next/image";
import Link from "next/link";
import { bosunConfig } from "@/lib/bosun-config";
import { bosunNav } from "@/lib/bosun-content";

export function BosunFooter() {
  return (
    <footer className="border-t border-chart-navy/10 bg-chart-navy text-white">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-12 lg:max-w-6xl">
        <div className="grid gap-8 border-b border-white/10 pb-8 md:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/chart-room-ai-header-mark.png"
                alt="Chart Room AI"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full bg-white object-contain p-0.5"
              />
              <p className="text-lg font-semibold tracking-tight">
                <span className="font-display">{bosunConfig.productName}</span>{" "}
                <span className="text-bosun-rope">{bosunConfig.lockupSuffix}</span>
              </p>
            </div>
            <p className="max-w-xl text-sm text-white/75">
              A {bosunConfig.parentSiteName} service: office help for small trade and service
              businesses, so you can stay on the job and get your evenings back.
            </p>
            <Link
              href={bosunConfig.parentSiteUrl}
              className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-chart-teal underline underline-offset-4 transition hover:text-white"
            >
              Visit Chart Room AI
            </Link>
          </div>
          <nav aria-label="Bosun footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/75">
            {bosunNav.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-white hover:underline">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="space-y-3 text-xs leading-relaxed text-white/60">
          <p>
            <strong className="text-white/80">General.</strong> {bosunConfig.fullName} is a service
            of {bosunConfig.parentCompany}. Information on this page is for general informational
            purposes only.
          </p>
          <p>
            <strong className="text-white/80">Privacy.</strong> Requests sent through this page are
            handled according to our standard business contact practices.
          </p>
        </div>
      </div>
    </footer>
  );
}
