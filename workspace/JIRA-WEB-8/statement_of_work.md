# WEB-8 Statement Of Work: Microsoft Graph Mail Delivery Setup

## Project Record

- Jira issue: [WEB-8](https://chartroomai.atlassian.net/browse/WEB-8)
- Summary: Configure Microsoft Graph mail delivery for contact form submissions
- Blocking relationship: WEB-8 blocks [WEB-7](https://chartroomai.atlassian.net/browse/WEB-7)
- Research: `workspace/JIRA-WEB-8/research.md`
- Implementation guide: `workspace/JIRA-WEB-8/implementation_guide.md`
- Approval: Research and SOW approved by project owner on 2026-05-18.

## Approved Scope

Configure and validate Microsoft Graph mail delivery prerequisites for the Chart Room AI website contact form:

- Confirm the Microsoft 365 tenant and sender/recipient mailboxes.
- Create or approve an Entra app registration for the website backend.
- Configure Microsoft Graph application permission `Mail.Send`.
- Complete admin consent or document the blocker.
- Create a server-side credential suitable for Vercel.
- Store the credential only in the approved secret manager or Vercel environment variables.
- Confirm or defer mailbox-scoped access using Exchange Online Application RBAC.
- Send a Graph test email outside the website.
- Record non-secret values needed by WEB-7.

SOW approval status: approved to execute the Microsoft 365 / Entra / Exchange setup steps in `workspace/JIRA-WEB-8/implementation_guide.md`.

## Non-Goals

- Do not change production website code in this ticket.
- Do not commit real environment variables or Microsoft credentials.
- Do not paste secrets into Jira, markdown, PRs, screenshots, or local planning artifacts.
- Do not implement spam mitigation, form validation, or contact page UX here; those remain WEB-7 scope.
- Do not introduce a non-Microsoft email provider unless Microsoft Graph is blocked and the blocker is documented.

## Required Outputs

Non-secret outputs for WEB-7:

- `MICROSOFT_TENANT_ID=32171f9d-89c1-4506-8a1b-96ec4faedee7`
- `MICROSOFT_CLIENT_ID=3fae214c-3c9d-42d8-80e5-4789004d5f17`
- Credential type and storage location, without credential value.
- `CONTACT_FROM_MAILBOX=info@chartroomai.com`, verified alias sender.
- `CONTACT_TO_EMAIL=info@chartroomai.com`, currently confirmed as an alias on `marc@chartroomai.com`.
- `CONTACT_DELIVERY_MODE=microsoft_graph`
- Graph token endpoint shape.
- Graph send endpoint shape.
- Required Graph permission and admin consent status: `Mail.Send` application permission granted for Chart Room AI.
- Mailbox scoping status: deferred until final sender identity is confirmed; risk accepted for initial setup that `Mail.Send` application permission is broader than ideal.
- Test-send result: Microsoft Graph alias sender test succeeded; message arrived from `info@chartroomai.com`.

Secret output:

- A Vercel/server-side secret for Microsoft Graph authentication, stored only in the approved secret location.
- Client secret metadata: description `Vercel contact form delivery`, Secret ID `5594b719-e8e4-464f-9473-199729c4eb49`, expires 2027-05-18.
- Secret storage location: Vercel project environment variables.
- Rotation tracking: recurring or dated follow-up task required before 2027-05-18.

## Acceptance Criteria

- Microsoft Graph mail delivery feasibility is confirmed for the Chart Room AI Microsoft 365 tenant.
- Azure/Entra App Registration exists or an existing one is approved for this use.
- Microsoft Graph application permission `Mail.Send` is configured.
- Admin consent is completed or explicitly documented as pending with a blocker.
- Sender and recipient mailbox choices are confirmed, including the fact that `info@chartroomai.com` is currently an alias on `marc@chartroomai.com`.
- Alias-as-sender behavior is tested for `info@chartroomai.com`; it passed.
- A test email is sent through Microsoft Graph, or a clear blocker is documented: completed.
- WEB-7 has enough non-secret configuration detail to implement `/api/contact` using Microsoft Graph.
- Secrets are not posted in Jira or committed to the repository.

## Verification Plan

Required verification:

- Confirm app registration client ID and tenant ID are recorded without secrets.
- Confirm `Mail.Send` application permission and admin consent status.
- Confirm mailbox scoping status.
- Confirm whether Graph can send from the selected sender identity when `info@chartroomai.com` is an alias: passed.
- Run an explicit alias sender test with `CONTACT_FROM_MAILBOX=info@chartroomai.com`: completed.
- If alias sender validation fails, run or document the fallback test with `CONTACT_FROM_MAILBOX=marc@chartroomai.com`.
- Acquire a Microsoft Graph token using client credentials.
- Send a test message through `POST /users/{CONTACT_FROM_MAILBOX}/sendMail`.
- Confirm receipt in `CONTACT_TO_EMAIL`.
- Confirm no secret value was written to Jira or repository files.

Evidence to record:

- Test-send timestamp.
- Sender mailbox.
- Recipient mailbox.
- Alias sender validation result and final sender decision.
- Sanitized result: success, accepted-but-not-delivered, or blocked.
- Any sanitized Microsoft/Graph error code if blocked.

## Risks And Mitigations

- Risk: Application `Mail.Send` can be broader than the contact form requires.
  Mitigation: Prefer Exchange Online Application RBAC mailbox scoping; document explicitly if deferred.

- Risk: Graph `202 Accepted` does not guarantee final delivery.
  Mitigation: Confirm recipient receipt and check message trace/quarantine if needed.

- Risk: Secret leakage through local notes or logs.
  Mitigation: Use secure prompts/environment variables, avoid printing tokens, and record only non-secret identifiers.

- Risk: WEB-7 resumes with incomplete configuration.
  Mitigation: Keep WEB-7 paused until this SOW's required outputs and verification result are recorded.

## Handoff To WEB-7

After WEB-8 completion:

1. Update Jira WEB-8 with final non-secret configuration and verification evidence.
2. Update `workspace/JIRA-WEB-7/implementation_guide.md` with the confirmed Microsoft Graph details.
3. Create or approve WEB-7 `statement_of_work.md`.
4. Only then resume WEB-7 production code implementation.

Handoff status:

- Final non-secret configuration and verification evidence recorded.
- `workspace/JIRA-WEB-7/research.md` and `workspace/JIRA-WEB-7/implementation_guide.md` updated with confirmed Microsoft Graph details.
- WEB-7 next gate is implementation guide re-approval and statement of work creation/approval.

## Approval Gate

Statement of work approved by project owner on 2026-05-18. Proceed with Microsoft admin configuration and sanitized verification evidence collection.
