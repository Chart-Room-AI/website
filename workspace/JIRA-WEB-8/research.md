# WEB-8 Research: Microsoft Graph Mail Delivery Setup

## Issue And Workflow Context

- Jira issue: [WEB-8](https://chartroomai.atlassian.net/browse/WEB-8)
- Jira summary: Configure Microsoft Graph mail delivery for contact form submissions
- Jira status at intake: To Do
- Priority: Medium
- Assignee: Unassigned
- Labels: `contact-form`, `microsoft-graph`, `vercel`
- Related work: [WEB-7](https://chartroomai.atlassian.net/browse/WEB-7)
- Relationship: WEB-8 blocks WEB-7 implementation.
- Local workspace path: `workspace/JIRA-WEB-8/`

This work follows `project-management/00-bidirectional-project-management-flow.md`: Jira owns stakeholder-facing truth; local workspace artifacts own discovery, technical notes, verification evidence, and approval gates.

## Domain Context And ADR Check

- `docs/domain/CONTEXT.md`: not present in this repository.
- `docs/adr/README.md`: not present in this repository.
- CONTEXT decision for this ticket: defer bootstrapping domain CONTEXT because WEB-8 is an infrastructure/configuration prerequisite, not a new domain model or user-facing terminology change.
- ADR decision for this ticket: defer until WEB-7 implementation resumes. If Microsoft Graph becomes the durable production mail delivery mechanism in app code, record the provider decision in WEB-7 artifacts or a future ADR if the repository starts maintaining ADRs.

## Current WEB-7 Dependency

WEB-7 research and implementation planning selected a first-party contact submission route:

- Browser posts to same-origin `/api/contact`.
- Local/dev defaults to a safe no-send mode.
- Production delivery uses a server-side provider.
- The approved provider direction is Microsoft Graph / Microsoft 365, pending this WEB-8 setup.
- No production app code should change for WEB-7 until WEB-8 confirms the non-secret Graph configuration, then WEB-7 implementation guide and SOW are revised/approved.

## Microsoft Graph Delivery Model

Recommended delivery model for the website backend:

- Use Microsoft Graph `sendMail` from a server-side Next.js route handler.
- Authenticate with app-only access using Microsoft Entra ID client credentials.
- Use `POST https://graph.microsoft.com/v1.0/users/{CONTACT_FROM_MAILBOX}/sendMail`.
- Configure Microsoft Graph application permission `Mail.Send`.
- Grant admin consent for the application permission.
- Store the client credential only in Vercel environment variables or the approved secret manager.

Why app-only access is the better fit:

- The website contact form runs without a signed-in Microsoft user.
- Delegated permissions would require a user context and are not appropriate for anonymous public form submissions.
- The backend can use its own identity through the OAuth 2.0 client credentials flow.

Relevant Microsoft documentation:

- [`user: sendMail`](https://learn.microsoft.com/en-us/graph/api/user-sendmail?view=graph-rest-1.0): `sendMail` supports application permission `Mail.Send`, accepts `POST /users/{id | userPrincipalName}/sendMail`, and returns `202 Accepted` when the request is accepted.
- [`Get access without a user`](https://learn.microsoft.com/en-us/graph/auth-v2-service): app-only Microsoft Graph access uses the client credentials flow, Microsoft Graph application permissions, and admin consent.
- [`Role Based Access Control for Applications in Exchange Online`](https://learn.microsoft.com/en-us/graph/auth-limit-mailbox-access): Exchange Online Application RBAC can scope app access to selected mailboxes, replacing older Application Access Policies.

## Required Tenant Setup

1. Confirm the Chart Room AI Microsoft 365 tenant has Exchange Online mailboxes available for Graph `sendMail`.
2. Create or identify an app registration for the website contact-form backend.
3. Record the non-secret identifiers:
   - Tenant ID for `MICROSOFT_TENANT_ID`.
   - Application/client ID for `MICROSOFT_CLIENT_ID`.
4. Add Microsoft Graph application permission:
   - `Mail.Send`
5. Grant admin consent for the app registration.
6. Decide whether to scope mailbox access using Exchange Online Application RBAC.
7. Create a client secret, certificate, or other approved credential for server-side Vercel use.
8. Store the credential as a Vercel secret/environment variable, not in Jira or the repository.
9. Send a test email through Graph outside the website.

## Recommended Mailbox Scope

Mailbox finding from admin screen:

- `info@chartroomai.com` is currently configured as an alias on `marc@chartroomai.com`, not as a standalone mailbox.
- Recipient: `info@chartroomai.com` is acceptable for inbound contact-form delivery because the alias routes to Marc's mailbox.
- Sender: `info@chartroomai.com` is not yet confirmed for Graph app-only `sendMail` because aliases can behave differently than mailbox primary SMTP addresses.

Recommended access posture:

- Prefer one of these sender paths:
  - Use the primary mailbox as the Graph sender: `CONTACT_FROM_MAILBOX=marc@chartroomai.com`, with `CONTACT_TO_EMAIL=info@chartroomai.com`.
  - Enable and verify supported send-from-alias behavior for `info@chartroomai.com`.
  - Create `info@chartroomai.com` as a shared mailbox and send as that mailbox if brand-facing From identity is required.
- WEB-8 must verify the alias sender path before completion. If `info@chartroomai.com` cannot be used as the Graph sender, record the fallback sender decision explicitly.
- If possible, restrict the application to only the mailbox needed for contact-form delivery using Exchange Online Application RBAC.
- If RBAC scoping is not configured initially, explicitly document that `Mail.Send` application permission is tenant-wide and record the follow-up risk.
- The app should not need read permissions for mail, users, files, calendars, or contacts.

## Inputs To Return To WEB-7

Non-secret configuration values:

- `MICROSOFT_TENANT_ID`: `32171f9d-89c1-4506-8a1b-96ec4faedee7`.
- `MICROSOFT_CLIENT_ID`: `3fae214c-3c9d-42d8-80e5-4789004d5f17`.
- `CONTACT_FROM_MAILBOX`: `info@chartroomai.com`; alias-as-sender validation passed.
- `CONTACT_TO_EMAIL`: `info@chartroomai.com`, currently an alias on `marc@chartroomai.com`.
- `CONTACT_DELIVERY_MODE`: `microsoft_graph`.
- Graph token endpoint shape: `https://login.microsoftonline.com/{MICROSOFT_TENANT_ID}/oauth2/v2.0/token`.
- Graph send endpoint shape: `https://graph.microsoft.com/v1.0/users/{CONTACT_FROM_MAILBOX}/sendMail`.
- Graph token scope: `https://graph.microsoft.com/.default`.
- Required permission: Microsoft Graph application permission `Mail.Send` configured.
- Admin consent: granted for Chart Room AI.
- Mailbox scoping: deferred until follow-up after initial setup. Risk accepted for initial setup: `Mail.Send` application permission is broader than ideal.

Secret handling plan:

- Use `MICROSOFT_CLIENT_SECRET` only as a server-side Vercel environment variable if a client secret is chosen.
- Do not prefix Microsoft credentials with `NEXT_PUBLIC_`.
- Do not paste the secret into Jira, local markdown artifacts, commits, comments, PR descriptions, or screenshots.
- Prefer a certificate or managed/federated credential later if operationally supported; a short-lived client secret is acceptable for initial Vercel setup if rotation is tracked.
- Client secret metadata: description `Vercel contact form delivery`, Secret ID `5594b719-e8e4-464f-9473-199729c4eb49`, expires 2027-05-18. Secret value stored in Vercel project environment variables. Rotation follow-up must occur before expiration.

## Test Send Plan

A successful WEB-8 validation should prove:

- The app can acquire a token using the client credentials flow.
- The token includes the admin-consented Graph application permission.
- Graph accepts `sendMail` for the selected sender mailbox.
- The team tested `info@chartroomai.com` as the Graph sender while it is an alias on `marc@chartroomai.com`; test passed.
- Fallback sender is not required for initial WEB-7 implementation.
- A message arrives in the selected recipient mailbox.
- No secret values are exposed in logs, shell history, Jira, or repository files.

Suggested test payload characteristics:

- Subject includes `WEB-8 Microsoft Graph test`.
- Body identifies it as a configuration validation for the Chart Room AI contact form.
- Recipient is the confirmed `CONTACT_TO_EMAIL`.
- Save-to-sent-items behavior is explicitly decided. The Graph default saves to Sent Items unless `saveToSentItems` is false.

## Risks And Open Questions

- Admin access is required to create app permissions, grant consent, and optionally scope Exchange Online mailbox access.
- Graph `sendMail` returning `202 Accepted` means the request was accepted, not that final recipient delivery completed.
- Tenant-wide application `Mail.Send` is broader than ideal if mailbox RBAC scoping is not configured.
- The selected sender mailbox must allow app-only Graph sending from `/users/{mailbox}/sendMail`; alias-only addresses may not work as the `{mailbox}` identity unless tenant/mailbox configuration supports it.
- Vercel secret rotation and ownership need to be documented once the credential is created.
- WEB-7 implementation should avoid logging full form payloads or Microsoft token responses.

## Acceptance Criteria Mapping

- Microsoft Graph mail delivery feasibility is confirmed: pending tenant/app setup and test send.
- Azure App Registration exists or an existing one is approved: pending.
- Required Graph permissions are documented: `Mail.Send` application permission.
- Admin consent requirements are completed or explicitly documented as pending: pending.
- Sender and recipient mailbox choices are confirmed: `info@chartroomai.com` is both the contact recipient and verified Graph sender.
- A test send is completed or a clear blocker is documented: completed; Graph alias sender test succeeded and message arrived.
- WEB-7 has enough non-secret configuration detail: complete, pending final handoff update.
- Secrets are not posted in Jira or committed: required constraint recorded.

## Discovery Status

- Jira issue fetched and summarized.
- Relationship to WEB-7 confirmed.
- Local workspace created: `workspace/JIRA-WEB-8/`.
- Required workflow guide and grill-with-docs guide reviewed.
- Application domain CONTEXT and ADR paths checked; neither is present in this repository.
- Existing WEB-7 research and implementation guide reviewed.
- Microsoft Graph `sendMail`, app-only auth, and Exchange mailbox scoping docs reviewed.

## Approval Gate

Research direction: use Microsoft Graph app-only `sendMail` with application permission `Mail.Send`, admin consent, server-only credentials, and mailbox scoping where practical.

Research approved by project owner on 2026-05-18. Proceed to WEB-8 implementation/SOW artifacts and Microsoft 365 / Entra / Exchange admin setup.

Do not resume WEB-7 production code implementation until the pending non-secret values, permission/consent status, mailbox choices, and test-send result are recorded.
