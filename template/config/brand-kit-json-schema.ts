import { z } from "zod";
import { brandKitSchema } from "./brand-kit";

/**
 * The brand kit as JSON Schema, generated from the zod schema (and through it
 * from the font list), so config/brand-kit.schema.json can't drift.
 * Written by `npm run kit-schema`; `npm run test-kit` fails if the file is stale.
 */
export function brandKitJsonSchema() {
  const schema = z.toJSONSchema(brandKitSchema, { io: "input", unrepresentable: "any" });
  return { title: "Client site template brand kit", ...schema };
}

export const brandKitJsonSchemaText = () => JSON.stringify(brandKitJsonSchema(), null, 2) + "\n";
