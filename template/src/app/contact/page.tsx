import type { Metadata } from "next";
import { clientConfig } from "@config/index";
import { activeDesign } from "@designs/index";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { Contact } = activeDesign.pages;
  return <Contact config={clientConfig} />;
}
