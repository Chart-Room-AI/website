# JIRA-WEB-33 Research

## Ticket

- Jira: https://chartroomai.atlassian.net/browse/WEB-33
- Goal: Replace homepage hero intro opener from `I'm Marc Cheatham` to `Founder Marc Cheatham`.
- Local workspace path: `workspace/JIRA-WEB-33/`

## Current Behavior

The homepage hero paragraph in `web/src/app/page.tsx` currently reads:

> I'm Marc Cheatham - former CTO and CISO who has had to solve these problems inside regulated financial environments. We bring that operating skill to deliver governed, production-ready AI that survives board and audit scrutiny.

This mixes first-person `I'm` with the site's default we-voiced firm narrative. The portfolio spec (`marc-cheatham-portfolio-spec.md`) recommends founder sections use Marc Cheatham by name and avoid mixing `I` and `we` in the same paragraph without a clear section break.

## Recommendation

Replace only the opener `I'm Marc Cheatham` with `Founder Marc Cheatham`. Keep the remainder of the paragraph unchanged.

## Risks

- Low risk: single-line copy change in one production file.
- No behavior, routing, or layout changes.

## Verification Plan

- Search repository for remaining `I'm Marc Cheatham` in production code.
- Run `npm run lint` from `web/`.
