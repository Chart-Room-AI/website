# JIRA-WEB-32 Statement Of Work

## Scope

Replace visible website CTA text currently shown as `Request AI Readiness Diagnostic` with `Unlock AI for your Firm`.

## In Scope

- Homepage CTA labels.
- Header desktop and mobile CTA labels.
- Footer CTA label.
- CTA band label.
- Contact form submit label.
- Verification that both the ticket typo and existing correctly spelled old phrase are absent from production website code.

## Out Of Scope

- CTA URL or route changes.
- Form behavior changes.
- Layout, typography, or visual styling changes.
- Historical planning document cleanup.
- Broader marketing copy rewrites.

## Acceptance Criteria

- The website no longer displays `Request AI Readiness Diagnotic` or `Request AI Readiness Diagnostic`.
- The replacement copy displays as `Unlock AI for your Firm` in the same CTA locations.
- Existing CTA click and submit behavior remains unchanged.
- Verification results are recorded before handoff.

## Handoff Notes

- Jira ticket: https://chartroomai.atlassian.net/browse/WEB-32
- Branch: `WEB-32-replace-ai-readiness-cta`

## Verification Results

- Repository search in `web/src` for `Request AI Readiness Diagnotic|Request AI Readiness Diagnostic`: no matches found.
- Repository search in `web/src` for `Unlock AI for your Firm`: found expected CTA instances.
- `npm run lint` from `web`: passed.
- IDE lints for changed production files: no errors found.
