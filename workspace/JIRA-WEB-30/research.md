# WEB-30 Research

## Ticket

- Jira issue: [WEB-30](https://chartroomai.atlassian.net/browse/WEB-30)
- Branch: `WEB-30-remove-friction-audit`
- Local workspace: `workspace/JIRA-WEB-30/`

## Goal

Remove public website content about "the 5-minute Agentic Workflow Friction Audit" while that offer is deferred until WEB-24 work resumes.

## Approval

Research direction approved by stakeholder on 2026-05-19.

## Initial Findings

Before implementation, public-facing references appeared in:

- `web/src/app/page.tsx`: hero text link and homepage lead-magnet section.
- `web/src/app/contact/page.tsx`: trust signal anchor and dedicated audit section.
- `web/src/components/SiteFooter.tsx`: footer secondary CTA.
- `web/src/components/CtaBand.tsx`: shared secondary CTA.
- `web/src/lib/site-config.ts`: default `auditHref` pointed to `/contact#audit`.

Non-public planning references also exist in local notes and prior ticket artifacts. Those do not need removal for this ticket unless they are rendered by the site.

## Relevant Project Rules

- `web/AGENTS.md` says to read relevant Next.js docs under `node_modules/next/dist/docs/` before code changes. That docs path is not present in the installed package, so this is recorded as unavailable for this pass.
- No `docs/domain/CONTEXT.md` or `docs/adr/README.md` exists in this repo. Domain CONTEXT and ADR review are deferred because the ticket is a narrow public-copy cleanup.

## Recommendation

Remove the audit offer entry points rather than replacing them with another lead magnet. Preserve the primary diagnostic request flow and direct booking path. Update `auditHref` to the diagnostic form so stale env-free defaults cannot route users to the removed `#audit` anchor.

## Risks

- External deployments may set `NEXT_PUBLIC_AUDIT_URL`; this ticket can remove in-repo public links, but deployed environment variables should be checked separately if they exist.
- Internal docs will continue to mention the audit as historical planning context.

## Verification Results

- `rg` in `web/src` for audit phrases and `/contact#audit`: no matches.
- `rg` in `web` excluding `.next` for audit phrases and `/contact#audit`: no matches.
- `npm run lint` from `web`: passed.
- IDE lints on edited source files: no linter errors found.
