import { ImageResponse } from "next/og";

import { site } from "@/content/site";
import { brandColors, loadDisplayFonts, loadPortraitDataUrl } from "@/lib/brand-assets";

export const alt = `${site.name} — ${site.tagline} em ${site.location.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [fonts, portrait] = await Promise.all([loadDisplayFonts(), loadPortraitDataUrl()]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: brandColors.paper,
          fontFamily: "Instrument Serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 600,
            padding: "64px 64px 60px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, color: brandColors.teal, fontSize: 24 }}>
            <div style={{ width: 40, height: 1, background: brandColors.teal }} />
            Portfólio profissional
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 150, lineHeight: 0.86, color: brandColors.ink, letterSpacing: -3 }}>Carol</div>
            <div style={{ display: "flex", fontSize: 150, lineHeight: 0.95, color: brandColors.ink, letterSpacing: -3 }}>
              <span style={{ fontStyle: "italic", marginRight: 28 }}>de</span>
              <span>Paula</span>
            </div>
            <div style={{ marginTop: 36, fontSize: 32, color: brandColors.muted }}>
              {site.roles.join(" · ")}
            </div>
            <div style={{ marginTop: 6, fontSize: 26, color: brandColors.teal, fontStyle: "italic" }}>
              {`${site.location.city}, ${site.location.regionCode}`}
            </div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={portrait} width={600} height={630} alt="" style={{ objectFit: "cover" }} />
      </div>
    ),
    { ...size, fonts },
  );
}
