# Client site template

A separate Next.js app (Next.js 16, React 19, Tailwind 4) for small-business client
sites, built from one per-client config file. It lives next to `web/` but shares no
code with it: **chartroomai.com (`web/`) is not touched by anything here.**

Tracking: epic #20, ticket #21.

## Vercel

Template previews build on the Vercel project **`client-template`** (team `chart-room`,
approved by Marc on Oct 8, 2026): Root Directory `template`, framework Next.js, Node 24.x,
`CLIENT_CONFIG=dry-creek-sample` (Production + Preview), and Ignored Build Step
`git diff --quiet HEAD^ HEAD -- .` so it only builds when `template/` changes. It has no
custom domain. The `website` project (Root Directory `web/`, chartroomai.com) is separate.
Each real client later gets its own project with these settings plus its own
`CLIENT_CONFIG` and domain.

**Proof branches** (orphan `proof/*` branches that only hold screenshots and logs) must
include `web/vercel.json` and `template/vercel.json`, each `{"git":{"deploymentEnabled":false}}`.
Without them, both Vercel projects try to build the branch and fail, because it has no app.

## Run it

```bash
cd template
npm install
npm run dev                          # http://localhost:3000, sample config
CLIENT_CONFIG=dry-creek-sample npm run build && npm run start
npm run lint && npm run typecheck
npm run check-config                 # validate the active config, brand kit and assets
npm run validate-kit -- kit.json [--assets public/clients/<client-id>]
npm run kit-schema                   # regenerate config/brand-kit.schema.json
npm run test-kit                     # brand kit rule tests (fonts, contrast, defaults)
```

`CLIENT_CONFIG` picks the client config **at build time** (inlined by `next.config.ts`).
Unset means `dry-creek-sample`. `npm run build` first runs `check-config` (the
`prebuild` script): an unknown id, an invalid config or brand kit, or a missing or
out-of-spec asset fails the build and names the exact field, for example:

```
✗ Client config "acme" is invalid:
  - brand.palette.accent: missing (required, expected string)
  - brand.logo.onLight.file: Use a lowercase file name like logo.svg (svg, png, jpg, jpeg or webp), no folders
```

## Layout

| Path | What |
|---|---|
| `config/schema.ts` | Client config schema (zod) and types. Every design reads this shape. |
| `config/brand-kit.ts` | **Brand kit** schema (zod). Embedded unchanged as `brand` in a client config. |
| `config/brand-kit.schema.json` | The same schema as JSON Schema, for tools that emit kits. Generated from the zod schema and font list (`npm run kit-schema`); `npm run test-kit` fails if it's stale. |
| `config/brand-kit.example.json` | A complete example kit with every field. |
| `config/font-catalog.ts` | Supported fonts and the fallback rules. |
| `config/icon-names.ts` | Icon names a service can use. |
| `config/assets.ts` | Asset conventions: formats, sizes, folder. |
| `config/contrast.ts` | WCAG contrast math and the palette pairs the classic design uses. |
| `config/clients/<id>.ts` | One file per client. `dry-creek-sample.ts` is **placeholder content**. |
| `config/clients/<id>.brand-kit.json` | That client's brand kit, as delivered. |
| `config/clients/index.ts` | Registry of client configs (key = `CLIENT_CONFIG` value). |
| `designs/index.ts` | Design registry: maps `config.design` to a design. |
| `designs/classic/` | The first design: frame, Home, Services, Gallery, Reviews, About, Contact with the quote form, thank-you and error pages. |
| `src/app/` | Routes, metadata, generated favicon (`icon.tsx`) and Open Graph image (`opengraph-image.tsx`), and the quote form handler (`api/contact/route.ts`). |
| `src/lib/mail/` | Email providers for the quote form, keyed by `contact.provider`. |
| `src/lib/theme.ts` | Turns the brand kit into the CSS variables behind the theme tokens. |
| `src/lib/site-url.ts` | The origin for `metadataBase`, canonical and Open Graph URLs (see "Site URL on previews"). |
| `scripts/` | `check-config`, `validate-kit`, `kit-schema`, `kit-tests` (`npm run test-kit`). |
| `public/clients/<id>/` | That client's logo, swatch and photos. |

