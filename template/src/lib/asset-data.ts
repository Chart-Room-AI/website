import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { assetUrl } from "@config/assets";
import type { BrandAsset } from "@config/brand-kit";

const mimeTypes: Record<string, string> = {
  svg: "image/svg+xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
};

/**
 * Reads a client asset from public/ as a data URI for build-time image
 * generation (favicon, Open Graph image). Only used by statically generated
 * routes, so it runs during `next build`, where public/ is on disk.
 */
export async function assetDataUri(clientId: string, asset: BrandAsset): Promise<string> {
  const bytes = await readFile(join(process.cwd(), "public", assetUrl(clientId, asset.file)));
  const ext = asset.file.split(".").pop()!;
  return `data:${mimeTypes[ext]};base64,${bytes.toString("base64")}`;
}
