import { site } from "@/content/site";
import { experience, highlights } from "@/content/profile";

/** schema.org graph describing the site, the profile page and Carol. */
export function buildStructuredData() {
  const personId = `${site.url}/#carol-de-paula`;
  const current = experience.find((entry) => entry.current);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "pt-BR",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profile`,
        url: site.url,
        name: site.seo.title,
        description: site.seo.description,
        inLanguage: "pt-BR",
        isPartOf: { "@id": `${site.url}/#website` },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        alternateName: site.legalName,
        url: site.url,
        image: `${site.url}/opengraph-image`,
        jobTitle: site.roles.join(" e "),
        description: site.seo.description,
        email: `mailto:${site.contact.email}`,
        telephone: site.contact.phoneE164,
        sameAs: [site.contact.instagram.url],
        address: {
          "@type": "PostalAddress",
          addressLocality: site.location.city,
          addressRegion: site.location.regionCode,
          addressCountry: site.location.country,
        },
        areaServed: {
          "@type": "City",
          name: `${site.location.city}, ${site.location.region}`,
        },
        ...(current && {
          worksFor: {
            "@type": "GovernmentOrganization",
            name: current.organization,
          },
        }),
        hasOccupation: [
          { "@type": "Occupation", name: "Apresentadora" },
          { "@type": "Occupation", name: "Mestre de Cerimônias" },
          { "@type": "Occupation", name: "Cerimonialista" },
        ],
        knowsAbout: ["Apresentação de eventos", "Cerimonial", "Locução", "Telejornalismo", "Comunicação"],
        knowsLanguage: "pt-BR",
        subjectOf: highlights.map((event) => ({
          "@type": "Event",
          name: event.shortName ? `${event.name} (${event.shortName})` : event.name,
          ...(event.year && { startDate: String(event.year) }),
          location: { "@type": "Place", name: event.place },
        })),
      },
    ],
  };
}
