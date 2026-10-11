# WEB-30 Statement Of Work

## Ticket

- Jira issue: [WEB-30](https://chartroomai.atlassian.net/browse/WEB-30)
- Branch: `WEB-30-remove-friction-audit`
- Local workspace: `workspace/JIRA-WEB-30/`
- Research: `workspace/JIRA-WEB-30/research.md`
- Implementation guide: `workspace/JIRA-WEB-30/implementation_guide.md`

## Scope

Remove public website references and entry points for "the 5-minute Agentic Workflow Friction Audit" while the offer is deferred until WEB-24 work resumes.

## Deliverables

- Homepage no longer promotes or links to the audit.
- Contact page no longer contains a dedicated audit section or audit anchor link.
- Shared CTA/footer components no longer present an audit request action.
- Default audit URL no longer points to the removed `#audit` contact anchor.

## Acceptance Criteria

- Public source files do not contain the exact phrase "the 5-minute Agentic Workflow Friction Audit".
- Public navigation, CTAs, metadata, and links do not route users into the audit flow.
- Any remaining audit references are non-public planning/history artifacts or explicitly documented.
- Focused lint/search verification is recorded before review.

## Non-Goals

- Do not implement WEB-24.
- Do not add replacement lead-magnet copy.
- Do not remove historical ticket artifacts, research notes, or local strategy documents that are not rendered by the site.

## Verification Expectations

- `npm run lint` from `web`.
- Repository search for audit phrases and removed anchor.
