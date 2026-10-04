"use client";

import { useCallback, useMemo, useState } from "react";

import type { Work } from "@/types/content";
import { cn } from "@/lib/cn";
import { useModalDialog } from "@/hooks/useModalDialog";
import { GalleryTile } from "./GalleryTile";
import { Lightbox } from "./Lightbox";
import { buildSlides } from "./slides";

type Tile = {
  work: Work;
  /** Index in `works`, used to open the lightbox at the right slide. */
  index: number;
  portrait: boolean;
};

/**
 * Two independent, staggered columns: a wide one and a narrow one set
 * lower. Works alternate between them, so the composition never leaves
 * row gaps and stays balanced as new works are added. On phones both
 * columns collapse into one list.
 */
export function Gallery({ works }: { works: Work[] }) {
  const { slides, firstSlideOf } = useMemo(() => buildSlides(works), [works]);
  const dialog = useModalDialog();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const columns = useMemo(() => {
    const wide: Tile[] = [];
    const narrow: Tile[] = [];
    works.forEach((work, i) => {
      const cover = work.photos[0].src;
      (i % 2 === 0 ? wide : narrow).push({ work, index: i, portrait: cover.height > cover.width });
    });
    return { wide, narrow };
  }, [works]);

  const openAt = (workIndex: number) => {
    setDirection(1);
    setIndex(firstSlideOf[workIndex]);
    dialog.open();
  };

  const navigate = useCallback(
    (step: 1 | -1) => {
      setDirection(step);
      setIndex((current) => (current + step + slides.length) % slides.length);
    },
    [slides.length],
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-y-16 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-12 lg:gap-x-8">
        <ul className="contents sm:flex sm:flex-col sm:gap-y-20 lg:col-span-7 lg:gap-y-32">
          {columns.wide.map((tile, i) => (
            <li
              key={tile.work.slug}
              className={cn(
                tile.portrait && "w-[82%] justify-self-end sm:w-full lg:w-[64%] lg:self-end",
              )}
            >
              <GalleryTile
                work={tile.work}
                onOpen={() => openAt(tile.index)}
                sizes={`(min-width: 1024px) ${tile.portrait ? 36 : 56}vw, (min-width: 640px) 50vw, ${tile.portrait ? 82 : 100}vw`}
                delay={i === 0 ? 0 : 60}
              />
            </li>
          ))}
        </ul>
        <ul className="contents sm:flex sm:flex-col sm:gap-y-20 sm:pt-28 lg:col-span-4 lg:col-start-9 lg:gap-y-32 lg:pt-48">
          {columns.narrow.map((tile) => (
            <li
              key={tile.work.slug}
              className={cn(tile.portrait && "w-[82%] sm:w-full")}
            >
              <GalleryTile
                work={tile.work}
                onOpen={() => openAt(tile.index)}
                sizes={`(min-width: 1024px) 32vw, (min-width: 640px) 50vw, ${tile.portrait ? 82 : 100}vw`}
                delay={120}
              />
            </li>
          ))}
        </ul>
      </div>

      <Lightbox
        dialogRef={dialog.ref}
        isOpen={dialog.isOpen}
        slides={slides}
        index={index}
        direction={direction}
        onNavigate={navigate}
        onClose={() => dialog.close()}
      />
    </>
  );
}
