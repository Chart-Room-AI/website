import { bosunConfig } from "@/lib/bosun-config";

export const bosunNav = [
  { href: "/bosun#problem", label: "The Problem" },
  { href: "/bosun#what-it-does", label: "What It Does" },
  { href: "/bosun#websites", label: "Websites" },
  { href: "/bosun#how-it-works", label: "How It Works" },
  { href: "/bosun#plans", label: "Plans" },
  { href: "/bosun#get-started", label: "Get Started" },
] as const;

export const bosunHero = {
  eyebrow: "Meet Bosun, your office teammate",
  headlineLead: "Get your",
  headlineHighlight: "evenings",
  headlineTail: "back.",
  subheadline:
    "An office teammate that handles your email, calendar, and bills, so you can stay on the job. You just tell it what you need in plain English.",
  primaryCta: "Book a free 15-minute call",
  secondaryCta: "See plans",
} as const;

export const bosunWhatABosunIs = `On a ship, the bosun (${bosunConfig.pronunciation}) is the officer who keeps the deck and gear in order so everything's ready when it's needed. Bosun does the same for your office: mail filed, calendar straight, bills tracked.`;

export const bosunTrustBar = [
  "Built for small trade and service businesses",
  "You approve everything that goes out",
  "Business-hours support from a real person",
] as const;

export const bosunProblem = {
  title: "You run the jobs. The office work follows you home.",
  body: "Landscapers, lawn care crews, power washers, cleaners, handymen, and small contractors with 1 to 10 people: the work gets done during the day, and the office work waits until night.",
  cards: [
    {
      title: "Nights at the kitchen table",
      body: "Email, scheduling, and paperwork pile up until the day's jobs are done.",
    },
    {
      title: "Quote requests sit unanswered",
      body: "A new request comes in while you're on a job, and by the time you reply, the moment may have passed.",
    },
    {
      title: "Unpaid invoices slip",
      body: "Bills and invoices are scattered across your inbox, so following up falls behind.",
    },
    {
      title: "Looking too small for bigger bids",
      body: "Without a website, or with only a Facebook page, a solid crew can look smaller than it is.",
    },
  ],
} as const;

export const bosunDay = {
  title: "A day with Bosun",
  example: "Example: a lawn care owner",
  slots: [
    {
      when: "Morning",
      time: "6:30 AM",
      body: "Your morning brief: today's jobs, appointments, and anything urgent in email.",
    },
    {
      when: "Midday",
      time: "12:00 PM",
      body: "Replies to new quote requests are drafted. You read them, tap approve, and they go out.",
    },
    {
      when: "Afternoon",
      time: "3:30 PM",
      body: "A list of unpaid invoices is ready, so you know exactly who to follow up with.",
    },
    {
      when: "Evening",
      time: "7:00 PM",
      body: "Done. No paperwork at the kitchen table tonight.",
    },
  ],
} as const;

export const bosunCapabilities = {
  title: "What Bosun does for your office",
  tiles: [
    {
      title: "Email, handled",
      body: "Keeps your inbox tidy: files mail into folders, flags what needs you, and drafts replies. You approve before anything is sent.",
    },
    {
      title: "Calendar, straight",
      body: "Gets estimates and jobs onto the calendar, finds open times, and sets reminders.",
    },
    {
      title: "Bills, tracked",
      body: "Pulls invoices, receipts, and bills from your email into one running list.",
    },
    {
      title: "Routines on autopilot",
      body: "Runs tasks on a schedule, like a morning summary or a weekly unpaid-invoice list.",
    },
    {
      title: "Research, fast",
      body: "Looks things up on the web: a supplier, a price, a permit question.",
    },
    {
      title: "Docs on request",
      body: "Creates quotes, spreadsheets, and summaries. Just ask from your phone or computer.",
    },
  ],
} as const;

