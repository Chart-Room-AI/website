# REVIEW.md: approval rules for cheezd/website

These are the rules Surveyor uses to approve or request changes on pull requests
in this repo. They are versioned with the code. **Changes to this file go through
a pull request, reviewed and released like any other change (change control).**
Nobody edits it directly on `main`.

## 1. Pipeline and roles

| Step | Who | What |
|------|-----|------|
| Build | **Forge** | Builds the change on a branch, opens a PR linked to its issue with `Closes #N`, and attaches evidence from the PR's Vercel preview. Forge never merges. |
| Review | **Surveyor** | Runs the SPEC and STANDARDS passes below and posts its verdict: **Approve** or **Request changes** (as a COMMENT review; see "GitHub identity limit" below). |
| Release | **Launch** | Merges approved PRs, watches the Vercel production deploy, verifies the live site, and rolls back if something breaks. |
| Owner | **Marc** | Must approve every `needs-marc` PR before Launch merges (section 6). |

Tickets are GitHub Issues in this repo and on the board:
https://github.com/users/cheezd/projects/13

### GitHub identity limit

Surveyor and Forge both act on GitHub as `cheezd`, and GitHub does not let a PR's author
formally approve (or request changes on) their own PR. So:

- Surveyor submits its verdict as a **COMMENT** review whose first line is exactly
  `SURVEYOR VERDICT: APPROVE` or `SURVEYOR VERDICT: REQUEST CHANGES`, and which names the
  head SHA it reviewed.
- **Launch treats that COMMENT as the review gate:** it looks for the exact verdict line, and
  a `SURVEYOR VERDICT: APPROVE` counts as Surveyor's approval.
- Marc's GitHub account is also `cheezd`, so GitHub blocks him from formally approving these
  PRs too. **While every PR is authored by `cheezd`, Marc's chat approval recorded on the PR
  is the normal path.**
  Whichever of Forge or Surveyor received it posts it as a PR comment with Marc's quoted
  words, the time in ET, and the head SHA it applies to.
- **Approvals are tied to a commit.** Launch merges only if the PR's current head SHA matches
  the SHA named in Surveyor's APPROVE verdict and (for `needs-marc`) in Marc's recorded
  approval. Any commit pushed after that SHA needs a fresh verdict and approval.

### Repo facts reviewers rely on

- The app is Next.js 16 in `web/` (`npm run build`, `npm run lint`). `web/AGENTS.md` warns
  that this Next.js version has breaking changes; check claims against
  `web/node_modules/next/dist/docs/`, not memory.
- Hosting: Vercel project `website` (team `chart-room`). Every PR gets a Vercel preview.
- Forms: the contact form (`web/src/components/ContactForm.tsx`) and the Care Helm demo form
  (`web/src/components/care-helm/CareHelmDemoForm.tsx`) both post to
  `web/src/app/api/contact/route.ts` (via `NEXT_PUBLIC_FORM_ENDPOINT`, default `/api/contact`).
- Email: the route sends through Microsoft Graph when `CONTACT_DELIVERY_MODE=microsoft_graph`
  (default `noop`), using the `CONTACT_*` and `MICROSOFT_*` environment variables.

## 2. Two review passes, reported separately

