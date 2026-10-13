import type { Metadata } from "next";
import { clientConfig } from "@config/index";
import { activeDesign } from "@designs/index";

export const metadata: Metadata = {
  title: "Reviews",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const { Reviews } = activeDesign.pages;
  return <Reviews config={clientConfig} />;
}