## Brand kit

The client branding interview (Beacon) produces a **brand kit**: one JSON file that
drops into a client config **unchanged** as `brand`:

```ts
// config/clients/acme.ts
import brandKit from "./acme.brand-kit.json";
export const acme = { id: "acme", design: "classic", brand: brandKit as BrandKitInput, /* content… */ };
```

`design` is separate from `brand`, so any kit works with any design. Validate a kit with
`npm run validate-kit -- path/to/kit.json --assets public/clients/<client-id>`; it lists
every missing or invalid field. Kits are strict: unknown fields are errors, so a typo
can't silently drop a value. Editors can validate against
`config/brand-kit.schema.json` via `"$schema"`.

### Fields

| Field | Type | Required | Example |
|---|---|---|---|
| `$schema` | string | no | `"../brand-kit.schema.json"` |
| `kitVersion` | `1` | **yes** | `1` |
| `source.generator` | string | **yes** | `"beacon-brand-interview"` |
| `source.generatorVersion` | string | no | `"0.1.0"` |
| `source.interviewId` | string | no | `"int-0042"` |
| `source.createdAt` | ISO 8601 datetime with offset | **yes** | `"2026-10-08T19:00:00-04:00"` |
| `source.approvedBy` | string | no | `"Jane Owner"` |
| `source.approvedAt` | ISO 8601 datetime | no | `"2026-10-09T10:00:00-04:00"` |
| `source.notes` | string | no | |
| `palette.primary` | hex `#rrggbb` | **yes** | `"#2f5d3a"` (header, hero, headings) |
| `palette.accent` | hex | **yes** | `"#d9822b"` (quote buttons, highlights) |
| `palette.surface` | hex | **yes** | `"#f7f5ef"` (page background) |
| `palette.text` | hex | **yes** | `"#1f2a22"` (body text) |
| `palette.secondary` | hex | no (primary 10% over surface) | `"#e3ebf5"` (secondary buttons, badges/chips, icon tiles) |
| `palette.card` | hex | no (white 60% over surface) | `"#ffffff"` (card backgrounds) |
| `palette.muted` | hex | no (text 72% over surface) | `"#55615a"` (secondary text) |
| `palette.border` | hex | no (text 15% over surface) | `"#dcd8cc"` (card and section outlines) |
| `palette.success` / `warning` / `danger` | hex | no (`#2e7d32` / `#b26a00` / `#b3261e`) | status colors |
| `fonts.heading.family` | one of the 18 supported families (below); any casing is normalized, exact casing recommended | **yes** | `"Fraunces"` |
| `fonts.heading.category` | `serif` \| `sans-serif` \| `display` | no (metadata only) | `"display"` |
| `fonts.body.family` / `fonts.body.category` | same as heading | family **yes** | `"Inter"`, `"sans-serif"` |
| `logo.variant` | `wordmark` \| `icon` \| `combo` | **yes** | `"combo"` |
| `logo.showName` | boolean | **yes** | `true` shows the business name beside the logo in the header |
| `logo.alt` | string | **yes** | `"Acme Plumbing logo"` |
| `logo.onLight` | asset | **yes** | `{ "file": "logo.svg", "width": 240, "height": 64 }` |
| `logo.onDark` | asset | no | `{ "file": "logo-on-dark.svg", … }` (footer, Open Graph image) |
| `logo.icon` | asset, square | no | `{ "file": "icon.svg", "width": 512, "height": 512 }` (favicon source) |
| `iconStyle.style` | `outline` \| `solid` \| `duotone` | no (`outline`) | `"duotone"` |
| `iconStyle.weight` | `thin` \| `light` \| `regular` \| `bold` | no (`regular`) | stroke weight for `outline` |
| `iconStyle.corners` | `rounded` \| `sharp` | no (`rounded`) | shape of the tiles behind icons |
| `imageDirection.mood` | string | **yes** (`imageDirection` itself is required) | `"warm, tidy, neighborly"` |
| `imageDirection.style` | string | no | `"natural daylight, minimal editing"` |
| `imageDirection.subjects` | string[] | no (`[]`) | `["finished patios", "crews at work"]` |
| `imageDirection.avoid` | string[] | no (`[]`) | `["stock models", "license plates"]` |
| `imageDirection.aspectRatios.hero` / `.gallery` | `"w:h"` | no (`"4:3"`) | `"16:9"` |
| `swatch` | asset | no | `{ "file": "swatch.png", "width": 1200, "height": 400 }` |

