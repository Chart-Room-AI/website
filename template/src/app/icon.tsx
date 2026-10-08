import { ImageResponse } from "next/og";
import { clientConfig } from "@config/index";
import { readableOn } from "@/lib/theme";

// Favicon generated from the client config: initials on the primary color.
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

export default function Icon() {
  const { primary } = clientConfig.brand.colors;
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
        {initials(clientConfig.business.name)}
      </div>
    ),
    size,
  );
}
