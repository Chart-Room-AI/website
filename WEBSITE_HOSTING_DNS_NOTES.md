# Website Hosting and DNS Notes

These notes describe how `chartroomai.com` is hosted and where DNS authority lives, so a future agent can safely inspect or update the setup. The client-site launch checklist (#24) is at the end. It does not change `chartroomai.com` DNS.

## Production Site

- Primary URL: `https://www.chartroomai.com`
- Apex URL: `https://chartroomai.com`
- Expected behavior: `chartroomai.com` redirects to `www.chartroomai.com`
- Care Helm product URL: `https://carehelm.chartroomai.com`
- Expected behavior: `carehelm.chartroomai.com` serves the Care Helm landing page (same content as `/care-helm` on the main site)

## Hosting Authority

- Hosting provider: Vercel
- Vercel team/account: `Chart Room`
- Vercel project: `website`
- GitHub repo: `cheezd/website`
- Production branch: `main`
- App root directory in repo: `web`

### Required Vercel Build Settings

The app is a Next.js app inside the `web` directory.

```text
Framework Preset: Next.js
Root Directory: web
Install Command: npm ci
Build Command: npm run build
Output Directory: leave blank/default
```

If the deployed site returns a Vercel platform `404: NOT_FOUND` even though the build succeeds, check that the Framework Preset is `Next.js`. During initial setup, `Other` and `Node` produced a successful build but did not serve the app correctly.

## DNS Authority

- DNS provider: Cloudflare
- Vercel nameservers: not used
- Cloudflare nameservers observed during setup:
  - `elsa.ns.cloudflare.com`
  - `kenneth.ns.cloudflare.com`

Cloudflare is the DNS authority for `chartroomai.com`. DNS changes for the web site should be made in Cloudflare, not in Vercel DNS.

## Required Web DNS Records

These records point the domain to Vercel.

```text
Type   Name               Value                  Proxy Status
A      chartroomai.com    76.76.21.21            DNS only
CNAME  www                cname.vercel-dns.com   DNS only
CNAME  carehelm           cname.vercel-dns.com   DNS only
```

Vercel may also recommend an `A` record for the Care Helm subdomain instead of `CNAME`:

```text
Type   Name               Value                  Proxy Status
A      carehelm           76.76.21.21            DNS only
```

Use one approach, not both. Keep the record as `DNS only` (grey cloud).

## Email DNS Records

Email is handled through Microsoft. Do not remove or alter Microsoft email records while changing web hosting DNS.

Records seen during setup included Microsoft-related `MX`, `TXT`, and `CNAME` records such as:

```text
CNAME  autodiscover
CNAME  enterpriseenrollment
CNAME  enterpriseregistration
MX     chartroomai.com
TXT    SPF record
TXT    MS verification record
```

These are separate from web hosting and should remain in place.

## Vercel Domain Setup

The Vercel project should have these domains attached:

```text
chartroomai.com
www.chartroomai.com
carehelm.chartroomai.com
```

Current intended routing:

```text
chartroomai.com           -> redirects to www.chartroomai.com
www.chartroomai.com       -> production deployment (Chart Room AI site)
carehelm.chartroomai.com  -> production deployment (Care Helm landing via middleware rewrite)
www.chartroomai.com/care-helm -> same Care Helm landing page
```

After adding `carehelm.chartroomai.com` in Vercel, add the Cloudflare CNAME record above and click `Refresh` on the domain in Vercel Project Settings > Domains until valid.

## Deployment Checklist

1. Push changes to `main`.
2. Confirm Vercel deploys the `website` project from `web`.
3. Confirm build logs include `next build` and route generation for `/`, `/about`, `/contact`, `/experience`, `/expertise`, and `/why-chart-room`.
4. Test `https://www.chartroomai.com`.
5. Test `https://www.chartroomai.com/care-helm`.
6. Test `https://carehelm.chartroomai.com` serves the Care Helm landing page.
7. Test `https://chartroomai.com` redirects to `www`.
8. Test contact email links.
9. Test resume download at `/documents/Marc-Cheatham-Resume.pdf`.
10. Check desktop and mobile layouts.

## Troubleshooting Notes

- If Cloudflare shows correct records but the browser says `DNS_PROBE_FINISHED_NXDOMAIN`, wait for resolver propagation and try another network or incognito window.
- If Vercel says `DNS Change Recommended`, compare Cloudflare records against Vercel's expected values and make sure the Cloudflare proxy is disabled.
- If the Vercel-generated deployment URL returns `404: NOT_FOUND`, check the Vercel Framework Preset first.
- If the build succeeds but the site does not serve, redeploy after fixing project settings and disable the existing build cache if prompted.

## Client site launch checklist (#24)

Launch uses this checklist to put a **client** site on the Chart Room Vercel team and connect the **client's** domain. It extends the `chartroomai.com` notes above (same team, same style of web records, email records left alone). It is not a change to `chartroomai.com`, Care Helm, or Bosun.

Do not run this checklist on a real domain until:

- Marc has approved this checklist (the ticket is `needs-marc`).
- Marc has confirmed the Vercel Pro trial converted to paid billing (#25). Preview builds can exist before that. A client domain cannot.
- The template in `template/` is on `main`, and the client project’s production branch is `main`.
- Marc has said Turnstile and mail env vars may be set, and (if the config uses `gmail`) Gmail is actually implemented. Until then the form fails safe and is not launch proof.

`client-template` (`prj_ILpzXSqhZHrdXpxlYAPjDWEovXt8`) is the sample preview project. It has **no custom domain**. Do not attach one. Do not change its production branch in this checklist; Marc confirms that it should be `main`.

### 1. Project on the Chart Room team

- Team: `chart-room` (Vercel Pro).
- One Vercel project per client. Name it `client-<config-id>`, where `<config-id>` matches `CLIENT_CONFIG` and `config/clients/<id>.ts`. The sample project stays named `client-template`.
- Git: `cheezd/website`. Root Directory: `template`. Framework: Next.js. Node: 24.x. Install, build, and output: the project defaults (`npm` from the lockfile, `npm run build`).
- Production branch: `main`.
- Ignored Build Step: `git diff --quiet HEAD^ HEAD -- .` so the project builds only when `template/` changes.
- `CLIENT_CONFIG=<id>` on Production and Preview. That value is not a secret.
- Deployment protection off, unless Marc asks for it.
- No secrets in Git, the PR, or the issue. Names only, in the PR body, when Marc has approved adding them.

### 2. Domain stays in the client's name

- The client registers the domain, or already owns it. Chart Room does not transfer the domain into Chart Room’s name.
- Get DNS access from the client: an invite to their DNS host, or a login they control. Do not take registrar ownership to “make it easier.”
- If they use Cloudflare, keep web records **DNS only** (grey cloud), same as `chartroomai.com`.

### 3. Write down email DNS before any web change

Before adding or editing web records, export or copy every mail-related record. Do not paste the values into GitHub.

Record at least:

- `MX`
- SPF (`TXT` on the apex)
- DKIM (`CNAME` or `TXT`)
- DMARC (`TXT` on `_dmarc`)
- Anything else the client’s mail host uses (for Microsoft, that often includes `autodiscover`, `enterpriseenrollment`, and `enterpriseregistration` CNAMEs, as on `chartroomai.com`)

If the domain has no email, write that down too, with the date.

### 4. Point the web host at Vercel

In the client’s Vercel project, add the apex and `www` (and only those names the client asked for).

In the client’s DNS, add the records Vercel shows for that domain. The `chartroomai.com` pattern, when Vercel asks for the same targets, is:

```text
Type   Name    Value                  Proxy
A      @       76.76.21.21            DNS only
CNAME  www     cname.vercel-dns.com   DNS only
```

Use the targets Vercel displays if they differ. Do not also add the other shape (apex `A` plus a second apex record) for the same name. Do not edit, delete, or replace the email records from step 3.

In Vercel, use Refresh on the domain until it shows valid. HTTPS is Vercel’s certificate: confirm the site loads on `https://`, and that `http://` redirects to it.

### 5. After the records change

- Compare email DNS to the step 3 list. `MX`, SPF, DKIM, DMARC, and the other mail records must be unchanged.
- Key pages return 200: `/`, `/services`, `/gallery`, `/reviews`, `/about`, `/contact`. `/icon` and `/opengraph-image` return 200 with `image/png`.
- The contact form delivers one real quote to the client’s mailbox. That check stays blocked until Marc has approved the mail env vars and the configured provider can send. A 303 to `/contact/error` is the safe failure, not a pass.
- `sample: true` content is not a launch. The sample banner and `noindex` must be gone only after Marc has approved real copy.

### 6. Rollback

- To take the domain off the new site, remove the domain from the Vercel project and restore the **web** DNS records you wrote down before step 4.
- Do not delete or rewrite email records as part of a rollback.
- The previous site, if there was one, comes back when those previous web records are restored. The Vercel project and its `*.vercel.app` URL can stay up.

### 7. Hand-off

Tell the client, in writing:

- Chart Room hosts the website on its Vercel team (`chart-room`).
- The client still owns the domain registration and the email DNS.
- Site copy and config changes go through Chart Room (Marc).
- Who to contact: Marc at Chart Room, the same contact path as `chartroomai.com`.

Do not include secrets, billing details, or the contents of the email DNS export.

### Not done yet

No client domain is attached. No DNS was changed for this checklist. The before/after email-DNS proof and Launch’s post-deploy check for the first real client are still open on #24.
