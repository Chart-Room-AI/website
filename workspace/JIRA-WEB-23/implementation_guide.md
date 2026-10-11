# WEB-23 Implementation Guide: Proof Section Case-Study Detail

## Gate Status

- Jira issue: [WEB-23](https://chartroomai.atlassian.net/browse/WEB-23)
- Parent ticket: [WEB-21](https://chartroomai.atlassian.net/browse/WEB-21)
- Approved research: `workspace/JIRA-WEB-23/research.md`
- Local workspace: `workspace/JIRA-WEB-23/`
- Branch: `WEB-23-strengthen-proof-section`
- Approval status: Research approved; implementation scope approved by this guide

This guide is approved from the WEB-23 research gate. The implementation should stay narrow: strengthen the homepage proof section and supporting proof metrics with honest Caravel Concepts and anonymized Independent RIA case-study detail.

## Implementation Goals

- Rework the homepage proof cards into clearer mini case studies.
- Present Chart Room AI as newly formed from operating patterns proven at Caravel Concepts.
- Replace or soften unsupported `2-3x` developer-productivity language with qualified, supportable throughput language.
- Rename `Mid-Western RIA` to `Independent RIA`.
- Preserve anonymity for the RIA workflow.
- Add governance/control detail so regulated financial buyers see the operating model did not bypass human review, access control, or release discipline.
- Keep this as a copy/content update unless a dedicated proof page is separately approved.

## Approved Claim Language

### Caravel Concepts

Use:

- `Caravel Concepts`
- `project-management system`
- `several-fold increase`
- `better linkage from sprint work to critical business needs`
- `faster release confidence`

Avoid:

- Naming ClickUp in public copy.
- Hard multipliers such as `4x` or `5.2x` unless methodology and caveats are also shown.
- Saying AI replaced developer judgment.
- Implying autonomous production changes.

### Independent RIA

Use:

- `Independent RIA`
- `advisor prep time dropped from hours to minutes`
- `higher-level planning judgment faster`
- `read-only source-plan analysis`
- `sandboxed what-if analysis`

Avoid:

- `Mid-Western RIA`
- Client-identifying geography, names, logos, or private details.
- Saying the system changed the original plan.
- Saying client-facing advice was generated without advisor review.

## Content Architecture

Each proof card should include:

- Situation: what was slow, opaque, or risky before.
- Intervention: what the agentic workflow changed.
- Controls: how the workflow stayed governed.
- Result: qualified, supportable outcome.
- Why it mattered: business impact for regulated financial buyers.

## File Plan

### `web/src/lib/site-content.ts`

Update content constants only unless the current card structure cannot support the approved copy.

Recommended changes:

- Update `proofPoints`:
  - Replace `2-3x` if it appears as an unqualified developer-productivity metric.
  - Preferred replacement: `Several-fold`.
  - Label should connect to completed project-management work and workflow maturity, not a pure developer productivity claim.
- Update `outcomeMetrics`:
  - Replace or qualify `Developer and project velocity doubles, sometimes triples`.
  - Keep `Analysis work drops from hours to minutes` only if the surrounding proof ties it to the Independent RIA workflow.
- Update `proofStories`:
  - Expand `Caravel Concepts` with before/intervention/control/result details.
  - Rename `Mid-Western RIA` to `Independent RIA`.
  - Expand the RIA card with before/intervention/control/result details.

Suggested Caravel content ingredients:

- Before: sparse tickets, sprint work not always closing, weak linkage from tasks to critical business needs, heavy documentation and knowledge-transfer burden.
- Intervention: project-management context flowed into the agentic workspace; work discoveries flowed back into the project-management system.
- Controls: research, statement-of-work, implementation, and merge-request sign-offs; branch approvals before merge to main development.
- Result: several-fold increase in completed project-management work after workflow maturity, with richer ticket detail and faster release confidence.

Suggested Independent RIA content ingredients:

- Before: advisor spent multiple hours reviewing screens and assembling first-pass analysis after running a client plan.
- Intervention: agentic analysis retrieved approved plan data and generated a first-pass quantitative readout across cash flow, tax levels, and related planning data.
- Controls: plan-level access checks, read-only source data, sandboxed what-if analysis, advisor review.
- Result: advisor prep time dropped from hours to minutes, helping the advisor reach higher-level planning judgment faster.

### `web/src/app/page.tsx`

Only update layout if the expanded proof stories need modest additional fields, such as `situation`, `controls`, or `whyItMatters`.

Preferred approach:

- Keep the existing proof section layout if copy remains readable.
- If needed, extend the card rendering in a small, local way to show structured mini case-study fields.
- Avoid a homepage redesign.

## Non-Goals

- Do not create a dedicated case-study page in this ticket unless separately approved.
- Do not add client logos, testimonials, or quotes.
- Do not publish RIA identity, geography, private data, or client details.
- Do not add analytics, tracking, or new data collection.
- Do not refactor unrelated site content.
- Do not change form, booking, or contact mechanics.

## Verification Plan

- Search production source for retired or risky phrases:
  - `Mid-Western RIA`
  - `2-3x`
  - `doubles, sometimes triples`
  - `ClickUp`
- Confirm public copy says `project-management system`, not ClickUp.
- Confirm public copy references `Caravel Concepts` only where approved.
- Confirm public copy uses `Independent RIA` and does not reveal identifying details.
- Confirm RIA copy does not imply source-plan mutation or autonomous client-facing advice.
- Confirm Caravel copy includes governance controls rather than only speed claims.
- Run `npm run lint` from `web/`.
- Run `npm run build` from `web/`.
- Manually inspect the homepage proof section on desktop and mobile.

## Verification Evidence

- `npm run lint` from `web/` passed.
- `npm run build` from `web/` passed, including TypeScript and static page generation.
- Retired/risky phrase search passed for `Mid-Western RIA`, `2-3x`, `doubles, sometimes triples`, and `ClickUp` in `web/src`.
- Approved public terms are present in production copy: `Caravel Concepts`, `Independent RIA`, `project-management system`, and `several-fold`.

## Jira And GitHub Workflow

- Keep Jira updated at implementation start, verification, review readiness, and blockers.
- Use `WEB-23` in branch, commit messages, and PR title/body.
- Recommended branch: `WEB-23-strengthen-proof-section`
- PR body should link to `https://chartroomai.atlassian.net/browse/WEB-23`.
- Do not move WEB-23 to Done until review and post-merge checks are complete.

## Implementation Notes

- The current workspace was created while the repo was on `WEB-25-standardize-cta-language`.
- Production edits were made after creating `WEB-23-strengthen-proof-section`.
- Existing unrelated modified files at intake: `grok-findings.md`, `openai-findings.md`.
- Do not revert unrelated user changes.

## Approval Gate

Implementation guide approved. Statement of work created from this scope. WEB-23 branch confirmed.

Homepage proof copy approved by stakeholder review.
