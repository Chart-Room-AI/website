# GH-10 Research — The Care Helm Marketing Site Section

## Ticket

- Epic: https://github.com/cheezd/website/issues/10
- GitHub Project: https://github.com/users/cheezd/projects/7
- Local workspace: `workspace/GH-10/`

## Current Behavior

The Chart Room AI website (`cheezd/website`) is a Next.js App Router app under `web/`. It serves fractional AI leadership content for regulated financial firms at `chartroomai.com`. There is no Care Helm marketing presence. The Care Helm product runs separately at `dev.carehelm.chartroomai.com` (Studio) with no public landing page.

Site stack:
- Next.js App Router, TypeScript, Tailwind v4
- Brand tokens in `globals.css` (`chart-navy`, `chart-teal`, `chart-gold`, `chart-surface`, `chart-ink`)
- Inter font, shared `SiteHeader` / `SiteFooter` in root layout
- Contact form posts to `/api/contact`

## Problem

Prospective Care Helm customers (families, assisted living operators, home care agencies) need a trustworthy, benefit-focused marketing page that converts to demo/pilot requests — without exposing kiosk UI, feature workflows, or technical architecture.

## Recommendation

Add a **standalone route** `/care-helm` in the existing Next.js repo:

1. **Route groups** — Move main Chart Room AI pages under `(site)/` with their own layout (header/footer). Root layout holds only html/body/font. Care Helm lives under `(care-helm)/care-helm/` with dedicated header/footer.
2. **Single-page landing** — Anchor nav scrolls to sections: Hero, Challenge, Approach, Who We Serve, Benefits (Phase 2), Trust (Phase 2), Demo CTA.
3. **Content module** — `care-helm-content.ts` with high-level copy derived from brochure outline; no proprietary UI details.
4. **Demo form** — Reuse `/api/contact` with Care Helm–specific copy; redirect to existing thank-you flow.
5. **Deploy** — Same Vercel project; subdomain `carehelm.chartroomai.com` via Cloudflare CNAME (ops follow-up, documented in epic closeout).

## Options Considered

| Option | Pros | Cons |
|--------|------|------|
| Route group in same repo (recommended) | Reuses brand tokens, one deploy, consistent stack | Requires moving main pages under `(site)/` |
| Separate repo/site | Full isolation | Duplicate infra, brand drift |
| Section on main homepage | No routing change | Wrong audience, dilutes fintech message |

## Risks

- **IP leakage** — Mitigated by outline rules: no kiosk screenshots, no step-by-step workflows, outcome-focused copy only.
- **Layout bleed** — Mitigated by route group with separate layout (no main site nav on `/care-helm`).
- **Over-promising** — Copy must avoid HIPAA certification, EMR integration, and medical device claims (per product overview accuracy table).

## Dependencies

- Brand guidelines (colors, typography) — available
- Product overview + website outline — provided by stakeholder
- Contact API — existing `/api/contact` (noop or Microsoft Graph in prod)

## Open Questions

| ID | Question | Resolution |
|----|----------|------------|
| Q1 | Subdomain DNS now or later? | Defer to ops; route works at `/care-helm` on main domain first |
| Q2 | Calendly vs form for demo? | Form reusing contact API for MVP (outline allows Formspree/HubSpot/Calendly) |
| Q3 | Phase 3 blog? | Deferred per outline |

## Verification Plan

- `npm run lint` from `web/`
- Manual: `/care-helm` desktop + mobile, no main site header visible
- Manual: anchor nav, demo form submit (noop mode)
- Search: no kiosk UI screenshots, no HIPAA cert claims

## Gherkin Acceptance

Skipped — marketing copy/layout only; no externally testable product behavior change beyond new public URL. Noted in tracker.
