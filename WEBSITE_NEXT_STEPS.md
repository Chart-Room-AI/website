# Website Next Steps

Last updated: 2026-05-15

## Current Status

- First-pass CRO changes have been pushed to `main`.
- The website is deployed and live at `https://www.chartroomai.com`.
- The site is a Next.js app under `web/`.
- Local development URL: `http://localhost:3000/`.
- Resume source provided: `c:\Users\emche\OneDrive\Chart Room AI\Resume.pdf`.
- Production resume download should be re-tested after each deployment because the PDF contains personal contact details.

## Completed In The First Pass

- Sharpened the homepage hero from general AI transformation language toward a stronger commercial promise.
- Improved primary CTA language around discussing a stalled AI initiative.
- Added credibility/proof concepts: years of technology leadership, CTO tenure, CTO/CEO/CISO operator judgment, and production AI experience.
- Added homepage funnel concepts:
  - Immediate business value
  - When to call
  - Engagement paths
  - Best fit
- Improved final CTA language.
- Made the contact page more oriented around a qualified AI initiative conversation.
- Improved mobile navigation from wrapped nav links to a compact menu.
- Wired the resume PDF into the public resume download path.
- Deployed the first-pass site to production.

## Highest-Impact Product And CRO Next Steps

1. Build out the three engagement offers.
   - AI readiness diagnostic
   - Roadmap and governance sprint
   - Fractional transformation leadership
   - For each offer, define:
     - Who it is for
     - Typical trigger/problem
     - What the engagement includes
     - Expected deliverables
     - Typical duration or working cadence
     - Best next CTA

2. Add stronger proof without needing a headshot.
   - Create a prominent founder credibility panel.
   - Use proof points like:
     - 31 years technology leadership
     - 18 years as CTO
     - Former CTO / acting CEO
     - CISO-style security and governance ownership
     - Production multi-agent AI systems
     - Fintech platform depth

3. Add anonymized mini case studies.
   - Use a simple format:
     - Situation
     - Constraint
     - Intervention
     - Outcome
   - Avoid confidential client names or unauthorized metrics.
   - Even two anonymized examples would materially improve trust.

4. Re-check mobile first impression on the live site.
   - Confirm the nav is not clipped.
   - Confirm hero copy does not overflow horizontally.
   - Consider slightly smaller mobile hero typography if it still feels dense.
   - Confirm primary CTA appears before the large illustration.

5. Add a booking link when ready.
   - Set `NEXT_PUBLIC_BOOKING_URL` when a booking page exists.
   - Keep email-first as fallback.

6. Add authority content later.
   - Good first articles:
     - Why regulated AI pilots stall
     - How to evaluate production readiness for AI initiatives
     - What executives should ask before buying another AI tool
     - AI governance that does not freeze delivery

## Production And Operations Next Steps

1. Confirm `main` is up to date with `origin/main`.
2. Keep future production changes flowing through `main`, since Vercel deploys production from that branch.
3. Keep the Vercel Framework Preset set to `Next.js`.
4. Keep the Vercel project root directory set to `web`.
5. Redeploy from `main` after future production changes.
6. Review Vercel plan and billing settings before the Pro trial ends.
7. Decide whether to enable Vercel Web Analytics or another privacy-appropriate analytics tool.
8. Keep Cloudflare DNS records for `chartroomai.com` and `www` as `DNS only` unless intentionally introducing Cloudflare proxy behavior.
9. Preserve Microsoft email DNS records when making any future Cloudflare changes.
10. Confirm `https://chartroomai.com` redirects to `https://www.chartroomai.com` after future domain changes.

## Site Polish

1. Verify social previews for `https://www.chartroomai.com` in LinkedIn and messaging apps.
2. Add or confirm production metadata assets, including favicon, Open Graph image, and canonical site URL.
3. Re-test the contact email link and resume download after each production deployment.
4. Check desktop and mobile layouts after significant content or style changes.

## Suggested Tomorrow Plan

1. Open the live site: `https://www.chartroomai.com`.
2. Review homepage and contact page on desktop and mobile.
3. Re-test the contact email link and resume download.
4. Confirm `main` is clean and current with `origin/main`.
5. Next implementation target: expand the three engagement offers into stronger conversion sections.

## Useful Commands

```powershell
cd c:\Users\emche\workspace\personal\website
git status --short --branch
git pull --ff-only
```

```powershell
cd c:\Users\emche\workspace\personal\website\web
npm run dev
npm run lint
npm run build
```
