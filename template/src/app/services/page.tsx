import type { Metadata } from "next";
import { clientConfig } from "@config/index";
import { activeDesign } from "@designs/index";

export const metadata: Metadata = {
  title: "Services",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  const { Services } = activeDesign.pages;
  return <Services config={clientConfig} />;
}
