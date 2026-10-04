import type { CSSProperties } from "react";

/** Delay (ms) for the one-off hero entrance animation. */
export const enterDelay = (ms: number) => ({ "--d": ms }) as CSSProperties;

/** Delay (ms) for a scroll reveal, applied with `data-reveal`. */
export const revealDelay = (ms: number) => ({ "--reveal-delay": ms }) as CSSProperties;
