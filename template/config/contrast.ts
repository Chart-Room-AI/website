/**
 * WCAG 2.x contrast math for brand palettes. Shared by the theme (to derive
 * the on-* text colors) and by check-config / validate-kit (to report pairs
 * the classic design actually uses).
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

/** `fg` at `alpha` opacity composited over `bg` (what Tailwind's `text-x/70` renders). */
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

/** WCAG AA minimums: 4.5 for body text, 3 for large text (24px+, or 18.66px+ bold) and UI graphics. */
export const AA_TEXT = 4.5;
export const AA_LARGE = 3;

type Palette = { primary: string; accent: string; surface: string; text: string; muted?: string };

export type ContrastCheck = { pair: string; fg: string; bg: string; ratio: number; min: number; ok: boolean };

/**
 * The text/background pairs the classic design renders. Opacity variants
 * (e.g. on-primary at 75%) are composited before measuring.
 *
 * Not listed: accent as a fill (quote buttons are identified by their text,
 * which is the on-accent pair) and rating stars (decorative; the rating is
 * also shown as text).
 */
export function contrastReport(palette: Palette): ContrastCheck[] {
  const onPrimary = readableOn(palette.primary);
  const onAccent = readableOn(palette.accent);
  const muted = palette.muted ?? blend(palette.text, palette.surface, 0.72);
  const pairs: [string, string, string, number][] = [
    ["text on surface (body copy)", palette.text, palette.surface, AA_TEXT],
    ["text 70% on surface (captions, locations)", blend(palette.text, palette.surface, 0.7), palette.surface, AA_TEXT],
    ["muted on surface (secondary copy)", muted, palette.surface, AA_TEXT],
    ["primary on surface (headings, links, labels)", palette.primary, palette.surface, AA_TEXT],
    ["on-primary on primary (header bands, footer)", onPrimary, palette.primary, AA_TEXT],
    ["on-primary 75% on primary (intros, footer notes)", blend(onPrimary, palette.primary, 0.75), palette.primary, AA_TEXT],
    ["on-accent on accent (quote buttons)", onAccent, palette.accent, AA_TEXT],
    // Form field borders (WCAG 1.4.11): text at 55% on the white input fill.
    ["input border (text 55% on white)", blend(palette.text, "#ffffff", 0.55), "#ffffff", AA_LARGE],
  ];
  return pairs.map(([pair, fg, bg, min]) => {
    const ratio = contrastRatio(fg, bg);
    return { pair, fg, bg, ratio: Math.round(ratio * 100) / 100, min, ok: ratio >= min };
  });
}
