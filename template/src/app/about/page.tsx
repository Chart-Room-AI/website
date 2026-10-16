import type { Metadata } from "next";
import { clientConfig } from "@config/index";
import { activeDesign } from "@designs/index";

export const metadata: Metadata = {
  title: "About",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const { About } = activeDesign.pages;
  return <About config={clientConfig} />;
}
