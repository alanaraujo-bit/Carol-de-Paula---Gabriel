"use client";

import Image from "next/image";
import { useRef, type KeyboardEvent, type MouseEvent, type PointerEvent, type RefObject } from "react";

import type { VideoSource } from "@/types/content";
import { ChevronLeft, ChevronRight, Close } from "@/components/ui/Icons";
import { workMeta, type Slide } from "./slides";

type Props = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  isOpen: boolean;
  slides: Slide[];
  index: number;
  direction: 1 | -1;
  onNavigate: (step: 1 | -1) => void;
  onClose: () => void;
};

const SWIPE_THRESHOLD = 48;

export function Lightbox({ dialogRef, isOpen, slides, index, direction, onNavigate, onClose }: Props) {
  const pointer = useRef<{ x: number; y: number; id: number } | null>(null);
  const slide = slides[index];
  const total = slides.length;
  const hasMany = total > 1;

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (!hasMany) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onNavigate(1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      onNavigate(-1);
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    pointer.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointer.current;
    pointer.current = null;
    if (!start || start.id !== event.pointerId || !hasMany) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy) * 1.2) {
      onNavigate(dx < 0 ? 1 : -1);
    }
  };

  // Clicking the empty area around the media closes the viewer.
  const onStageClick = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).dataset.backdrop !== undefined) onClose();
  };

  const neighbours = hasMany
    ? [slides[(index + 1) % total], slides[(index - 1 + total) % total]]
    : [];

  return (
    <dialog
      ref={dialogRef}
      aria-label="Galeria de trabalhos"
      data-surface="ink"
      onKeyDown={onKeyDown}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-ink p-0 text-on-ink opacity-0 transition-opacity duration-400 ease-out-quart backdrop:bg-transparent data-[state=open]:opacity-100"
    >
      {isOpen && slide && (
        <div className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto]">
          {/* Top bar */}
          <div className="flex h-16 items-center justify-between px-[var(--gutter)] lg:h-20">
            <p className="eyebrow tabular-nums text-on-ink-muted">
              <span className="text-on-ink">{String(index + 1).padStart(2, "0")}</span>
              <span className="mx-2">/</span>
              {String(total).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="-mr-3 flex min-h-12 items-center gap-3 px-3 text-[0.8125rem] font-medium tracking-[0.04em] transition-colors hover:text-teal-light"
            >
              Fechar
              <Close className="text-xl" />
            </button>
          </div>

          {/* Stage */}
          <div
            data-backdrop
            onClick={onStageClick}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (pointer.current = null)}
            className="relative flex min-h-0 touch-pan-y touch-pinch-zoom items-center justify-center px-4 sm:px-[var(--gutter)] lg:px-28"
          >
            <div
              key={index}
              data-backdrop
              className={direction === 1 ? "lightbox-enter-next" : "lightbox-enter-prev"}
              style={{ display: "flex", height: "100%", width: "100%", alignItems: "center", justifyContent: "center" }}
            >
              {slide.kind === "photo" ? (
                <Image
                  src={slide.photo.src}
                  alt={slide.photo.alt}
                  sizes="100vw"
                  quality={85}
                  placeholder="blur"
                  draggable={false}
                  className="h-auto max-h-full w-auto object-contain"
                  style={{ maxWidth: `min(100%, ${Math.round(slide.photo.src.width * 1.6)}px)` }}
                />
              ) : (
                <VideoPlayer video={slide.video} />
              )}
            </div>

            {hasMany && (
              <>
                <NavButton direction={-1} onClick={() => onNavigate(-1)} className="left-[var(--gutter)]" />
                <NavButton direction={1} onClick={() => onNavigate(1)} className="right-[var(--gutter)]" />
              </>
            )}
          </div>

          {/* Caption */}
          <div className="flex items-end justify-between gap-6 px-[var(--gutter)] pb-[max(env(safe-area-inset-bottom),1.25rem)] pt-5 lg:pb-8 lg:pt-6">
            <div className="min-w-0 max-w-2xl" aria-live="polite">
              <p className="eyebrow text-teal-light">{workMeta(slide.work)}</p>
              <h2 className="mt-2 font-display text-[1.75rem] leading-tight lg:text-[2.25rem]">{slide.work.title}</h2>
              {(slide.work.event || slide.work.description) && (
                <p className="mt-1.5 line-clamp-2 text-[0.875rem] leading-relaxed text-on-ink-muted lg:line-clamp-none lg:text-[0.9375rem]">
                  {slide.work.description ?? slide.work.event}
                </p>
              )}
            </div>
            {hasMany && (
              <div className="flex shrink-0 gap-2 lg:hidden">
                <button
                  type="button"
                  onClick={() => onNavigate(-1)}
                  aria-label="Anterior"
                  className="grid size-12 place-items-center border border-[var(--line-on-ink)] text-xl active:bg-on-ink active:text-ink"
                >
                  <ChevronLeft />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(1)}
                  aria-label="Próxima"
                  className="grid size-12 place-items-center border border-[var(--line-on-ink)] text-xl active:bg-on-ink active:text-ink"
                >
                  <ChevronRight />
                </button>
              </div>
            )}
          </div>

          {/* Warm the cache for adjacent photos. */}
          <div hidden>
            {neighbours.map((neighbour, i) =>
              neighbour.kind === "photo" ? (
                <Image
                  key={i}
                  src={neighbour.photo.src}
                  alt=""
                  sizes="100vw"
                  quality={85}
                  loading="eager"
                />
              ) : null,
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}

function NavButton({
  direction,
  onClick,
  className,
}: {
  direction: 1 | -1;
  onClick: () => void;
  className: string;
}) {
  const Icon = direction === 1 ? ChevronRight : ChevronLeft;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 1 ? "Próxima" : "Anterior"}
      className={`absolute top-1/2 hidden size-14 -translate-y-1/2 place-items-center border border-[var(--line-on-ink)] text-2xl transition-colors duration-300 hover:border-on-ink hover:bg-on-ink hover:text-ink lg:grid ${className}`}
    >
      <Icon />
    </button>
  );
}

function VideoPlayer({ video }: { video: VideoSource }) {
  const frame = "aspect-video w-full max-w-[min(100%,calc((100dvh-16rem)*16/9))] bg-black";

  if (video.type === "file") {
    return (
      <video
        className={frame}
        src={video.src}
        poster={video.poster}
        controls
        playsInline
        preload="metadata"
        aria-label={video.title}
      />
    );
  }

  const src =
    video.type === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1`
      : `https://player.vimeo.com/video/${video.id}?dnt=1`;

  return (
    <iframe
      className={frame}
      src={src}
      title={video.title}
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
