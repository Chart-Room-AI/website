import type { CSSProperties } from "react";
import type { ClientConfig } from "@config/schema";
import { readableOn } from "@config/contrast";
import { resolveFont } from "@config/font-catalog";
import { fonts } from "./fonts";

export { readableOn };

const genericStacks = {
  serif: "ui-serif, Georgia, serif",
  "sans-serif": "ui-sans-serif, system-ui, sans-serif",
} as const;

/** The supported fonts this brand kit resolves to (unsupported picks map by category). */
export function brandFonts(config: ClientConfig) {
  // The schema guarantees both resolve; see brand-kit.ts.
  const heading = resolveFont(config.brand.fonts.heading)!.font;
  const body = resolveFont(config.brand.fonts.body)!.font;
  return { heading, body };
}

/**
 * CSS variables behind the neutral theme tokens in src/app/globals.css.
 * Every value comes from the brand kit: palette roles, derived "on-*" text
 * colors, optional extras (with defaults), and fonts.
 */
export function themeStyle(config: ClientConfig): CSSProperties {
  const { palette } = config.brand;
  const { heading, body } = brandFonts(config);
  const vars: Record<string, string> = {
    "--brand-primary": palette.primary,
    "--brand-on-primary": readableOn(palette.primary),
    "--brand-accent": palette.accent,
    "--brand-on-accent": readableOn(palette.accent),
    "--brand-surface": palette.surface,
    "--brand-text": palette.text,
    "--brand-font-heading": `var(${fonts[heading.id].cssVar}), ${genericStacks[heading.generic]}`,
    "--brand-font-body": `var(${fonts[body.id].cssVar}), ${genericStacks[body.generic]}`,
  };
  // Optional palette extras; globals.css supplies derived defaults when absent.
  for (const role of ["muted", "border", "success", "warning", "danger"] as const) {
    const value = palette[role];
    if (value) vars[`--brand-${role}`] = value;
  }
  return vars as CSSProperties;
}

/** next/font classes for the fonts this brand kit uses. */
export function fontClassNames(config: ClientConfig): string {
  const { heading, body } = brandFonts(config);
  return [...new Set([heading.id, body.id])].map((id) => fonts[id].variable).join(" ");
}
