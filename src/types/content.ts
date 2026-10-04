import type { StaticImageData } from "next/image";

/** A photograph with the editorial data needed to render it well. */
export type Photo = {
  src: StaticImageData;
  alt: string;
  /**
   * CSS object-position used whenever the photo is cropped.
   * Set per image so faces are never cut.
   */
  focus?: string;
};

export type VideoSource =
  | { type: "youtube"; id: string; title: string }
  | { type: "vimeo"; id: string; title: string }
  | { type: "file"; src: string; poster?: string; title: string };

export type WorkCategory =
  | "Eventos"
  | "Cerimonial"
  | "Televisão"
  | "Reportagem"
  | "Institucional";

/** A portfolio entry. Add new ones in `src/content/works.ts`. */
export type Work = {
  slug: string;
  title: string;
  /** Event, programme or client the work belongs to. */
  event?: string;
  year?: number;
  category: WorkCategory;
  description?: string;
  /** First photo is the cover shown in the gallery. */
  photos: [Photo, ...Photo[]];
  video?: VideoSource;
};

export type Highlight = {
  slug: string;
  name: string;
  /** Short name or acronym, when the event is known by one. */
  shortName?: string;
  year?: number;
  role: string;
  place: string;
  summary: string;
  photo: Photo;
};

export type ExperienceEntry = {
  period: string;
  /** Machine-readable start year, used for ordering and schema. */
  startYear?: number;
  current?: boolean;
  role: string;
  organization: string;
  skills: string[];
};

export type Service = {
  title: string;
  description: string;
};

export type Fact = {
  value: string;
  label: string;
  detail?: string;
};
