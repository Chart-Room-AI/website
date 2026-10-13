/** Contract between quote forms (any design) and src/app/api/contact/route.ts. */
export const QUOTE_ENDPOINT = "/api/contact";
export const THANK_YOU_PATH = "/contact/thank-you";
export const ERROR_PATH = "/contact/error";
export const HONEYPOT_FIELD = "fax_number";
export const STARTED_AT_FIELD = "form_started_at";
export const TURNSTILE_ACTION = "quote";

/** Form field names and their max lengths. */
export const QUOTE_FIELDS = {
  name: { name: "name", max: 100 },
  email: { name: "email", max: 254 },
  phone: { name: "phone", max: 40 },
  service: { name: "service", max: 150 },
  message: { name: "message", max: 3000 },
} as const;
