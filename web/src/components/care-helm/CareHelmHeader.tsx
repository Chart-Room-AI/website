import Link from "next/link";
import Image from "next/image";
import { careHelmConfig } from "@/lib/care-helm-config";
import { careHelmNav } from "@/lib/care-helm-content";

export function CareHelmHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-chart-navy/95 text-white backdrop-blur supports-[backdrop-filter]:backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 lg:max-w-6xl">
        <Link
          href="/care-helm"
          className="inline-flex min-h-11 shrink-0 items-center gap-3 font-semibold tracking-tight text-white transition-opacity hover:opacity-90"
        >
          <Image
            src="/brand/chart-room-ai-header-mark.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-full bg-white object-contain p-0.5"
            priority
          />
          <span>
            <span className="block leading-tight">{careHelmConfig.productName}</span>
            <span className="hidden text-xs font-medium text-white/60 sm:block">
              by Chart Room AI
            </span>
          </span>
        </Link>
        <nav
          aria-label="Care Helm primary"
          className="hidden items-center gap-x-4 gap-y-2 text-sm font-medium text-white/80 lg:flex lg:justify-end"
        >
          {careHelmNav.slice(0, -1).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded underline-offset-4 transition-colors hover:text-white hover:underline decoration-chart-teal/80"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#demo"
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-chart-teal px-4 text-sm font-semibold text-chart-navy shadow-sm transition hover:brightness-95"
          >
            Request Demo
          </a>
        </nav>
        <details className="group relative shrink-0 lg:hidden">
          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center rounded-md border border-white/30 px-4 text-sm font-semibold text-white transition hover:bg-white/10 [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <nav
            aria-label="Care Helm mobile"
            className="absolute right-0 top-12 w-72 rounded-xl border border-chart-navy/10 bg-white p-3 text-sm font-medium text-chart-ink shadow-lg"
          >
            {careHelmNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center rounded-md px-3 underline-offset-4 transition-colors hover:bg-chart-surface hover:text-chart-teal hover:underline decoration-chart-teal/80"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
