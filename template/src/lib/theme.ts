import type { CSSProperties } from "react";
import type { ClientConfig } from "@config/schema";
import { fonts } from "./fonts";

/** WCAG relative luminance of a #rrggbb color. */
function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const LIGHT = "#ffffff";
const DARK = "#111111";

/** Text color (white or near-black) with the better contrast on `background`. */
export function readableOn(background: string): string {
  return contrastRatio(background, LIGHT) >= contrastRatio(background, DARK) ? LIGHT : DARK;
}

/**
 * CSS variables for the neutral theme tokens in src/app/globals.css.
 * Values come only from the client config; "on-*" colors are derived so text
 * on brand colors stays readable.
 */
export function themeStyle(config: ClientConfig): CSSProperties {
  const { colors, fonts: chosen } = config.brand;
  return {
    "--brand-primary": colors.primary,
    "--brand-on-primary": readableOn(colors.primary),
    "--brand-accent": colors.accent,
    "--brand-on-accent": readableOn(colors.accent),
    "--brand-surface": colors.surface,
    "--brand-text": colors.text,
    "--brand-font-heading": `var(${fonts[chosen.heading].cssVar})`,
    "--brand-font-body": `var(${fonts[chosen.body].cssVar})`,
  } as CSSProperties;
}

/** next/font classes for the fonts this config uses. */
export function fontClassNames(config: ClientConfig): string {
  const ids = new Set([config.brand.fonts.heading, config.brand.fonts.body]);
  return [...ids].map((id) => fonts[id].variable).join(" ");
}
