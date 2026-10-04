import { ImageResponse } from "next/og";

import { brandColors, loadDisplayFonts } from "@/lib/brand-assets";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  return new ImageResponse(<Monogram size={64} />, { ...size, fonts: await loadDisplayFonts() });
}

/** "C" set in the display serif with a teal full stop. Shared with apple-icon. */
export function Monogram({ size }: { size: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: brandColors.ink,
        color: brandColors.paper,
        fontFamily: "Instrument Serif",
        fontSize: size * 0.78,
        lineHeight: 1,
        paddingTop: size * 0.06,
      }}
    >
      C
      <div
        style={{
          width: size * 0.09,
          height: size * 0.09,
          borderRadius: size,
          background: brandColors.tealLight,
          marginLeft: size * 0.02,
          marginTop: size * 0.3,
        }}
      />
    </div>
  );
}
