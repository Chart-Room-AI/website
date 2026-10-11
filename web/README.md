# Chart Room AI — marketing site

Next.js App Router application for Chart Room AI — fractional AI transformation advisory (planned production domain **`chartroomai.com`**).


## Commands

Run from **`web/`**:

```bash
cd web
npm install
npm run dev
```

- **Dev:** [http://localhost:3000](http://localhost:3000)
- **Production preview:** `npm run build && npm run start`

## Configuration

Optional environment variables (see `.env.example`):

- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_LINKEDIN_URL`
- `NEXT_PUBLIC_BOOKING_URL`
- `NEXT_PUBLIC_AUDIT_URL`
- `NEXT_PUBLIC_FORM_ENDPOINT` (browser-facing submit path; defaults to `/api/contact`)
- `NEXT_PUBLIC_RESUME_URL` (e.g. `/documents/Marc-Cheatham-Resume.pdf` or `https://…`)

`NEXT_PUBLIC_BOOKING_URL` and `NEXT_PUBLIC_AUDIT_URL` are public destination overrides.
Keep them aligned with the approved conversion funnel: direct booking should remain a
secondary path, and audit links should only imply immediate access when the configured
audit destination is actually available.

## Contact Form Delivery

The contact form posts to the first-party `/api/contact` route by default. Local and unconfigured environments use no-send mode, so test submissions stay on the site and redirect to `/contact/thank-you` without sending email.

For production on Vercel, configure server-side environment variables:

- `CONTACT_DELIVERY_MODE=microsoft_graph`
- `MICROSOFT_TENANT_ID`
- `MICROSOFT_CLIENT_ID`
- `MICROSOFT_CLIENT_SECRET`
- `CONTACT_FROM_MAILBOX`
- `CONTACT_TO_EMAIL`

Do not prefix Microsoft credentials with `NEXT_PUBLIC_`. The app must be deployed as a normal Next.js app so the App Router route handler can run; static export is not supported for contact-form delivery.

Higher-level IA, positioning, and brand tokens are documented at the repo root: `marc-cheatham-portfolio-spec.md`.
