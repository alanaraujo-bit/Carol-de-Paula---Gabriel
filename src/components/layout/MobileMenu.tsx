"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

import { navigation, site } from "@/content/site";
import { whatsappUrl } from "@/lib/contact";
import { scrollToHash } from "@/lib/scroll";
import { useModalDialog } from "@/hooks/useModalDialog";
import { Close, Instagram, WhatsApp } from "@/components/ui/Icons";
import { Wordmark } from "./Wordmark";

export function MobileMenu() {
  const { ref, isOpen, open, close } = useModalDialog();
  const router = useRouter();

  // Close first, then move: the page scrolls once the overlay is gone.
  const navigate = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
    event.preventDefault();
    close(() => {
      if (!scrollToHash(hash)) router.push(`/${hash}`);
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="menu-mobile"
        className="-mr-3 flex min-h-12 items-center gap-3 px-3 text-[0.8125rem] font-medium tracking-[0.04em] text-ink lg:hidden"
      >
        Menu
        <span aria-hidden className="flex w-6 flex-col gap-[5px]">
          <span className="h-px w-full bg-current" />
          <span className="h-px w-2/3 self-end bg-current" />
        </span>
      </button>

      <dialog
        ref={ref}
        id="menu-mobile"
        aria-label="Menu"
        data-surface="ink"
        className="group/menu fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-ink p-0 text-on-ink opacity-0 transition-opacity duration-500 ease-out-quart backdrop:bg-transparent data-[state=open]:opacity-100 lg:hidden"
      >
        <div className="flex min-h-full flex-col pb-[max(env(safe-area-inset-bottom),1.5rem)]">
          <div className="container-page flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Link href="/#inicio" onClick={(e) => navigate(e, "#inicio")} className="text-[1.375rem]">
              <Wordmark />
            </Link>
            <button
              type="button"
              onClick={() => close()}
              className="-mr-3 flex min-h-12 items-center gap-3 px-3 text-[0.8125rem] font-medium tracking-[0.04em]"
            >
              Fechar
              <Close className="text-xl" />
            </button>
          </div>

          <nav aria-label="Menu principal" className="container-page flex flex-1 flex-col justify-center py-10">
            <ul className="border-t border-[var(--line-on-ink)]">
              {navigation.map((item, index) => (
                <li
                  key={item.href}
                  className="translate-y-6 border-b border-[var(--line-on-ink)] opacity-0 transition-[opacity,transform] duration-700 ease-out-expo group-data-[state=closing]/menu:duration-200 group-data-[state=open]/menu:translate-y-0 group-data-[state=open]/menu:opacity-100"
                  style={{ transitionDelay: `${120 + index * 60}ms` }}
                >
                  <Link
                    href={`/${item.href}`}
                    onClick={(e) => navigate(e, item.href)}
                    className="flex items-baseline justify-between py-5 active:text-teal-light"
                  >
                    <span className="font-display text-[2.75rem] leading-none xs:text-5xl">{item.label}</span>
                    <span className="eyebrow tabular-nums text-on-ink-muted">0{index + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="container-page flex flex-col gap-6 opacity-0 transition-opacity delay-300 duration-700 group-data-[state=closing]/menu:delay-0 group-data-[state=open]/menu:opacity-100"
          >
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center justify-center gap-3 bg-paper text-[0.875rem] font-medium tracking-[0.04em] text-ink active:bg-teal-light"
            >
              <WhatsApp className="text-lg" />
              Solicitar orçamento
            </a>
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-sm text-on-ink-muted">
              <a
                href={site.contact.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2"
              >
                <Instagram className="text-base" />
                {site.contact.instagram.handle}
              </a>
              <a href={`mailto:${site.contact.email}`} className="inline-flex min-h-11 items-center break-all">
                E-mail
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
