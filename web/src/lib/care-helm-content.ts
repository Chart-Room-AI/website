import { careHelmConfig } from "@/lib/care-helm-config";

export const careHelmNav = [
  { href: "#challenge", label: "The Challenge" },
  { href: "#approach", label: "Our Approach" },
  { href: "#audiences", label: "Who We Serve" },
  { href: "#benefits", label: "Benefits" },
  { href: "#trust", label: "Why Us" },
  { href: "#demo", label: "Request a Demo" },
] as const;

export const careHelmHero = {
  eyebrow: "Care coordination for rotating caregivers",
  headline: "Clear guidance for every shift. Peace of mind for every family.",
  subheadline:
    "The Care Helm gives caregivers clear, touch-friendly guidance at the point of care — while families and care organizations keep instructions current from anywhere.",
  primaryCta: "Request a Personalized Demo",
  secondaryCta: "See how it works",
} as const;

export const careHelmTrustBar = [
  "Designed for assisted living and home care",
  "Offline-first daily reliability",
  "Family-connected care plans",
] as const;

export const careHelmChallenge = {
  title: "Every shift handoff is a chance for something important to be missed.",
  body: "Rotating caregivers rely on binders, sticky notes, and verbal handoffs that break down when staff change, instructions update, or connectivity fails. Families deserve continuity without adding burden to the people doing the work.",
  cards: [
    {
      title: "Instructions go stale",
      body: "Printed checklists and binders fall out of date the moment a routine changes.",
    },
    {
      title: "New caregivers start cold",
      body: "Substitute staff should not have to guess how this household or community handles care.",
    },
    {
      title: "Handoffs get lost",
      body: "Notes on scrap paper rarely survive the transition from evening to overnight.",
    },
    {
      title: "Families lack visibility",
      body: "Remote family authors need confidence that the plan in the home matches the plan they wrote.",
    },
  ],
} as const;

export const careHelmApproach = {
  title: "A calm screen at the bedside. A secure portal for the people who know the plan.",
  body: `${careHelmConfig.productName} combines a wall-mounted care screen where caregivers work with a cloud portal where families and organizations author, preview, and publish updates.`,
  pillars: [
    {
      title: "At the point of care",
      body: "Caregivers open the screen and follow shift-aware guidance — no login friction on care pages.",
    },
    {
      title: "Authored by people who know the resident",
      body: "Routines, guides, and contacts reflect this person and this household — not generic training.",
    },
    {
      title: "Reliable when Wi‑Fi is not",
      body: "Daily caregiver workflows continue on the device after content syncs, even when the internet drops.",
    },
    {
      title: "Updated from anywhere",
      body: "Authorized family or staff publish changes that reach enrolled devices on a regular schedule.",
    },
  ],
} as const;

export const careHelmAudiences = [
  {
    title: "Families & Decision Makers",
    bullets: [
      "Peace of mind that your instructions are always within reach",
      "Remote updates without flying in to revise a binder",
      "Visibility into what was noted during the day",
    ],
  },
  {
    title: "Assisted Living & Memory Care",
    bullets: [
      "Consistent routines with room for resident-specific detail",
      "Faster onboarding for new caregivers at each site",
      "Central management across locations and devices",
    ],
  },
  {
    title: "Home Care Agencies",
    bullets: [
      "Site-specific instructions at every client visit",
      "Continuity across rotating staff and substitutes",
      "Less paperwork at the point of care",
    ],
  },
] as const;

export const careHelmBenefits = [
  {
    title: "Continuity across shifts",
    body: "Morning, evening, and overnight priorities stay aligned so handoffs carry context, not guesswork.",
  },
  {
    title: "Family involvement without daily calls",
    body: "Authors update the plan remotely; caregivers see the same routines and references at the bedside.",
  },
  {
    title: "Less paperwork for caregivers",
    body: "Quick notes and structured observations replace separate log sheets during the shift.",
  },
  {
    title: "Personal to each resident",
    body: "First-name personalization and household-specific guidance preserve dignity and familiarity.",
  },
  {
    title: "Steady when connectivity is not",
    body: "Offline-first operation keeps daily care moving after content is synced to the device.",
  },
  {
    title: "Built for regulated rigor",
    body: "Developed by a former fintech CTO with decades bringing production systems to environments that demand reliability and security discipline.",
  },
] as const;

export const careHelmTrust = {
  title: "Built by people who understand production systems — and real care workflows.",
  body: "The Care Helm comes from Chart Room AI, led by Marc Cheatham — former CTO and acting CEO with more than three decades bringing governed, production-ready systems to regulated environments. That same reliability mindset shapes how care content is authored, secured, and delivered to the point of care.",
  callout:
    "The Care Helm blends Chart Room AI's nautical navigation heritage with human-centered senior care — designed for dignity, clarity, and continuity.",
  linkLabel: "Learn about Chart Room AI",
} as const;

export const careHelmDemo = {
  title: "See how The Care Helm can support your residents and families",
  body: "Book a discovery conversation to walk through fit for your home, community, or agency. Early adopter pilot opportunities may be available for select organizations.",
  note: "We respond to demo requests within two business days.",
} as const;
