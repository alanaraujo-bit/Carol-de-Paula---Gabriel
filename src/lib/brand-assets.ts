import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Shared files for generated images (icons, Open Graph). Server only. */
const assets = join(process.cwd(), "src/assets");

export const brandColors = {
  paper: "#f5f1ec",
  ink: "#121212",
  teal: "#1d6c76",
  tealLight: "#8fcad0",
  muted: "#5c5853",
};

export async function loadDisplayFonts() {
  const [regular, italic] = await Promise.all([
    readFile(join(assets, "fonts/InstrumentSerif-Regular.ttf")),
    readFile(join(assets, "fonts/InstrumentSerif-Italic.ttf")),
  ]);
  return [
    { name: "Instrument Serif", data: regular, style: "normal" as const, weight: 400 as const },
    { name: "Instrument Serif", data: italic, style: "italic" as const, weight: 400 as const },
  ];
}

export async function loadPortraitDataUrl() {
  const file = await readFile(join(assets, "og-portrait.jpg"));
  return `data:image/jpeg;base64,${file.toString("base64")}`;
}
