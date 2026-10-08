import type { ClientConfigInput } from "../schema";

/**
 * SAMPLE / PLACEHOLDER CONTENT. NOT REAL CLIENT DATA.
 *
 * Dry Creek Landscaping (Midlothian, VA) is the first planned client for the
 * template (epic #20), but everything below is made-up example copy written for
 * the template build. Intake (#22) will replace it with approved copy and photos.
 *
 * - Phone numbers use the reserved fictional 555-01xx range.
 * - Emails and links use example.com.
 * - Images are local placeholder SVGs in public/clients/dry-creek-sample/.
 * - Reviews are invented placeholders, not real customer reviews.
 */
const img = "/clients/dry-creek-sample";

export const dryCreekSample = {
  id: "dry-creek-sample",
  sample: true,
  design: "classic",

  business: {
    name: "Dry Creek Landscaping",
    tagline: "Lawn care and landscaping in Midlothian, VA",
  },

  brand: {
    colors: {
      primary: "#2f5d3a",
      accent: "#d9822b",
      surface: "#f7f5ef",
      text: "#1f2a22",
    },
    logo: { src: `${img}/logo.svg`, alt: "Dry Creek Landscaping logo (placeholder)", width: 48, height: 48 },
    fonts: { heading: "fraunces", body: "inter" },
  },

  hero: {
    headline: "A yard you're proud to come home to.",
    subheadline:
      "Placeholder copy: mowing, planting, mulch and hardscapes for homes around Midlothian, done on schedule by a crew that cleans up after itself.",
    image: { src: `${img}/hero.svg`, alt: "Placeholder photo: a freshly edged front lawn", width: 1200, height: 900 },
    quoteCtaLabel: "Get a free quote",
  },

  services: [
    {
      name: "Lawn care",
      summary: "Weekly or biweekly mowing, edging and blowing, with seasonal fertilizing.",
      details: ["Mowing, edging and cleanup", "Fertilizer and weed control", "Fall aeration and overseeding"],
    },
    {
      name: "Planting and beds",
      summary: "New beds, shrubs and seasonal color planned for Virginia's climate.",
      details: ["Bed design and install", "Shrub and tree planting", "Seasonal annuals"],
    },
    {
      name: "Mulch and cleanups",
      summary: "Spring and fall cleanups, fresh mulch and leaf removal.",
      details: ["Spring and fall cleanups", "Mulch delivery and spreading", "Leaf removal"],
    },
    {
      name: "Hardscapes",
      summary: "Patios, walkways and retaining walls built to last.",
      details: ["Paver patios and walkways", "Retaining walls", "Drainage fixes"],
    },
  ],

  gallery: [
    { src: `${img}/gallery-1.svg`, alt: "Placeholder photo: paver patio", width: 800, height: 600, caption: "Paver patio (placeholder)" },
    { src: `${img}/gallery-2.svg`, alt: "Placeholder photo: front bed planting", width: 800, height: 600, caption: "Front bed planting (placeholder)" },
    { src: `${img}/gallery-3.svg`, alt: "Placeholder photo: fresh mulch", width: 800, height: 600, caption: "Spring mulch (placeholder)" },
    { src: `${img}/gallery-4.svg`, alt: "Placeholder photo: retaining wall", width: 800, height: 600, caption: "Retaining wall (placeholder)" },
  ],

  reviews: [
    {
      author: "Sample customer A",
      location: "Midlothian",
      rating: 5,
      text: "Placeholder review: they showed up when they said they would and the yard has never looked better.",
    },
    {
      author: "Sample customer B",
      location: "Chesterfield",
      rating: 5,
      text: "Placeholder review: quick quote, fair price, and the new patio was done in a week.",
    },
    {
      author: "Sample customer C",
      location: "Powhatan",
      rating: 4,
      text: "Placeholder review: great fall cleanup, and they hauled everything away.",
    },
  ],

  about: {
    heading: "Local crews, local yards",
    paragraphs: [
      "Placeholder copy: Dry Creek Landscaping looks after lawns and gardens across Midlothian and the surrounding counties.",
      "This paragraph will be replaced with the owner's story and approved details after the intake call (#22).",
    ],
    highlights: ["Placeholder: locally owned", "Placeholder: free written quotes", "Placeholder: crews that clean up"],
  },

  contact: {
    phone: "(804) 555-0142",
    email: "quotes@example.com",
    address: { street: "100 Placeholder Lane", city: "Midlothian", region: "VA", postalCode: "23112" },
    hours: ["Mon–Fri 7:00 AM – 6:00 PM", "Sat 8:00 AM – 12:00 PM"],
    provider: "m365",
  },

  serviceArea: {
    summary: "Serving Midlothian and nearby communities.",
    places: ["Midlothian", "Chesterfield", "Richmond", "Powhatan", "Moseley"],
  },

  social: [
    { platform: "facebook", url: "https://www.example.com/placeholder-facebook" },
    { platform: "google", url: "https://www.example.com/placeholder-google-reviews" },
  ],

  seo: {
    siteUrl: "https://dry-creek-sample.example.com",
    title: "Dry Creek Landscaping | Lawn Care in Midlothian, VA (sample)",
    description:
      "Sample template site: lawn care, planting, mulch and hardscapes in Midlothian, VA. Placeholder content.",
  },
} satisfies ClientConfigInput;
