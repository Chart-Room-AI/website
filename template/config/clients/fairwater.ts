import type { BrandKitInput } from "../brand-kit";
import type { ClientConfigInput } from "../schema";
// The brand block is the approved Workhorse brand kit (chartroom-ops #72), dropped in unchanged.
import brandKit from "./fairwater.brand-kit.json";

/**
 * FAIRWATER HOME SERVICES: FICTIONAL DEMO FIRM. NOT A REAL BUSINESS.
 *
 * Preview build for chartroom-ops #73 (first run of website #22 and #23).
 *
 * Facts used here come only from chartroom-ops #26 (firm name, the four trades,
 * owner Avery Lang, office coordinator Robin Hale, office mail on a shared
 * `office@` mailbox) and from the approved brand kit (#72: colors, fonts, logo,
 * trade names, the sample hero line).
 *
 * Every value marked PLACEHOLDER is a missing fact. They are shown as
 * placeholders on the page and must be replaced before launch:
 * - Phone: the schema needs a 10-digit number, so it uses the reserved
 *   fictional 555-0100 and the visible text says "Placeholder".
 * - Email: no Fairwater domain is bought yet (#26), so the reserved .example domain.
 * - Address and ZIP: none decided. City/state/ZIP are visible placeholders.
 * - Service area, hours, social links: none decided.
 * - Photos: none. The hero is a labeled placeholder; the gallery is empty.
 * - Reviews: none. Reviews are never written for a client.
 * - siteUrl: placeholder until the domain is bought (#26, website #25).
 */
export const fairwater = {
  id: "fairwater",
  sample: true,
  design: "classic",

  business: {
    name: "Fairwater Home Services",
    tagline: "Heating & cooling, lawn & landscaping, house cleaning and power washing",
  },

  brand: brandKit as BrandKitInput,

  hero: {
    // Sample hero line from the approved brand guide (#72, section 5).
    headline: "One call. Four trades. Done right.",
    subheadline: "Heating and cooling, lawn care, house cleaning, and power washing.",
    image: {
      file: "hero.svg",
      alt: "Photo placeholder: no Fairwater photos yet",
      width: 1600,
      height: 900,
    },
    quoteCtaLabel: "Book a crew",
  },

  // Trade names and order from the brand guide; the trades themselves are from #26.
  services: [
    {
      name: "Heating & Cooling (HVAC)",
      // The brand kit names Phosphor "fan"; the template's icon list has no fan yet.
      icon: "thermometer",
      summary: "Heating and cooling service for your home.",
    },
    {
      name: "Lawn & Landscaping",
      icon: "plant",
      summary: "Lawn care and landscaping for your yard.",
    },
    {
      name: "House Cleaning",
      icon: "sparkle",
      summary: "House cleaning, inside the home.",
    },
    {
      name: "Power Washing",
      icon: "drop",
      summary: "Power washing for drives, decks and siding.",
    },
  ],

  // PLACEHOLDER: no Fairwater photos yet.
  gallery: [],

  // No reviews. Reviews are never written or edited for a client (brand guide, section 5).
  reviews: [],

  about: {
    heading: "One firm, four trades",
    paragraphs: [
      "Fairwater Home Services handles heating and cooling, lawn and landscaping, house cleaning, and power washing.",
      "Avery Lang is the owner. Robin Hale is the office coordinator.",
      "PLACEHOLDER: the firm's story and approved details go here.",
    ],
  },

  contact: {
    // PLACEHOLDER: no phone number yet. 555-0100 is a reserved fictional number.
    phone: "Placeholder (555) 555-0100",
    // PLACEHOLDER: office@ is the shared mailbox from #26; the domain isn't bought yet.
    email: "office@fairwater-placeholder.example",
    // PLACEHOLDER: no address yet.
    address: { city: "Placeholder city", region: "XX", postalCode: "00000" },
    provider: "m365",
  },

  // PLACEHOLDER: no service area yet.
  serviceArea: {
    summary: "Placeholder: service area not decided yet.",
    places: ["Placeholder: service area"],
  },

  // PLACEHOLDER: no social links yet.
  social: [],

  seo: {
    // PLACEHOLDER until the Fairwater domain is bought (#26, website #25).
    siteUrl: "https://fairwater-placeholder.example",
    title: "Fairwater Home Services | HVAC, Lawn, Cleaning, Power Washing (sample)",
    description:
      "Sample site for a fictional demo firm: heating and cooling, lawn and landscaping, house cleaning, and power washing. Placeholder contact details.",
  },
} satisfies ClientConfigInput;
