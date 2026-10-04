"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { navigation } from "@/content/site";
import { cn } from "@/lib/cn";
import { Wordmark } from "./Wordmark";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Solid background once the page leaves the very top.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Highlight the navigation item for the section in the middle of the viewport.
  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));

    const hero = document.getElementById("inicio");
    const heroObserver = hero
      ? new IntersectionObserver(([entry]) => entry.isIntersecting && setActive(null), {
          rootMargin: "-45% 0px -50% 0px",
        })
      : null;
    if (hero) heroObserver?.observe(hero);

    return () => {
      observer.disconnect();
      heroObserver?.disconnect();
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[var(--header-h)] transition-[background-color,border-color,backdrop-filter] duration-500 ease-out-quart",
        "border-b",
        scrolled
          ? "border-[var(--line)] bg-paper/95 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-full items-center justify-between gap-6">
        <Link
          href="/#inicio"
          className="relative z-10 -my-2 py-2 text-[1.375rem] text-ink lg:text-[1.625rem]"
          aria-label="Carol de Paula — voltar ao início"
        >
          <Wordmark />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {navigation.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={`/${item.href}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative py-2 text-[0.8125rem] tracking-[0.04em] transition-colors duration-300",
                      "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-500 after:ease-out-quart",
                      isActive
                        ? "text-ink after:scale-x-100"
                        : "text-ink/70 after:scale-x-0 hover:text-ink hover:after:scale-x-100",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#contato"
            className="hidden min-h-11 items-center bg-ink px-5 text-[0.8125rem] font-medium tracking-[0.04em] text-paper transition-colors duration-300 hover:bg-teal lg:inline-flex"
          >
            Solicitar orçamento
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
