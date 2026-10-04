import { works } from "@/content/works";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Gallery } from "@/components/gallery/Gallery";

export function Works() {
  return (
    <section
      id="trabalhos"
      aria-labelledby="trabalhos-titulo"
      className="container-page py-24 lg:py-40"
    >
      <header className="mb-16 grid grid-cols-1 gap-x-8 lg:mb-28 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SectionLabel index="06" className="mb-8">
            Trabalhos
          </SectionLabel>
          <h2
            id="trabalhos-titulo"
            data-reveal
            className="font-display text-[clamp(2.75rem,5.5vw,5rem)] leading-[0.98] text-balance"
          >
            Diante das câmeras <em className="italic text-teal">e do público</em>
          </h2>
        </div>
        <div className="mt-6 flex items-end justify-between gap-6 lg:col-span-4 lg:col-start-9 lg:mt-0 lg:flex-col lg:items-start">
          <p data-reveal className="max-w-[36ch] text-[1.0625rem] leading-relaxed text-muted text-pretty">
            Registros de eventos, televisão e conteúdo institucional. Selecione uma imagem para ampliar.
          </p>
          <p className="eyebrow shrink-0 tabular-nums text-muted">
            {String(works.length).padStart(2, "0")} registros
          </p>
        </div>
      </header>

      <Gallery works={works} />
    </section>
  );
}