export const bosunWebsite = {
  title: "A website that wins bigger jobs.",
  body: "A simple website makes a small crew look established. We build it from Chart Room's template, with a quote form that sends requests straight to your email.",
  priceAnchor: "Websites from $1,500",
  pricingNote: "We'll scope your site and quote it on a free 15-minute call.",
  points: [
    "4 to 5 pages built from Chart Room's template",
    "A quote form that sends to your email",
    "You own your domain and your content",
  ],
} as const;

export const bosunSteps = [
  {
    title: "Set up",
    body: "We set up Bosun on your own account and get it ready for your business.",
  },
  {
    title: "Train",
    body: "About 2 hours of hands-on training. No special tech skills needed.",
  },
  {
    title: "Support",
    body: "A monthly check-up with your approval, and help from a real person during business hours.",
  },
] as const;

export type BosunPlan = {
  name: string;
  /** Anchor price shown on the card (Marc, 2:57 PM ET Oct 8, 2026: Basic only). */
  priceAnchor?: string;
  includedHelp: string;
  response: string;
  features: readonly string[];
  recommended?: boolean;
};

const everyPlanIncludes = [
  "Hosting, domain, and SSL",
  "Monthly Bosun check-up, with your approval",
  "Monthly website health report",
] as const;

export const bosunPlans: readonly BosunPlan[] = [
  {
    name: "Basic",
    priceAnchor: "From $49/month",
    includedHelp: "None",
    response: "Within 2 business days",
    features: everyPlanIncludes,
  },
  {
    name: "Standard",
    includedHelp: "30 min",
    response: "Next business day",
    recommended: true,
    features: [
      ...everyPlanIncludes,
      "Monthly quote-request summary",
      "Social media post drafts (2 a month)",
    ],
  },
  {
    name: "Plus",
    includedHelp: "1 hr (includes a 30-min screen-share)",
    response: "Same business day if received by noon",
    features: [
      ...everyPlanIncludes,
      "Monthly quote-request summary",
      "Social media post drafts (4 a month)",
    ],
  },
];

export const bosunPlansAnchor = "Plans start at $49/month";

export const bosunPricingCta = {
  label: "Pricing on a quick call",
  body: "We'll walk through pricing for each plan, and for your website, on a free 15-minute call.",
  button: "Book a free 15-minute call",
} as const;

export const bosunPlanNotes = [
  "Annual plans add a seasonal refresh twice a year, up to 1 hour each.",
] as const;

export const bosunInCharge = {
  title: "You stay in charge.",
  points: [
    {
      title: "It never sends on its own",
      body: "Bosun drafts the reply; you approve it. Nothing goes out until you say so.",
    },
    {
      title: "It moves mail, never deletes it",
      body: "Mail gets filed into folders and flagged. Nothing is thrown away.",
    },
    {
      title: "If it's down, nothing breaks",
      body: "Nothing it does is business-critical. You can always do it the normal way, by hand.",
    },
  ],
} as const;

export const bosunFaq = [
  {
    question: "What do I pay for separately?",
    answer:
      "Bosun runs on an AI assistant set up on your own account. You pay for that account and its assistant upgrade directly, along with your email service. Those aren't billed by Chart Room AI.",
  },
  {
    question: "Do I own my website?",
    answer:
      "Yes. You own your domain and your content. If you ever want to move your site elsewhere, we'll hand it off. We cover the details on your call.",
  },
  {
    question: "What if I cancel?",
    answer:
      "Plan terms, including what happens if you leave early, are covered on your free 15-minute call before you sign up.",
  },
  {
    question: "Is support available around the clock?",
    answer:
      "No. Support is during business hours, from a real person. Response times depend on your plan.",
  },
  {
    question: "How do I pay?",
    answer:
      "Zelle, ACH, or card. We'll go over payment details on your free 15-minute call.",
  },
] as const;

export const bosunOnePager = {
  href: "/bosun/bosun-by-chart-room-ai.pdf",
  label: "Download the one-pager",
  meta: "(PDF, 300 KB)",
} as const;

export const bosunCta = {
  title: "Ready for a teammate who handles the office?",
  body: "Let's talk about setting up Bosun for your business. Share a few details and we will follow up to set up a free 15-minute call.",
} as const;
