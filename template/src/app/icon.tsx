import { ImageResponse } from "next/og";
import { clientConfig } from "@config/index";
import { assetDataUri } from "@/lib/asset-data";
import { readableOn } from "@/lib/theme";

// Favicon from the brand kit: logo.icon, else the logo itself when it's an
// icon-only logo, else the business initials on the primary color.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join("");
}

export default async function Icon() {
  const { brand, business, id } = clientConfig;
  const source = brand.logo.icon ?? (brand.logo.variant === "icon" ? brand.logo.onLight : undefined);

  if (source) {
    const src = await assetDataUri(id, source);
    return new ImageResponse(
      (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img src={src} width={64} height={64} alt="" />
        </div>
      ),
      size,
    );
  }

  const { primary } = brand.palette;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 14,
          background: primary,
          color: readableOn(primary),
          fontSize: 30,
          fontWeight: 700,
        }}
      >
        {initials(business.name)}
      </div>
    ),
    size,
  );
}
