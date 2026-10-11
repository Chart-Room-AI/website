# WEB-30 Implementation Guide

## Ticket

- Jira issue: [WEB-30](https://chartroomai.atlassian.net/browse/WEB-30)
- Branch: `WEB-30-remove-friction-audit`
- Research: `workspace/JIRA-WEB-30/research.md`

## Approved Approach

Remove public-facing audit promotion and route any remaining default audit destination to the diagnostic form. Do not introduce replacement WEB-24 messaging in this ticket.

## Implementation Steps

1. Update `web/src/app/page.tsx`.
   - Remove the hero audit text link.
   - Remove the homepage "Free lead magnet" section.
   - Drop unused `auditHref` import.

2. Update `web/src/app/contact/page.tsx`.
   - Remove the "About the friction audit" trust signal link.
   - Remove the `#audit` section.

3. Update shared CTAs.
   - Remove the footer audit CTA from `web/src/components/SiteFooter.tsx`.
   - Remove the secondary audit CTA from `web/src/components/CtaBand.tsx`.
   - Drop unused `auditHref` imports.

4. Update site config.
   - Point the default `auditHref` fallback to `/contact#diagnostic-form` so any non-public import does not target a removed anchor.

## Verification Plan

- Search for public-facing references:
  - `5-minute Agentic Workflow Friction Audit`
  - `Agentic Workflow Friction Audit`
  - `friction audit`
  - `contact#audit`
- Run `npm run lint` in `web`.
- Use IDE lints on edited source files.

## Out Of Scope

- WEB-24 strategy, replacement offer copy, or new lead magnets.
- Removing historical/internal planning notes unless they are rendered by the site.
- Environment-variable changes outside the repo.
