import { siteConfig } from "@/lib/site-config";

export const mailHref = `mailto:${siteConfig.contactEmail}?subject=AI%20initiative%20inquiry%20-%20Chart%20Room%20AI`;
export const diagnosticRequestHref = "/contact#diagnostic-form";
export const bookingHref = siteConfig.bookingHref;
export const auditHref = siteConfig.auditHref;

export const routes = [
  { href: "/", label: "Home" },
  { href: "/why-chart-room", label: "Why us" },
  { href: "/expertise", label: "Expertise" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const brandImages = {
  lockup: "/brand/chart-room-ai-lockup.png",
  ship: "/brand/ship-constellation.png",
  spyglass: "/brand/spyglass.png",
  telescope: "/brand/telescope.png",
  sextantBoat: "/brand/sextant-boat.png",
  shipsWheelCompass: "/brand/ships-wheel-compass-rose.png",
  sailingConstellation: "/brand/sailing-constellation.png",
} as const;

export const audience = [
  "Banks",
  "Broker-dealers",
  "Wealth and asset management firms",
  "Insurance carriers and distributors",
  "Fintech vendors serving regulated institutions",
  "Enterprise SaaS teams where auditability, data residency, and model risk matter",
] as const;

export const proofPoints = [
  {
    value: "25+",
    label: "years as CTO and CISO in financial industry environments",
  },
  {
    value: "$10B",
    label: "asset manager technology organization built and led",
  },
  {
    value: "Several-fold",
    label: "increase in completed project-management work after governed workflow maturity",
  },
  {
    value: "Audit-ready",
    label: "security policies, controls, evaluations, and production release discipline",
  },
] as const;

export const heroStats = [
  "Former CTO and CISO",
  "Built multi-agent AI and DevOps frameworks before selling them",
  "Designed enterprise security policies that passed external audits",
] as const;

export const beforeAfter = {
  before: [
    {
      title: "Project management is broken",
      body: "Tickets are vague. Engineers resent the documentation treadmill. PMs chase updates while leadership has zero visibility.",
    },
    {
      title: "AI initiatives are stalled",
      body: "The board wants a roadmap. Pilots exist. Compliance keeps saying too risky. Everyone can see the market moving.",
    },
    {
      title: "DevOps is still decades old",
      body: "You hear about agentic AI multiplying productivity, but one wrong move can damage your FINRA, SEC, or audit posture.",
    },
  ],
  after: [
    "Developers stop wasting time on tickets and status updates and get back to real problem-solving.",
    "Project managers get rich, accurate, real-time visibility instead of chasing ghosts.",
    "Leadership gets a credible AI program they can take to the board with confidence.",
  ],
} as const;

export const outcomeMetrics = [
  {
    title: "Business visibility",
    before: "Sprint tickets did not consistently show why the work mattered.",
    after: "Project work links back to critical business needs with less documentation drag.",
  },
  {
    title: "Advisor prep",
    before: "First-pass plan analysis took multiple hours of screen-by-screen review.",
    after: "Advisor prep time drops from hours to minutes.",
  },
  {
    title: "Release confidence",
    before: "Sparse handoffs and unfinished sprint work made release confidence harder to defend.",
    after: "Predictable bi-weekly production releases.",
  },
  {
    title: "Service scale",
    before: "More client work meant more manual analysis, status chasing, and coordination load.",
    after: "Scale client service without scaling headcount or replacing your people.",
  },
] as const;

export const proofStories = [
  {
    eyebrow: "Caravel Concepts",
    title: "The operating model was proven internally before it became an offering.",
    body: "Sprint work was moving through a traditional agile process, but ticket detail stayed sparse and management could not reliably connect day-to-day work back to critical business needs. Caravel connected its project-management system to the agentic developer workspace so context flowed in and implementation detail flowed back out.",
    control:
      "Research, statement-of-work, implementation, and merge-request phases all required sign-off, with branch approval before merge.",
    result:
      "Completed project-management work increased several-fold after workflow maturity while leadership gained clearer visibility and faster release confidence.",
  },
  {
    eyebrow: "Independent RIA",
    title: "Manual advisor prep became controlled plan analysis.",
    body: "After running a client plan, the advisor spent multiple hours moving through screens, gathering cash-flow, tax, and planning details, and forming the first-pass analysis. The agentic workflow retrieved approved plan data, including persisted data behind the screens, and produced the initial quantitative readout.",
    control:
      "Plan-level access checks, read-only source data, sandboxed what-if analysis, and advisor review protected the original plan.",
    result:
      "Advisor prep time dropped from hours to minutes, helping the advisor reach higher-level planning judgment faster.",
  },
] as const;

export const differentiators = [
  "C-suite strategy, project management, compliance, and deep engineering inside the same regulated environments.",
  "A tightly integrated special-ops team, not an army of specialists or a single-role hire who needs six months to ramp.",
  "Momentum in weeks, not quarters, because the operating patterns have already been built and proven.",
] as const;

export const commonSituations = [
  {
    title: "AI pilots are stuck in demo mode",
    body: "The business sees promise, but security, data, compliance, ownership, or operating model questions keep blocking production use.",
  },
  {
    title: "Executives need a defensible roadmap",
    body: "Sponsors need a practical sequence of use cases, controls, investment decisions, and delivery milestones they can explain to the board.",
  },
  {
    title: "Vendor noise is outrunning judgment",
    body: "Teams are comparing tools without enough clarity on risk posture, implementation cost, model quality, or durable business value.",
  },
] as const;

export const engagementOptions = [
  {
    title: "AI readiness diagnostic",
    body: "A focused operator-to-operator session that surfaces the blockers, governance gaps, delivery risks, and highest-leverage next move.",
  },
  {
    title: "Roadmap and governance sprint",
    body: "Translate ambition into priorities, decision rights, evaluation discipline, controls, and a delivery path regulated teams can explain to the board.",
  },
  {
    title: "Fractional transformation leadership",
    body: "Ongoing executive and operating support across sponsors, product, engineering, data, security, compliance, and delivery teams when the work must move.",
  },
] as const;

export const fitSignals = [
  "You operate in financial services, fintech, insurance, wealth, asset management, or regulated enterprise software.",
  "You need AI adoption to survive audit, security review, stakeholder scrutiny, and real production operations.",
  "You value operator-led judgment more than generic AI strategy decks or vendor-driven roadmaps.",
] as const;

export const expertiseCards = [
  {
    title: "Leadership and advisory",
    body: "Executive technology strategy, modernization roadmaps, operating cadence, venture narrative, and sponsor alignment across product, engineering, and risk.",
  },
  {
    title: "Engineering and platforms",
    body: "Fintech systems leadership across capital market assumption engines, Monte Carlo simulation, asset-liability mapping, trading workflows, financial planning tools, and security master databases, supported by TDD, CI/CD, and production delivery discipline.",
  },
  {
    title: "AI systems and automation",
    body: "Multi-agent architectures, human-in-loop workflows, evaluation harnesses, model quality gates, prompt/version discipline, and AI-assisted engineering loops.",
  },
  {
    title: "Security and compliance",
    body: "CISO-style ownership, information security policy scaffolding, audit-friendly controls, vendor diligence, rollback discipline, and practical governance that does not freeze delivery.",
  },
] as const;

export const whyCards = [
  {
    title: "Regulated realism",
    body: "Fractional CTO depth across financial services, tempered by hands-on delivery. We prioritize governance, lineage, approvals, audits, and resilience.",
  },
  {
    title: "From strategy to pipelines",
    body: "Comfortable moving between executive roadmaps, architecture decisions, and implementation details so programs do not stall between business sponsorship and engineering delivery.",
  },
  {
    title: "Responsible AI scaffolding",
    body: "Patterns for evaluations, escalation, rollback, observability, and accountability so AI productivity gains compound instead of becoming brittle proofs of concept.",
  },
] as const;

export const experienceHighlights = [
  {
    title: "Platform and engineering",
    items: [
      "Directed build-out of trading workflows, holistic wealth and planning experiences, Monte Carlo / capital-market-assumption engines, ALM-capable analytics, and client-ready execution paths.",
      "Owned reliability, observability, release discipline, and pragmatic SDLC norms so speed did not abandon auditability or rollback.",
    ],
  },
  {
    title: "Data foundations",
    items: [
      "Built and evolved broad securities and instrument masters spanning equities, fixed income, funds, ETFs, commodities, annuity-related constructs, ingestion, and validation.",
      "Partnered with SMEs on pricing hygiene, lineage concerns, corporate actions, and diligence questionnaires that accompany institutional adoption.",
    ],
  },
  {
    title: "Production AI and productivity",
    items: [
      "Shipped multi-agent workflows for cash-flow exploration, tax-aware scenario thinking, forecasting, and related decision support with guardrails suitable for regulated narratives.",
      "Built evaluation frameworks with automated gates, human-verified baselines, versioned prompts and outputs, and discipline against silent regression.",
    ],
  },
  {
    title: "Commercial, VC, and security leadership",
    items: [
      "Served as the front-line technical voice in sponsor-facing, investor-facing, and large-prospect demos where domain depth had to land with experts.",
      "Held CEO responsibilities during transitional periods while keeping delivery, stakeholder confidence, and internal alignment connected.",
      "Established enterprise information security policies bridging fast-moving delivery with audit-friendly behavior.",
    ],
  },
] as const;
