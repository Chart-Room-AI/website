/**
 * Public site knobs — prefer env overrides for local/production without committing secrets.
 */

export const siteConfig = {
  name: "Chart Room AI",
  legalName: "Chart Room AI LLC",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.chartroomai.com",
  tagline: "Operator-led AI transformation for regulated financial firms",

  positioningShort:
    "Chart Room AI unsticks stalled AI initiatives in regulated financial firms with operator-led strategy, governance, and production delivery.",

  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "info@chartroomai.com",

  linkedInHref:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ??
    "https://www.linkedin.com/in/marc-cheatham-83b35b22/",

  bookingHref:
    process.env.NEXT_PUBLIC_BOOKING_URL ?? "/contact#diagnostic-form",

  auditHref:
    process.env.NEXT_PUBLIC_AUDIT_URL ?? "/contact#diagnostic-form",

  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "/api/contact",

  resumeHref:
    process.env.NEXT_PUBLIC_RESUME_URL ?? "/documents/Marc-Cheatham-Resume.pdf",

  /** Most recent CTO / CEO chapter — employer name disclosed on site */
  priorVentureName: "Caravel Concepts",

  /** One-line sector label (appears in Experience meta + About) */
  priorVentureTagline: "B2B fintech software",
} as const;
