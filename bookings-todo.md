# Microsoft Bookings Todo

## Goal

Use Microsoft Bookings as the scheduling backend for Chart Room AI diagnostics so we do not need to buy or manage a separate service like Calendly.

## Recommended Conversion Flow

- Keep the contact page form-first for now.
- Use Microsoft Bookings as the direct scheduling option for visitors who are ready to book immediately.
- Keep the free audit as a secondary lead-capture path until the audit experience is fully built.

## Microsoft Bookings Setup

- Confirm Microsoft Bookings is available in the current Microsoft 365 plan.
- Create or configure a public Bookings page for Chart Room AI.
- Add a service named something like `AI Readiness Diagnostic`.
- Set duration to 30 minutes.
- Configure availability windows that Marc is comfortable offering publicly.
- Use Microsoft Teams or phone as the meeting location.
- Enable automatic confirmation emails.
- Enable reminder emails to reduce no-shows.
- Confirm Bookings is reading Outlook calendar availability to avoid double-booking.
- Customize the public booking page with Chart Room AI branding where possible.
- Copy the final public booking URL.

## App Integration

- Set `NEXT_PUBLIC_BOOKING_URL` to the Microsoft Bookings public service URL.
- Keep `NEXT_PUBLIC_FORM_ENDPOINT` pointed at the diagnostic request form handler.
- Update contact-page copy so the diagnostic form remains the primary action.
- Add a secondary CTA such as `Prefer to book directly? Choose a diagnostic time`.
- Remove production-facing developer copy about setting environment variables.
- Replace any Calendly-specific wording with neutral scheduling language.

## Contact Page Polish

- Explain what the diagnostic delivers:
  - Identify the current AI initiative blocker.
  - Surface governance, security, or delivery gaps.
  - Recommend the next practical executive move.
- Reassure visitors that requests are reviewed before scheduling to keep the conversation useful.
- Make LinkedIn and resume links supporting trust signals, not competing primary CTAs.
- Rewrite the audit section as a legitimate request path, not a placeholder.
- Consider a simple post-submit thank-you page or confirmation message.

## Audit Section Direction

- Keep the audit visible, but position it as secondary.
- Avoid saying the form is unfinished.
- Suggested framing: `The 5-minute Agentic Workflow Friction Audit is being offered selectively while the scoring model is refined. Request access and we will send the current version when it is available.`
- Point audit requests back to the diagnostic/contact form unless a dedicated audit URL is ready.

## Open Decisions

- Whether the public primary CTA should remain `Request AI Readiness Diagnostic` or become more outcome-driven, such as `Find Your AI Bottleneck`.
- Whether to send direct-booking users straight to Microsoft Bookings or ask them to complete the short intake first.
- Whether to add a dedicated thank-you route after form submission.
