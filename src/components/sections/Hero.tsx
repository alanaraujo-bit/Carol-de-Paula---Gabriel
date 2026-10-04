import Image from "next/image";

import { site } from "@/content/site";
import { photos } from "@/content/photos";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";
import { enterDelay } from "@/lib/style";

/**
 * Mobile: full-bleed portrait with the name set over the photo.
 * Desktop: the name owns the paper on the left, the portrait bleeds off the right edge.
 */
export function Hero() {
  const portrait = photos.retrato;

  return (
    <section
      id="inicio"
      aria-label="Apresentação"
      className="relative grid grid-cols-1 overflow-hidden lg:block lg:min-h-[max(100svh,42rem)]"
    >
      <div className="hero-photo relative col-start-1 row-start-1 h-[min(82svh,46rem)] min-h-[30rem] overflow-hidden bg-paper-deep lg:absolute lg:bottom-0 lg:right-0 lg:top-[var(--header-h)] lg:h-auto lg:min-h-0 lg:w-[56%]">
        <Image
          src={portrait.src}
          alt={portrait.alt}
          fill
          preload
          quality={85}
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="object-cover"
          style={{ objectPosition: portrait.focus }}
        />
        {/* Legibility for the name on small screens only. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-ink/75 via-ink/25 to-transparent lg:hidden"
        />
        <p className="hero-fade eyebrow absolute bottom-6 right-[var(--gutter)] hidden text-ink/60 [writing-mode:vertical-rl] lg:block xl:bottom-10" style={enterDelay(900)}>
          {site.location.city} — {site.location.regionCode}
        </p>
      </div>

      <div className="contents lg:relative lg:flex lg:min-h-[inherit] lg:flex-col lg:justify-between lg:px-[var(--gutter)] lg:pb-14 lg:pt-[calc(var(--header-h)+2.5rem)] xl:pb-20">
        <p
          className="hero-fade eyebrow hidden text-teal lg:flex lg:items-center lg:gap-3"
          style={enterDelay(500)}
        >
          <span aria-hidden className="h-px w-8 bg-teal/50" />
          Portfólio profissional
        </p>

        <div className="contents lg:block lg:max-w-[calc(44vw-2*var(--gutter))]">
          <h1 className="relative z-10 col-start-1 row-start-1 self-end px-[var(--gutter)] pb-7 font-display text-[clamp(3.75rem,19vw,7rem)] leading-[0.86] tracking-[-0.025em] text-paper lg:px-0 lg:pb-0 lg:text-[clamp(5.5rem,9.2vw,10.5rem)] lg:text-ink">
            <span className="hero-line block overflow-hidden pb-[0.06em]">
              <span style={enterDelay(150)}>Carol</span>
            </span>
            <span className="hero-line block overflow-hidden pb-[0.06em]">
              <span style={enterDelay(260)}>
                <em className="italic">de</em> Paula
              </span>
            </span>
          </h1>

          <div className="row-start-2 px-[var(--gutter)] pb-14 pt-8 lg:px-0 lg:pb-0 lg:pt-10">
            <p
              className="hero-fade eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-ink"
              style={enterDelay(450)}
            >
              {site.roles.map((role, i) => (
                <span key={role} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden className="size-1 rounded-full bg-teal" />}
                  {role}
                </span>
              ))}
            </p>
            <p
              className="hero-fade mt-5 max-w-[36ch] text-pretty text-[1.0625rem] leading-relaxed text-muted lg:text-lg"
              style={enterDelay(550)}
            >
              {site.positioning}
            </p>
            <div
              className="hero-fade mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap xs:items-center xs:gap-x-8"
              style={enterDelay(650)}
            >
              <ButtonLink href="#contato" variant="ink">
                Solicitar orçamento
              </ButtonLink>
              <a
                href="#trabalhos"
                className="group inline-flex min-h-12 items-center justify-center gap-3 text-[0.8125rem] font-medium tracking-[0.04em] text-ink xs:justify-start"
              >
                <span className="link-underline">Conheça meu trabalho</span>
                <ArrowRight className="text-base transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
