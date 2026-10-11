# WEB-8 Implementation Guide: Microsoft Graph Mail Delivery Setup

## Gate Status

- Jira issue: [WEB-8](https://chartroomai.atlassian.net/browse/WEB-8)
- Approved research: `workspace/JIRA-WEB-8/research.md`
- Approved direction: Microsoft Graph app-only `sendMail`
- Jira relationship: WEB-8 blocks [WEB-7](https://chartroomai.atlassian.net/browse/WEB-7)
- Local workspace: `workspace/JIRA-WEB-8/`
- Approval status: Approved to proceed with Microsoft 365 / Entra / Exchange admin setup.

This guide covers external Microsoft/Vercel configuration and validation only. It does not authorize production app code changes for WEB-7. WEB-7 resumes after this ticket records the required non-secret configuration values and test-send result.

## Objective

Configure the Chart Room AI Microsoft 365 tenant so the website backend can send contact-form submissions using Microsoft Graph without exposing secrets or sending visitors to a third-party form provider page.

## Configuration Decisions

- Delivery mode: `microsoft_graph`
- Authentication model: Microsoft Entra ID app-only access using OAuth 2.0 client credentials.
- Graph permission: Microsoft Graph application permission `Mail.Send`.
- Graph send endpoint: `POST https://graph.microsoft.com/v1.0/users/{CONTACT_FROM_MAILBOX}/sendMail`
- Token endpoint: `POST https://login.microsoftonline.com/{MICROSOFT_TENANT_ID}/oauth2/v2.0/token`
- Token scope: `https://graph.microsoft.com/.default`
- Sender mailbox: pending decision; `info@chartroomai.com` is currently an alias on `marc@chartroomai.com`, not a standalone mailbox.
- Recipient mailbox: `info@chartroomai.com`, currently an alias that routes to Marc's mailbox.
- Secrets: server-side Vercel environment variables only.

## Step 1: Confirm Mailbox

Confirm the mailbox and alias behavior:

- `info@chartroomai.com` is configured as an alias on `marc@chartroomai.com`.
- Use `CONTACT_TO_EMAIL=info@chartroomai.com` for inbound contact-form delivery.
- Choose and test one sender option:
  - `CONTACT_FROM_MAILBOX=marc@chartroomai.com` as the primary mailbox sender.
  - `CONTACT_FROM_MAILBOX=info@chartroomai.com` only if send-from-alias is enabled and verified for Graph.
  - Create/use a shared mailbox for `info@chartroomai.com` if the From address must show the brand mailbox.

Record the confirmed values in Jira and in this workspace. Do not record passwords, secret values, token values, or recovery codes.

## Step 2: Create Or Confirm App Registration

In Microsoft Entra admin center:

1. Open **Identity > Applications > App registrations**.
2. Create a new registration or select an existing app approved for the website backend.
3. Recommended name: `Chart Room AI Website Contact Form`.
4. Supported account type: single tenant.
5. Redirect URI: not required for client credentials unless your tenant policy requires one.
6. Record:
   - Directory/tenant ID for `MICROSOFT_TENANT_ID`.
   - Application/client ID for `MICROSOFT_CLIENT_ID`.

Confirmed values:

- `MICROSOFT_TENANT_ID=32171f9d-89c1-4506-8a1b-96ec4faedee7`
- `MICROSOFT_CLIENT_ID=3fae214c-3c9d-42d8-80e5-4789004d5f17`

Do not use the client secret value as a display name or paste it into local files.

## Step 3: Configure Graph Permission

In the app registration:

1. Open **API permissions**.
2. Select **Add a permission**.
3. Select **Microsoft Graph**.
4. Select **Application permissions**.
5. Add `Mail.Send`.
6. Grant admin consent for the tenant.
7. Confirm the permission shows as granted.

Record in Jira:

- `Mail.Send` application permission configured.
- Admin consent status: granted for Chart Room AI.

## Step 4: Scope Mailbox Access Where Practical

Preferred security posture:

- Scope the application to only the sender mailbox needed for contact-form delivery.
- Use Exchange Online Application RBAC if available in the tenant.
- If mailbox scoping is deferred, record the explicit risk that application `Mail.Send` may be broader than the website needs.

Record one of:

- Mailbox scoping completed for `CONTACT_FROM_MAILBOX`.
- Mailbox scoping deferred: final sender identity is pending alias sender validation; risk accepted for initial setup that `Mail.Send` application permission is broader than ideal.
- Mailbox scoping unavailable, with tenant/tooling reason.

## Step 5: Create Server Credential

Create one credential suitable for Vercel server-side use:

- Initial option: client secret with an expiration date and rotation reminder.
- Preferred longer-term option: certificate or federated credential if the deployment workflow supports it.

Store the credential only in the approved secret store or Vercel environment variables.

Confirmed credential metadata:

- Credential type: client secret.
- Description: `Vercel contact form delivery`.
- Secret ID: `5594b719-e8e4-464f-9473-199729c4eb49`.
- Expires: 2027-05-18.
- Storage location: Vercel project environment variables.
- Rotation tracking: Jira follow-up task required before expiration; do not wait until the expiration date.

Required Vercel environment variables for WEB-7:

- `CONTACT_DELIVERY_MODE=microsoft_graph`
- `MICROSOFT_TENANT_ID=<tenant-guid>`
- `MICROSOFT_CLIENT_ID=<application-client-id>`
- `MICROSOFT_CLIENT_SECRET=<secret-value-if-client-secret-is-used>`
- `CONTACT_FROM_MAILBOX=info@chartroomai.com`
- `CONTACT_TO_EMAIL=info@chartroomai.com`

Security rules:

- Never use `NEXT_PUBLIC_` for Microsoft credentials.
- Never commit `.env` files containing real secrets.
- Never paste `MICROSOFT_CLIENT_SECRET` into Jira, markdown artifacts, shell transcripts, PRs, or screenshots.
- Record only the secret name/location and rotation date.
- Maintain a recurring or dated follow-up task to rotate `MICROSOFT_CLIENT_SECRET` before 2027-05-18.

## Step 6: Test Client Credentials

Run a local or cloud shell test only after the secret is available in a secure shell environment.

Do not run HTTP shorthand lines such as `POST https://graph.microsoft.com/...` directly in PowerShell. Use `Invoke-RestMethod` for the token and `sendMail` calls below.

Set environment variables in the shell without writing them to a repo file:

```powershell
$env:MICROSOFT_TENANT_ID = "<tenant-guid>"
$env:MICROSOFT_CLIENT_ID = "<application-client-id>"
$env:MICROSOFT_CLIENT_SECRET = Read-Host "Microsoft client secret"
$env:CONTACT_FROM_MAILBOX = "info@chartroomai.com"
$env:CONTACT_TO_EMAIL = "info@chartroomai.com"
```

Request a Graph token:

```powershell
$tokenResponse = Invoke-RestMethod `
  -Method Post `
  -Uri "https://login.microsoftonline.com/$env:MICROSOFT_TENANT_ID/oauth2/v2.0/token" `
  -ContentType "application/x-www-form-urlencoded" `
  -Body @{
    client_id = $env:MICROSOFT_CLIENT_ID
    scope = "https://graph.microsoft.com/.default"
    client_secret = $env:MICROSOFT_CLIENT_SECRET
    grant_type = "client_credentials"
  }
```

Do not print `$tokenResponse.access_token`.

## Step 7: Send Graph Test Email

Run the sender validation in two parts. First test the preferred brand-facing alias path; then test or record the fallback path if the alias cannot be used as the sender.

### Test A: Alias As Sender

Set the sender to the alias:

```powershell
$env:CONTACT_FROM_MAILBOX = "info@chartroomai.com"
$env:CONTACT_TO_EMAIL = "info@chartroomai.com"
```

Send a test email:

```powershell
$message = @{
  message = @{
    subject = "WEB-8 Microsoft Graph alias sender test"
    body = @{
      contentType = "Text"
      content = "This validates whether info@chartroomai.com can be used as the Microsoft Graph sender while configured as an alias."
    }
    toRecipients = @(
      @{
        emailAddress = @{
          address = $env:CONTACT_TO_EMAIL
        }
      }
    )
  }
  saveToSentItems = $true
} | ConvertTo-Json -Depth 10

Invoke-RestMethod `
  -Method Post `
  -Uri "https://graph.microsoft.com/v1.0/users/$env:CONTACT_FROM_MAILBOX/sendMail" `
  -Headers @{ Authorization = "Bearer $($tokenResponse.access_token)" } `
  -ContentType "application/json" `
  -Body $message
```

Verification:

- Graph request completed without error.
- Recipient mailbox received the message.
- The delivered message showed the expected alias From identity: `info@chartroomai.com`.
- If `saveToSentItems` is true, sender mailbox has a sent item.
- No token or secret value appears in local artifacts or Jira.

Note: Graph `sendMail` returns `202 Accepted` when the request is accepted. Confirm mailbox receipt as the practical delivery check.

### Test B: Primary Mailbox Fallback

If Test A fails, or if the delivered From identity is not acceptable, test the primary mailbox sender:

```powershell
$env:CONTACT_FROM_MAILBOX = "marc@chartroomai.com"
$env:CONTACT_TO_EMAIL = "info@chartroomai.com"
```

Repeat the same `sendMail` request with subject:

```text
WEB-8 Microsoft Graph primary sender fallback test
```

Record one final sender decision:

- Alias sender verified: `CONTACT_FROM_MAILBOX=info@chartroomai.com`.
- Primary sender fallback selected: `CONTACT_FROM_MAILBOX=marc@chartroomai.com`, `CONTACT_TO_EMAIL=info@chartroomai.com`.
- Shared mailbox follow-up required: `info@chartroomai.com` must become a shared mailbox before WEB-7 uses it as the sender.

Sender decision recorded: use `CONTACT_FROM_MAILBOX=info@chartroomai.com` and `CONTACT_TO_EMAIL=info@chartroomai.com` for WEB-7.

## Step 8: Record WEB-7 Inputs

After a successful test, update Jira and local artifacts with non-secret values:

- `MICROSOFT_TENANT_ID`
- `MICROSOFT_CLIENT_ID`
- Credential type and storage location, but not the credential value.
- `CONTACT_FROM_MAILBOX`
- `CONTACT_TO_EMAIL`
- `CONTACT_DELIVERY_MODE=microsoft_graph`
- Permission: `Mail.Send` application permission.
- Admin consent status.
- Mailbox scoping status.
- Test-send timestamp and result.

Then update `workspace/JIRA-WEB-7/implementation_guide.md` before creating WEB-7 `statement_of_work.md`.

## Failure Handling

If token acquisition fails:

- Verify tenant ID, client ID, credential value, and secret expiration.
- Verify admin consent has been granted after adding `Mail.Send`.
- Confirm tenant policy allows client credential use.

If `sendMail` fails:

- Verify `CONTACT_FROM_MAILBOX` exists.
- Verify the app has permission to send as the selected mailbox.
- Verify Exchange mailbox scoping, if configured, includes the sender mailbox.
- Record the error code and sanitized message in Jira. Do not include tokens or secrets.

If Graph accepts the request but no mail arrives:

- Check sender Sent Items if enabled.
- Check recipient junk/quarantine.
- Check Exchange message trace if available.
- Record that Graph accepted the request but final delivery is not confirmed.

## Completion Criteria

WEB-8 can be handed off when:

- App registration is confirmed.
- `Mail.Send` application permission is configured.
- Admin consent is complete or a blocker is explicitly documented.
- Sender and recipient mailboxes are confirmed.
- Server credential is stored securely for Vercel use.
- Mailbox scoping is completed or explicitly deferred.
- Graph test send succeeds or a clear blocker is recorded.
- WEB-7 receives enough non-secret configuration detail to implement Microsoft Graph delivery.

Completion status: all WEB-8 completion criteria met on 2026-05-18. WEB-7 handoff artifacts were updated with the confirmed configuration and sanitized verification result.
