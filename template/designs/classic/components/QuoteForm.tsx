import { FormGuards } from "@/components/FormGuards";
import { QUOTE_ENDPOINT, QUOTE_FIELDS } from "@/lib/quote-form";
import type { ClientConfig } from "@config/schema";

const inputClass =
  "min-h-12 rounded-md border border-border bg-white px-4 text-base font-normal text-foreground shadow-sm";

/** Classic design's quote form. Posts to the shared /api/contact route. */
export function QuoteForm({ config }: { config: ClientConfig }) {
  const { name, email, phone, service, message } = QUOTE_FIELDS;
  return (
    <form action={QUOTE_ENDPOINT} method="POST" className="relative grid gap-4">
      <FormGuards />
      <label className="grid gap-2 text-sm font-semibold text-primary">
        Name
        <input required name={name.name} maxLength={name.max} autoComplete="name" className={inputClass} />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-primary">
          Email
          <input required type="email" name={email.name} maxLength={email.max} autoComplete="email" className={inputClass} />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-primary">
          <span>
            Phone <span className="font-normal text-muted">(optional)</span>
          </span>
          <input type="tel" name={phone.name} maxLength={phone.max} autoComplete="tel" className={inputClass} />
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold text-primary">
        Service
        <select name={service.name} defaultValue="" className={inputClass}>
          <option value="">Not sure yet</option>
          {config.services.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-sm font-semibold text-primary">
        What do you need?
        <textarea
          required
          name={message.name}
          maxLength={message.max}
          rows={5}
          className={`${inputClass} py-3`}
          placeholder="The job, rough size, address or neighborhood, and timing."
        />
      </label>
      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-6 py-3 text-base font-semibold text-on-accent shadow-lg shadow-black/10 transition hover:brightness-95"
      >
        {config.hero.quoteCtaLabel}
      </button>
    </form>
  );
}
