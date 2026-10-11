# WEB-7 Statement Of Work: Contact Form Submission Reliability

## Project Record

- Jira issue: [WEB-7](https://chartroomai.atlassian.net/browse/WEB-7)
- Summary: Investigate contact form submission reliability and local dev behavior
- GitHub repository: [cheezd/website](https://github.com/cheezd/website)
- Branch: `WEB-7-contact-form-submission-reliability`
- Local workspace: `workspace/JIRA-WEB-7/`
- Research: `workspace/JIRA-WEB-7/research.md`
- Implementation guide: `workspace/JIRA-WEB-7/implementation_guide.md`
- Dependency: [WEB-8](https://chartroomai.atlassian.net/browse/WEB-8), completed
- Approval status: Approved

## Approved Direction

Implement Option B from the research phase: First-Party Contact Submit Route With Provider Behind The Server.

The work will replace the visitor-facing FormSubmit form action with a first-party `/api/contact` route. Local and development submissions will default to safe no-send behavior, while production submissions will use Microsoft Graph `sendMail` through server-only Vercel environment variables.

## In Scope

- Change the default browser-facing contact form endpoint to `/api/contact`.
- Keep `NEXT_PUBLIC_FORM_ENDPOINT` only as an optional browser-facing path override if needed for previews; do not use it for Microsoft Graph secrets or delivery configuration.
- Remove FormSubmit-specific hidden fields from the contact form.
- Add a hidden honeypot field for lightweight spam reduction.
- Add `web/src/app/api/contact/route.ts` as a Next.js App Router `POST` route handler.
- Validate required fields: `name`, `email`, and `initiative`.
- Reject honeypot submissions without sending mail.
- Normalize successful form submissions into a contact request email.
- Add Microsoft Graph app-only token acquisition using server-only environment variables.
- Send production submissions through `POST https://graph.microsoft.com/v1.0/users/{CONTACT_FROM_MAILBOX}/sendMail`.
- Default non-production or unconfigured delivery mode to no-send behavior.
- Add `/contact/thank-you` as a first-party confirmation page.
- Add `/contact/error` as a first-party failure page.
- Update `web/.env.example` with non-secret configuration names and safe placeholders.
- Update `web/README.md` with local/dev and Vercel production configuration notes.
- Run focused verification before review.
- Prepare a GitHub PR whose title/body include `WEB-7` and explicitly link the Jira issue.

## Out Of Scope

- Changing Microsoft 365, Entra, Exchange, or Vercel secrets beyond the already completed WEB-8 setup.
- Committing or documenting real secret values.
- Implementing a CRM, database, queue, durable retry system, or admin dashboard.
- Implementing full rate limiting or bot defense beyond the lightweight honeypot.
- Adding client-side inline form state or converting the contact form to a client component.
- Reworking unrelated contact-page copy or broader site CTA strategy.
- Removing Microsoft Graph in favor of Resend, Postmark, SendGrid, FormSubmit, or another provider.
- Completing Exchange Online mailbox RBAC scoping; this remains a follow-up risk from WEB-8.
- Committing unrelated existing local changes in `grok-findings.md`, `openai-findings.md`, or other out-of-scope files.

## Configuration Notes

Server-only production variables:

- `CONTACT_DELIVERY_MODE=microsoft_graph`
- `MICROSOFT_TENANT_ID=32171f9d-89c1-4506-8a1b-96ec4faedee7`
- `MICROSOFT_CLIENT_ID=3fae214c-3c9d-42d8-80e5-4789004d5f17`
- `MICROSOFT_CLIENT_SECRET`: stored in Vercel, never committed or pasted into Jira/local artifacts.
- `CONTACT_FROM_MAILBOX=info@chartroomai.com`
- `CONTACT_TO_EMAIL=info@chartroomai.com`

Public/browser-facing variable:

- `NEXT_PUBLIC_FORM_ENDPOINT`: optional override only; default should be `/api/contact`.

Microsoft Graph details:

- Token endpoint: `https://login.microsoftonline.com/{MICROSOFT_TENANT_ID}/oauth2/v2.0/token`
- Token scope: `https://graph.microsoft.com/.default`
- Send endpoint: `https://graph.microsoft.com/v1.0/users/{CONTACT_FROM_MAILBOX}/sendMail`
- Required permission: Microsoft Graph application permission `Mail.Send`
- Admin consent: granted for Chart Room AI

## Acceptance Criteria

- The rendered contact form defaults to posting to `/api/contact`.
- The production-facing app source no longer defaults the browser form action to `https://formsubmit.co/info@chartroomai.com`.
- FormSubmit-specific hidden fields are removed from the first-party form.
- Honeypot submissions do not send email.
- Valid local/dev submissions use no-send behavior and land on `/contact/thank-you`.
- Valid production-configured submissions send through Microsoft Graph and land on `/contact/thank-you`.
- Microsoft Graph credentials are server-only and never use a `NEXT_PUBLIC_` prefix.
- Failed validation or delivery keeps visitors on a Chart Room AI-owned path and offers direct email recovery.
- `/contact/thank-you` exists and gives visitors a clear confirmation.
- `/contact/error` exists and gives visitors a clear recovery path.
- `web/.env.example` and `web/README.md` document the new configuration.
- Required verification commands are run and results are recorded.
- PR title and body include `WEB-7` and link `https://chartroomai.atlassian.net/browse/WEB-7`.
- Jira is updated at implementation start, PR creation, review readiness, and completion.

## Jira Subtasks

Durable implementation subtasks under WEB-7:

1. [WEB-17](https://chartroomai.atlassian.net/browse/WEB-17): Update contact form endpoint and first-party form contract.
2. [WEB-19](https://chartroomai.atlassian.net/browse/WEB-19): Implement first-party contact API route with Microsoft Graph delivery.
3. [WEB-18](https://chartroomai.atlassian.net/browse/WEB-18): Add first-party contact thank-you and error pages.
4. [WEB-20](https://chartroomai.atlassian.net/browse/WEB-20): Document contact form configuration and complete verification.

Subtasks are currently In Progress because the work is implemented locally and pending review/PR handoff. Do not move them to Done until the review is accepted under the project workflow.

## Verification Expectations

- Run `npm run lint` from `web/`.
- Run `npm run build` from `web/`.
- Search for `formsubmit.co` and verify no visitor-facing default form action remains.
- Search for `NEXT_PUBLIC_FORM_ENDPOINT` and verify it is only a browser-facing path override.
- Verify no Microsoft secret names or values are exposed in client code.
- Submit locally without Microsoft Graph env vars and verify first-party no-send success behavior.
- Verify missing required fields route to the first-party error path.
- Verify honeypot submissions do not call Microsoft Graph.
- Verify a production-like Microsoft Graph submission in a safe environment if credentials are available locally or through Vercel preview.

## Risks And Follow-Up

- Application `Mail.Send` remains broader than ideal until mailbox scoping is completed.
- Microsoft Graph returns `202 Accepted`, which means accepted for processing, not guaranteed final mailbox delivery.
- Local no-send behavior can create false confidence if documentation is unclear.
- Bot traffic may require rate limiting or stronger spam controls later.
- Microsoft client secret rotation is tracked separately by WEB-16 before the 2027-05-18 expiration.

## Implementation Verification Results

- `npm run lint` from `web/`: passed.
- `npm run build` from `web/`: passed.
- `web/src` search for `formsubmit.co`, `_subject`, `_captcha`, and `_template`: no matches.
- Env-name search: Microsoft Graph secret names appear only in server route and docs/example files; no credential values are present.
- Local route smoke tests against `POST /api/contact`:
  - Valid form payload returned `303` to `/contact/thank-you`.
  - Invalid email payload returned `303` to `/contact/error`.
  - Honeypot payload returned `303` to `/contact/thank-you` without exposing a bot-specific failure.
- Local page smoke tests against `http://localhost:3000`:
  - `/contact` returned `200`.
  - `/contact/thank-you` returned `200`.
  - `/contact/error` returned `200`.
  - Rendered `/contact` form action contained `/api/contact`.
  - Rendered `/contact` markup did not contain `formsubmit.co`.

## Pre-Implementation Gate

- Jira issue exists: `WEB-7`.
- Jira status is active for implementation: `In Progress`.
- Branch exists and includes Jira key: `WEB-7-contact-form-submission-reliability`.
- Workspace artifacts exist:
  - `research.md`: approved.
  - `implementation_guide.md`: approved.
  - `statement_of_work.md`: approved.
- WEB-8 prerequisite completed and recorded.
- Jira subtasks exist: WEB-17, WEB-18, WEB-19, WEB-20.
- Jira milestone comments exist for research approval, WEB-8 pause/resume, implementation guide approval, and SOW approval once approved.
- GitHub PR convention is clear: include `WEB-7` and link `https://chartroomai.atlassian.net/browse/WEB-7`.

## Approval Gate

Statement of work approved. Production code changes may begin under the approved scope.