An **asset** is `{ "file": string, "width": int, "height": int }`. `file` is a bare,
lowercase file name in `template/public/clients/<client-id>/` (no folders); `width` and
`height` are the intrinsic size in px (for SVG, the viewBox size).

`imageDirection.aspectRatios` sets the photo crops: `hero` for the Home hero and the About
photo, `gallery` for every gallery tile (photos are cropped with `object-cover`, so supply
them at or near that ratio and keep the subject centered). The rest of `imageDirection`
(mood, style, subjects, avoid) and `swatch` are metadata for photo selection; the site
doesn't render them.

Every text color pair must pass WCAG AA or the kit fails (see "Contrast" below).

**Derived, not in the kit:** text color on `primary` and `accent` (white or near-black,
whichever contrasts better), text on `secondary` (`primary` if it reaches 4.5:1, else white
or near-black), dimmed text on `primary` (80% on-primary if it still reaches 4.5:1), small
primary-colored text such as links and labels (`primary` if it reaches 4.5:1 on surface and
card, else `text`), the optional palette defaults, the favicon (`logo.icon`, else
`logo.onLight` when `variant` is `icon`, else the business initials on `primary`), and the
Open Graph image (1200x630, `primary` background, `logo.onDark` if present, name, tagline).

### Fonts

Google Fonts only, loaded with `next/font/google` (self-hosted at build; visitors never
call Google). Supported families, all variable fonts:

- **sans-serif:** Inter, Source Sans 3, Open Sans, Roboto, Nunito, DM Sans, Work Sans, Manrope, Montserrat, Raleway
- **serif:** Lora, Merriweather, Libre Baskerville, Roboto Slab, EB Garamond
- **display:** Fraunces, Playfair Display, Oswald

**Fonts are strict.** `family` must be one of these 18 names. Matching is case-insensitive
and extra spaces are ignored, and the casing is normalized (`"playfair display"` →
`Playfair Display`). Anything else, including near names like `"Garamond"` or
`"Inter Tight"`, is an error in `validate-kit` and in the build. The message lists the
supported families for the given `category`, or all of them by category:

```
✗ kit.json: 1 problem(s)
  - fonts.body.family: Unsupported font "Comic Neue". Supported sans-serif fonts: Inter, Source Sans 3, Open Sans, Roboto, Nunito, DM Sans, Work Sans, Manrope, Montserrat, Raleway
```

`category` is optional metadata. It never changes which font loads; a mismatch only prints
a note.

**Casing:** the template normalizes casing, so `"inter"` loads Inter, but write the exact
names shown above. In `brand-kit.schema.json`, `family` has a case-insensitive `pattern`
generated from the font list (each letter as a `[Xx]` class, since JSON Schema patterns
have no reliable case-insensitive flag) plus `examples` with the exact names. JSON Schema
tools therefore accept and reject the same names as `validate-kit`.

To add a font, add it to
`config/font-catalog.ts` and `src/lib/fonts.ts`.

### Icons

