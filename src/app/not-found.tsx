import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[80svh] flex-col justify-center pb-20 pt-[calc(var(--header-h)+4rem)]">
      <p className="eyebrow text-teal">Erro 404</p>
      <h1 className="mt-6 max-w-[14ch] font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95]">
        Esta página <em className="italic">saiu de cena.</em>
      </h1>
      <p className="mt-6 max-w-[40ch] text-[1.0625rem] leading-relaxed text-muted">
        O endereço pode ter mudado. Volte ao início para conhecer o trabalho de Carol de Paula.
      </p>
      <div className="mt-10">
        <ButtonLink href="/" icon={<ArrowRight />}>
          Voltar ao início
        </ButtonLink>
      </div>
    </section>
  );
}
