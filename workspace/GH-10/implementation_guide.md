# GH-10 Implementation Guide — Care Helm Marketing Site

## Approved Approach

Standalone `/care-helm` landing via Next.js route groups. Phase 1 + Phase 2 delivered as one cohesive page with section anchors.

## Implementation Slices

### Slice 1 — Layout refactor (prerequisite)

- Slim root `layout.tsx` to html/body/font/globals only
- Create `(site)/layout.tsx` with `SiteHeader`, `SiteFooter`, main wrapper
- Move existing pages: `page.tsx`, `about/`, `contact/`, `experience/`, `expertise/`, `why-chart-room/` → `(site)/`
- URLs unchanged (route groups are invisible in paths)

### Slice 2 — Care Helm config + content

- `web/src/lib/care-helm-config.ts` — product name, URLs, contact subject
- `web/src/lib/care-helm-content.ts` — section copy, nav anchors, trust signals

### Slice 3 — Care Helm components

- `CareHelmHeader.tsx` — logo wordmark, anchor nav, Request Demo CTA
- `CareHelmFooter.tsx` — Chart Room AI LLC, link to chartroomai.com, light legal
- `CareHelmDemoForm.tsx` — demo request form posting to `/api/contact`

### Slice 4 — Landing page

- `(care-helm)/care-helm/layout.tsx` — Care Helm chrome
- `(care-helm)/care-helm/page.tsx` — all sections
- SEO metadata for senior care keywords

### Slice 5 — Phase 2 sections (same PR slice)

- Benefits grid (6 outcome cards)
- Why Chart Room AI trust section

## Files Likely to Change

```
web/src/app/layout.tsx
web/src/app/(site)/layout.tsx          [new]
web/src/app/(site)/page.tsx            [moved]
web/src/app/(site)/about/...           [moved]
web/src/app/(site)/contact/...         [moved]
web/src/app/(site)/experience/...      [moved]
web/src/app/(site)/expertise/...       [moved]
web/src/app/(site)/why-chart-room/...  [moved]
web/src/app/(care-helm)/care-helm/layout.tsx  [new]
web/src/app/(care-helm)/care-helm/page.tsx    [new]
web/src/lib/care-helm-config.ts        [new]
web/src/lib/care-helm-content.ts       [new]
web/src/components/care-helm/*.tsx     [new]
```

## Verification

```powershell
cd web
npm run lint
npm run build
```

Manual: `/care-helm`, anchor links, form, mobile layout, no main site nav.
