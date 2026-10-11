import { bosunConfig } from "@/lib/bosun-config";

type BosunLockupProps = {
  size?: "header" | "hero";
};

/**
 * "Bosun" (Fraunces SemiBold) + "by Chart Room AI" (Inter SemiBold), always together.
 * Inline on wide layouts; stacked and left-aligned on narrow ones.
 */
export function BosunLockup({ size = "header" }: BosunLockupProps) {
  const isHero = size === "hero";

  return (
    <span
      className={
        isHero
          ? "flex flex-col items-start gap-1 sm:flex-row sm:items-baseline sm:gap-4"
          : "flex flex-col items-start leading-tight sm:flex-row sm:items-baseline sm:gap-2"
      }
    >
      <span
        className={
          isHero
            ? "font-display text-5xl font-semibold tracking-tight text-white md:text-6xl"
            : "font-display text-xl font-semibold tracking-tight text-white"
        }
      >
        {bosunConfig.productName}
      </span>
      <span
        className={
          isHero
            ? "font-sans text-xl font-semibold text-bosun-rope md:text-2xl"
            : "font-sans text-xs font-semibold text-bosun-rope sm:text-sm"
        }
      >
        {bosunConfig.lockupSuffix}
      </span>
    </span>
  );
}
