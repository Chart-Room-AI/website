# JIRA-WEB-33 Statement Of Work

## Scope

Update the homepage hero intro copy to lead with `Founder Marc Cheatham` instead of `I'm Marc Cheatham`.

## In Scope

- Homepage hero paragraph in `web/src/app/page.tsx`.

## Out Of Scope

- Other homepage sections or pages.
- Metadata, SEO, or layout changes.
- Broader narrative or copy rewrites.

## Acceptance Criteria

- Homepage hero displays: `Founder Marc Cheatham - former CTO and CISO who has had to solve these problems inside regulated financial environments. We bring that operating skill to deliver governed, production-ready AI that survives board and audit scrutiny.`
- Frontend lint passes.

## Verification Results

- Repository search in `web/src` for `I'm Marc Cheatham` / `I&apos;m Marc Cheatham`: no matches found.
- Repository search in `web/src` for `Founder Marc Cheatham`: found in `web/src/app/page.tsx`.
- `npm run lint` from `web`: passed.

## Handoff Notes

- Jira ticket: https://chartroomai.atlassian.net/browse/WEB-33
- Branch: `WEB-33-hero-founder-copy`
