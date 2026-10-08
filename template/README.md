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

## Run it

```bash
cd template
npm install
npm run dev                          # http://localhost:3000, sample config
CLIENT_CONFIG=dry-creek-sample npm run build && npm run start
npm run lint && npm run typecheck
```

`CLIENT_CONFIG` picks the client config **at build time** (it is inlined by
`next.config.ts`). Unset means `dry-creek-sample`. An unknown id or an invalid config
fails `next build` with the exact field that is wrong, for example:

```
Error: Client config "acme" is invalid:
✖ Use a 6-digit hex color, for example #2f5d3a
  → at brand.colors.primary
```

## Layout

| Path | What |
|---|---|
| `config/schema.ts` | The config schema (zod) and its TypeScript types. Every design reads this shape. |
| `config/clients/<id>.ts` | One file per client. `dry-creek-sample.ts` is **placeholder content**. |
| `config/clients/index.ts` | Registry of client configs (key = `CLIENT_CONFIG` value). |
| `config/index.ts` | Loads and validates the active config. |
| `designs/index.ts` | Design registry: maps `config.design` to a design. |
| `designs/classic/` | The first design: frame (header, footer, sample banner) and the six pages. |
| `src/app/` | Routes (`/`, `/services`, `/gallery`, `/reviews`, `/about`, `/contact`), metadata, generated favicon (`icon.tsx`) and Open Graph image (`opengraph-image.tsx`). Routes only hand the config to the active design. |
| `src/lib/theme.ts` | Turns config colors and fonts into the CSS variables behind the theme tokens. |
| `public/clients/<id>/` | That client's logo and photos. |

## Theme tokens

Components use neutral Tailwind tokens only; their values come from
`brand.colors` in the config (set as CSS variables on `<html>`):

| Tailwind token | Config field |
|---|---|
| `primary` (`bg-primary`, `text-primary`) | `brand.colors.primary` |
| `accent` | `brand.colors.accent` |
| `surface` | `brand.colors.surface` |
| `foreground` | `brand.colors.text` |
| `on-primary`, `on-accent` | derived: white or near-black, whichever reads better |
| `font-heading`, `font-sans` | `brand.fonts.heading`, `brand.fonts.body` (options in `src/lib/fonts.ts`) |

Don't add client-specific colors or copy to components; put them in the config.

## Add a client

1. Copy `config/clients/dry-creek-sample.ts` to `config/clients/<id>.ts` and set `id: "<id>"`.
2. Put the logo and photos in `public/clients/<id>/` and point the config at them
   (`/clients/<id>/logo.svg`). No hotlinked images.
3. Register it in `config/clients/index.ts`.
4. Set `sample: false` only for real, approved content. `sample: true` shows a
   "sample site" banner and adds `noindex`.
5. Build with `CLIENT_CONFIG=<id> npm run build`.

No secrets go in a config. `contact.provider` (`"m365"` or `"gmail"`) only says which
mailbox type sends quote-form email; credentials live in Vercel env vars (later slice).

## Add a design

1. Create `designs/<id>/` exporting a `Design` (see `designs/types.ts`): a `Frame`
   plus `Home`, `Services`, `Gallery`, `Reviews`, `About`, `Contact`. Read everything
   from the `config` prop and use the theme tokens above. `designs/classic/` is the
   reference.
2. Add `"<id>"` to `designIds` in `config/schema.ts`.
3. Register it in `designs/index.ts`. TypeScript fails until steps 2 and 3 agree.
4. Switch a client by changing `design` in its config. Content doesn't change.

## Not built yet (#21)

Quote form with Turnstile + honeypot, Microsoft 365 / Gmail delivery, and the final
Services, Gallery, Reviews, About and Contact layouts (they are stubs that render the
config today).
