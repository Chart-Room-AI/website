# Client site build pipeline

How Forge builds a small-business site from `template/` plus one config, how Surveyor reviews it, and how Launch ships it. Ticket #23, epic #20. Surveyor still uses [`REVIEW.md`](REVIEW.md). This file is the client-site steps that sit next to it.

The template these steps point at is `template/` on branch `forge/21-client-template` (draft PR #34). `web/` is chartroomai.com and is not config-driven. Intake (#22) is not part of this pipeline yet: do not turn a client call into a config until #22 exists and points at this same `template/`.

## Roles

| Step | Who | What |
|------|-----|------|
| Build | **Forge** | Adds the client config under `template/`, opens or updates the PR, and attaches preview proof. Forge never merges. |
| Review | **Surveyor** | Reviews against `REVIEW.md` and posts `SURVEYOR VERDICT:` for the head SHA. |
| Approve | **Marc** | Approves the Vercel preview link. Email, auth, DNS, domains, and secrets are `needs-marc` even after that. |
| Release | **Launch** | Merges only when the verdict and Marc's approval name the current head SHA, then checks production. |

Marc's hands-on time for a client site is the intake call and the preview approval. Design, layout, and config edits are Forge's. DNS and the domain are the launch checklist in [`WEBSITE_HOSTING_DNS_NOTES.md`](WEBSITE_HOSTING_DNS_NOTES.md), after this preview is approved.

## Where the site lives

- **Repo:** this `website` repo only (GitHub owner moves to `Chart-Room-AI` in chartroom-ops#77). Do not make a new repo per client.
- **App:** `template/`. `git diff origin/main -- web/` stays empty on a client-site change.
- **Vercel:** one project per client on team `chart-room`.
- **Project name:** `client-<config-id>`. The id matches `CLIENT_CONFIG` and the file `template/config/clients/<id>.ts`.
- **Sample project:** `client-template` (`prj_ILpzXSqhZHrdXpxlYAPjDWEovXt8`). Root directory `template`. `CLIENT_CONFIG=dry-creek-sample`. No custom domain. It previews this branch. Production branch tracking is `main` (Marc, Oct 13, 2026, 8:03 AM ET). Do not change it in the Vercel dashboard from this pipeline.
- **chartroomai.com** stays the `website` project, root directory `web/`.

Project settings for every client project, including the sample:

- Framework Next.js, Node 24.x, default install / build / output.
- Production branch `main` (after the template is merged, and after Marc confirms the sample project's setting).
- Ignored Build Step: `git diff --quiet HEAD^ HEAD -- .`
- `CLIENT_CONFIG` on Production and Preview. Not a secret.
- No custom domain until the launch checklist.

## How the config is stored

One config per client, in git:

1. Brand kit JSON at `template/config/clients/<id>.brand-kit.json`, dropped in unchanged. Fonts must be one of the 18 families. Text contrast failures fail the build.
2. Content at `template/config/clients/<id>.ts`, with `design: "classic"` until a later ticket adds another design. `design` is not part of the brand kit.
3. Files in `template/public/clients/<id>/`, referenced by bare file name.
4. Registered in `template/config/clients/index.ts`. The key, `CLIENT_CONFIG`, and `id` are the same string.

`sample: true` is required for anything that is not Marc-approved client copy. The sample banner and `noindex` stay on. Dry Creek Landscaping in `dry-creek-sample` is placeholder content. Do not add real client copy, photos, or claims, and do not invent Dry Creek facts.

Secrets (Turnstile and Microsoft 365) are Vercel env vars. Never commit them, log their values, or paste them into an issue or PR. Quote mail is Microsoft 365 for now (Marc, Oct 12, 2026, 4:37 PM ET). Gmail stays a stub. Turnstile is one widget per client domain (Marc, Oct 12, 2026, 4:39 PM ET): that project's keys only.

## How a client picks up a later template fix

Every client project builds the same `template/` from this repo. A fix merged to `main` redeploys each project whose production branch is `main`, because they share that directory. `CLIENT_CONFIG` does not change, so the client's content stays put.

The ignored build step skips a commit that does not touch `template/`. A template or config change does rebuild. One client's config commit rebuilds the other client projects too; that is expected.

Until PR #34 is merged, the only project on this pipeline is `client-template`, tracking `forge/21-client-template` as a preview. Do not point a real client project at that branch for production.

## Build a site

1. Start from current `main`. For a client, the config comes from intake (#22). Until then, the only config is `dry-creek-sample`.
2. `cd template` and run `npm run validate-kit -- config/clients/<id>.brand-kit.json --assets public/clients/<id>`, then `npm run lint`, `npm run typecheck`, `npm run build`, and `npm run test-kit`. `prebuild` runs `check-config`. A bad font, a text contrast failure, or a bad asset fails the build.
3. Open a pull request. Link the client ticket with `Closes #N` when that ticket's acceptance criteria are met. Gmail on #21 is deferred (Marc, Oct 13, 2026, 11:06 AM ET). PR #34 may say `Closes #21` and leave draft once Surveyor's verdict matches the head SHA. It does not close #20.
4. The client project's preview is the proof URL. Also confirm the `website` preview of the same branch still returns 200 for `/`, `/about`, `/contact`, `/care-helm`, and `/bosun`.
5. Surveyor reviews against `REVIEW.md`. Visual proof is screenshots of the preview. Behavior proof includes HTTP status codes, not only a local build.
6. Marc approves the preview link. Record his words, the time in ET, and the head SHA on the PR.
7. Launch merges. Launch does not merge while the PR is a draft, while the verdict SHA is stale, or while a `needs-marc` approval is missing.

## Proof for a client-site review

- Preview URL for that Vercel project, and the head SHA.
- Screenshots of Home, Services, Gallery, Reviews, About, Contact, the thank-you page, and the error page, desktop and mobile, from that preview.
- HTTP 200 for those pages, plus `/icon` and `/opengraph-image` (`image/png`).
- The sample banner is visible when `sample: true`.
- Contact form: without Turnstile and mail env vars, a POST returns **303** to `/contact/error`, and the log names missing variables without values. GET returns **405**.
- A delivered email is the mail proof. The dry-run delivered one on Oct 13, 2026, 10:59 AM ET (subject `Dry Creek Landscaping: quote request from Template test`). The provider is `m365`. `gmail` is a stub. Do not treat the error-page redirect as delivery. The thank-you page is also used for a quiet spam reject, so the inbox message is the proof.
- `git diff origin/main -- web/` is empty.

Screenshots for the sample and for an earlier config swap live on the orphan branch `proof/pr34`. Proof branches must set `web/vercel.json` and `template/vercel.json` to `{"git":{"deploymentEnabled":false}}`.

## Stopped until Marc decides

Do not do these in the build:

- Implement Gmail. Marc chose Microsoft 365 for now (Oct 12, 2026, 4:37 PM ET) and deferred Gmail again (Oct 13, 2026, 11:06 AM ET).
- Add more Turnstile or Microsoft env vars, or send another live email, as part of this ticket. The dry-run already delivered one quote (Oct 13, 2026, 10:59 AM ET) using Preview variables on `client-template`. The widget model is still one Turnstile widget per client domain. That test reused the existing Chart Room widget. A firm site gets its own widget.
- Change `client-template`'s production branch. Marc confirmed it tracks `main` (Oct 13, 2026, 8:03 AM ET). Do not attach a custom domain.
- Treat Vercel Pro as paid until Marc confirms the trial converted (#25). Previews may exist before that. A client domain may not.

## Dry-run

The dry-run for this pipeline is the placeholder config `dry-creek-sample` on project `client-template`, not a second design and not a real client. Local `lint`, `typecheck`, `build`, and `test-kit`, plus the preview status codes, are recorded on #21 with the head SHA.

A timed run from a client intake to a preview is #22. It is not started. #23 stays open until that timing is recorded and a client site has used this flow.
