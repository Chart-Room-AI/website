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

export const supportedFamilies = supportedFonts.map((font) => font.family);

/**
 * JSON Schema `pattern` accepting exactly the supported families in any casing,
 * with the same whitespace tolerance as findFont (outer spaces ignored, runs of
 * spaces between words). Generated from supportedFonts so the JSON Schema and
 * the validator can't drift. JSON Schema patterns have no reliable (?i) flag,
 * so each letter becomes a [Xx] class.
 */
export const familyPattern = (() => {
  const escape = (ch: string) => (/[a-z]/i.test(ch) ? `[${ch.toUpperCase()}${ch.toLowerCase()}]` : ch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const families = supportedFamilies.map((family) =>
    family
      .split(" ")
      .map((word) => [...word].map(escape).join(""))
      .join("\\s+"),
  );
  return `^\\s*(?:${families.join("|")})\\s*$`;
})();

const normalize = (family: string) => family.trim().toLowerCase().replace(/\s+/g, " ");

/**
 * Strict lookup: case-insensitive exact match on the family name (extra spaces
 * ignored). There is no nearest-match or category fallback; anything else is
 * an error in validate-kit and in the build.
 */
export function findFont(family: string): SupportedFont | undefined {
  return supportedFonts.find((font) => normalize(font.family) === normalize(family));
}

/** "Inter, Source Sans 3, …" for one category. */
export function familiesIn(category: FontCategory): string {
  return supportedFonts
    .filter((font) => font.category === category)
    .map((font) => font.family)
    .join(", ");
}

/** Error text for an unsupported family, listing the supported families for its category (or all, by category). */
export function unsupportedFontMessage(family: string, category?: FontCategory): string {
  if (category) return `Unsupported font "${family}". Supported ${category} fonts: ${familiesIn(category)}`;
  const all = fontCategories.map((c) => `${c}: ${familiesIn(c)}`).join("; ");
  return `Unsupported font "${family}". Supported fonts by category: ${all}`;
}