Every review has two sections. Do not merge them.
(Structure follows https://github.com/mattpocock/skills, `engineering/code-review`.)

### SPEC pass: the change vs. the linked issue

1. Find the linked issue (`Closes #N`). No linked issue means **Request changes**.
2. Quote each acceptance criterion from the issue, including any "proof needed" items, and
   mark it **met / not met / partly met**, with where in the diff or evidence that shows.
3. Flag:
   - **Missing:** criteria not met.
   - **Unrequested:** things added that nobody asked for (scope creep).
   - **Wrong:** things built differently from what the issue says.

### STANDARDS pass: the change vs. this file

Check the change against the rubric (section 3), the website proof rule (section 4), the
repo checks (section 5), and the `needs-marc` rules (section 6).

## 3. Rubric

Built on poteto's *interrogate* rubric
(https://github.com/cursor/plugins/tree/main/pstack/skills/interrogate). Use the lenses that
apply; not every lens applies to every change.

- **Correctness:** does it do what the issue says? Check edge cases, the sad path, error
  handling (nothing silently swallowed unless the spec says so), and what happens if the
  operation runs twice. Trace the execution path for any suspected bug.
- **Root cause vs. symptom:** does it fix the actual problem or paper over it? Read the
  surrounding code, not only the diff. Prefer a structural fix (a type, a check, a lint rule)
  to a comment or convention someone has to remember.
- **Fit with the existing system:** validation at the boundary (e.g. in the API route), no new
  coupling or parallel "old and new" paths left behind, and it reads as if the design always
  accounted for it.
- **Verification:** can you tell it works? Tests or re-runnable checks for behavior, checking
  the real thing rather than a proxy, and evidence from the actual preview rather than
  self-reports (see section 4).
- **Complexity:** is the complexity earned? No dead code, single-use abstractions,
  speculative configuration, or half-finished features.
- **Security:** for each finding, trace the input path. User input reaching dangerous sinks,
  gaps in new endpoints, secrets in code, logs, or error messages, and anything that lets a
  bot or attacker use the forms to send mail.

## 4. Website proof rule

**No approval without before/after evidence from the PR's Vercel preview.**

- **Visual changes:** before (production or `main`) and after (preview) screenshots of each
  affected page.
- **Behavior changes:** test output or a re-runnable check (e.g. a `curl` command against the
  preview URL plus its response) for both the expected-success and expected-failure cases.
- The evidence must name the preview URL it came from.
- "It builds" or "the builder says it works" does not count.
- Docs-only or config-only changes with no runtime effect: the PR states that, and shows
  the preview deployed successfully and the site renders unchanged.

## 5. Repo checks (STANDARDS)

- **Build passes:** the Vercel preview build succeeded; `npm run build` and `npm run lint`
  in `web/` pass.
- **Linked issue:** PR body contains `Closes #N`.
- **No secrets committed:** no keys, tokens, client secrets, or `.env` files in the diff
  (`.env*` is gitignored except `.env.example`). Secrets belong in Vercel environment
  variables and must not be logged or echoed in error messages or redirects.
- **Env var changes documented:** any new, renamed, or removed environment variable is listed
  in the PR body with which Vercel environments (Production / Preview / Development) need it,
  and whether it is public (`NEXT_PUBLIC_*`, shipped to the browser) or server-only. Secrets
  must never use the `NEXT_PUBLIC_` prefix.
- **Both forms covered:** any change to form handling or `web/src/app/api/contact/route.ts`
  is applied to and verified on both the contact form and the Care Helm demo form, unless
  the issue explicitly scopes it to one.
- **Scope:** the diff matches its ticket. A change bigger than its ticket gets `needs-marc`
  (section 6).

## 6. `needs-marc` rules

- **Applied automatically** to any change touching:
  - DNS or domains
  - email sender settings (sender mailbox, display name, recipients, the Graph send path,
    `CONTACT_*` / `MICROSOFT_*` variables)
  - payments
  - auth (including credentials, secrets, and bot-protection keys)
  - data deletion
- Also applied **whenever a change turns out bigger than its ticket**. Surveyor may add the
  label.
- On `needs-marc` PRs, **Marc's review is the second review.** Surveyor posts its full
  verdict (section 7), and Marc then approves: on GitHub if it allows, otherwise (the
  normal case while PRs are authored by `cheezd`) in chat, recorded on the PR as described
  in "GitHub identity limit" in section 1.
- **Marc must approve `needs-marc` PRs before Launch merges.** Surveyor's approval alone is
  not enough.
- **Interim rule (decided by Marc, 2026-10-08):** this replaces the earlier requirement for an
  independent second-model review. Automating a true second-model review is tracked in
  https://github.com/cheezd/website/issues/27.

## 7. Verdict format

Every review ends with:

- **Act On:** at most 5 items, each of which must be fixed before approval. If there are
  more than 5 real blockers, list the top 5 and request changes; the rest come next round.
- **Consider:** optional improvements.
- **Dismissed:** findings that were considered and rejected, each with a one-line reason.

Any Act On item means **Request changes**. Approve only when Act On is empty and the proof
rule is satisfied. For `needs-marc` PRs, Launch also needs Marc's approval (section 6); no
separate second-model review is needed while the interim rule in section 6 stands.

## 8. Improvement loop

When a reviewer misses something that later causes a problem:

- If the rule is **mechanical** (it can be checked by a script, lint rule, type, or CI step),
  add an automated check.
- Otherwise, **add a line to this file via a PR**.

Either way, link the miss (issue, PR, or incident) in that PR.
