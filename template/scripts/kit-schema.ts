/** Writes config/brand-kit.schema.json (JSON Schema for tools emitting kits): npm run kit-schema */
import { writeFileSync } from "node:fs";
import { z } from "zod";
import { brandKitSchema } from "../config/brand-kit";

const schema = z.toJSONSchema(brandKitSchema, { io: "input", unrepresentable: "any" });
writeFileSync(
  new URL("../config/brand-kit.schema.json", import.meta.url),
  JSON.stringify({ title: "Client site template brand kit", ...schema }, null, 2) + "\n",
);
console.log("Wrote config/brand-kit.schema.json");
