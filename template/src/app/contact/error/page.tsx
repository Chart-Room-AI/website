import type { Metadata } from "next";
import { clientConfig } from "@config/index";
import { activeDesign } from "@designs/index";

export const metadata: Metadata = {
  title: "Request not sent",
  robots: { index: false, follow: false },
};

export default function QuoteErrorPage() {
  const { QuoteError } = activeDesign.pages;
  return <QuoteError config={clientConfig} />;
}
