# JIRA-WEB-33 Implementation Guide

## Approved Scope

- Approved research: `workspace/JIRA-WEB-33/research.md`
- Local workspace: `workspace/JIRA-WEB-33/`
- Branch: `WEB-33-hero-founder-copy`

## Implementation Slice

1. Update `web/src/app/page.tsx` hero paragraph:
   - From: `I'm Marc Cheatham - former CTO and CISO...`
   - To: `Founder Marc Cheatham - former CTO and CISO...`
2. Verify no other instances of the old opener remain in `web/src/`.
3. Run `npm run lint` from `web/`.

## Files Likely To Change

- `web/src/app/page.tsx`

## Verification

- Repository search for `I'm Marc Cheatham` / `I&apos;m Marc Cheatham` in `web/src/`.
- `npm run lint` from `web/`.
