import Image from "next/image";

import type { Work } from "@/types/content";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/style";
import { Plus } from "@/components/ui/Icons";
import { workMeta } from "./slides";

type Props = {
  work: Work;
  onOpen: () => void;
  className?: string;
  sizes: string;
  delay?: number;
};

export function GalleryTile({ work, onOpen, className, sizes, delay = 0 }: Props) {
  const cover = work.photos[0];
  const extra = work.photos.length - 1 + (work.video ? 1 : 0);

  return (
    <figure className={cn("group", className)}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Ampliar: ${work.title}`}
        aria-haspopup="dialog"
        className="relative block w-full cursor-zoom-in"
        style={{ aspectRatio: `${cover.src.width} / ${cover.src.height}` }}
      >
        <span
          data-reveal="image"
          style={revealDelay(delay)}
          className="absolute inset-0 overflow-hidden bg-paper-deep"
        >
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            placeholder="blur"
            sizes={sizes}
            className="object-cover group-hover:scale-[1.035]"
            style={{ objectPosition: cover.focus }}
          />
        </span>
        <span
          aria-hidden
          className="absolute bottom-4 left-4 hidden items-center gap-2 bg-paper/95 px-3 py-2 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ink opacity-0 transition-[opacity,transform] duration-500 ease-out-expo [@media(hover:hover)]:flex [@media(hover:hover)]:translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        >
          <Plus className="text-sm" />
          Ampliar
        </span>
        {extra > 0 && (
          <span className="absolute right-4 top-4 bg-ink/80 px-2.5 py-1 text-[0.6875rem] tabular-nums text-paper">
            +{extra}
          </span>
        )}
      </button>
      <figcaption className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-[var(--line)] pt-3">
        <span className="font-display text-[1.375rem] leading-tight lg:text-[1.5rem]">{work.title}</span>
        <span className="eyebrow text-muted">{workMeta(work)}</span>
      </figcaption>
    </figure>
  );
}
