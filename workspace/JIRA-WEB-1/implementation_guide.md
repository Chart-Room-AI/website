# WEB-1 Implementation Guide: Microsoft Bookings Scheduling Path

## Gate Status

- Jira issue: [WEB-1](https://chartroomai.atlassian.net/browse/WEB-1)
- Approved research option: Option B, Contact Page Flow Plus CTA Hierarchy Cleanup
- GitHub repository: [cheezd/website](https://github.com/cheezd/website)
- Branch: `WEB-1-microsoft-bookings-scheduling`
- Local workspace: `workspace/JIRA-WEB-1/`
- Approval status: Approved

This guide has been approved. `statement_of_work.md` can be created next, but production app code must still wait for SOW approval and pre-implementation gate confirmation.

## Implementation Goals

- Keep the contact page form-first for diagnostic requests.
- Present Microsoft Bookings as a polished secondary route for visitors ready to schedule immediately.
- Preserve the existing `NEXT_PUBLIC_BOOKING_URL` configuration pattern.
- Remove visitor-facing developer setup instructions.
- Remove Calendly-specific language.
- Reframe the audit section as a selective request path, not an unfinished placeholder.
- Include a Microsoft 365 admin setup path that produces the final public booking URL.

## Microsoft 365 Admin Setup Walkthrough

This section is for the Microsoft 365 administrator who will configure the scheduling backend before the website points to it.

### 1. Confirm Microsoft Bookings Access

1. Sign in to the Microsoft 365 admin center with an account that can manage apps and user licenses.
2. Confirm the tenant's Microsoft 365 plan includes Microsoft Bookings.
3. Confirm the intended staff account has a license that includes Bookings, Outlook calendar, and Teams if Teams meetings will be used.
4. Confirm Bookings is enabled for the organization. If it is disabled, enable it in Microsoft 365 admin settings before continuing.

Acceptance check: the admin or staff account can open Microsoft Bookings and create or manage a booking page.

### 2. Create Or Configure The Chart Room AI Booking Page

1. Open Microsoft Bookings from Microsoft 365.
2. Create a new booking page or select the existing Chart Room AI booking page.
3. Set the business name to `Chart Room AI` or `Chart Room AI LLC`, depending on the branding preference.
4. Add public business details that are safe for prospects to see.
5. Apply available Chart Room AI branding, logo, color, and description fields where Microsoft permits it.
6. Confirm the page is public only when the service configuration is complete.

Acceptance check: the public booking page reflects Chart Room AI branding and does not expose internal-only details.

### 3. Add The Diagnostic Service

1. Create a service named `AI Readiness Diagnostic`.
2. Set the duration to 30 minutes.
3. Set location to Microsoft Teams or phone, depending on the preferred first-call format.
4. If Teams is used, enable automatic online meeting creation.
5. Add a concise service description:
   `A focused operator-to-operator conversation to identify the blocker, governance or delivery gaps, and the next practical executive move.`
6. Configure buffer time if needed to avoid back-to-back public bookings.
7. Assign Marc as the staff member for this service.

Acceptance check: visitors can select `AI Readiness Diagnostic` and see a 30-minute appointment option.

### 4. Configure Availability And Calendar Safety

1. Set public availability windows that Marc is comfortable offering.
2. Confirm Bookings checks the assigned Outlook calendar for conflicts.
3. Disable availability during times that should never be offered publicly.
4. Review time zone handling and confirm the public page displays times clearly for visitors.
5. Create a test conflict on the Outlook calendar and verify the slot is not offered publicly.

Acceptance check: Bookings respects Outlook calendar conflicts and only exposes intentional availability windows.

### 5. Configure Notifications And Reminders

1. Enable automatic confirmation emails to the visitor.
2. Enable staff confirmation notifications.
3. Enable reminder emails to reduce no-shows.
4. Review cancellation/rescheduling settings.
5. Confirm email language is professional, concise, and aligned with Chart Room AI positioning.

Acceptance check: a test booking sends confirmation and reminder behavior as expected.

### 6. Configure Intake Questions

Keep this short because the website contact form remains the primary intake path.

Suggested required fields:

- Name
- Work email
- Company
- Role or title

Suggested optional prompt:

`What AI initiative, governance question, or delivery blocker should make this conversation useful?`

Acceptance check: direct-booking visitors provide enough context without turning Bookings into a duplicate long intake form.

### 7. Publish And Capture The Service URL

1. Publish the booking page when configuration is complete.
2. Open the public service booking page in a private browser window.
3. Confirm the page does not require the visitor to sign in.
4. Confirm the correct service, duration, availability, meeting method, and branding appear.
5. Copy the final public service URL for the `AI Readiness Diagnostic` service.
6. Provide that URL as the production value for `NEXT_PUBLIC_BOOKING_URL`.

Acceptance check: the final public URL opens directly to the intended booking experience and is ready for website configuration.

Current candidate URL:

- Admin/app entry point: `https://bookings.cloud.microsoft`
- Visitor-facing service URL: `https://bookings.cloud.microsoft/book/ChartRoomAI1@chartroomai.com/?ismsaljsauthenabled`

Use the visitor-facing `bookings.cloud.microsoft/book/...` URL for `NEXT_PUBLIC_BOOKING_URL`. Do not use the root `https://bookings.cloud.microsoft` URL as the website CTA target because that is the Microsoft Bookings app entry point.

## App Implementation Plan

### 1. Preserve Site Configuration

Keep `siteConfig.bookingHref` in `web/src/lib/site-config.ts`:

- `NEXT_PUBLIC_BOOKING_URL` should point to the Microsoft Bookings public service URL in production.
- The fallback should remain `"/contact#diagnostic-form"` so the site remains usable if the env var is absent.

No code change is expected in `site-config.ts` unless review finds a naming or copy issue.

### 2. Update The Contact Form

File: `web/src/components/ContactForm.tsx`

Planned changes:

- Keep the form as the primary diagnostic request path.
- Improve the explanatory copy so visitors know the diagnostic identifies the blocker, governance/security/delivery gaps, and the next practical executive move.
- Replace the developer-facing paragraph about setting `NEXT_PUBLIC_BOOKING_URL`.
- Remove Calendly-specific wording.
- Add a secondary link to `siteConfig.bookingHref` with copy similar to:
  `Prefer to book directly? Choose a diagnostic time.`
- Keep the direct booking option visually secondary to the submit button.

Acceptance check: the form does not expose implementation details and still makes the diagnostic request the main action.

### 3. Rebalance Contact Page CTA Hierarchy

File: `web/src/app/contact/page.tsx`

Planned changes:

- Keep the page introduction focused on submitting useful context through the form.
- Demote direct booking, LinkedIn, resume, and audit links so they support trust and convenience without competing as the main action.
- Keep the direct booking CTA available for visitors ready to schedule immediately.
- Make LinkedIn and resume links supporting trust signals rather than peer primary CTAs.

Acceptance check: the visual order makes the form feel primary and direct booking feel secondary.

### 4. Rewrite The Audit Section

File: `web/src/app/contact/page.tsx`

Planned changes:

- Remove placeholder copy about Typeform, Tally, or future custom scoring.
- Frame the audit as selectively available while the scoring model is refined.
- Point audit requests back to `#diagnostic-form` unless a dedicated audit URL is confirmed.
- Avoid saying or implying the audit form is unfinished.

Suggested copy direction:

`The 5-minute Agentic Workflow Friction Audit is being offered selectively while the scoring model is refined. Request access and we will send the current version when it is available.`

Acceptance check: the audit section reads as a legitimate secondary request path.

### 5. Keep Broader Site CTAs Stable

Files to review but avoid changing unless needed:

- `web/src/components/SiteHeader.tsx`
- `web/src/components/SiteFooter.tsx`
- `web/src/components/CtaBand.tsx`
- `web/src/app/page.tsx`

The existing shared `bookingHref` wiring already supports Microsoft Bookings. Keep broader copy changes out of scope unless a CTA contradicts the contact-page flow or still references Calendly/developer setup.

Acceptance check: no Calendly-specific or developer-facing scheduling copy remains in production-facing UI.

## Verification Plan

- Search the app for `Calendly`, `calendly`, and `NEXT_PUBLIC_BOOKING_URL` to confirm no inappropriate visitor-facing copy remains.
- Run the relevant lint/typecheck command from the repository's existing scripts after implementation.
- Manually inspect the contact page at desktop and mobile widths.
- Verify that no production code hardcodes the Microsoft Bookings URL.
- Verify `NEXT_PUBLIC_BOOKING_URL` can point to the copied Microsoft Bookings service URL.
- Verify fallback behavior still routes booking CTAs to `/contact#diagnostic-form` when no booking URL is configured.

## Jira And GitHub Workflow

- Post a Jira comment when this implementation guide is approved.
- Create `statement_of_work.md` only after this guide is approved.
- Before production code implementation, verify the pre-implementation gate:
  - Jira issue exists and is in the correct status.
  - Branch name includes `WEB-1`.
  - Research, implementation guide, and SOW exist and are approved.
  - Jira has milestone comments for approved research and SOW.
  - PR title/body convention is clear.
- Use `WEB-1` in commit messages.
- PR title should include `WEB-1`.
- PR body should explicitly link to `https://chartroomai.atlassian.net/browse/WEB-1`.
- Update Jira at phase changes, blockers, PR creation, review readiness, and completion.

## Open Decisions Before Statement Of Work

- Confirm the working Microsoft Bookings service URL is configured as the production `NEXT_PUBLIC_BOOKING_URL` value.
- Confirm whether direct-booking users should go straight to Bookings or be nudged to complete the short intake first.
- Confirm final primary CTA copy: `Request AI Readiness Diagnostic` or a more outcome-driven phrase.
- Confirm whether audit requests should always point to the diagnostic form for now.

## Approval Gate

Implementation guide approved. Next gate: SOW approval is required before production code changes.

