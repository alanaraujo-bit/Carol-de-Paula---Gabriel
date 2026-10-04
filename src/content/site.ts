/**
 * Global site data: identity, contact channels and SEO defaults.
 * Everything that appears in more than one section lives here.
 */

const phoneDigits = "5591991042321";

export const site = {
  name: "Carol de Paula",
  legalName: "Carolina de Paula",
  /** Set NEXT_PUBLIC_SITE_URL in production (e.g. https://caroldepaula.com.br). */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://caroldepaula.com.br").replace(/\/$/, ""),
  locale: "pt_BR",
  roles: ["Apresentadora", "Mestre de Cerimônias"],
  tagline: "Apresentadora e Mestre de Cerimônias",
  positioning:
    "Da televisão aos grandes palcos: comunicação clara, presença segura e cuidado com cada momento da sua cerimônia.",
  location: {
    city: "Canaã dos Carajás",
    region: "Pará",
    regionCode: "PA",
    country: "BR",
  },
  contact: {
    phoneDisplay: "(91) 99104-2321",
    phoneE164: `+${phoneDigits}`,
    whatsappNumber: phoneDigits,
    whatsappGreeting:
      "Olá, Carol! Vi seu site e gostaria de solicitar um orçamento para um evento.",
    email: "carolinapaulaprofissional@gmail.com",
    instagram: {
      handle: "@caroldepaulac",
      url: "https://www.instagram.com/caroldepaulac/",
    },
  },
  seo: {
    title: "Carol de Paula — Apresentadora e Mestre de Cerimônias em Canaã dos Carajás",
    shortTitle: "Carol de Paula",
    description:
      "Carol de Paula é apresentadora e mestre de cerimônias em Canaã dos Carajás (PA). Experiência em televisão, cerimonial público e grandes eventos como o Canaã Cidade Junina e a Feira de Negócios de Canaã.",
  },
} as const;

export const navigation = [
  { label: "Sobre", href: "#sobre" },
  { label: "Experiência", href: "#experiencia" },
  { label: "Trabalhos", href: "#trabalhos" },
  { label: "Contato", href: "#contato" },
] as const;
