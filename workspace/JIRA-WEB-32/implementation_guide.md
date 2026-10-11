# JIRA-WEB-32 Implementation Guide

## Objective

Update visible website CTA copy from `Request AI Readiness Diagnostic` to `Unlock AI for your Firm`, matching the intent of WEB-32.

## Implementation Slices

1. Replace static JSX CTA labels in:
   - `web/src/app/page.tsx`
   - `web/src/components/CtaBand.tsx`
   - `web/src/components/SiteHeader.tsx`
   - `web/src/components/SiteFooter.tsx`
2. Replace the contact form submit label in:
   - `web/src/components/ContactForm.tsx`
3. Verify no production-code instances remain for:
   - `Request AI Readiness Diagnotic`
   - `Request AI Readiness Diagnostic`

## Constraints

- Do not change CTA destinations, form submission logic, styling, layout, or copy outside this ticket's requested phrase.
- Do not update historical workspace notes unless needed for verification evidence.
- Preserve existing branch/user changes unrelated to WEB-32.

## Verification

- Run repository search for old and new CTA copy.
- Run relevant web verification from `web/package.json`.
- Check lints for changed files.
