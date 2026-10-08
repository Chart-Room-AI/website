/**
 * Validates a brand kit JSON file.
 *
 *   npm run validate-kit -- path/to/kit.json [--assets public/clients/<client-id>]
 *
 * Prints every missing or invalid field, font mappings, and (with --assets)
 * missing or out-of-spec asset files. Exits 1 if the kit can't be used.
 */
import { readFileSync } from "node:fs";
import { brandKitSchema } from "../config/brand-kit";
import { checkAssets, describeIssues, fontNotes, kitAssets } from "./report";

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

const assetProblems = assetsDir ? checkAssets(kitAssets(result.data), assetsDir) : [];
for (const note of fontNotes(result.data)) console.log(`  note: ${note}`);
if (assetProblems.length > 0) {
  console.error(`✗ ${kitPath}: valid kit, but ${assetProblems.length} asset problem(s) in ${assetsDir}`);
  for (const line of assetProblems) console.error(`  - ${line}`);
  process.exit(1);
}
console.log(`✓ ${kitPath}: valid brand kit (version ${result.data.kitVersion})${assetsDir ? `; assets OK in ${assetsDir}` : "; assets not checked (pass --assets <dir>)"}`);
