import Image from "next/image";

import { about, facts } from "@/content/profile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { revealDelay } from "@/lib/style";

export function About() {
  const { photo } = about;

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-titulo"
      className="container-page grid grid-cols-1 gap-x-8 pb-24 pt-24 lg:grid-cols-12 lg:pb-40 lg:pt-44"
    >
      <header className="lg:col-span-6 lg:col-start-7 lg:row-start-1">
        <SectionLabel index="02" className="mb-8">
          Sobre
        </SectionLabel>
        <h2
          id="sobre-titulo"
          data-reveal
          className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.95]"
        >
          {about.greeting} <em className="italic text-teal">{about.firstName}</em>
        </h2>
      </header>

      <figure
        className="mt-12 lg:col-span-5 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0"
      >
        <div
          data-reveal="image"
          className="relative aspect-[4/5] overflow-hidden bg-paper-deep lg:aspect-[730/1120]"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
            style={{ objectPosition: photo.focus }}
          />
        </div>
        <figcaption className="eyebrow mt-4 flex items-center gap-3 text-muted">
          <span aria-hidden className="h-px w-6 bg-current opacity-50" />
          {about.photoCaption}
        </figcaption>
      </figure>

      <div className="mt-12 lg:col-span-5 lg:col-start-7 lg:row-start-2 lg:mt-14">
        <p
          data-reveal
          className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.12] text-ink text-balance"
        >
          {about.lead}
        </p>
        <div className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-muted lg:mt-10">
          {about.paragraphs.map((paragraph, i) => (
            <p key={i} data-reveal style={revealDelay(80 + i * 80)} className="max-w-[52ch] text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <dl className="mt-16 grid grid-cols-2 gap-x-6 lg:col-span-6 lg:col-start-7 lg:row-start-3 lg:mt-20 lg:self-end">
        {facts.map((fact, i) => (
          <div
            key={fact.label}
            data-reveal
            style={revealDelay(i * 70)}
            className="flex flex-col border-t border-[var(--line)] py-6 lg:py-7"
          >
            <dt className="order-2 mt-2 text-[0.875rem] leading-snug text-ink">
              {fact.label}
              {fact.detail && <span className="mt-0.5 block text-[0.8125rem] text-muted">{fact.detail}</span>}
            </dt>
            <dd className="order-1 font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-none text-teal">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
