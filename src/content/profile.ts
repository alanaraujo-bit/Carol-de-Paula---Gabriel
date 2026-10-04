import type { ExperienceEntry, Fact, Highlight, Service } from "@/types/content";
import { photos } from "./photos";

export const about = {
  greeting: "Olá, eu sou",
  firstName: "Carol",
  lead: "Sou apaixonada por comunicação e atuo há mais de seis anos na área.",
  paragraphs: [
    "Comecei minha trajetória como repórter de TV. Hoje, integro a equipe da Assessoria de Comunicação da Prefeitura de Canaã dos Carajás, onde coordeno o cerimonial.",
    "Já apresentei grandes eventos da cidade, como o Canaã Cidade Junina e a Feira de Negócios de Canaã. Em paralelo, curso Jornalismo no Centro Universitário Internacional (Uninter).",
  ],
  photo: photos.bastidores,
  photoCaption: "Bastidores de gravação",
} as const;

export const facts: Fact[] = [
  { value: "6+", label: "anos em comunicação" },
  { value: "2019", label: "estreia na televisão", detail: "RedeTV Karajás" },
  { value: "3", label: "veículos de comunicação", detail: "RedeTV Karajás, Grupo Correio e Record TV Canaã" },
  { value: "Jornalismo", label: "graduação em curso", detail: "Uninter" },
];

/** Words used in the editorial strip between sections. */
export const disciplines = ["Televisão", "Eventos", "Cerimonial", "Jornalismo"] as const;

export const experience: ExperienceEntry[] = [
  {
    period: "2019",
    startYear: 2019,
    role: "Repórter e apresentadora",
    organization: "RedeTV Karajás",
    skills: ["Reportagem", "Apresentação"],
  },
  {
    period: "2021",
    startYear: 2021,
    role: "Repórter, apresentadora e locutora",
    organization: "Grupo Correio de Comunicação",
    skills: ["Reportagem", "Apresentação", "Locução"],
  },
  {
    period: "2022",
    startYear: 2022,
    role: "Apresentadora",
    organization: "Record TV Canaã",
    skills: ["Apresentação de estúdio"],
  },
  {
    period: "Atualmente",
    current: true,
    role: "Coordenadora de cerimonial",
    organization: "Prefeitura de Canaã dos Carajás",
    skills: ["Cerimonial", "Assessoria de Comunicação"],
  },
];

export const services: Service[] = [
  {
    title: "Mestre de cerimônias",
    description:
      "Condução de solenidades e cerimônias com ritmo, clareza e respeito ao roteiro e ao protocolo.",
  },
  {
    title: "Apresentação de eventos",
    description:
      "Festivais, feiras e grandes eventos ao vivo, conduzindo a programação e a conexão com o público.",
  },
  {
    title: "Eventos institucionais e de negócios",
    description:
      "Solenidades oficiais, cerimonial público, feiras e encontros empresariais.",
  },
  {
    title: "Apresentação para TV e vídeo",
    description:
      "Reportagem, apresentação de estúdio e conteúdo em vídeo para comunicação institucional.",
  },
  {
    title: "Locução",
    description:
      "Voz para locução, com experiência como locutora no Grupo Correio de Comunicação.",
  },
];

export const highlights: Highlight[] = [
  {
    slug: "canaa-cidade-junina",
    name: "Canaã Cidade Junina",
    year: 2023,
    role: "Apresentação",
    place: "Canaã dos Carajás, PA",
    summary:
      "À frente de um dos grandes eventos do calendário da cidade, conduzindo a programação ao vivo, diante do público.",
    photo: photos.cidadeJunina,
  },
  {
    slug: "fenecan",
    name: "Feira de Negócios de Canaã",
    shortName: "FENECAN",
    year: 2024,
    role: "Apresentação",
    place: "Canaã dos Carajás, PA",
    summary:
      "No púlpito da FENECAN, conduzindo a programação oficial da Feira de Negócios de Canaã dos Carajás.",
    photo: photos.fenecan,
  },
];
