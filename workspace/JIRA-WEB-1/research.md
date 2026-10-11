# WEB-1 Research: Microsoft Bookings Scheduling Path

## Issue And Workflow Context

- Jira issue: [WEB-1](https://chartroomai.atlassian.net/browse/WEB-1)
- Jira summary: Add Microsoft Bookings scheduling path to contact page
- GitHub repository: [cheezd/website](https://github.com/cheezd/website)
- Proposed branch: `WEB-1-microsoft-bookings-scheduling`
- Local workspace path: `workspace/JIRA-WEB-1/`
- Source note: `bookings-todo.md`

The requested workflow uses Jira as the stakeholder-facing source of truth and GitHub for branch, commit, PR, review, and CI activity. The Jira key should appear in the branch name, commit messages, PR title, and PR body. The PR body should explicitly link back to the Jira issue even if the Jira/GitHub integration also detects it automatically.

Note: the required guide paths named in the request were not present under this repository or `C:\Users\emche\workspace` / `C:\Users\emche` during discovery, so this research follows the requested workflow text directly.

## Current Behavior

- `web/src/lib/site-config.ts` defines `siteConfig.bookingHref` as `process.env.NEXT_PUBLIC_BOOKING_URL ?? "/contact#diagnostic-form"`.
- Shared CTAs in `SiteHeader`, `SiteFooter`, `CtaBand`, and the homepage already route through `bookingHref`, so a production Microsoft Bookings URL can be injected without changing every CTA.
- The contact page currently places a `Book diagnostic call` CTA before the contact form, plus LinkedIn, audit, and resume links. This competes somewhat with the requested form-first contact-page flow.
- `web/src/components/ContactForm.tsx` contains the most direct production-facing issue: "Set NEXT_PUBLIC_BOOKING_URL..." and "Calendly or another scheduler."
- The audit section on `web/src/app/contact/page.tsx` still reads as a placeholder: "Audit form can live here as Typeform, Tally, or a custom scoring flow."
- `bookings-todo.md` says Microsoft Bookings should become the direct scheduling option, the diagnostic form should remain the primary contact-page action, and the audit should stay secondary until the audit experience is fully built.

## Problem

The app already has the environment-variable hook for a booking URL, but the contact-page user experience is not aligned with the desired conversion flow. It exposes implementation details to visitors, mentions Calendly specifically, gives direct booking too much primary weight on the contact page, and presents the audit as unfinished.

The production implementation should make Microsoft Bookings feel like a polished secondary option while preserving the diagnostic intake form as the primary path.

## Options

### Option A: Copy-Only Contact Page Polish

Update only contact-page copy and CTAs:

- Keep `siteConfig.bookingHref` as-is.
- Replace developer-facing copy in `ContactForm`.
- Reframe the direct booking CTA as secondary.
- Rewrite the audit section as selective access rather than a placeholder.

Pros: lowest risk, focused, likely sufficient for launch.

Cons: homepage/header/footer CTAs may still feel more booking-first than the contact-page flow.

### Option B: Contact Page Flow Plus CTA Hierarchy Cleanup

Do Option A and lightly adjust the contact page CTA hierarchy:

- Lead with the form and explanatory diagnostic value.
- Move or visually demote direct booking, LinkedIn, resume, and audit CTAs as trust/support actions.
- Keep global CTAs unchanged unless they create obvious inconsistency.

Pros: best fit for the stated "contact page form-first" requirement.

Cons: slightly more layout risk and needs visual review.

### Option C: Broader Site Funnel Rework

Audit every `bookingHref` and `auditHref` usage across the site and align all CTA language with the new Microsoft Bookings direction.

Pros: most consistent full-site funnel.

Cons: larger blast radius than this enhancement needs and more likely to mix strategic copy changes into a narrow scheduling backend update.

## Risks

- Microsoft Bookings setup is an external dependency; without the final public service URL, the app can only preserve the current fallback to `"/contact#diagnostic-form"`.
- If `NEXT_PUBLIC_BOOKING_URL` is missing in production, booking CTAs intentionally return to the contact form. This is safe but should be verified before launch.
- A direct booking link can reduce intake quality if visitors skip the diagnostic form. Copy should frame direct booking as an option for visitors ready to schedule immediately.
- The audit path may remain unavailable. The copy should avoid promising an instant audit if no dedicated audit URL exists.
- Visual hierarchy changes on the contact page need responsive review, especially around the existing grid layout and CTA cluster.

## Dependencies

- Confirm Microsoft Bookings is included in the current Microsoft 365 plan.
- Create/configure the public Chart Room AI Bookings page and `AI Readiness Diagnostic` service.
- Confirm duration, availability, meeting location, confirmation/reminder emails, Outlook calendar availability, and branding.
- Confirmed working Microsoft Bookings service URL for `NEXT_PUBLIC_BOOKING_URL`: `https://bookings.cloud.microsoft/book/ChartRoomAI1@chartroomai.com/?ismsaljsauthenabled`.
- Confirm whether audit requests should point to the diagnostic form or a dedicated audit URL.
- Confirm preferred primary CTA language: `Request AI Readiness Diagnostic` or a more outcome-driven alternative.

## Recommendation

Proceed with Option B.

Keep the existing `siteConfig.bookingHref` pattern because it already supports Microsoft Bookings through `NEXT_PUBLIC_BOOKING_URL` and has a safe fallback. Focus implementation on the contact page and contact form: remove developer-facing copy, remove Calendly wording, make the diagnostic form the primary action, present Microsoft Bookings as a secondary direct-scheduling route, and rewrite the audit section as a selective request path.

Do not broaden this into a full-site CTA rewrite unless review finds a specific inconsistency that undermines the Bookings launch.

Research approval note: Option B was approved with one addition. The implementation guide must include a Microsoft 365 admin walkthrough for setting up the Microsoft Bookings interface and producing the final public booking URL.

## Discovery Status

- Jira issue created and fetched: `WEB-1`.
- GitHub repository confirmed: `cheezd/website`, default branch `main`.
- GitHub MCP returned no open issues or open pull requests for the repository.
- Local git working tree already had unrelated modified files (`grok-findings.md`, `openai-findings.md`) and untracked `bookings-todo.md` before this discovery artifact was created.
- Feature branch created and checked out: `WEB-1-microsoft-bookings-scheduling`.

## Approval Gate

Research approved. Next gate: implementation guide approval is required before creating `statement_of_work.md`.