[Phosphor Icons](https://phosphoricons.com) (`@phosphor-icons/react`, MIT), rendered on the
server. `iconStyle.corners` also sets photo corners (sharp or rounded). `iconStyle.style` maps to Phosphor weights: `outline` → `thin`/`light`/`regular`/`bold`
(from `iconStyle.weight`), `solid` → `fill`, `duotone` → `duotone`. Icons appear on service
cards (`services[].icon`, names in `config/icon-names.ts`), the "What's included" and
"At a glance" check marks, the contact details, and the thank-you and error pages. Review stars are text glyphs and do not follow `iconStyle`.

### Logo and image files

All files go in `template/public/clients/<client-id>/` and are referenced by bare file
name. Suggested names: `logo.svg`, `logo-on-dark.svg`, `icon.svg`, `swatch.png`,
`hero.jpg`, `gallery-1.jpg`, `gallery-2.jpg`, … (lowercase, `a-z 0-9 . _ -`).
`check-config` enforces these rules on every build:

| Asset | Formats | Size rules | Max file size |
|---|---|---|---|
| Logo (`onLight`, `onDark`) | SVG preferred; PNG or WebP | Raster at least 160 px tall, transparent background. Shown 40 px tall. | 200 KB |
| Favicon source (`logo.icon`) | SVG preferred; PNG | Square; PNG at least 512x512 | 100 KB |
| Swatch | SVG, PNG, JPG, WebP | any | 1 MB |
| Hero photo | JPG or WebP (PNG ok) | At least 1600 px wide; `imageDirection.aspectRatios.hero` (default 4:3) | 600 KB |
| Gallery photos, About photo | JPG or WebP (PNG ok) | At least 1200 px wide; gallery ratio (gallery), hero ratio (About) | 400 KB each |
| Open Graph image | not supplied | Generated at 1200x630 | n/a |

SVG is accepted for photos only as placeholders.

## Theme tokens

Components use neutral Tailwind tokens only; values come from the brand kit:

| Tailwind token | Brand kit field |
|---|---|
| `primary`, `accent`, `surface` | `palette.primary`, `palette.accent`, `palette.surface` |
| `foreground` | `palette.text` |
| `secondary`, `card` | `palette.secondary`, `palette.card` (defaults above) |
| `on-primary`, `on-accent`, `on-secondary`, `on-primary-muted`, `primary-ink` | derived for contrast |
| `muted`, `border`, `success`, `warning`, `danger` | optional palette extras (defaults above) |
| `font-heading`, `font-sans` | `fonts.heading`, `fonts.body` |

Don't add client-specific colors or copy to components; put them in the config or kit.

### Contrast

`check-config` (every build) and `validate-kit` measure every pair below against WCAG AA
(`config/contrast.ts`, using the derived colors the theme actually renders) and print
each pair with its ratio. **Text pairs are errors:** if one fails, `validate-kit` exits 1
and the build fails. Non-text pairs print a warning.

| Pair | Minimum | Level |
|---|---|---|
| text on surface, muted on surface | 4.5:1 | error |
| text on card, muted on card | 4.5:1 | error |
| on-primary on primary | 4.5:1 | error |
| on-accent on accent | 4.5:1 | error |
| on-secondary on secondary | 4.5:1 | error |
| primary on surface, primary on card (large display headings) | 3:1 | error |
| border on surface | 3:1 | warning |
| input border (text 55% on white), focus ring on surface and on primary | 3:1 | warning |

```
  contrast (WCAG AA):
    ok   text on surface                      13.63:1  (min 4.5:1)  #1f2a22 on #f7f5ef
    …
    warn border on surface (non-text)          1.30:1  (min 3.0:1)  #dcd8cc on #f7f5ef
✓ … (contrast: 9/9 text pairs pass, 1 non-text warning(s))
```

The classic design draws all secondary text in `muted`, dimmed text on primary bands in
`on-primary-muted`, and small primary-colored text in `primary-ink`, so the checked pairs
cover what renders. Card borders are decorative (cards also have a shadow), so a low
`border` ratio is only a warning. Rating stars use `accent` but are decorative: the rating
is also shown and announced as text. Focus rings are two-tone (a surface gap plus a
text-colored outline, on-primary on primary bands).

## Site URL on previews

`seo.siteUrl` is the client's real domain. Until launch, and on every preview, it doesn't
serve this build (and the sample uses a placeholder `*.example.com`), so absolute
`og:image` URLs would break link previews. `src/lib/site-url.ts` picks the origin for
`metadataBase`, canonical and `og:url` at build time from Vercel's system env vars:

| Where | Origin |
|---|---|
| Vercel production | `seo.siteUrl`; if it's a placeholder (`example.com/.net/.org`, `.test`, `.invalid`, `.example`, `localhost`), `VERCEL_PROJECT_PRODUCTION_URL` |
| Vercel preview / development | `VERCEL_BRANCH_URL`, else `VERCEL_URL` |
| Local | `seo.siteUrl`, or `http://localhost:<PORT or 3000>` for a placeholder |

## Add a client

1. Save the client's brand kit as `config/clients/<id>.brand-kit.json` and their files in
   `public/clients/<id>/`. Check it: `npm run validate-kit -- config/clients/<id>.brand-kit.json --assets public/clients/<id>`.
2. Copy `config/clients/dry-creek-sample.ts` to `config/clients/<id>.ts`: set `id`, import
   the kit JSON as `brand`, and fill in the content (business, hero, services, photos by
   file name, reviews, about with an optional `about.image`, contact, service area,
   social, SEO). Google, Facebook, Yelp and Nextdoor links in `social` also show as
   "Read reviews on …" buttons on the Reviews page.
3. Register it in `config/clients/index.ts`.
4. Set `sample: false` only for real, approved content. `sample: true` shows a "sample
   site" banner and adds `noindex`.
5. `CLIENT_CONFIG=<id> npm run build`.

## Add a design

1. Create `designs/<id>/` exporting a `Design` (see `designs/types.ts`): a `Frame` plus
   `Home`, `Services`, `Gallery`, `Reviews`, `About`, `Contact`, `ThankYou`, `QuoteError`.
   Read everything from the `config` prop, use the theme tokens, honor `brand.iconStyle`
   (`src/lib/icons.tsx`), and include `<FormGuards />` in the quote form
   (`designs/classic/components/QuoteForm.tsx` is the reference).
2. Add `"<id>"` to `designIds` in `config/schema.ts`.
3. Register it in `designs/index.ts`. TypeScript fails until steps 2 and 3 agree.
4. Switch a client by changing `design` in its config. Content and brand don't change.

## Quote form

The Contact page's `#quote` form posts to `src/app/api/contact/route.ts`, ported from
`web/`. Checks run in this order: Turnstile → honeypot (`fax_number`) → timing
(`form_started_at`, 3 s minimum) → origin → parse → length caps and links → send.
Turnstile and send failures redirect (303) to `/contact/error`. Spam-class rejects go to
`/contact/thank-you` silently. The route never returns 500 and never logs env var values.

Email goes through the provider named by `contact.provider` (`src/lib/mail/`):

- **`m365`:** Microsoft Graph `sendMail`, the same path as `web/`.
- **`gmail`:** **stub.** It fails safe to the error page until Marc decides the Gmail
  account type and sign-in.

### Environment variables (Vercel, per client project)

| Name | Where | Public? | Notes |
|---|---|---|---|
| `CLIENT_CONFIG` | Production + Preview | build-time, not secret | Client config id |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Production + Preview | public (browser) | Turnstile widget |
| `TURNSTILE_SECRET_KEY` | Production + Preview | **secret, server-only** | Without it, production rejects every submission (error page) |
| `TURNSTILE_ALLOWED_HOSTNAMES` | optional | server | CSV of extra hostnames. The config's `seo.siteUrl` host (± `www.`), the project's Vercel production URL, and (outside production) the deployment's own Vercel URLs are always allowed |
| `MICROSOFT_TENANT_ID`, `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET` | Production + Preview | **secret, server-only** | `m365` provider |
| `CONTACT_FROM_MAILBOX`, `CONTACT_TO_EMAIL` | Production + Preview | server-only | `m365` sender mailbox and recipient |
| `CONTACT_FROM_NAME` | optional | server-only | Defaults to the business name |
| `CONTACT_DELIVERY_MODE` | local/preview only | server-only | `noop` accepts and drops mail for testing. Refused in production |

None of these are set on `client-template` yet, so its form fails safe to the error page.

## Not built yet (#21)

Gmail sending (pending Marc's decision), and a Vercel preview proof of a real submission
per provider (needs Turnstile and mail env vars on a client project).
