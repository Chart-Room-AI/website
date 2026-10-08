import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import type { z } from "zod";
import { assetRules, type AssetKind } from "../config/assets";
import type { BrandAsset, BrandKit } from "../config/brand-kit";
import { resolveFont } from "../config/font-catalog";

/** One line per zod issue: "path: problem", with missing fields called out. */
export function describeIssues(error: z.ZodError, prefix = ""): string[] {
  return error.issues.map((issue) => {
    const path = [prefix, ...issue.path.map(String)].filter(Boolean).join(".") || "(root)";
    if (issue.code === "invalid_type" && issue.message.includes("received undefined")) {
      return `${path}: missing (required, expected ${issue.expected})`;
    }
    if (issue.code === "unrecognized_keys") {
      return `${path}: unknown field(s) ${issue.keys.map((key) => `"${key}"`).join(", ")}`;
    }
    return `${path}: ${issue.message}`;
  });
}

/** Notes for fonts that were mapped to the nearest supported font. */
export function fontNotes(kit: BrandKit, prefix = "fonts"): string[] {
  return (["heading", "body"] as const).flatMap((role) => {
    const resolved = resolveFont(kit.fonts[role]);
    return resolved?.mappedFrom
      ? [`${prefix}.${role}: "${resolved.mappedFrom}" isn't supported; using "${resolved.font.family}"`]
      : [];
  });
}

type AssetRef = { path: string; kind: AssetKind; asset: BrandAsset };

export function kitAssets(kit: BrandKit, prefix = ""): AssetRef[] {
  const p = (path: string) => [prefix, path].filter(Boolean).join(".");
  const refs: AssetRef[] = [{ path: p("logo.onLight"), kind: "logo", asset: kit.logo.onLight }];
  if (kit.logo.onDark) refs.push({ path: p("logo.onDark"), kind: "logo", asset: kit.logo.onDark });
  if (kit.logo.icon) refs.push({ path: p("logo.icon"), kind: "icon", asset: kit.logo.icon });
  if (kit.swatch) refs.push({ path: p("swatch"), kind: "swatch", asset: kit.swatch });
  return refs;
}

/** Checks each referenced file exists in `dir` and meets config/assets.ts rules. */
export function checkAssets(refs: AssetRef[], dir: string): string[] {
  const problems: string[] = [];
  for (const { path, kind, asset } of refs) {
    const rule = assetRules[kind];
    const ext = asset.file.split(".").pop()!;
    const file = join(dir, asset.file);
    if (!rule.formats.includes(ext)) problems.push(`${path}.file: .${ext} not allowed for ${kind} (${rule.formats.join(", ")})`);
    if (!existsSync(file)) {
      problems.push(`${path}.file: ${file} not found`);
      continue;
    }
    const bytes = statSync(file).size;
    if (bytes > rule.maxBytes) problems.push(`${path}.file: ${Math.round(bytes / 1000)} KB is over the ${rule.maxBytes / 1000} KB limit for ${kind}`);
    if (rule.square && asset.width !== asset.height) problems.push(`${path}: ${kind} must be square (got ${asset.width}x${asset.height})`);
    if (ext !== "svg" && rule.minRaster) {
      const { width, height } = rule.minRaster;
      if ((width && asset.width < width) || (height && asset.height < height)) {
        problems.push(`${path}: ${asset.width}x${asset.height} is below the minimum for a raster ${kind} (${width ?? "any"}x${height ?? "any"})`);
      }
    }
  }
  return problems;
}
