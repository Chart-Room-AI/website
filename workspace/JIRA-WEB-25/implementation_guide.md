# WEB-25 Implementation Guide: CTA Language And Conversion Paths

## Gate Status

- Jira issue: [WEB-25](https://chartroomai.atlassian.net/browse/WEB-25)
- Parent ticket: [WEB-21](https://chartroomai.atlassian.net/browse/WEB-21)
- Approved research option: Option A, Copy-Only CTA Standardization
- Branch: `WEB-25-standardize-cta-language`
- Local workspace: `workspace/JIRA-WEB-25/`
- Approval status: Approved

This guide is approved from the WEB-25 research gate. The implementation should stay narrow: visible CTA copy, duration consistency, audit promise alignment, and non-secret configuration documentation.

## Implementation Goals

- Use `Request AI Readiness Diagnostic` as the approved primary CTA phrase across global and page-level primary conversion surfaces.
- Route primary request CTAs to the diagnostic form anchor so the form remains the primary path.
- Keep direct booking available only as a secondary path, with `Choose a diagnostic time` as the preferred secondary label.
- Standardize diagnostic duration language to 30 minutes wherever duration is mentioned.
- Replace immediate-audit language with request/selective-access language unless a live audit URL is explicitly confirmed.
- Document `NEXT_PUBLIC_AUDIT_URL` alongside `NEXT_PUBLIC_BOOKING_URL`.
- Preserve contact form delivery mechanics and the existing `siteConfig` configuration shape.

## Copy Rules

### Primary Diagnostic CTA

Use:

`Request AI Readiness Diagnostic`

Destination:

`/contact#diagnostic-form`

This label should replace primary variants such as:

- `Book Diagnostic`
- `Book AI Readiness Diagnostic`
- `Book Your Diagnostic Call`
- `Book a 30-minute diagnostic`
- `Book the diagnostic`
- `Book a 20-min Call`

### Secondary Direct Booking CTA

Use:

`Choose a diagnostic time`

Destination:

`siteConfig.bookingHref`

This label is acceptable where the UI is explicitly explaining direct booking as secondary, such as the contact page and thank-you page.

### Audit CTA

Use request/selective-access language unless a dedicated live audit URL is confirmed:

- `Request the friction audit`
- `Ask for the audit link`
- `About the friction audit`

Avoid:

- `Take the Free Audit`
- Copy that implies the audit is immediately self-serve when the default destination is `/contact#audit`.

### Duration

Use 30-minute language where a duration is mentioned. Do not leave 20-minute or 30-45-minute diagnostic claims in production source.

## File Plan

### `web/src/components/SiteHeader.tsx`

- Replace desktop and mobile primary booking labels with `Request AI Readiness Diagnostic`.
- Preserve current responsive hierarchy.

### `web/src/components/SiteFooter.tsx`

- Replace primary diagnostic CTA label with `Request AI Readiness Diagnostic`.
- Replace audit CTA label with `Request the friction audit`.

### `web/src/components/CtaBand.tsx`

- Keep the body language as 30-minute diagnostic language.
- Replace the primary CTA label with `Request AI Readiness Diagnostic`.
- Replace the audit CTA label with `Request the friction audit`.

### `web/src/app/page.tsx`

- Replace hero primary CTA label with `Request AI Readiness Diagnostic`.
- Update the hero audit text so it asks for the friction audit rather than implying instant access.
- Replace engagement-path `Book the diagnostic` label with `Request AI Readiness Diagnostic`.
- Replace per-card `Start here` labels if they are acting as diagnostic CTAs.
- Replace homepage lead-magnet CTA with request/selective-access language.
- Replace the floating CTA with `Request AI Readiness Diagnostic` and remove 20-minute language.

### `web/src/app/contact/page.tsx`

- Keep the diagnostic form as the page's primary path.
- Keep direct booking copy as secondary with `Choose a diagnostic time`.
- Keep audit copy selective and request-based.

### `web/src/app/contact/thank-you/page.tsx`

- Keep `Choose a diagnostic time` as a secondary next-step label.
- No form mechanics changes.

### `web/.env.example`

- Add `NEXT_PUBLIC_AUDIT_URL` as an optional public override.

### `web/README.md`

- Document `NEXT_PUBLIC_AUDIT_URL`.
- Clarify that booking and audit URLs are public destination overrides and should match the approved funnel.

## Non-Goals

- Do not redesign the homepage or contact page.
- Do not remove direct booking entirely.
- Do not build a new audit tool.
- Do not change contact form delivery mechanics.
- Do not add new analytics or tracking.

## Verification Plan

- Run source searches for retired variants:
  - `Book Diagnostic`
  - `Book AI Readiness Diagnostic`
  - `Book Your Diagnostic Call`
  - `Book a 20-min Call`
  - `Book a 30-minute diagnostic`
  - `Book the diagnostic`
  - `Take the Free Audit`
- Confirm `Choose a diagnostic time` remains only as a secondary direct-booking label.
- Confirm production source does not mix 20-minute and 30-minute diagnostic claims.
- Confirm `NEXT_PUBLIC_AUDIT_URL` is documented in `.env.example` and `README.md`.
- Run `npm run lint` from `web/`.
- Manually inspect homepage, header, footer, floating CTA, contact page, thank-you page, and mobile menu.

## Jira And GitHub Workflow

- Keep Jira updated at implementation start, verification, review readiness, and blockers.
- Use `WEB-25` in commit messages and PR title/body.
- PR body should link to `https://chartroomai.atlassian.net/browse/WEB-25`.
- Do not move WEB-25 to Done until review and post-merge checks are complete.

## Approval Gate

Implementation guide approved. Statement of work can be created from this scope, then production code edits may proceed after confirming the pre-implementation gate.
