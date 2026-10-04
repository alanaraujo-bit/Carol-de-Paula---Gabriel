import { services } from "@/content/profile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowRight } from "@/components/ui/Icons";
import { revealDelay } from "@/lib/style";

export function Services() {
  return (
    <section
      id="atuacao"
      aria-labelledby="atuacao-titulo"
      className="container-page grid grid-cols-1 gap-x-8 py-24 lg:grid-cols-12 lg:py-40"
    >
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+4rem)]">
          <SectionLabel index="04" className="mb-8">
            Atuação
          </SectionLabel>
          <h2
            id="atuacao-titulo"
            data-reveal
            className="font-display text-[clamp(2.75rem,5vw,4.5rem)] leading-[0.98] text-balance"
          >
            Como posso conduzir o seu evento
          </h2>
          <p data-reveal className="mt-6 max-w-[34ch] text-[1.0625rem] leading-relaxed text-muted text-pretty">
            Do protocolo de uma solenidade à energia de um grande evento ao vivo.
          </p>
          <a
            href="#contato"
            className="group mt-10 hidden min-h-11 items-center gap-3 text-[0.8125rem] font-medium tracking-[0.04em] lg:inline-flex"
          >
            <span className="link-underline">Solicitar orçamento</span>
            <ArrowRight className="text-base transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      <ol className="mt-14 border-b border-[var(--line)] lg:col-span-7 lg:col-start-6 lg:mt-0">
        {services.map((service, i) => (
          <li
            key={service.title}
            data-reveal
            style={revealDelay(i * 60)}
            className="group grid grid-cols-[2.75rem_1fr] gap-x-4 border-t border-[var(--line)] py-8 sm:grid-cols-[4rem_1fr] lg:py-10"
          >
            <span className="eyebrow pt-[0.6rem] tabular-nums text-muted transition-colors duration-300 group-hover:text-teal">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-x-8">
              <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.05] text-balance">
                {service.title}
              </h3>
              <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-muted text-pretty sm:mt-1.5">
                {service.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
