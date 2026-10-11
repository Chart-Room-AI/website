# WEB-25 Statement Of Work: CTA Language And Conversion Paths

## Project Context

- Jira issue: [WEB-25](https://chartroomai.atlassian.net/browse/WEB-25)
- Parent ticket: [WEB-21](https://chartroomai.atlassian.net/browse/WEB-21)
- Branch: `WEB-25-standardize-cta-language`
- Local workspace: `workspace/JIRA-WEB-25/`
- Approved research: Option A, Copy-Only CTA Standardization
- Approved implementation guide: `workspace/JIRA-WEB-25/implementation_guide.md`

## Objective

Reduce conversion friction by making the site's primary diagnostic CTA consistent, keeping direct booking visibly secondary where needed, removing mixed diagnostic duration claims, and aligning audit CTAs with the current selective-access delivery path.

## Scope

- Standardize primary diagnostic CTA copy to `Request AI Readiness Diagnostic`.
- Route primary diagnostic request CTAs to `/contact#diagnostic-form`.
- Preserve direct booking as a secondary path with `Choose a diagnostic time` where direct scheduling is explicitly offered.
- Standardize duration language to 30 minutes where duration is mentioned.
- Replace immediate-audit labels with request/selective-access labels.
- Document `NEXT_PUBLIC_AUDIT_URL` as an optional public environment override.
- Verify source copy and frontend lint after changes.

## Files Expected To Change

- `web/src/components/SiteHeader.tsx`
- `web/src/components/SiteFooter.tsx`
- `web/src/components/CtaBand.tsx`
- `web/src/app/page.tsx`
- `web/src/app/contact/page.tsx`
- `web/src/app/contact/thank-you/page.tsx`
- `web/.env.example`
- `web/README.md`

## Non-Goals

- Full homepage redesign.
- Removing direct booking entirely.
- Building a new audit tool.
- Changing contact form delivery mechanics.
- Changing Microsoft Graph mail delivery, form validation, or API routes.
- Adding analytics, A/B testing, or tracking.

## Acceptance Criteria

- All primary CTAs use `Request AI Readiness Diagnostic`.
- Direct booking remains available only as a clearly secondary path where retained.
- Production source does not mix 20-minute and 30-minute diagnostic claims.
- Audit CTAs accurately reflect request/selective availability unless a live audit URL is configured later.
- `NEXT_PUBLIC_AUDIT_URL` is documented with the other public site overrides.
- Mobile and desktop CTA hierarchy remains clear after the copy updates.

## Verification Expectations

- Search source for legacy booking and audit CTA variants and confirm only approved variants remain.
- Run `npm run lint` from `web/`.
- Manually review homepage, header, footer, floating CTA, contact page, thank-you page, and mobile menu in the running app.

## Configuration Notes

- `NEXT_PUBLIC_BOOKING_URL` remains the optional public direct-booking destination.
- `NEXT_PUBLIC_AUDIT_URL` remains the optional public audit destination.
- If either public URL is configured in production, it must match the approved funnel language: diagnostic booking as secondary when direct scheduling is offered, and audit copy as immediate only when the audit is actually immediately available.

## Risks

- If production `NEXT_PUBLIC_BOOKING_URL` points directly to Microsoft Bookings, it should remain reachable through secondary direct-booking links rather than primary request CTAs.
- If production `NEXT_PUBLIC_AUDIT_URL` points to a live self-serve audit, request/selective-access audit language may be too conservative and should be revisited.
- CTA copy changes are small but visible across high-traffic conversion surfaces, so manual responsive review matters.

## Approval

Approved for implementation under WEB-25.
