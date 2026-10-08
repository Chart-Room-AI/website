/**
 * Fonts the template can load. All are Google Fonts variable families loaded
 * through next/font/google (self-hosted at build time; no request to Google at
 * runtime). The ids are used in code; brand kits name fonts by `family`.
 *
 * To add a font: add it here and load it in src/lib/fonts.ts (TypeScript
 * fails until both agree).
 */
export const fontCategories = ["serif", "sans-serif", "display"] as const;
export type FontCategory = (typeof fontCategories)[number];

export const supportedFonts = [
  { id: "inter", family: "Inter", category: "sans-serif", generic: "sans-serif" },
  { id: "source-sans-3", family: "Source Sans 3", category: "sans-serif", generic: "sans-serif" },
  { id: "open-sans", family: "Open Sans", category: "sans-serif", generic: "sans-serif" },
  { id: "roboto", family: "Roboto", category: "sans-serif", generic: "sans-serif" },
  { id: "nunito", family: "Nunito", category: "sans-serif", generic: "sans-serif" },
  { id: "dm-sans", family: "DM Sans", category: "sans-serif", generic: "sans-serif" },
  { id: "work-sans", family: "Work Sans", category: "sans-serif", generic: "sans-serif" },
  { id: "manrope", family: "Manrope", category: "sans-serif", generic: "sans-serif" },
  { id: "montserrat", family: "Montserrat", category: "sans-serif", generic: "sans-serif" },
  { id: "raleway", family: "Raleway", category: "sans-serif", generic: "sans-serif" },
  { id: "lora", family: "Lora", category: "serif", generic: "serif" },
  { id: "merriweather", family: "Merriweather", category: "serif", generic: "serif" },
  { id: "libre-baskerville", family: "Libre Baskerville", category: "serif", generic: "serif" },
  { id: "roboto-slab", family: "Roboto Slab", category: "serif", generic: "serif" },
  { id: "eb-garamond", family: "EB Garamond", category: "serif", generic: "serif" },
  { id: "fraunces", family: "Fraunces", category: "display", generic: "serif" },
  { id: "playfair-display", family: "Playfair Display", category: "display", generic: "serif" },
  { id: "oswald", family: "Oswald", category: "display", generic: "sans-serif" },
] as const;

export type FontId = (typeof supportedFonts)[number]["id"];
export type SupportedFont = (typeof supportedFonts)[number];

/** Nearest supported font for each fallback category. */
export const categoryDefaults: Record<FontCategory, FontId> = {
  "sans-serif": "inter",
  serif: "lora",
  display: "fraunces",
};

const normalize = (family: string) => family.trim().toLowerCase().replace(/\s+/g, " ");

export function findFont(family: string): SupportedFont | undefined {
  return supportedFonts.find((font) => normalize(font.family) === normalize(family));
}

export type FontChoice = { family: string; category?: FontCategory };

/**
 * Resolves a brand-kit font choice to a supported font. An unsupported family
 * maps to a close name match, else to its category's default; `mappedFrom`
 * records the original pick.
 * Returns undefined only when the family is unsupported and has no category.
 */
export function resolveFont(choice: FontChoice): { font: SupportedFont; mappedFrom?: string } | undefined {
  const exact = findFont(choice.family);
  if (exact) return { font: exact };
  // Close name match, e.g. "Garamond" -> "EB Garamond", "Inter Tight" -> "Inter".
  const wanted = normalize(choice.family);
  const close =
    wanted.length >= 4
      ? supportedFonts.find((font) => normalize(font.family).includes(wanted) || wanted.includes(normalize(font.family)))
      : undefined;
  if (close) return { font: close, mappedFrom: choice.family };
  if (!choice.category) return undefined;
  const fallback = supportedFonts.find((font) => font.id === categoryDefaults[choice.category!])!;
  return { font: fallback, mappedFrom: choice.family };
}
