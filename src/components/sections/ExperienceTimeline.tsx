"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import type { ExperienceEntry } from "@/types/content";
import { cn } from "@/lib/cn";

type Props = {
  entries: ExperienceEntry[];
  /** Section intro, rendered in the sticky column. */
  children: ReactNode;
};

/**
 * Timeline whose active step follows the reader. The sticky column shows
 * the active period in large type; the rail fills as the story advances.
 */
export function ExperienceTimeline({ entries, children }: Props) {
  const [active, setActive] = useState(0);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observed) => {
        for (const entry of observed) {
          if (!entry.isIntersecting) continue;
          const index = itemsRef.current.indexOf(entry.target as HTMLLIElement);
          if (index >= 0) setActive(index);
        }
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    itemsRef.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const progress = entries.length > 1 ? active / (entries.length - 1) : 1;

  return (
    <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+4rem)]">
          {children}

          {/* Decorative: the list below carries the same information. */}
          <div aria-hidden className="relative mt-16 hidden h-[clamp(7rem,12vw,11rem)] overflow-hidden lg:block">
            {entries.map((entry, i) => (
              <span
                key={entry.period}
                className={cn(
                  "absolute inset-x-0 top-0 font-display text-[clamp(6rem,11vw,10rem)] leading-none text-teal-light",
                  "transition-[opacity,transform] duration-700 ease-out-expo",
                  i === active ? "translate-y-0 opacity-100" : i < active ? "-translate-y-1/2 opacity-0" : "translate-y-1/2 opacity-0",
                )}
              >
                {entry.current ? "Hoje" : entry.period}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ol className="relative mt-16 lg:col-span-6 lg:col-start-7 lg:mt-0">
        {/* Rail */}
        <span aria-hidden className="absolute bottom-0 left-[4px] top-0 w-px bg-[var(--line-on-ink)]" />
        <span
          aria-hidden
          className="absolute left-[4px] top-0 w-px origin-top bg-teal-light transition-transform duration-700 ease-out-expo"
          style={{ height: "100%", transform: `scaleY(${progress})` }}
        />

        {entries.map((entry, i) => {
          const isActive = i === active;
          const isPast = i < active;
          return (
            <li
              key={entry.period}
              ref={(el) => {
                itemsRef.current[i] = el;
              }}
              aria-current={entry.current ? "step" : undefined}
              className={cn(
                "relative pl-10 sm:pl-14",
                i === 0 ? "pb-14 lg:pb-20" : "py-14 lg:py-20",
                i === entries.length - 1 && "pb-0 lg:pb-0",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-[0.2rem] size-[9px] rounded-full border transition-[background-color,border-color,transform] duration-500",
                  i === 0 ? "" : "mt-14 lg:mt-20",
                  isActive || isPast
                    ? "scale-100 border-teal-light bg-teal-light"
                    : "scale-90 border-on-ink-muted bg-ink",
                )}
              />
              {/* Inactive steps recede through colour only, staying above WCAG AA contrast. */}
              <p
                className={cn(
                  "eyebrow tabular-nums transition-colors duration-500",
                  isActive ? "text-teal-light" : "text-teal-light in-[.js]:text-on-ink-muted",
                )}
              >
                {entry.period}
              </p>
              <h3
                className={cn(
                  "mt-5 font-display text-[clamp(2rem,3.6vw,3rem)] leading-[1.02] text-balance transition-colors duration-500 ease-out-quart",
                  !isActive && "in-[.js]:text-on-ink-muted",
                )}
              >
                {entry.role}
              </h3>
              <p className="mt-3 text-[1.0625rem] text-on-ink">{entry.organization}</p>
              <p className="mt-4 text-[0.8125rem] tracking-[0.02em] text-on-ink-muted">
                {entry.skills.join("  ·  ")}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
