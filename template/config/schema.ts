import { z } from "zod";

/**
 * Per-client site config schema.
 *
 * Every design reads this same shape, so a client can switch designs without
 * re-entering content. All page text and brand settings live in the client's
 * config file; components must not hard-code client-specific copy.
 *
 * No secrets belong here. Email credentials and bot-protection keys stay in
 * Vercel environment variables (see template/README.md).
 */

/** Designs a config may pick. Each id must be registered in designs/index.ts. */
export const designIds = ["classic"] as const;
export type DesignId = (typeof designIds)[number];

/** Fonts a config may pick. Each id is loaded in src/lib/fonts.ts. */
export const fontIds = ["inter", "source-sans-3", "montserrat", "lora", "fraunces"] as const;
export type FontId = (typeof fontIds)[number];

const hexColor = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/, "Use a 6-digit hex color, for example #2f5d3a");

/** Site-relative path to a file in template/public, for example /clients/acme/logo.svg. */
const publicPath = z
  .string()
  .regex(/^\/[^/]/, "Use a path that starts with / and points into template/public");

const image = z.object({
  src: publicPath,
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

/** US phone shown as written; the click-to-call link is derived from its digits. */
const phone = z
  .string()
  .refine((value) => value.replace(/\D/g, "").replace(/^1/, "").length === 10, {
    message: "Use a 10-digit US phone number, for example (804) 555-0142",
  });

export const socialPlatforms = [
  "facebook",
  "instagram",
  "google",
  "nextdoor",
  "yelp",
  "youtube",
  "linkedin",
  "x",
] as const;

export const clientConfigSchema = z.object({
  /** Matches the file name in config/clients and the CLIENT_CONFIG value. */
  id: z.string().regex(/^[a-z0-9-]+$/),
  /**
   * True for placeholder/demo content. The design shows a "sample content"
   * banner and the site is marked noindex.
   */
  sample: z.boolean(),
  design: z.enum(designIds),

  business: z.object({
    name: z.string().min(1),
    /** Short line under the name: header, hero eyebrow, Open Graph image. */
    tagline: z.string().min(1),
  }),

  brand: z.object({
    colors: z.object({
      /** Main brand color: header, hero, headings. */
      primary: hexColor,
      /** Call-to-action color: quote buttons, highlights. */
      accent: hexColor,
      /** Page background. */
      surface: hexColor,
      /** Body text on the surface color. */
      text: hexColor,
    }),
    logo: image,
    fonts: z.object({
      heading: z.enum(fontIds),
      body: z.enum(fontIds),
    }),
  }),

  hero: z.object({
    headline: z.string().min(1),
    subheadline: z.string().min(1),
    image,
    quoteCtaLabel: z.string().min(1),
  }),

  services: z
    .array(
      z.object({
        name: z.string().min(1),
        summary: z.string().min(1),
        details: z.array(z.string().min(1)).default([]),
      }),
    )
    .min(1),

  gallery: z.array(image.extend({ caption: z.string().optional() })),

  reviews: z.array(
    z.object({
      author: z.string().min(1),
      location: z.string().optional(),
      rating: z.number().int().min(1).max(5),
      text: z.string().min(1),
    }),
  ),

  about: z.object({
    heading: z.string().min(1),
    paragraphs: z.array(z.string().min(1)).min(1),
    highlights: z.array(z.string().min(1)).default([]),
  }),

  contact: z.object({
    phone,
    email: z.email(),
    address: z.object({
      street: z.string().min(1).optional(),
      city: z.string().min(1),
      region: z.string().length(2),
      postalCode: z.string().regex(/^\d{5}$/),
    }),
    hours: z.array(z.string().min(1)).default([]),
    /**
     * Which mailbox type sends quote-form email. Credentials for either
     * provider live in Vercel env vars only (wired in a later slice of #21).
     */
    provider: z.enum(["m365", "gmail"]),
  }),

  serviceArea: z.object({
    summary: z.string().min(1),
    places: z.array(z.string().min(1)).min(1),
  }),

  social: z.array(
    z.object({
      platform: z.enum(socialPlatforms),
      url: z.url(),
    }),
  ),

  seo: z.object({
    /** Canonical site origin, used for metadataBase and Open Graph URLs. */
    siteUrl: z.url(),
    title: z.string().min(1).max(70),
    description: z.string().min(1).max(160),
    locale: z.string().default("en_US"),
  }),
});

/** Shape authors write in config/clients/*.ts (defaults may be omitted). */
export type ClientConfigInput = z.input<typeof clientConfigSchema>;
/** Validated config with defaults applied; this is what designs receive. */
export type ClientConfig = z.output<typeof clientConfigSchema>;
