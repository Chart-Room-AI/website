import { z } from "zod";
import { assetFilePattern } from "./assets";
import { familyPattern, findFont, fontCategories, supportedFamilies, unsupportedFontMessage } from "./font-catalog";

/**
 * Brand kit: the output of the client branding interview (Beacon), embedded
 * unchanged as `brand` in a client config. Plain JSON, no code, no secrets.
 * Field reference: template/README.md ("Brand kit"). JSON Schema for tools:
 * config/brand-kit.schema.json (npm run kit-schema).
 *
 * Kits are strict: unknown keys are errors, so a typo can't silently drop a field.
 */

export const BRAND_KIT_VERSION = 1;

const hex = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/, "Use a 6-digit hex color, for example #2f5d3a")
  .describe("6-digit hex color, e.g. #2f5d3a");

/** A file in template/public/clients/<client-id>/, referenced by bare name. */
export const assetSchema = z.strictObject({
  file: z
    .string()
    .regex(assetFilePattern, "Use a lowercase file name like logo.svg (svg, png, jpg, jpeg or webp), no folders")
    .describe("File name in template/public/clients/<client-id>/, e.g. logo.svg"),
  width: z.number().int().positive().describe("Intrinsic width in px (SVG: viewBox width)"),
  height: z.number().int().positive().describe("Intrinsic height in px (SVG: viewBox height)"),
});

const fontChoice = z
  .strictObject({
    family: z
      .string()
      .min(1)
      // JSON Schema: a case-insensitive pattern generated from the font list (so
      // schema tools accept what validate-kit accepts), with exact names as examples.
      .meta({ pattern: familyPattern, examples: [...supportedFamilies] })
      .describe(
        `One of the supported families: ${supportedFamilies.join(", ")}. Any casing is accepted and normalized; exact casing is recommended`,
      ),
    category: z
      .enum(fontCategories)
      .optional()
      .describe("Optional metadata (serif, sans-serif or display). It never changes which font loads"),
  })
  .superRefine((choice, ctx) => {
    if (!findFont(choice.family)) {
      ctx.addIssue({ code: "custom", path: ["family"], message: unsupportedFontMessage(choice.family, choice.category) });
    }
  })
  // Normalize casing, e.g. "playfair display" -> "Playfair Display".
  .overwrite((choice) => ({ ...choice, family: findFont(choice.family)?.family ?? choice.family }));

const aspectRatio = z
  .string()
  .regex(/^\d{1,2}:\d{1,2}$/, 'Use "width:height", for example "4:3"')
  .describe('Aspect ratio "w:h", e.g. "4:3"');

export const brandKitSchema = z.strictObject({
  $schema: z.string().optional().describe("Optional path to brand-kit.schema.json for editor validation"),
  kitVersion: z.literal(BRAND_KIT_VERSION).describe("Brand kit format version. Currently 1"),
  source: z
    .strictObject({
      generator: z.string().min(1).describe('What produced the kit, e.g. "beacon-brand-interview"'),
      generatorVersion: z.string().optional(),
      interviewId: z.string().optional(),
      createdAt: z.iso.datetime({ offset: true }).describe("ISO 8601 timestamp"),
      approvedBy: z.string().optional().describe("Who approved the kit (e.g. the client)"),
      approvedAt: z.iso.datetime({ offset: true }).optional(),
      notes: z.string().optional(),
    })
    .describe("Where the kit came from"),

  palette: z
    .strictObject({
      primary: hex.describe("Main brand color: header, hero, headings"),
      accent: hex.describe("Call-to-action color: quote buttons, highlights"),
      surface: hex.describe("Page background"),
      text: hex.describe("Body text on the surface color"),
      secondary: hex
        .optional()
        .describe("Secondary buttons, badges and icon tiles. Default: a light tint of primary (primary 10% over surface)"),
      card: hex.optional().describe("Card background. Default: white at 60% over surface"),
      muted: hex.optional().describe("Secondary text. Default: text blended toward surface"),
      border: hex.optional().describe("Card and input borders. Default: text at low contrast"),
      success: hex.optional().describe("Success messages. Default #2e7d32"),
      warning: hex.optional().describe("Warnings. Default #b26a00"),
      danger: hex.optional().describe("Errors. Default #b3261e"),
    })
    .describe("Named color roles. Text on primary/accent/secondary is derived; text pairs must meet WCAG AA (see README)"),

  fonts: z.strictObject({
    heading: fontChoice,
    body: fontChoice,
  }),

  logo: z.strictObject({
    variant: z.enum(["wordmark", "icon", "combo"]).describe("wordmark = name only, icon = mark only, combo = mark + name"),
    showName: z.boolean().describe("Show the business name as text beside the logo in the header"),
    alt: z.string().min(1).describe("Alt text for the logo"),
    onLight: assetSchema.describe("Logo for light backgrounds (required)"),
    onDark: assetSchema.optional().describe("Logo for dark backgrounds (footer, Open Graph image)"),
    icon: assetSchema
      .optional()
      .describe("Square mark used as the favicon source. Default: onLight when variant is icon, else generated initials"),
  }),

  iconStyle: z
    .strictObject({
      style: z.enum(["outline", "solid", "duotone"]).default("outline"),
      weight: z.enum(["thin", "light", "regular", "bold"]).default("regular").describe("Stroke weight for outline icons"),
      corners: z.enum(["rounded", "sharp"]).default("rounded").describe("Shape of the tiles behind icons"),
    })
    .default({ style: "outline", weight: "regular", corners: "rounded" }),

  imageDirection: z
    .strictObject({
      mood: z.string().min(1).describe('Overall feel, e.g. "warm, tidy, neighborly"'),
      style: z.string().optional().describe('Photo style, e.g. "natural light, documentary, no heavy filters"'),
      subjects: z.array(z.string().min(1)).default([]).describe("What photos should show"),
      avoid: z.array(z.string().min(1)).default([]).describe("What photos must not show"),
      aspectRatios: z
        .strictObject({ hero: aspectRatio.default("4:3"), gallery: aspectRatio.default("4:3") })
        .default({ hero: "4:3", gallery: "4:3" }),
    })
    .describe("Guidance for the photo/gallery pipeline. Metadata only for now"),

  swatch: assetSchema.optional().describe("Palette swatch image from the interview. Metadata only"),
});

/** What the interview emits (defaults may be omitted). */
export type BrandKitInput = z.input<typeof brandKitSchema>;
/** Validated kit with defaults applied. */
export type BrandKit = z.output<typeof brandKitSchema>;
export type BrandAsset = z.output<typeof assetSchema>;
