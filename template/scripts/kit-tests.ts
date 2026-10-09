/**
 * Brand kit rule tests: npm run test-kit
 * Strict fonts, casing normalization, contrast errors, and palette defaults.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { brandKitSchema, type BrandKitInput } from "../config/brand-kit";
import { blend, contrastReport, resolvePalette } from "../config/contrast";
import { brandKitJsonSchemaText } from "../config/brand-kit-json-schema";
import { familiesIn, findFont, supportedFamilies } from "../config/font-catalog";

const example = JSON.parse(readFileSync(new URL("../config/brand-kit.example.json", import.meta.url), "utf8")) as BrandKitInput;
const sample = JSON.parse(readFileSync(new URL("../config/clients/dry-creek-sample.brand-kit.json", import.meta.url), "utf8")) as BrandKitInput;

const schemaPath = new URL("../config/brand-kit.schema.json", import.meta.url);
const jsonSchemaText = readFileSync(schemaPath, "utf8");
const jsonSchema = JSON.parse(jsonSchemaText);
// JSON Schema patterns are ECMA-262 regexes (unanchored unless the pattern anchors itself).
const familySchemas = (["heading", "body"] as const).map((role) => jsonSchema.properties.fonts.properties[role].properties.family);

const withFonts = (heading: object, body: object) => ({ ...example, fonts: { heading, body } });
const issues = (kit: unknown) => {
  const result = brandKitSchema.safeParse(kit);
  return result.success ? [] : result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
};

const tests: [string, () => void][] = [
  ['"Comic Neue" fails and lists the sans-serif families', () => {
    const found = issues(withFonts({ family: "Inter" }, { family: "Comic Neue", category: "sans-serif" }));
    assert.equal(found.length, 1);
    assert.match(found[0], /^fonts\.body\.family: Unsupported font "Comic Neue"\. Supported sans-serif fonts: /);
    assert.ok(found[0].includes(familiesIn("sans-serif")));
    assert.ok(!found[0].includes("Lora"));
  }],
  ['"Comic Neue" with no category lists every family by category', () => {
    const [message] = issues(withFonts({ family: "Comic Neue" }, { family: "Inter" }));
    assert.match(message, /Supported fonts by category: serif: .*; sans-serif: .*; display: /);
  }],
  ["no nearest match: Garamond and Inter Tight fail", () => {
    assert.equal(issues(withFonts({ family: "Garamond", category: "serif" }, { family: "Inter Tight" })).length, 2);
  }],
  ["casing is normalized", () => {
    const kit = brandKitSchema.parse(withFonts({ family: "playfair  DISPLAY" }, { family: " source sans 3 " }));
    assert.equal(kit.fonts.heading.family, "Playfair Display");
    assert.equal(kit.fonts.body.family, "Source Sans 3");
  }],
  ["category is metadata only (a mismatch is not an error)", () => {
    assert.deepEqual(issues(withFonts({ family: "Inter", category: "serif" }, { family: "Lora" })), []);
  }],
  ["sample and example kits pass every text contrast pair", () => {
    for (const kit of [sample, example]) {
      assert.deepEqual(issues(kit), []);
      assert.deepEqual(contrastReport(kit.palette).filter((c) => c.level === "error" && !c.ok), []);
    }
  }],
  ["low-contrast text is an error", () => {
    const failing = contrastReport({ ...example.palette, text: "#9a9a9a", muted: undefined })
      .filter((c) => c.level === "error" && !c.ok)
      .map((c) => c.pair);
    assert.ok(failing.includes("text on surface"));
    assert.ok(failing.includes("text on card"));
  }],
  ["light primary fails the 3:1 heading check", () => {
    const failing = contrastReport({ ...example.palette, primary: "#b8c8e0" }).filter((c) => !c.ok).map((c) => c.pair);
    assert.ok(failing.includes("primary headings on surface (large)"));
  }],
  ["JSON Schema family pattern accepts any casing and rejects unsupported fonts (matches validate-kit)", () => {
    for (const family of familySchemas) {
      assert.equal(family.enum, undefined);
      assert.deepEqual(family.examples, supportedFamilies);
      const pattern = new RegExp(family.pattern, "u");
      for (const name of ["inter", "INTER", "Inter", " source  SANS 3 ", "eb garamond", ...supportedFamilies]) {
        assert.ok(pattern.test(name), `pattern should accept ${JSON.stringify(name)}`);
        assert.ok(findFont(name), `validate-kit should accept ${JSON.stringify(name)}`);
      }
      for (const name of ["Comic Neue", "Garamond", "Inter Tight", "Interx", "Inter;", ""]) {
        assert.ok(!pattern.test(name), `pattern should reject ${JSON.stringify(name)}`);
        assert.equal(findFont(name), undefined, `validate-kit should reject ${JSON.stringify(name)}`);
      }
    }
  }],
  ["config/brand-kit.schema.json is up to date with the zod schema (run npm run kit-schema)", () => {
    assert.equal(jsonSchemaText, brandKitJsonSchemaText());
  }],
  ["defaults: card = white 60% over surface, secondary = primary 10% over surface", () => {
    const p = resolvePalette({ primary: "#2f5d3a", accent: "#d9822b", surface: "#f7f5ef", text: "#1f2a22" });
    assert.equal(p.card, blend("#ffffff", "#f7f5ef", 0.6));
    assert.equal(p.secondary, blend("#2f5d3a", "#f7f5ef", 0.1));
  }],
];

let failed = 0;
for (const [name, run] of tests) {
  try {
    run();
    console.log(`✓ ${name}`);
  } catch (error) {
    failed++;
    console.error(`✗ ${name}\n  ${error instanceof Error ? error.message : error}`);
  }
}
if (failed) process.exit(1);
