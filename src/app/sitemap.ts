import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { destinations } from "@/content/places";
import { guides } from "@/content/guides";
import { servicePages } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/servicos`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...servicePages.map((s) => ({ url: `${base}/servicos/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${base}/destinos`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...destinations.map((d) => ({ url: `${base}/destinos/${d.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${base}/viagens-nacionais`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/viagens-internacionais`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/dicas`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...guides.map((g) => ({ url: `${base}/dicas/${g.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
