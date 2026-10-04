import { ImageResponse } from "next/og";

import { loadDisplayFonts } from "@/lib/brand-assets";
import { Monogram } from "./icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(<Monogram size={180} />, { ...size, fonts: await loadDisplayFonts() });
}
