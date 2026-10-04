/**
 * Portfolio entries shown in the "Trabalhos" gallery.
 *
 * To add a work: import a photo in `photos.ts` (or here), then append an
 * entry below. `event`, `year`, `description`, extra `photos` and `video`
 * are optional; the gallery and lightbox adapt to what is provided.
 *
 * Video example:
 *   video: { type: "youtube", id: "VIDEO_ID", title: "Abertura do evento" }
 */
import type { Work } from "@/types/content";
import { photos } from "./photos";

export const works: Work[] = [
  {
    slug: "festival-gastronomico",
    title: "Festival Gastronômico",
    event: "Festival Gastronômico de Canaã dos Carajás",
    category: "Eventos",
    description: "Apresentação no Festival Gastronômico de Canaã dos Carajás.",
    photos: [photos.festivalGastronomico],
  },
  {
    slug: "gravacao-em-campo",
    title: "Gravação em campo",
    category: "Reportagem",
    description: "Gravação externa, com equipamento de segurança, para conteúdo em vídeo.",
    photos: [photos.gravacaoCampo],
  },
  {
    slug: "reportagem-de-obra",
    title: "Reportagem de obra",
    category: "Reportagem",
    description: "Reportagem em vídeo sobre uma obra prestes a ser inaugurada.",
    photos: [photos.reportagemObra],
  },
  {
    slug: "balanco-geral-canaa",
    title: "Balanço Geral Canaã",
    event: "Record TV Canaã",
    category: "Televisão",
    description: "Apresentação no estúdio do Balanço Geral Canaã, na Record TV Canaã.",
    photos: [photos.balancoGeral],
  },
  {
    slug: "ascom-prefeitura",
    title: "Assessoria de Comunicação",
    event: "Prefeitura de Canaã dos Carajás",
    year: 2025,
    category: "Institucional",
    description: "Apresentação de conteúdo em vídeo para a Assessoria de Comunicação da Prefeitura.",
    photos: [photos.ascom],
  },
  {
    slug: "cobertura-externa",
    title: "Cobertura externa",
    category: "Reportagem",
    description: "Bastidores de uma cobertura em campo.",
    photos: [photos.coberturaExterna],
  },
];
