# WEB-1 Statement Of Work: Microsoft Bookings Scheduling Path

## Project Record

- Jira issue: [WEB-1](https://chartroomai.atlassian.net/browse/WEB-1)
- GitHub repository: [cheezd/website](https://github.com/cheezd/website)
- Branch: `WEB-1-microsoft-bookings-scheduling`
- Local workspace: `workspace/JIRA-WEB-1/`
- Research: `workspace/JIRA-WEB-1/research.md`
- Implementation guide: `workspace/JIRA-WEB-1/implementation_guide.md`
- Approval status: Approved

## Approved Direction

Implement Option B from the research phase: Contact Page Flow Plus CTA Hierarchy Cleanup.

The work will keep the contact page form-first while making Microsoft Bookings a polished secondary direct-scheduling route. The existing `NEXT_PUBLIC_BOOKING_URL` configuration pattern remains the app integration point, with the current fallback to `/contact#diagnostic-form`.

## In Scope

- Preserve `siteConfig.bookingHref` as the scheduling abstraction.
- Use the visitor-facing Microsoft Bookings service URL as the production value for `NEXT_PUBLIC_BOOKING_URL` after public-access validation.
- Update `web/src/components/ContactForm.tsx` so the form remains primary, diagnostic value is clearer, and direct booking is a secondary option.
- Remove visitor-facing developer setup copy about `NEXT_PUBLIC_BOOKING_URL`.
- Remove Calendly-specific wording.
- Rebalance the contact page CTA hierarchy in `web/src/app/contact/page.tsx`.
- Reframe LinkedIn and resume links as supporting trust signals.
- Rewrite the audit section so it reads as a legitimate selective request path, not a placeholder.
- Run focused verification before review.
- Prepare a GitHub PR whose title/body include `WEB-1` and explicitly link the Jira issue.

## Out Of Scope

- Building a custom booking or calendar integration.
- Hardcoding the Microsoft Bookings URL into production source code.
- Rewriting the whole site funnel or all global CTA strategy.
- Creating the audit scoring flow.
- Creating a thank-you route.
- Changing Microsoft 365 tenant policy beyond what is needed to make Bookings available.
- Committing unrelated existing local changes in `grok-findings.md`, `openai-findings.md`, or other out-of-scope files.

## Configuration Notes

- Admin/app entry point: `https://bookings.cloud.microsoft`
- Visitor-facing service URL: `https://bookings.cloud.microsoft/book/ChartRoomAI1@chartroomai.com/?ismsaljsauthenabled`
- `NEXT_PUBLIC_BOOKING_URL` should use the visitor-facing service URL above.

## Acceptance Criteria

- The contact page makes the diagnostic form the primary action.
- Direct booking is available as a secondary option for visitors ready to schedule immediately.
- Visitor-facing UI no longer includes developer setup instructions.
- Visitor-facing UI no longer mentions Calendly.
- The audit section no longer reads as unfinished or placeholder content.
- The site still works when `NEXT_PUBLIC_BOOKING_URL` is absent by falling back to `/contact#diagnostic-form`.
- The Microsoft Bookings service URL is not hardcoded in app source.
- PR title and body include `WEB-1` and the Jira issue URL.
- Jira is updated at implementation start, PR creation, review readiness, and completion.

## Jira Subtasks To Track Implementation

The following subtasks should be created under `WEB-1` before production code changes:

1. [WEB-3](https://chartroomai.atlassian.net/browse/WEB-3): Validate Microsoft Bookings public URL and env configuration.
2. [WEB-6](https://chartroomai.atlassian.net/browse/WEB-6): Update contact form copy and secondary booking CTA.
3. [WEB-2](https://chartroomai.atlassian.net/browse/WEB-2): Rebalance contact page CTA hierarchy and supporting trust links.
4. [WEB-5](https://chartroomai.atlassian.net/browse/WEB-5): Rewrite audit section as selective request path.
5. [WEB-4](https://chartroomai.atlassian.net/browse/WEB-4): Run verification and prepare GitHub PR.

## Verification Expectations

- Search for `Calendly`, `calendly`, and inappropriate visitor-facing `NEXT_PUBLIC_BOOKING_URL` copy.
- Run the repository's relevant lint/typecheck command after code changes.
- Manually inspect the contact page at desktop and mobile widths.
- Verify booking CTAs route through `siteConfig.bookingHref`.
- Verify fallback behavior remains `/contact#diagnostic-form` when no booking URL is configured.
- Verify no source file hardcodes the Microsoft Bookings URL.

## Pre-Implementation Gate

- Jira issue exists: `WEB-1`.
- Branch exists and includes Jira key: `WEB-1-microsoft-bookings-scheduling`.
- Workspace artifacts exist:
  - `research.md`: approved.
  - `implementation_guide.md`: approved.
  - `statement_of_work.md`: approved.
- Jira milestone comments exist for discovery start, branch creation, research approval, implementation guide creation, and Bookings URL candidate capture.
- Jira subtasks exist: `WEB-2`, `WEB-3`, `WEB-4`, `WEB-5`, `WEB-6`.
- GitHub PR convention is clear: include `WEB-1` and link `https://chartroomai.atlassian.net/browse/WEB-1`.

## Approval Gate

SOW approved. Production code changes may proceed under the approved scope.

