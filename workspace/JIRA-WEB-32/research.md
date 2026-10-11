# JIRA-WEB-32 Research

## Ticket

- Jira: https://chartroomai.atlassian.net/browse/WEB-32
- Goal: Replace the website CTA copy from `Request AI Readiness Diagnotic` to `Unlock AI for your Firm`.
- Status at kickoff: In Progress.

## Current Behavior

The ticket text contains the misspelled phrase `Request AI Readiness Diagnotic`, but repository search found the visible website copy as the correctly spelled `Request AI Readiness Diagnostic`.

Current production-code matches:

- `web/src/app/page.tsx`
- `web/src/components/CtaBand.tsx`
- `web/src/components/SiteHeader.tsx`
- `web/src/components/ContactForm.tsx`
- `web/src/components/SiteFooter.tsx`

Related workspace notes also mention the old phrase, but this ticket is scoped to visible website copy only.

## Recommendation

Replace visible CTA labels that currently say `Request AI Readiness Diagnostic` with `Unlock AI for your Firm`. Preserve destinations, styling, component structure, and form behavior.

## Risks

- The requested text changes a previously standardized CTA phrase from `JIRA-WEB-25`; this ticket supersedes that phrase for visible website CTAs.
- The exact misspelled string from the ticket does not exist in production code, so verification should search both `Diagnotic` and `Diagnostic`.

## Verification Plan

- Search the repository for the old visible phrase and the ticket typo.
- Run the web lint/type/build check available in `web/package.json`.
- Manually inspect the changed components or dev server if needed.
