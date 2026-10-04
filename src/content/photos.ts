/**
 * Photo library. Each image is imported once here so width, height and
 * blur placeholders are generated at build time, and so every crop keeps
 * an individually tuned focal point.
 */
import type { Photo } from "@/types/content";

import retrato from "@/assets/photos/retrato-carol-de-paula.jpg";
import bastidores from "@/assets/photos/bastidores-estudio.jpg";
import fenecan from "@/assets/photos/fenecan-2024.jpg";
import cidadeJunina from "@/assets/photos/canaa-cidade-junina-2023.jpg";
import festivalGastronomico from "@/assets/photos/festival-gastronomico.jpg";
import balancoGeral from "@/assets/photos/balanco-geral-canaa.jpg";
import ascom from "@/assets/photos/ascom-prefeitura-2025.jpg";
import gravacaoCampo from "@/assets/photos/gravacao-em-campo.jpg";
import reportagemObra from "@/assets/photos/reportagem-de-obra.jpg";
import coberturaExterna from "@/assets/photos/cobertura-externa.jpg";

export const photos = {
  retrato: {
    src: retrato,
    alt: "Retrato em preto e branco de Carol de Paula sorrindo, com microfone headset.",
    focus: "49% 30%",
  },
  bastidores: {
    src: bastidores,
    alt: "Carol de Paula sorrindo nos bastidores de um estúdio, sob a luz de um softbox.",
    focus: "50% 62%",
  },
  fenecan: {
    src: fenecan,
    alt: "Carol de Paula ao microfone, no púlpito da FENECAN 2024, Feira de Negócios de Canaã.",
    focus: "66% 34%",
  },
  cidadeJunina: {
    src: cidadeJunina,
    alt: "Carol de Paula com traje junino e microfone ao lado do painel do Canaã Cidade Junina 2023.",
    focus: "70% 40%",
  },
  festivalGastronomico: {
    src: festivalGastronomico,
    alt: "Carol de Paula com chapéu de cangaço ao lado de um chef no Festival Gastronômico de Canaã dos Carajás.",
    focus: "45% 35%",
  },
  balancoGeral: {
    src: balancoGeral,
    alt: "Carol de Paula apresentando no estúdio do Balanço Geral Canaã.",
    focus: "35% 40%",
  },
  ascom: {
    src: ascom,
    alt: "Carol de Paula apresentando um vídeo na redação da Assessoria de Comunicação da Prefeitura de Canaã dos Carajás.",
    focus: "66% 40%",
  },
  gravacaoCampo: {
    src: gravacaoCampo,
    alt: "Carol de Paula de capacete de segurança, de braços abertos, durante uma gravação em área externa.",
    focus: "50% 50%",
  },
  reportagemObra: {
    src: reportagemObra,
    alt: "Carol de Paula gravando uma reportagem externa ao lado de um guarda-corpo amarelo.",
    focus: "50% 30%",
  },
  coberturaExterna: {
    src: coberturaExterna,
    alt: "Carol de Paula conversando com um homem durante uma cobertura externa.",
    focus: "35% 40%",
  },
} satisfies Record<string, Photo>;
