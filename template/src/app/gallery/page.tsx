import type { Metadata } from "next";
import { clientConfig } from "@config/index";
import { activeDesign } from "@designs/index";

export const metadata: Metadata = {
  title: "Gallery",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  const { Gallery } = activeDesign.pages;
  return <Gallery config={clientConfig} />;
}
