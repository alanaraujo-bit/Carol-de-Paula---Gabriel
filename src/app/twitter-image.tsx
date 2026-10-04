import OpengraphImage from "./opengraph-image";
import { site } from "@/content/site";

// Metadata exports must be declared literally in each file.
export const alt = `${site.name} — ${site.tagline} em ${site.location.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default OpengraphImage;
