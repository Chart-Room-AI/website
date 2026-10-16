import type { ClientConfig } from "@config/schema";

/** tel: link for click-to-call, e.g. "(804) 555-0142" -> "tel:+18045550142". */
export function telHref(phone: string): string {
  const digits = phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  return `tel:+1${digits}`;
}

export function formatAddress(address: ClientConfig["contact"]["address"]): string[] {
  const cityLine = `${address.city}, ${address.region} ${address.postalCode}`;
  return address.street ? [address.street, cityLine] : [cityLine];
}
