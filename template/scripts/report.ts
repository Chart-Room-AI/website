import { existsSync, statSync } from "node:fs";
import { join } from "node:path";
import type { z } from "zod";
import { assetRules, type AssetKind } from "../config/assets";
import type { BrandAsset, BrandKit } from "../config/brand-kit";
import { contrastReport } from "../config/contrast";
import { findFont } from "../config/font-catalog";

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

/** Notes when a font's optional `category` doesn't match the family's catalog category (metadata only). */
export function fontNotes(kit: BrandKit, prefix = "fonts"): string[] {
  return (["heading", "body"] as const).flatMap((role) => {
    const choice = kit.fonts[role];
    const font = findFont(choice.family);
    return font && choice.category && choice.category !== font.category
      ? [`${prefix}.${role}.category is "${choice.category}" but ${font.family} is ${font.category} (category is metadata only)`]
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

/**
 * Contrast table for the pairs the classic design uses (config/contrast.ts).
 * Every pair is printed with its ratio; text pairs below their minimum are
 * errors (validate-kit and the build fail), non-text pairs are warnings.
 */
export function contrastResult(kit: BrandKit) {
  const report = contrastReport(kit.palette);
  const width = Math.max(...report.map((check) => check.pair.length));
  const lines = report.map((check) => {
    const status = check.ok ? "ok  " : check.level === "error" ? "FAIL" : "warn";
    return `${status} ${check.pair.padEnd(width)}  ${check.ratio.toFixed(2).padStart(5)}:1  (min ${check.min.toFixed(1)}:1)  ${check.fg} on ${check.bg}`;
  });
  const errors = report.filter((check) => !check.ok && check.level === "error");
  const warnings = report.filter((check) => !check.ok && check.level === "warning");
  const textPairs = report.filter((check) => check.level === "error");
  const summary = `contrast: ${textPairs.length - errors.length}/${textPairs.length} text pairs pass${warnings.length ? `, ${warnings.length} non-text warning(s)` : ""}`;
  return { lines, errors, warnings, summary };
}
