/**
 * Runs before every build (npm "prebuild"): validates the active client config
 * (CLIENT_CONFIG, default dry-creek-sample), including its brand kit, and
 * checks every referenced asset in public/clients/<client-id>/.
 */
import { join } from "node:path";
import { clientConfigs, DEFAULT_CLIENT_CONFIG } from "../config/clients";
import { clientConfigSchema } from "../config/schema";
import { checkAssets, contrastResult, describeIssues, fontNotes, kitAssets } from "./report";

const id = process.env.CLIENT_CONFIG?.trim() || DEFAULT_CLIENT_CONFIG;
const input = clientConfigs[id];
if (!input) {
  console.error(`✗ CLIENT_CONFIG="${id}" is not registered in config/clients/index.ts`);
  process.exit(1);
}

const result = clientConfigSchema.safeParse(input);
if (!result.success) {
  console.error(`✗ Client config "${id}" is invalid:`);
  for (const line of describeIssues(result.error)) console.error(`  - ${line}`);
  process.exit(1);
}

const config = result.data;
const photos = [
  { path: "hero.image", kind: "hero" as const, asset: config.hero.image },
  ...(config.about.image ? [{ path: "about.image", kind: "gallery" as const, asset: config.about.image }] : []),
  ...config.gallery.map((photo, i) => ({ path: `gallery.${i}`, kind: "gallery" as const, asset: photo })),
];
const problems = checkAssets([...kitAssets(config.brand, "brand"), ...photos], join(process.cwd(), "public", "clients", id));

const contrast = contrastResult(config.brand);
for (const note of fontNotes(config.brand, "brand.fonts")) console.log(`  note: ${note}`);
console.log("  contrast (WCAG AA):");
for (const line of contrast.lines) console.log(`    ${line}`);

const failures = [
  ...contrast.errors.map((check) => `brand.palette: ${check.pair} is ${check.ratio.toFixed(2)}:1, needs ${check.min}:1`),
  ...problems,
];
if (failures.length > 0) {
  console.error(`✗ Client config "${id}": ${failures.length} problem(s)`);
  for (const line of failures) console.error(`  - ${line}`);
  process.exit(1);
}
console.log(`✓ Client config "${id}" is valid (design: ${config.design}; brand kit v${config.brand.kitVersion}; assets OK; ${contrast.summary})`);
