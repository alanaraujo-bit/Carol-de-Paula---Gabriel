"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CLOSE_FALLBACK_MS = 450;

/**
 * Drives a native <dialog> as an animated modal.
 *
 * The native element gives us focus trapping, Esc handling, an inert
 * background and focus restoration; this hook adds enter/exit states
 * (`data-state="open" | "closing"`) and locks page scroll while open.
 */
export function useModalDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const closingRef = useRef(false);

  const open = useCallback(() => {
    const dialog = ref.current;
    if (!dialog || dialog.open) return;
    closingRef.current = false;
    lockScroll();
    dialog.showModal();
    dialog.dataset.state = "closed";
    // Next frame so the transition runs from the closed state.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        dialog.dataset.state = "open";
      });
    });
    setIsOpen(true);
  }, []);

  const close = useCallback((afterClose?: () => void) => {
    const dialog = ref.current;
    if (!dialog || !dialog.open || closingRef.current) return;
    closingRef.current = true;
    dialog.dataset.state = "closing";

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      dialog.removeEventListener("transitionend", onEnd);
      dialog.close();
      dialog.dataset.state = "closed";
      closingRef.current = false;
      unlockScroll();
      setIsOpen(false);
      afterClose?.();
    };
    const onEnd = (event: TransitionEvent) => {
      if (event.target === dialog) finish();
    };

    if (reduceMotion) return finish();
    dialog.addEventListener("transitionend", onEnd);
    window.setTimeout(finish, CLOSE_FALLBACK_MS);
  }, []);

  // Esc: animate out instead of the abrupt native close.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    const onCancel = (event: Event) => {
      event.preventDefault();
      close();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, [close]);

  useEffect(() => () => unlockScroll(), []);

  return { ref, isOpen, open, close };
}

function lockScroll() {
  const root = document.documentElement;
  const scrollbar = window.innerWidth - root.clientWidth;
  root.style.overflow = "hidden";
  if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
}

function unlockScroll() {
  const root = document.documentElement;
  root.style.overflow = "";
  root.style.paddingRight = "";
}
