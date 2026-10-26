import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { clientConfig } from "@config/index";
import { activeDesign } from "@designs/index";

export const metadata: Metadata = {
  title: "Reviews",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  // No reviews means no page: reviews are never written for a client.
  if (clientConfig.reviews.length === 0) notFound();
  const { Reviews } = activeDesign.pages;
  return <Reviews config={clientConfig} />;
}
