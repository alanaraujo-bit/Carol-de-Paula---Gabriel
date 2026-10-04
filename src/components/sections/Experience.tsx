import { experience } from "@/content/profile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ExperienceTimeline } from "./ExperienceTimeline";

export function Experience() {
  return (
    <section
      id="experiencia"
      aria-labelledby="experiencia-titulo"
      data-surface="ink"
      className="bg-ink text-on-ink"
    >
      <div className="container-page py-24 lg:py-40">
        <ExperienceTimeline entries={experience}>
          <SectionLabel index="03" tone="ink" className="mb-8">
            Trajetória
          </SectionLabel>
          <h2
            id="experiencia-titulo"
            data-reveal
            className="font-display text-[clamp(2.75rem,5.5vw,5rem)] leading-[0.98] text-balance"
          >
            Da reportagem <em className="italic text-teal-light">ao cerimonial.</em>
          </h2>
          <p data-reveal className="mt-6 max-w-[40ch] text-[1.0625rem] leading-relaxed text-on-ink-muted text-pretty">
            Uma trajetória construída diante das câmeras e do público: da televisão regional à coordenação de
            cerimonial na Prefeitura de Canaã dos Carajás.
          </p>
        </ExperienceTimeline>
      </div>
    </section>
  );
}
