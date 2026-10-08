import type { CSSProperties } from "react";
import type { ClientConfig } from "@config/schema";
import { readableOn, resolvePalette } from "@config/contrast";
import { findFont } from "@config/font-catalog";
import { fonts } from "./fonts";

export { readableOn };

const genericStacks = {
  serif: "ui-serif, Georgia, serif",
  "sans-serif": "ui-sans-serif, system-ui, sans-serif",
} as const;

/** The supported fonts this brand kit resolves to (unsupported picks map by category). */
export function brandFonts(config: ClientConfig) {
  // The schema only accepts supported families; see brand-kit.ts.
  const heading = findFont(config.brand.fonts.heading.family)!;
  const body = findFont(config.brand.fonts.body.family)!;
  return { heading, body };
}

/**
 * CSS variables behind the neutral theme tokens in src/app/globals.css.
 * Every value comes from the brand kit via resolvePalette (config/contrast.ts):
 * palette roles, optional extras with their defaults, derived on-* colors, and
 * fonts. The contrast checks measure exactly these values.
 */
export function themeStyle(config: ClientConfig): CSSProperties {
  const p = resolvePalette(config.brand.palette);
  const { heading, body } = brandFonts(config);
  const vars: Record<string, string> = {
    "--brand-primary": p.primary,
    "--brand-on-primary": p.onPrimary,
    "--brand-on-primary-muted": p.onPrimaryMuted,
    "--brand-primary-ink": p.primaryInk,
    "--brand-accent": p.accent,
    "--brand-on-accent": p.onAccent,
    "--brand-secondary": p.secondary,
    "--brand-on-secondary": p.onSecondary,
    "--brand-surface": p.surface,
    "--brand-card": p.card,
    "--brand-text": p.text,
    "--brand-muted": p.muted,
    "--brand-border": p.border,
    "--brand-success": p.success,
    "--brand-warning": p.warning,
    "--brand-danger": p.danger,
    "--brand-font-heading": `var(${fonts[heading.id].cssVar}), ${genericStacks[heading.generic]}`,
    "--brand-font-body": `var(${fonts[body.id].cssVar}), ${genericStacks[body.generic]}`,
  };
  return vars as CSSProperties;
}

/** next/font classes for the fonts this brand kit uses. */
export function fontClassNames(config: ClientConfig): string {
  const { heading, body } = brandFonts(config);
  return [...new Set([heading.id, body.id])].map((id) => fonts[id].variable).join(" ");
}
