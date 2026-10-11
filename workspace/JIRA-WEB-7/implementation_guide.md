# WEB-7 Implementation Guide: Contact Form Submission Reliability

## Gate Status

- Jira issue: [WEB-7](https://chartroomai.atlassian.net/browse/WEB-7)
- Approved research option: Option B, First-Party Contact Submit Route With Provider Behind The Server
- GitHub repository: [cheezd/website](https://github.com/cheezd/website)
- Branch: `WEB-7-contact-form-submission-reliability`
- Local workspace: `workspace/JIRA-WEB-7/`
- Research: `workspace/JIRA-WEB-7/research.md`
- Former blocking prerequisite: [WEB-8](https://chartroomai.atlassian.net/browse/WEB-8), completed
- Approval status: Approved

This guide has been approved after WEB-8 completed Microsoft Graph setup. Next gate: create and approve `statement_of_work.md`; production app code must still wait for SOW approval and pre-implementation gate confirmation.

## Implementation Goals

- Stop sending visitors directly to `formsubmit.co` from the browser.
- Keep the contact form visually and behaviorally simple for visitors.
- Add a first-party submit path that works on Vercel as a normal Next.js App Router route handler.
- Make local development safe by default so test submissions do not send real inquiries externally.
- Keep production delivery configurable without exposing provider details through `NEXT_PUBLIC_*` variables.
- Add a first-party thank-you or confirmation route so successful submissions stay on Chart Room AI.
- Provide an explicit failure path when delivery is unavailable.
- Document required environment variables and defaults.

## Proposed User Flow

### Successful Submission

1. Visitor completes the contact form on `/contact`.
2. Browser posts to the same-origin endpoint `/api/contact`.
3. The route handler validates required fields.
4. In local/dev no-send mode, the handler logs or safely discards the payload and redirects to the thank-you page.
5. In production delivery mode, the handler sends the normalized inquiry through Microsoft Graph.
6. Visitor lands on `/contact/thank-you`.

Acceptance check: a successful submission never navigates the visitor to `formsubmit.co` or another third-party provider page.

### Failed Submission

1. Visitor submits the form.
2. The route handler validates fields and attempts delivery.
3. If required fields are missing, it redirects to a first-party failure path or returns a helpful first-party response.
4. If the delivery provider fails, it keeps the visitor on a Chart Room AI-owned path and explains that the request could not be sent.

Acceptance check: provider outages are not exposed as a raw third-party Cloudflare or provider error page.

## App Implementation Plan

### 1. Update Site Configuration

File: `web/src/lib/site-config.ts`

Planned changes:

- Change `siteConfig.formEndpoint` default from `https://formsubmit.co/info@chartroomai.com` to `/api/contact`.
- Keep `NEXT_PUBLIC_FORM_ENDPOINT` only if there is a clear need to override the browser-facing submit path for previews.
- Do not keep FormSubmit as the default public browser action.

Acceptance check: with no environment override, the rendered form posts to `/api/contact`.

### 2. Update Contact Form Hidden Fields

File: `web/src/components/ContactForm.tsx`

Planned changes:

- Remove FormSubmit-specific hidden fields if the first-party route no longer needs them:
  - `_subject`
  - `_captcha`
  - `_template`
- Add a simple hidden honeypot field for lightweight spam reduction.
- Keep the existing visitor-facing fields:
  - `name`
  - `email`
  - `firm_role`
  - `initiative`

Acceptance check: the form contract matches the first-party route handler and does not carry unnecessary provider-specific fields.

### 3. Add First-Party Contact Route Handler

File: `web/src/app/api/contact/route.ts`

Planned changes:

- Add a `POST` route handler.
- Parse `FormData` from the request.
- Validate:
  - `name` is present.
  - `email` is present and shaped like an email address.
  - `initiative` is present.
  - honeypot field is empty.
- Normalize the payload for delivery.
- Use local/dev no-send behavior by default outside production delivery mode.
- Use server-only Microsoft Graph environment variables for production delivery.
- Redirect successful submissions to `/contact/thank-you`.
- Redirect failed submissions to `/contact/error`.

Acceptance check: the route works on Vercel as a standard App Router route handler and does not require static export.

### 4. Confirm Microsoft Graph Production Delivery

Files likely affected:

- `web/src/app/api/contact/route.ts`
- `web/.env.example`
- `web/README.md`

Approved delivery direction:

- Use Microsoft Graph / Microsoft 365 as the production delivery mechanism.
- Do not use a separate form provider unless WEB-8 finds Microsoft Graph is unavailable or unsuitable.
- Do not call Microsoft Graph from the browser.
- Keep Microsoft tenant/app/mailbox credentials server-only.

Completed prerequisite:

- [WEB-8](https://chartroomai.atlassian.net/browse/WEB-8): Configure Microsoft Graph mail delivery for contact form submissions

Confirmed WEB-8 configuration:

- `CONTACT_DELIVERY_MODE=microsoft_graph`
- `MICROSOFT_TENANT_ID=32171f9d-89c1-4506-8a1b-96ec4faedee7`
- `MICROSOFT_CLIENT_ID=3fae214c-3c9d-42d8-80e5-4789004d5f17`
- `MICROSOFT_CLIENT_SECRET`: stored as a Vercel project environment variable; value must not be committed or pasted into Jira/local artifacts.
- `CONTACT_FROM_MAILBOX=info@chartroomai.com`
- `CONTACT_TO_EMAIL=info@chartroomai.com`
- Token endpoint: `https://login.microsoftonline.com/{MICROSOFT_TENANT_ID}/oauth2/v2.0/token`
- Graph send endpoint: `https://graph.microsoft.com/v1.0/users/{CONTACT_FROM_MAILBOX}/sendMail`
- Token scope: `https://graph.microsoft.com/.default`
- Permission: Microsoft Graph application permission `Mail.Send`.
- Admin consent: granted for Chart Room AI.
- Mailbox scoping: deferred until follow-up after initial setup; accepted risk that application `Mail.Send` is broader than ideal.
- Credential rotation follow-up: WEB-16, target due date 2027-05-01 before the current secret expires on 2027-05-18.
- WEB-8 validation: token request succeeded, Graph `sendMail` succeeded, email arrived, and alias sender `info@chartroomai.com` was accepted as the delivered From identity.

Acceptance check: WEB-8 confirms Microsoft Graph `sendMail` feasibility, app registration, required permissions, admin consent status, sender/recipient mailbox choices, and non-secret configuration values. No Microsoft credential uses a `NEXT_PUBLIC_` prefix.

### 5. Add Thank-You Experience

File: `web/src/app/contact/thank-you/page.tsx`

Planned changes:

- Add a simple confirmation page.
- Confirm the request was received.
- Set expectations for follow-up.
- Offer the direct booking route as an optional next step if still appropriate.
- Include a link back to the contact page or home page.

Acceptance check: successful submissions land on a first-party confirmation page.

### 6. Add Failure Experience

File: `web/src/app/contact/error/page.tsx`

Recommended narrow scope:

- Add `/contact/error` as a simple first-party page to avoid converting `ContactForm` into a client component.
- Explain that the request could not be sent.
- Tell visitors to email `siteConfig.contactEmail` directly.
- Link back to `/contact`.

Acceptance check: delivery failure gives visitors a practical recovery path.

### 7. Update Documentation

Files:

- `web/.env.example`
- `web/README.md`

Planned changes:

- Document `/api/contact` as the default browser-facing submit endpoint.
- Document local/dev default behavior.
- Document required production variables for Microsoft Graph delivery.
- Document that Vercel works when deployed as a normal Next.js app, not as static export.

Acceptance check: a maintainer can configure local no-send mode and production delivery without reading implementation code.

## Vercel Compatibility Notes

- App Router route handlers run on Vercel as serverless functions by default.
- Do not enable static export for this feature.
- Do not rely on local filesystem writes in production.
- Keep secrets server-only.
- If durable logs, rate limiting, queueing, or replay are needed, use an external service.

## Verification Plan

- Run `npm run lint` from `web/`.
- Run `npm run build` from `web/`.
- Start local dev and submit the form with no production provider configured; verify it stays first-party and lands on `/contact/thank-you`.
- Verify the rendered form action defaults to `/api/contact`.
- Verify no visitor-facing source defaults to `https://formsubmit.co/info@chartroomai.com`.
- Verify missing required fields do not produce a provider page.
- Verify configured provider failure redirects to the first-party failure path.
- Verify production-like Microsoft Graph env configuration on Vercel preview if credentials are available.

## Jira And GitHub Workflow

- Post a Jira comment when this implementation guide is approved.
- Create `statement_of_work.md` only after this guide is approved.
- Before production code implementation, verify the pre-implementation gate:
  - Jira issue exists and is in the correct status.
  - Branch name includes `WEB-7`.
  - Research, implementation guide, and SOW exist and are approved.
  - Jira has milestone comments for approved research and SOW.
  - PR title/body convention is clear.
- Use `WEB-7` in commit messages.
- PR title should include `WEB-7`.
- PR body should explicitly link to `https://chartroomai.atlassian.net/browse/WEB-7`.
- Update Jira at phase changes, blockers, PR creation, review readiness, and completion.

## Open Decisions Before Statement Of Work

- Confirm whether `NEXT_PUBLIC_FORM_ENDPOINT` should remain as a preview override or be removed from the public configuration surface. Recommended: keep it only as a browser-facing path override, with `/api/contact` as the default, and do not use it for provider secrets or Microsoft Graph configuration.

## Approval Gate

Implementation guide approved. Next gate: create and approve `statement_of_work.md`. Production code must not change until SOW approval.
