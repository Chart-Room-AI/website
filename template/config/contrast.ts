/**
 * WCAG 2.x contrast for brand palettes, shared by the theme (derived colors)
 * and by check-config / validate-kit (the checks below).
 *
 * Text pairs are errors: a kit that fails one can't build. Non-text UI
 * (borders, focus ring, input outlines) is a warning.
 */

type Rgb = [number, number, number];

function toRgb(hex: string): Rgb {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as Rgb;
}

function toHex(rgb: Rgb): string {
  return `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`;
}

/** WCAG relative luminance of a #rrggbb color. */
export function luminance(hex: string): number {
  const [r, g, b] = toRgb(hex)
    .map((c) => c / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** `fg` at `alpha` opacity composited over `bg` (what Tailwind's `bg-x/60` renders). */
export function blend(fg: string, bg: string, alpha: number): string {
  const f = toRgb(fg);
  const b = toRgb(bg);
  return toHex(f.map((c, i) => c * alpha + b[i] * (1 - alpha)) as Rgb);
}

const LIGHT = "#ffffff";
const DARK = "#111111";

/** Text color (white or near-black) with the better contrast on `background`. */
export function readableOn(background: string): string {
  return contrastRatio(background, LIGHT) >= contrastRatio(background, DARK) ? LIGHT : DARK;
}

/** WCAG AA: 4.5 for body text; 3 for large text (24px+, or 18.66px+ bold) and non-text UI. */
export const AA_TEXT = 4.5;
export const AA_LARGE = 3;

export type PaletteInput = {
  primary: string;
  accent: string;
  surface: string;
  text: string;
  secondary?: string;
  card?: string;
  muted?: string;
  border?: string;
  success?: string;
  warning?: string;
  danger?: string;
};

/** Every color the classic design uses, with defaults and derived on-* colors filled in. */
export function resolvePalette(palette: PaletteInput) {
  const { primary, accent, surface, text } = palette;
  const card = palette.card ?? blend(LIGHT, surface, 0.6);
  const secondary = palette.secondary ?? blend(primary, surface, 0.1);
  const onPrimary = readableOn(primary);
  // Dimmed text on primary bands (intros, footer notes): 80% on-primary when
  // that still meets 4.5:1, else full strength.
  const dimmed = blend(onPrimary, primary, 0.8);
  // Small text in the primary color (links, labels): primary when it meets
  // 4.5:1 on surface and card, else the text color.
  const primaryInk = Math.min(contrastRatio(primary, surface), contrastRatio(primary, card)) >= AA_TEXT ? primary : text;
  return {
    primary,
    accent,
    surface,
    text,
    card,
    secondary,
    onPrimary,
    onPrimaryMuted: contrastRatio(dimmed, primary) >= AA_TEXT ? dimmed : onPrimary,
    onAccent: readableOn(accent),
    onSecondary: contrastRatio(primary, secondary) >= AA_TEXT ? primary : readableOn(secondary),
    primaryInk,
    muted: palette.muted ?? blend(text, surface, 0.72),
    border: palette.border ?? blend(text, surface, 0.15),
    success: palette.success ?? "#2e7d32",
    warning: palette.warning ?? "#b26a00",
    danger: palette.danger ?? "#b3261e",
  };
}

export type ResolvedPalette = ReturnType<typeof resolvePalette>;

export type ContrastCheck = {
  pair: string;
  fg: string;
  bg: string;
  ratio: number;
  min: number;
  level: "error" | "warning";
  ok: boolean;
};

/** The pairs the classic design renders. Errors fail validate-kit and the build. */
export function contrastReport(input: PaletteInput): ContrastCheck[] {
  const p = resolvePalette(input);
  const pairs: [string, string, string, number, ContrastCheck["level"]][] = [
    ["text on surface", p.text, p.surface, AA_TEXT, "error"],
    ["muted on surface", p.muted, p.surface, AA_TEXT, "error"],
    ["text on card", p.text, p.card, AA_TEXT, "error"],
    ["muted on card", p.muted, p.card, AA_TEXT, "error"],
    ["on-primary on primary", p.onPrimary, p.primary, AA_TEXT, "error"],
    ["on-accent on accent", p.onAccent, p.accent, AA_TEXT, "error"],
    ["on-secondary on secondary", p.onSecondary, p.secondary, AA_TEXT, "error"],
    ["primary headings on surface (large)", p.primary, p.surface, AA_LARGE, "error"],
    ["primary headings on card (large)", p.primary, p.card, AA_LARGE, "error"],
    ["border on surface (non-text)", p.border, p.surface, AA_LARGE, "warning"],
    ["input border on white (non-text)", blend(p.text, LIGHT, 0.55), LIGHT, AA_LARGE, "warning"],
    ["focus ring on surface (non-text)", p.text, p.surface, AA_LARGE, "warning"],
    ["focus ring on primary (non-text)", p.onPrimary, p.primary, AA_LARGE, "warning"],
  ];
  return pairs.map(([pair, fg, bg, min, level]) => {
    const ratio = contrastRatio(fg, bg);
    return { pair, fg, bg, ratio: Math.floor(ratio * 100) / 100, min, level, ok: ratio >= min };
  });
}
