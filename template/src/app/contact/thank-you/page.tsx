import type { Metadata } from "next";
import { clientConfig } from "@config/index";
import { activeDesign } from "@designs/index";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  const { ThankYou } = activeDesign.pages;
  return <ThankYou config={clientConfig} />;
}
