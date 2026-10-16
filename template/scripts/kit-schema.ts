/** Writes config/brand-kit.schema.json (JSON Schema for tools emitting kits): npm run kit-schema */
import { writeFileSync } from "node:fs";
import { brandKitJsonSchemaText } from "../config/brand-kit-json-schema";

writeFileSync(new URL("../config/brand-kit.schema.json", import.meta.url), brandKitJsonSchemaText());
console.log("Wrote config/brand-kit.schema.json");
