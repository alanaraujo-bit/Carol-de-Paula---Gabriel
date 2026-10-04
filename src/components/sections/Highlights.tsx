import Image from "next/image";

import { highlights } from "@/content/profile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/cn";
import { revealDelay } from "@/lib/style";

export function Highlights() {
  return (
    <section
      id="destaques"
      aria-labelledby="destaques-titulo"
      data-surface="ink"
      className="bg-ink text-on-ink"
    >
      <div className="container-page py-24 lg:py-40">
        <header className="grid grid-cols-1 gap-x-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="05" tone="ink" className="mb-8">
              Em destaque
            </SectionLabel>
            <h2
              id="destaques-titulo"
              data-reveal
              className="font-display text-[clamp(2.75rem,5.5vw,5rem)] leading-[0.98] text-balance"
            >
              Grandes palcos <em className="italic text-teal-light">da cidade</em>
            </h2>
          </div>
          <p
            data-reveal
            className="mt-6 max-w-[38ch] text-[1.0625rem] leading-relaxed text-on-ink-muted text-pretty lg:col-span-4 lg:col-start-9 lg:mt-0"
          >
            Eventos do calendário de Canaã dos Carajás que tive a alegria de apresentar, ao vivo, diante do
            público.
          </p>
        </header>

        <div className="mt-20 space-y-24 lg:mt-32 lg:space-y-40">
          {highlights.map((event, i) => {
            const reversed = i % 2 === 1;
            return (
              <article
                key={event.slug}
                aria-labelledby={`destaque-${event.slug}`}
                className="grid grid-cols-1 gap-x-8 lg:grid-cols-12 lg:items-center"
              >
                <figure
                  className={cn(
                    "lg:row-start-1",
                    reversed ? "lg:col-span-7 lg:col-start-6" : "lg:col-span-6 lg:col-start-1",
                  )}
                >
                  <div
                    data-reveal="image"
                    className={cn(
                      "relative overflow-hidden bg-ink-soft",
                      reversed ? "aspect-[4/3] lg:aspect-[7/6]" : "aspect-[645/413]",
                    )}
                  >
                    <Image
                      src={event.photo.src}
                      alt={event.photo.alt}
                      fill
                      placeholder="blur"
                      sizes={reversed ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 50vw, 100vw"}
                      className="object-cover"
                      style={{ objectPosition: event.photo.focus }}
                    />
                  </div>
                </figure>

                <div
                  className={cn(
                    "mt-10 lg:row-start-1 lg:mt-0",
                    reversed ? "lg:col-span-4 lg:col-start-1" : "lg:col-span-5 lg:col-start-8",
                  )}
                >
                  <p data-reveal className="eyebrow flex items-center gap-3 text-teal-light">
                    <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {event.shortName && (
                      <>
                        <span aria-hidden className="h-px w-6 bg-teal-light/50" />
                        <span>{event.shortName}</span>
                      </>
                    )}
                  </p>
                  <h3
                    id={`destaque-${event.slug}`}
                    data-reveal
                    style={revealDelay(60)}
                    className="mt-6 font-display text-[clamp(2.5rem,4.4vw,4rem)] leading-[0.98] text-balance"
                  >
                    {event.name}
                  </h3>
                  <p
                    data-reveal
                    style={revealDelay(120)}
                    className="mt-6 max-w-[40ch] text-[1.0625rem] leading-relaxed text-on-ink-muted text-pretty"
                  >
                    {event.summary}
                  </p>
                  <dl data-reveal style={revealDelay(180)} className="mt-10 flex flex-wrap gap-x-12 gap-y-5 border-t border-[var(--line-on-ink)] pt-6 text-[0.875rem]">
                    {event.year && <Meta label="Ano" value={String(event.year)} />}
                    <Meta label="Função" value={event.role} />
                    <Meta label="Local" value={event.place} />
                  </dl>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow text-on-ink-muted">{label}</dt>
      <dd className="mt-2 leading-snug text-on-ink">{value}</dd>
    </div>
  );
}
