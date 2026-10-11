# WEB-7 Research: Contact Form Submission Reliability

## Issue And Workflow Context

- Jira issue: [WEB-7](https://chartroomai.atlassian.net/browse/WEB-7)
- Jira summary: Investigate contact form submission reliability and local dev behavior
- Jira status at intake: To Do
- Priority: Medium
- Assignee: Unassigned
- Related work: [WEB-1](https://chartroomai.atlassian.net/browse/WEB-1) and PR https://github.com/cheezd/website/pull/3
- GitHub repository: [cheezd/website](https://github.com/cheezd/website)
- Branch: `WEB-7-contact-form-submission-reliability`
- Local workspace path: `workspace/JIRA-WEB-7/`

This work follows `project-management/00-bidirectional-project-management-flow.md`: Jira owns stakeholder-facing truth; local workspace artifacts own code research, implementation planning, verification evidence, and approval gates.

## Domain Context And ADR Check

- `docs/domain/CONTEXT.md`: not present in this repository.
- `docs/adr/README.md`: not present in this repository.
- CONTEXT decision for this ticket: defer bootstrapping domain CONTEXT because this is a narrow form-reliability investigation with no new reusable business vocabulary. If implementation introduces durable terms such as "diagnostic request delivery" or "local form sink", revisit whether a small CONTEXT bootstrap is warranted.
- ADR decision for this ticket: likely not needed unless production changes introduce a durable provider choice or first-party submission architecture that should be recorded beyond this ticket.

## Current Behavior

- `web/src/lib/site-config.ts` exposes `siteConfig.formEndpoint` as `process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "https://formsubmit.co/info@chartroomai.com"`.
- `web/src/components/ContactForm.tsx` renders a plain HTML `POST` form whose `action` is `siteConfig.formEndpoint`.
- The form includes FormSubmit-specific hidden fields: `_subject`, `_captcha`, and `_template`.
- No first-party submit route, local mock endpoint, thank-you route, or error state exists in the app.
- `.env.example` documents booking, contact, LinkedIn, and resume variables, but not `NEXT_PUBLIC_FORM_ENDPOINT`.
- `web/README.md` documents optional environment variables but not the form endpoint.
- `next.config.ts` does not configure static export, so App Router route handlers remain available on a normal Next.js deployment target.

## Observed Problem From Jira

During local testing for WEB-1:

- `http://localhost:3000/contact` rendered successfully.
- Submitting the form navigated away from the site to FormSubmit.
- The browser showed a Cloudflare 522 timeout from `formsubmit.co`.

Additional public-site evidence supplied during discovery:

- Submitting the production/public contact form navigates to `https://formsubmit.co/info@chartroomai.com`.
- The browser shows Cloudflare 522 for `formsubmit.co`: browser working, Cloudflare working, host error.
- Screenshot evidence was supplied in the Cursor session: `assets/c__Users_emche_AppData_Roaming_Cursor_User_workspaceStorage_0c6d8c7cb0771c5baf069b276477e02a_images_image-ab93ff0f-f83f-480a-8495-63c140ee5be6.png`.

This indicates the local and public Next.js pages can render successfully, but the submission experience depends directly on a third-party visitor-facing endpoint. When that endpoint is unavailable, the visitor sees the provider outage rather than a Chart Room AI confirmation or recoverable error.

## Relevant Next.js 16 Notes

- App Router route handlers are available inside `app` and can handle `POST` requests using standard Web `Request` and `Response` APIs.
- Route handlers cannot share the same segment level as a `page.tsx`, so a contact submit endpoint should live under a distinct route such as `app/api/contact/route.ts`.
- Next.js form guidance favors server-side handling for validation and submission workflows; production guidance calls out forms, validation, environment variables, and error handling as production concerns.
- `redirect` can be used from route handlers, but should be called outside `try/catch`; a route handler can also return explicit redirect responses.

## Options

### Option A: Keep FormSubmit As The Browser-Facing Endpoint

Keep the current static form submission model and add `_next` plus documentation for `NEXT_PUBLIC_FORM_ENDPOINT`.

Pros:

- Lowest implementation effort.
- No server-side route or delivery provider integration required.
- Keeps the app deployable as mostly static markup.

Cons:

- Does not materially reduce visitor exposure to FormSubmit outages.
- Local development continues to post to an external provider unless every developer overrides the public env var.
- Error handling remains controlled by the third party.
- Hidden fields stay coupled to FormSubmit-specific behavior.

### Option B: First-Party Contact Submit Route With Provider Behind The Server

Change the contact form to post to a same-origin route, for example `/api/contact`, and let that route validate input, choose local/dev behavior, deliver production submissions, and redirect to a first-party thank-you or error experience.

Possible delivery modes:

- Local/dev: no-op, console/log-only, or fileless preview response that redirects to a thank-you page.
- Production: server-side delivery through a chosen provider such as FormSubmit-compatible forwarding, a transactional email API, CRM intake endpoint, or webhook.

Pros:

- Visitors remain on a Chart Room AI-owned path for success and failure states.
- Local development can be safe by default without sending real inquiries externally.
- Production provider details and secrets can use server-only environment variables instead of `NEXT_PUBLIC_*`.
- The app can validate required fields and normalize payloads before delivery.
- Future provider changes do not require changing the public form contract.

Cons:

- Requires a server-capable deployment target.
- Requires choosing or confirming the production delivery mechanism.
- Adds operational concerns: spam mitigation, rate limiting, provider errors, and observability.

### Option C: Client-Side Enhanced Form With Inline State

Make `ContactForm` a client component, submit with `fetch`, and display inline success/error states.

Pros:

- Smoothest visitor experience.
- Can avoid full-page navigation.

Cons:

- Still needs a first-party backend route to avoid exposing provider details.
- Adds client-side state and JavaScript for a small marketing-site form.
- Less useful as a first step than Option B unless inline UX is specifically required.

## Recommendation

Proceed with Option B as the implementation direction, with a small phased scope:

1. Add a first-party submit route such as `web/src/app/api/contact/route.ts`.
2. Point the form default to the first-party route instead of the external FormSubmit URL.
3. Use Microsoft Graph / Microsoft 365 as the preferred production delivery mechanism behind server-only environment variables.
4. Make local/dev safe by default with an explicit no-send mode.
5. Add a first-party thank-you page or confirmation route so successful submissions do not strand visitors on a provider page.
6. Document required environment variables in `.env.example` and `web/README.md`.

This best satisfies the ticket because it reduces visitor-facing dependency on third-party outage behavior while preserving flexibility around the final production delivery provider.

## Risks And Implementation Questions

- Production delivery provider is not yet selected. A first-party route still needs somewhere durable to send or store submissions.
- Spam mitigation needs a lightweight decision before launch: honeypot field, provider-side captcha/spam controls, rate limiting, or another approach.
- If the deployment target ever becomes static export only, route handlers would not be available; current `next.config.ts` does not indicate static export.
- Local no-op behavior must be clearly labeled so test submissions are not mistaken for delivered inquiries.
- A first-party route can hide provider outages from visitors, but it should still surface a clear failure path and log enough detail for operators.

Primary dependency:

- [WEB-8](https://chartroomai.atlassian.net/browse/WEB-8) confirmed Microsoft Graph `sendMail` feasibility, Azure app registration, `Mail.Send` application permission/admin consent, mailbox choices, Vercel secret storage, and non-secret deployment inputs. WEB-7 may resume after its implementation guide is re-approved and statement of work is created/approved.

## Acceptance Criteria Mapping

- Document recommended local and production approach: Option B above.
- Confirm env vars and defaults: needs implementation guide detail after approval.
- Reduce visitor-facing third-party outage behavior: first-party route plus first-party success/error pages.
- Add/propose thank-you experience: recommended as in scope.
- Verify local/dev and production-like behavior: implementation verification should cover no-send local mode, configured production delivery path, and failure behavior.

## Discovery Status

- Jira issue fetched and summarized.
- Branch created from `origin/main`: `WEB-7-contact-form-submission-reliability`.
- Local workspace created: `workspace/JIRA-WEB-7/`.
- Required workflow guide and grill-with-docs guide reviewed.
- App code paths reviewed: `site-config.ts`, `ContactForm.tsx`, `contact/page.tsx`, `.env.example`, `README.md`, and `next.config.ts`.
- Next.js 16 local docs reviewed for route handlers, forms, redirects, and production checklist.

## Approval Gate

Research approved: proceed with Option B, First-Party Contact Submit Route With Provider Behind The Server.

Production delivery decision update: use Microsoft Graph / Microsoft 365. [WEB-8](https://chartroomai.atlassian.net/browse/WEB-8) completed prerequisite setup and verified `info@chartroomai.com` as both sender and recipient for Graph delivery.

Next gate: revise/approve `implementation_guide.md`, then create and approve `statement_of_work.md`. Production code must not change until the implementation guide and statement of work are approved.
