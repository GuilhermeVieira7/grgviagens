import { siteConfig } from "@/config/site";

/** URL absoluta a partir de um caminho do site. */
export const abs = (path = "/") => `${siteConfig.siteUrl}${path === "/" ? "" : path}`;

/** Data de publicação dos guias e páginas de conteúdo (ISO). */
export const CONTENT_DATE = "2026-09-20";

const agencyId = () => `${siteConfig.siteUrl}/#agencia`;

export function agencyLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": agencyId(),
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    logo: abs("/brand/logo-512.png"),
    image: abs("/images/og.jpg"),
    description:
      "Agência de viagens: passagens aéreas, hospedagem, pacotes, passeios, ingressos, aluguel de veículos, assessoria para passaporte e check-in assistido.",
    telephone: `+${siteConfig.whatsappNumber}`,
    sameAs: [siteConfig.instagramUrl],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: `+${siteConfig.whatsappNumber}`,
      availableLanguage: ["pt-BR"],
      url: siteConfig.whatsappContactUrl,
    },
    knowsAbout: ["passagens aéreas", "hospedagem", "pacotes de viagem", "passeios", "aluguel de veículos"],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.siteUrl}/#site`,
    url: siteConfig.siteUrl,
    name: siteConfig.name,
    inLanguage: "pt-BR",
    publisher: { "@id": agencyId() },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleLd(a: { title: string; description: string; path: string; image?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    inLanguage: "pt-BR",
    datePublished: CONTENT_DATE,
    dateModified: CONTENT_DATE,
    mainEntityOfPage: abs(a.path),
    image: abs(a.image ?? "/images/og.jpg"),
    author: { "@id": agencyId() },
    publisher: { "@id": agencyId() },
  };
}

export function serviceLd(s: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    url: abs(s.path),
    provider: { "@id": agencyId() },
    serviceType: s.name,
  };
}

export function destinationLd(d: { name: string; description: string; path: string; image: string; country: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: d.name,
    description: d.description,
    url: abs(d.path),
    image: abs(d.image),
    containedInPlace: { "@type": "Country", name: d.country },
    touristType: ["Famílias", "Casais"],
  };
}
