# WEB-23 Statement Of Work: Proof Section Case-Study Detail

## Project Context

- Jira issue: [WEB-23](https://chartroomai.atlassian.net/browse/WEB-23)
- Parent ticket: [WEB-21](https://chartroomai.atlassian.net/browse/WEB-21)
- Local workspace: `workspace/JIRA-WEB-23/`
- Approved research: `workspace/JIRA-WEB-23/research.md`
- Approved implementation guide: `workspace/JIRA-WEB-23/implementation_guide.md`
- Branch: `WEB-23-strengthen-proof-section`

## Objective

Strengthen the homepage proof section so regulated financial buyers understand why a newly formed Chart Room AI is credible: the operating model was built and proven at Caravel Concepts, and an anonymized Independent RIA workflow shows advisor-prep impact without exposing confidential details.

## Scope

- Rewrite the homepage proof stories into stronger mini case studies.
- Reference `Caravel Concepts` as the named origin story for the operating model.
- Rename `Mid-Western RIA` to `Independent RIA`.
- Qualify throughput language with `several-fold increase` rather than hard multipliers.
- Replace or soften unsupported developer-productivity copy.
- Explain the governance/control model for Caravel:
  - research sign-off
  - statement-of-work sign-off
  - implementation sign-off
  - merge-request sign-off
  - branch approval before merge to main development
- Explain the governance/control model for the Independent RIA:
  - plan-level access checks
  - read-only source-plan analysis
  - sandboxed what-if analysis
  - advisor review
- Preserve anonymity, confidentiality, and regulated-buyer tone.

## Files Expected To Change

- `web/src/lib/site-content.ts`
- `web/src/app/page.tsx` only if modest rendering changes are needed for structured proof-card fields

## Non-Goals

- Creating a dedicated proof or case-study page.
- Adding testimonials, quotes, client logos, or public client roster claims.
- Naming the RIA, exposing geography, or introducing private plan/client data.
- Naming ClickUp in public copy.
- Making hard productivity claims without methodology.
- Changing contact, booking, audit, or form behavior.
- Redesigning the homepage.
- Adding analytics, tracking, or new dependencies.

## Acceptance Criteria

- Caravel proof clearly explains that the operating model was built and proven internally before being offered through Chart Room AI.
- Caravel proof links the workflow to business needs, management visibility, and faster release confidence.
- Caravel proof includes governance controls and does not imply uncontrolled autonomous development.
- RIA proof uses `Independent RIA`.
- RIA proof describes advisor plan-prep work, access controls, read-only data use, sandboxed what-if analysis, and advisor review.
- RIA proof states that advisor prep time dropped from hours to minutes and helped the advisor reach higher-level planning judgment faster.
- Metrics are supportable, qualified, and suitable for regulated financial services buyers.
- Public copy avoids confidential details, unsupported logos/testimonials, and overclaiming.

## Verification Expectations

- Search source for `Mid-Western RIA` and confirm it is removed from production copy.
- Search source for `ClickUp` and confirm it is not introduced into public copy.
- Search source for `2-3x` and `doubles, sometimes triples`; confirm those claims are removed or replaced with approved qualified language.
- Review the proof section manually on desktop and mobile.
- Run `npm run lint` from `web/`.
- Confirm no confidential Caravel or RIA details are introduced.

## Verification Evidence

- `npm run lint` from `web/` passed.
- `npm run build` from `web/` passed, including TypeScript and static page generation.
- Source search found no remaining `Mid-Western RIA`, `ClickUp`, `2-3x`, or `doubles, sometimes triples` in `web/src`.
- Source search confirmed approved terms in production copy: `Caravel Concepts`, `Independent RIA`, `project-management system`, and `several-fold`.

## Copy Boundaries

- Approved named organization: `Caravel Concepts`.
- Approved anonymized label: `Independent RIA`.
- Approved throughput language: `several-fold increase`.
- Approved tool language: `project-management system`.
- Avoid hard multipliers in public copy unless future analysis and methodology are included.
- Avoid language suggesting AI replaced developer or advisor judgment.
- Avoid language suggesting the RIA workflow changed the original plan or produced autonomous client-facing advice.

## Risks

- The expanded proof cards may become too dense for the current homepage layout. If so, keep the homepage concise and defer a dedicated proof page to a follow-up ticket.
- Later throughput metrics include more structured phase and subtask records, so public copy must stay qualified.
- Strong proof language can create compliance or credibility risk if it implies a public client roster or unsupported testimonials.

## Approval

Approved for implementation under WEB-23. WEB-23 branch confirmed.

SOW and homepage proof copy approved by stakeholder review.
