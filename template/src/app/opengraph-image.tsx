import { ImageResponse } from "next/og";
import { clientConfig } from "@config/index";
import { assetDataUri } from "@/lib/asset-data";
import { readableOn } from "@/lib/theme";

// Social preview image generated at build time from the config and brand kit.
export const alt = `${clientConfig.business.name}: ${clientConfig.business.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const { business, brand, sample, id } = clientConfig;
  const { primary, accent } = brand.palette;
  const onDark = brand.logo.onDark;
  const logoSrc = onDark ? await assetDataUri(id, onDark) : undefined;
  const logoHeight = 96;

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
          color: readableOn(primary),
        }}
      >
        {logoSrc && onDark ? (
          <img
            src={logoSrc}
            alt=""
            height={logoHeight}
            width={Math.round((onDark.width / onDark.height) * logoHeight)}
            style={{ marginBottom: 36 }}
          />
        ) : (
          <div style={{ width: 120, height: 10, background: accent, marginBottom: 40 }} />
        )}
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>{business.name}</div>
        <div style={{ fontSize: 38, marginTop: 24, opacity: 0.85 }}>{business.tagline}</div>
        {sample ? <div style={{ fontSize: 26, marginTop: 48, opacity: 0.7 }}>Sample site: placeholder content</div> : null}
      </div>
    ),
    size,
  );
}
