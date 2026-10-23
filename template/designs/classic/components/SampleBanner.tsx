import Image from "next/image";

/**
 * Chart Room Option B chrome, shown on every page when config.sample is true.
 * Colors and copy belong to Chart Room, not the client brand kit.
 * Inter is the face next/font already registers in src/lib/fonts.ts (family name
 * "Inter"). Naming it here keeps this file off the next/font import, which
 * nav tests render outside the Next compiler.
 */
export function SampleBanner() {
  return (
    <div
      role="status"
      className="relative flex min-h-[52px] items-center gap-3 border-b-2 border-l-[6px] border-[#0A2540] border-l-[#00B4A8] bg-[#F4F7FA] px-5 py-2.5 text-sm text-[#0A2540]"
      style={{ fontFamily: 'Inter, "Inter Fallback", ui-sans-serif, system-ui, sans-serif' }}
    >
      <Image
        src="/brand/chart-room-helm-32.png"
        alt=""
        width={30}
        height={30}
        className="h-[30px] w-[30px] shrink-0"
      />
      <span className="shrink-0 text-[15px] font-bold tracking-tight">Chart Room AI</span>
      <span className="shrink-0 rounded bg-[#00B4A8] px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-[#0A2540]">
        Demo
      </span>
      <span className="mx-1 hidden h-3.5 w-0.5 shrink-0 bg-[#0A2540]/40 sm:block" aria-hidden />
      <p className="min-w-0 flex-1 font-medium leading-snug text-[#1E2937] sm:truncate">
        <span className="sm:hidden">Not a real business</span>
        <span className="hidden sm:inline">Placeholder content — not a real business listing.</span>
      </p>
      <span className="hidden shrink-0 text-[13px] font-bold sm:inline">Not a real business</span>
    </div>
  );
}
