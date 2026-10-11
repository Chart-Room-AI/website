# GH-10 Statement of Work — Care Helm Marketing Site

## Project Record

- Epic: [#10](https://github.com/cheezd/website/issues/10)
- Phase 1: [#11](https://github.com/cheezd/website/issues/11)
- Phase 2: [#12](https://github.com/cheezd/website/issues/12)
- GitHub Project: [#7](https://github.com/users/cheezd/projects/7)
- Branch: `issue-11-care-helm-mvp`
- Workspace: `workspace/GH-10/`, `workspace/GH-11/`

## Approved Scope

Deliver a standalone Care Helm marketing landing page at `/care-helm` with Chart Room AI brand alignment, warm care-focused copy, and demo conversion — without exposing proprietary product UI or architecture.

## In Scope

- Route group layout refactor for standalone Care Helm section
- MVP sections: hero, challenge, approach, who we serve, demo CTA
- Phase 2 sections: benefits grid, Chart Room AI trust section
- Care Helm header/footer, anchor navigation
- Demo request form (reuse contact API)
- SEO metadata
- Lint + build verification

## Out of Scope

- Phase 3 blog/resources
- Subdomain DNS cutover (document only)
- Kiosk UI screenshots or detailed feature workflows
- HIPAA certification claims
- Product login / Studio integration
- Custom Calendly embed (future)

## Acceptance Criteria

- [ ] `/care-helm` has no main Chart Room AI site navigation
- [ ] All outline MVP + Phase 2 sections present with approved high-level copy
- [ ] Brand colors and typography match guidelines
- [ ] Demo CTA functional (form → contact API)
- [ ] Mobile responsive, accessible skip link and focus states
- [ ] `npm run lint` and `npm run build` pass
- [ ] No IP-sensitive content (UI screenshots, workflow details)

## Verification

- `npm run lint` — pass
- `npm run build` — pass
- Manual `/care-helm` review
