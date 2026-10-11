# WEB-23 Research: Strengthen Proof Section With Honest Case-Study Detail

## Issue And Workflow Context

- Jira issue: [WEB-23](https://chartroomai.atlassian.net/browse/WEB-23)
- Jira summary: Strengthen proof section with honest Caravel and RIA case-study detail
- Parent ticket: [WEB-21](https://chartroomai.atlassian.net/browse/WEB-21)
- Jira status at intake: `To Do`
- Local workspace path: `workspace/JIRA-WEB-23/`

This work is being run under the bidirectional project-management flow. Jira owns the stakeholder-facing goal, acceptance criteria, and milestone history. This workspace artifact owns local source discovery, recommendation, risks, and the implementation gate.

## Domain Context And Architecture Notes

- `docs/domain/CONTEXT.md` is not maintained in this repository.
- `docs/adr/README.md` or a comparable ADR index is not maintained in this repository.
- CONTEXT decision for this ticket: defer bootstrapping a domain CONTEXT file. The ticket is a narrow credibility and proof-copy update using existing website concepts: regulated financial services, governed agentic workflows, Caravel Concepts, and anonymized RIA proof.
- No ADR appears necessary unless the approved implementation creates a new dedicated case-study route or changes the site information architecture.

## Current Behavior

- Homepage proof data lives in `web/src/lib/site-content.ts`.
- The homepage renders proof cards from `proofStories` in `web/src/app/page.tsx`.
- Current proof stories are directionally right but thin:
  - `Caravel Concepts` currently says the team built the governed framework internally and moved to a bi-weekly cadence.
  - `Mid-Western RIA` currently says advisor prep became a safe, auditable workflow.
- Current metric language includes strong claims such as `2-3x` developer productivity and `hours to minutes`.
- The current RIA label, `Mid-Western RIA`, is approved to change to `Independent RIA`.

## Problem

The proof section needs to answer a regulated buyer's trust question: why should someone trust a newly formed firm without a broad public client roster?

The available proof should be presented honestly:

- Chart Room AI is newly formed.
- Caravel Concepts can be referenced by name as the origin story for the operating model.
- The RIA example should remain anonymized.
- Metrics should be qualified and tied to what was actually observed.
- Claims should focus on proven operating patterns, controls, and business impact rather than implying a mature consultancy roster.

## Discovery: Caravel Concepts Case Study

### Before State

Caravel Concepts used a traditional agile process with bi-weekly sprints, but several constraints limited throughput and management transparency:

- Sprint tasks often did not fully close within the sprint.
- Tickets were sparse and did not reliably explain the business reason behind the work.
- Management could not easily connect sprint-level work back to critical business needs.
- Developers spent time on documentation, knowledge transfer, meetings, and project research instead of staying focused on problem solving.
- The team needed better detail in tickets for project management and leadership visibility, but did not want to burden developers with a documentation-heavy process.

### Discovery Moment

During a summer 2025 refactor of an index modeling system, Caravel tested frontier models, specifically Grok, against code that still had refactoring smell after a large re-engineering effort. The model performed well enough that the team began developing agentic development workflows to support developers.

The operating idea was that developers would focus on structure, judgment, and what needed to be built while models assisted with syntax, library detail, lower-level research, and implementation mechanics.

### Intervention

Caravel connected the project-management system with the agentic developer workspace:

- Ticket context flowed into the agentic development environment to speed setup and research.
- Work discoveries, decisions, implementation detail, and status flowed back into the project-management system.
- Developers could write a few quick lines in their agentic workflow while the system helped produce richer project-management updates.
- The resulting ticket records gave developers and project managers a clearer history of what happened and why.

### Governance And Controls

The workflow did not bypass normal delivery controls. It added structured sign-off gates:

- Research phase sign-off.
- Statement-of-work phase sign-off.
- Implementation phase sign-off.
- Merge-request phase sign-off.
- Feature branches required approval before merging back into the main development branch.

This matters for regulated buyers because the operating model paired higher throughput with human review, documented reasoning, and release discipline.

### Observed Outcomes

ClickUp was used for internal analysis, but public copy should say `project-management system`.

Completed task counts in the Caravel Archive and Development spaces show a meaningful shift after the agentic workflow matured. The raw monthly series, using completed tasks with subtasks included, was:

| Month | Completed tasks |
| --- | ---: |
| Jan 2025 | 36 |
| Feb 2025 | 129 |
| Mar 2025 | 25 |
| Apr 2025 | 7 |
| May 2025 | 38 |
| Jun 2025 | 28 |
| Jul 2025 | 33 |
| Aug 2025 | 23 |
| Sep 2025 | 77 |
| Oct 2025 | 24 |
| Nov 2025 | 199 |
| Dec 2025 | 334 |
| Jan 2026 | 332 |
| Feb 2026 | 203 |

Recommended public phrasing: `several-fold increase` rather than a precise multiplier.

Qualification: later workflow periods include more structured phase and subtask records, so the metric should be positioned as evidence of higher throughput plus documentation maturity, not a pure one-variable productivity claim.

### Business Impact

Approved business-impact language:

- Better linkage from sprint work to critical business needs.
- Improved management visibility into what was happening and why.
- Faster release confidence.
- Developers could stay focused on problem solving while the project-management system received richer context.

## Discovery: Independent RIA Case Study

### Before State

For an advisor preparing for a client meeting, the existing workflow was manual and time-consuming:

- The advisor ran a client plan.
- The advisor spent multiple hours moving through screens and reviewing plan outputs.
- The advisor manually gathered and interpreted information across areas such as cash flow, tax levels, and related planning data.
- The first-pass analysis consumed time before the advisor could reach higher-level planning judgment.

### Intervention

An agentic plan-analysis workflow allowed the advisor to ask for the analysis they needed. The system retrieved relevant plan data and produced an initial quantitative readout across planning areas such as cash flow and tax levels.

The system could also access persisted behind-the-scenes plan data that was approved for the advisor but not always visible on the screens, allowing richer analysis than the advisor could easily gather manually.

### Governance And Controls

The workflow included access and data-safety controls:

- The advisor had to be on an approved plan before the agentic system could run.
- The system enforced plan-level access controls so advisors could not analyze plans they were not authorized to work with.
- Source-plan interaction was read-only.
- The system did not overwrite the original plan.
- What-if analysis happened in the agentic system's own sandbox to protect the original plan/run.
- Output remained advisor-reviewed rather than autonomous client-facing advice.

### Observed Outcomes

Approved public outcome language:

- `Advisor prep time dropped from hours to minutes.`
- `The advisor could reach higher-level planning judgment faster.`

Recommended label: `Independent RIA`.

## Recommended Direction

Proceed with a copy-focused proof-section update before considering a dedicated case-study page.

Recommended content architecture for each proof card:

- Situation: what was broken or slow.
- Intervention: what Chart Room AI's operating pattern changed.
- Controls: how the workflow stayed governed.
- Result: qualified, supportable outcome.
- Why it matters: business impact for regulated financial buyers.

Recommended proof framing:

- Caravel Concepts: the operating model was built and proven internally before being offered through Chart Room AI.
- Independent RIA: the workflow reduced advisor prep from hours to minutes while preserving plan access controls, read-only source data, and sandboxed what-if analysis.
- Overall: Chart Room AI is newly formed from proven operating work, not a mature public client roster.

## Copy Claims To Use Carefully

- Use `several-fold increase` rather than hard `4x` or `5.2x` unless the copy also explains the methodology and qualification.
- Use `project-management system` rather than naming ClickUp.
- Use `Independent RIA` rather than `Mid-Western RIA`.
- Avoid implying public client names, logos, testimonials, or broad market traction.
- Avoid saying the RIA system autonomously changed plans or generated advice without human review.
- Avoid saying AI replaced developer or advisor judgment.

## Open Questions

- Should the initial implementation remain on the homepage proof section only, or should a dedicated proof/case-study page be proposed as a follow-up?
- Should the homepage include one short qualifier under the proof section explaining that Chart Room AI is newly formed from operating work proven at Caravel Concepts?
- Should `2-3x developer productivity` be removed, softened, or replaced with the more qualified `several-fold increase in completed project-management work after workflow maturity`?
- Should a documentation-quality sample be run before implementation to support a stronger claim about ticket detail improving?

## Proposed Documentation-Quality Analysis

If we want to quantify ticket-detail quality, use a sample-based rubric rather than comparing raw ticket counts.

Possible rubric dimensions:

- Problem/context present.
- Business reason or `why` present.
- Implementation detail present.
- Files/systems changed present.
- Verification/test evidence present.
- Next-step or handoff present.

Possible metrics:

- Description word count.
- Comment count.
- Comment word count.
- Presence of structured headings such as `Problem`, `Root Cause`, `Solution`, `Impact`, `Completed`, `Files changed`, and `Tests`.
- Percentage of sampled tickets with verification evidence.
- Percentage of sampled tickets with project-manager-readable summary.

Recommended sample comparison:

- Pre-maturity: May-August 2025.
- Post-maturity: November 2025-February 2026.
- Exclude or separately label phase-only subtasks when analyzing documentation quality.

## Approval Gate

Research direction approved in discovery. Proceed to `implementation_guide.md` and `statement_of_work.md`.

Do not edit production code until the pre-implementation gate is complete, including a confirmed WEB-23 working branch.
