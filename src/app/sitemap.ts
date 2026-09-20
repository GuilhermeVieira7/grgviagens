import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { destinations } from "@/content/places";
import { guides } from "@/content/guides";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    ...destinations.map((d) => ({ url: `${base}/destinos/${d.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...guides.map((g) => ({ url: `${base}/dicas/${g.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
