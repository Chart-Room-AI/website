# Website Hosting and DNS Notes

These notes describe how `chartroomai.com` is hosted and where DNS authority lives, so a future agent can safely inspect or update the setup.

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
