/**
 * Client asset conventions (logos, swatch, photos).
 *
 * Files live in template/public/clients/<client-id>/ and configs/brand kits
 * reference them by bare file name (e.g. "logo.svg"), so a kit doesn't change
 * when the client id does. scripts/check-config.ts enforces these rules before
 * every build.
 */
export const assetFilePattern = /^[a-z0-9][a-z0-9._-]*\.(svg|png|jpe?g|webp)$/;

export type AssetKind = "logo" | "icon" | "swatch" | "hero" | "gallery";

type AssetRule = {
  formats: readonly string[];
  maxBytes: number;
  /** Minimum intrinsic size for raster files (SVG is exempt). */
  minRaster?: { width?: number; height?: number };
  square?: boolean;
  note: string;
};

export const assetRules: Record<AssetKind, AssetRule> = {
  logo: {
    formats: ["svg", "png", "webp"],
    maxBytes: 200_000,
    minRaster: { height: 160 },
    note: "SVG preferred. PNG/WebP with transparent background, at least 160 px tall.",
  },
  icon: {
    formats: ["svg", "png"],
    maxBytes: 100_000,
    minRaster: { width: 512, height: 512 },
    square: true,
    note: "Square mark used for the favicon. SVG preferred, or PNG at least 512x512.",
  },
  swatch: {
    formats: ["svg", "png", "jpg", "jpeg", "webp"],
    maxBytes: 1_000_000,
    note: "Palette reference image from the brand interview. Metadata only.",
  },
  hero: {
    formats: ["jpg", "jpeg", "webp", "png", "svg"],
    maxBytes: 600_000,
    minRaster: { width: 1600 },
    note: "Photo: JPG or WebP, at least 1600 px wide (SVG only for placeholders).",
  },
  gallery: {
    formats: ["jpg", "jpeg", "webp", "png", "svg"],
    maxBytes: 400_000,
    minRaster: { width: 1200 },
    note: "Photo: JPG or WebP, at least 1200 px wide (SVG only for placeholders).",
  },
};

/** Site path for a client asset, e.g. assetUrl("acme", "logo.svg") -> /clients/acme/logo.svg. */
export function assetUrl(clientId: string, file: string): string {
  return `/clients/${clientId}/${file}`;
}
