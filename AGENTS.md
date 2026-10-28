# AGENTS.md: website

Guide for AI agents and bots working in this repo (root). The Next.js app has its own [web/AGENTS.md](web/AGENTS.md);
read that before touching code under `web/`.

## Review rules
[REVIEW.md](REVIEW.md) is the source of truth for the pipeline, roles and approval rules here. Don't restate it.

## Shared docs (cross-repo; do not copy here)
- ADR index: [chartroom-ops docs/adr](https://github.com/Chart-Room-AI/chartroom-ops/blob/main/docs/adr/README.md)
- Glossary: [CONTEXT.md](https://github.com/Chart-Room-AI/chartroom-ops/blob/main/docs/domain/CONTEXT.md)

Few of the [Alley gates](https://github.com/Chart-Room-AI/chartroom-ops/blob/main/docs/alley-gates.md) apply to this repo; they mainly govern the scheduler and phone agent.
The general rules still apply: an agent's say-so is never Marc's approval, and no secrets, email contents, prices or
phone numbers go in docs, tickets or PR text.

Website-only decisions, if any, would go in `docs/adr/` using the chartroom-ops template.
