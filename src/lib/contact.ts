import { site } from "@/content/site";

const { contact } = site;

export function whatsappUrl(message: string = contact.whatsappGreeting) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function mailtoUrl(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${contact.email}${query ? `?${query}` : ""}`;
}

export const telUrl = `tel:${contact.phoneE164}`;

export type QuoteRequest = {
  name: string;
  eventType: string;
  date: string;
  city: string;
  details: string;
};

/** Turns the quote form into a short, readable message. */
export function formatQuoteMessage(request: QuoteRequest) {
  const lines = [`Olá, Carol! Meu nome é ${request.name.trim()}.`, "Gostaria de solicitar um orçamento."];
  const facts: string[] = [];
  if (request.eventType) facts.push(`Tipo de evento: ${request.eventType}`);
  if (request.date) facts.push(`Data: ${formatDate(request.date)}`);
  if (request.city.trim()) facts.push(`Local: ${request.city.trim()}`);
  if (facts.length) lines.push("", ...facts);
  if (request.details.trim()) lines.push("", request.details.trim());
  return lines.join("\n");
}

function formatDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  return year && month && day ? `${day}/${month}/${year}` : isoDate;
}
