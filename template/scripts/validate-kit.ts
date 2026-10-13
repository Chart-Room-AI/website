/**
 * Validates a brand kit JSON file.
 *
 *   npm run validate-kit -- path/to/kit.json [--assets public/clients/<client-id>]
 *
 * Prints every missing or invalid field (including unsupported fonts), the
 * contrast table, and (with --assets) missing or out-of-spec asset files.
 * Exits 1 if the kit can't be used: schema errors, failing text contrast, or
 * asset problems.
 */
import { readFileSync } from "node:fs";
import { brandKitSchema } from "../config/brand-kit";
import { checkAssets, contrastResult, describeIssues, fontNotes, kitAssets } from "./report";

const args = process.argv.slice(2);
const kitPath = args.find((arg) => !arg.startsWith("--"));
const assetsIndex = args.indexOf("--assets");
const assetsDir = assetsIndex >= 0 ? args[assetsIndex + 1] : undefined;

if (!kitPath) {
  console.error("Usage: npm run validate-kit -- <kit.json> [--assets <dir>]");
  process.exit(2);
}

let json: unknown;
try {
  json = JSON.parse(readFileSync(kitPath, "utf8"));
} catch (error) {
  console.error(`✗ ${kitPath}: can't read JSON (${error instanceof Error ? error.message : error})`);
  process.exit(1);
}

const result = brandKitSchema.safeParse(json);
if (!result.success) {
  const problems = describeIssues(result.error);
  console.error(`✗ ${kitPath}: ${problems.length} problem(s)`);
  for (const line of problems) console.error(`  - ${line}`);
  process.exit(1);
}

const kit = result.data;
const assetProblems = assetsDir ? checkAssets(kitAssets(kit), assetsDir) : [];
const contrast = contrastResult(kit);
for (const note of fontNotes(kit)) console.log(`  note: ${note}`);
console.log("  contrast (WCAG AA):");
for (const line of contrast.lines) console.log(`    ${line}`);

const failures = [
  ...contrast.errors.map((check) => `palette: ${check.pair} is ${check.ratio.toFixed(2)}:1, needs ${check.min}:1`),
  ...assetProblems,
];
if (failures.length > 0) {
  console.error(`✗ ${kitPath}: ${failures.length} problem(s)`);
  for (const line of failures) console.error(`  - ${line}`);
  process.exit(1);
}
console.log(
  `✓ ${kitPath}: valid brand kit (version ${kit.kitVersion}; ${contrast.summary})` +
    (assetsDir ? `; assets OK in ${assetsDir}` : "; assets not checked (pass --assets <dir>)"),
);
