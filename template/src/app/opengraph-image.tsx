import { ImageResponse } from "next/og";
import { clientConfig } from "@config/index";
import { readableOn } from "@/lib/theme";

// Social preview image generated from the client config at build time.
export const alt = `${clientConfig.business.name}: ${clientConfig.business.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const { business, brand, sample } = clientConfig;
  const { primary, accent } = brand.colors;
  const onPrimary = readableOn(primary);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: primary,
          color: onPrimary,
        }}
      >
        <div style={{ width: 120, height: 10, background: accent, marginBottom: 40 }} />
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>{business.name}</div>
        <div style={{ fontSize: 38, marginTop: 24, opacity: 0.85 }}>{business.tagline}</div>
        {sample ? <div style={{ fontSize: 26, marginTop: 48, opacity: 0.7 }}>Sample site: placeholder content</div> : null}
      </div>
    ),
    size,
  );
}
