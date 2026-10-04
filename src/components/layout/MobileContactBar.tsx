"use client";

import { useEffect, useState } from "react";

import { whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { WhatsApp } from "@/components/ui/Icons";

/**
 * Persistent quote CTA for small screens. Appears once the hero has
 * scrolled away and steps aside when the contact section is on screen.
 */
export function MobileContactBar() {
  const [pastHero, setPastHero] = useState(false);
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const endZones = ["contato", "rodape"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observers: IntersectionObserver[] = [];

    if (hero) {
      const o = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting), {
        rootMargin: "0px 0px -35% 0px",
      });
      o.observe(hero);
      observers.push(o);
    }
    if (endZones.length) {
      const visible = new Set<Element>();
      const o = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        }
        setAtContact(visible.size > 0);
      });
      endZones.forEach((el) => o.observe(el));
      observers.push(o);
    }
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const visible = pastHero && !atContact;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 lg:hidden",
        "transition-[transform,opacity] duration-500 ease-out-expo",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
      aria-hidden={!visible}
    >
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={visible ? undefined : -1}
        className="flex min-h-13 items-center justify-between gap-4 bg-ink pl-5 pr-4 text-paper shadow-[0_12px_32px_-12px_rgb(0_0_0/0.45)] active:bg-teal"
      >
        <span className="flex flex-col py-2 leading-tight">
          <span className="text-[0.875rem] font-medium tracking-[0.02em]">Solicitar orçamento</span>
          <span className="text-[0.75rem] text-on-ink-muted">Conversar pelo WhatsApp</span>
        </span>
        <span className="grid size-10 place-items-center border border-[var(--line-on-ink)]">
          <WhatsApp className="text-lg" />
        </span>
      </a>
    </div>
  );
}
