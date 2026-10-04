import type { Photo, VideoSource, Work } from "@/types/content";

export type Slide =
  | { kind: "photo"; work: Work; photo: Photo }
  | { kind: "video"; work: Work; video: VideoSource };

/** Flattens works into lightbox slides: every photo, then the video if any. */
export function buildSlides(works: Work[]) {
  const slides: Slide[] = [];
  const firstSlideOf: number[] = [];

  for (const work of works) {
    firstSlideOf.push(slides.length);
    for (const photo of work.photos) slides.push({ kind: "photo", work, photo });
    if (work.video) slides.push({ kind: "video", work, video: work.video });
  }

  return { slides, firstSlideOf };
}

export function workMeta(work: Work) {
  return [work.category, work.year].filter(Boolean).join(" · ");
}
