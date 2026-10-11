# WEB-25 Research: Standardize CTA Language And Conversion Paths

## Issue And Workflow Context

- Jira issue: [WEB-25](https://chartroomai.atlassian.net/browse/WEB-25)
- Jira summary: Standardize CTA language and conversion paths across the site
- Parent ticket: [WEB-21](https://chartroomai.atlassian.net/browse/WEB-21)
- Jira status at intake: `To Do`
- GitHub repository: `cheezd/website`
- Branch: `WEB-25-standardize-cta-language`
- Local workspace path: `workspace/JIRA-WEB-25/`

This work is being run under the bidirectional project-management flow. Jira owns the stakeholder-facing goal, acceptance criteria, and milestone history. This workspace artifact owns local source discovery, recommendation, risks, and the implementation gate.

## Domain Context And Architecture Notes

- `docs/domain/CONTEXT.md` is not maintained in this repository.
- `docs/adr/README.md` or a comparable ADR index is not maintained in this repository.
- CONTEXT decision for this ticket: defer bootstrapping a domain CONTEXT file. The ticket is a narrow conversion-copy and CTA-routing cleanup using existing terms already visible in site copy: diagnostic request, direct booking, and friction audit.
- No ADR appears necessary unless a later SOW changes the funnel architecture, such as removing direct booking or building a dedicated audit tool.

## Current Behavior

- `web/src/lib/site-config.ts` defines `siteConfig.bookingHref` as `process.env.NEXT_PUBLIC_BOOKING_URL ?? "/contact#diagnostic-form"`.
- `web/src/lib/site-config.ts` defines `siteConfig.auditHref` as `process.env.NEXT_PUBLIC_AUDIT_URL ?? "/contact#audit"`.
- `web/.env.example` documents `NEXT_PUBLIC_BOOKING_URL` but does not document `NEXT_PUBLIC_AUDIT_URL`.
- `web/README.md` documents `NEXT_PUBLIC_BOOKING_URL` but does not document `NEXT_PUBLIC_AUDIT_URL`.
- `web/src/components/ContactForm.tsx` already uses `Request AI Readiness Diagnostic` as the form submit label.
- `web/src/components/SiteHeader.tsx` uses `Book Diagnostic` on desktop and `Book AI Readiness Diagnostic` in the mobile menu.
- `web/src/components/SiteFooter.tsx` uses `Book a 30-minute diagnostic` and `Take the free audit`.
- `web/src/components/CtaBand.tsx` uses body copy for a 30-minute diagnostic, with buttons `Book Your Diagnostic Call` and `Take the Free Audit`.
- `web/src/app/page.tsx` uses `Book AI Readiness Diagnostic`, `Book the diagnostic`, `Start here`, `Take the Free Audit`, and floating CTA `Book a 20-min Call`.
- `web/src/app/contact/page.tsx` keeps the form primary but uses `Choose a diagnostic time` for direct booking, plus `About the friction audit` and `Ask for the audit link`.
- `web/src/app/contact/thank-you/page.tsx` offers `Choose a diagnostic time` after a form submission.
- Existing root-level CRO notes and copy docs contain additional historical variants, but production source is concentrated in the app files above.

## Problem

The site has the right funnel pieces, but their labels and promises are inconsistent:

- Primary conversion action alternates between booking language and request language.
- Direct booking sometimes appears primary even though the ticket says the diagnostic form should remain the primary path.
- Diagnostic duration is inconsistent because production source includes both 20-minute and 30-minute claims.
- Audit links use `Take the Free Audit`, which reads as immediate self-serve access, while the contact page says the audit is selectively offered while the scoring model is refined.
- The audit URL can be configured independently through `NEXT_PUBLIC_AUDIT_URL`, but that public variable is not documented in `.env.example` or `README.md`.

## Options

### Option A: Copy-Only CTA Standardization

Use the ticket's recommended phrase, `Request AI Readiness Diagnostic`, for all primary booking/diagnostic CTAs. Keep direct booking links routed through `bookingHref`, but make labels and surrounding copy clearly secondary where they appear near the form.

Pros: lowest implementation risk, satisfies the primary CTA consistency criteria, and preserves the existing Microsoft Bookings integration point.

Cons: leaves the existing `bookingHref` naming in code even though some visible labels become request-oriented.

### Option B: CTA Constants Plus Copy Standardization

Add shared CTA label constants near `site-content` and consume them across header, footer, CTA band, homepage, contact page, and thank-you page.

Pros: reduces future copy drift and makes the approved primary and secondary labels easier to audit.

Cons: slightly broader code change, and abstracting short labels may be more structure than the current app needs.

### Option C: Funnel Routing Change

Change all primary CTAs to point directly to the diagnostic form and keep only explicitly secondary links pointing to Microsoft Bookings.

Pros: strongest form-first funnel.

Cons: larger behavior change than the ticket currently approves, and the ticket explicitly says not to remove direct booking entirely unless approved.

## Recommendation

Proceed with Option A.

Use `Request AI Readiness Diagnostic` as the approved primary CTA phrase across global and page-level primary CTAs. Route primary request CTAs to the diagnostic form so the form remains the primary path. Keep `siteConfig.bookingHref` for explicit secondary direct-booking links, such as `Choose a diagnostic time` on the contact and thank-you pages.

Standardize duration language to 30 minutes where duration is mentioned, based on prior WEB-1 planning and the current footer/CTA band copy. Remove the 20-minute floating CTA language.

For audit CTAs, avoid `Take the Free Audit` unless `NEXT_PUBLIC_AUDIT_URL` is configured to an immediately available audit. With the current source default of `/contact#audit`, use request/selective-access language such as `Request the friction audit` or `Ask for the audit link`.

Document `NEXT_PUBLIC_AUDIT_URL` alongside `NEXT_PUBLIC_BOOKING_URL` so production configuration can be checked against the approved funnel without exposing secrets.

## Likely Implementation Scope

- `web/src/components/SiteHeader.tsx`
- `web/src/components/SiteFooter.tsx`
- `web/src/components/CtaBand.tsx`
- `web/src/app/page.tsx`
- `web/src/app/contact/page.tsx`
- `web/src/app/contact/thank-you/page.tsx`
- `web/.env.example`
- `web/README.md`

## Verification Plan

- Search production source for legacy primary CTA variants:
  - `Book Diagnostic`
  - `Book AI Readiness Diagnostic`
  - `Book Your Diagnostic Call`
  - `Book a 20-min Call`
  - `Book a 30-minute diagnostic`
  - `Choose a diagnostic time`
  - `Take the Free Audit`
- Confirm only approved primary and secondary variants remain.
- Confirm no source mixes 20-minute and 30-minute diagnostic duration claims.
- Confirm audit CTAs do not imply immediate self-serve access while `auditHref` defaults to `/contact#audit`.
- Run `npm run lint` from `web/`.
- Manually inspect homepage, header, footer, floating CTA, contact page, thank-you page, and mobile menu.

## Risks And Open Questions

- The Jira ticket says `Request AI Readiness Diagnostic` is the recommended starting point. Treating it as approved is low-risk but should be explicitly approved before production edits under this workflow.
- If production `NEXT_PUBLIC_BOOKING_URL` points to Microsoft Bookings, direct booking remains available through secondary links. Primary request CTAs should not depend on that environment value.
- If production `NEXT_PUBLIC_AUDIT_URL` points to a live audit, audit CTA copy can be more direct. Without that confirmation, request/selective-access copy is safer.
- Mobile and desktop CTA hierarchy need manual review because the header and floating CTA are prominent conversion surfaces.

## Discovery Status

- Jira issue fetched and summarized: `WEB-25`.
- Parent relationship identified: `WEB-21`.
- Working branch created from `main`: `WEB-25-standardize-cta-language`.
- Local workspace folder created: `workspace/JIRA-WEB-25/`.
- Current local working tree already had unrelated modified files before this discovery pass: `grok-findings.md` and `openai-findings.md`.
- Initial CTA inventory completed across source and project notes.

## Approval Gate

Research direction pending approval.

Recommended approval decision: approve Option A with primary CTA phrase `Request AI Readiness Diagnostic`, secondary direct-booking label `Choose a diagnostic time`, audit request label `Request the friction audit` or `Ask for the audit link`, and 30-minute duration wherever duration is mentioned.
