import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { abs } from "@/lib/seo";
import { guides } from "@/content/guides";

export const metadata: Metadata = {
  title: "Guias de viagem: dicas para planejar sua viagem",
  description:
    "Guias da GRG Viagens: como viajar em família, escolher hospedagem, comparar passagens e pacotes, e o que levar na primeira viagem de avião.",
  alternates: { canonical: "/dicas" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "GRG Viagens",
    url: abs("/dicas"),
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "GRG Viagens: agência de viagens" }],
  },
};

export default function GuidesIndex() {
  return (
    <main id="conteudo" className="bg-white pt-[calc(var(--header-h)+1.5rem)]">
      <div className="wrap pb-20 lg:pb-28">
        <Breadcrumbs items={[{ name: "Guias de viagem", path: "/dicas" }]} />
        <p className="eyebrow mt-6 text-royal">Guias de viagem</p>
        <h1 className="display mt-4 max-w-[20ch] text-[clamp(2.25rem,1rem+4.6vw,4.5rem)] text-abyss">
          Antes de fazer as malas.
        </h1>
        <p className="lead mt-6 max-w-[42rem] text-ink/90">
          Orientações gerais e práticas para planejar sua viagem com mais tranquilidade: hospedagem, passagens, pacotes,
          viagens em família e o que levar.
        </p>

        <ul className="mt-12 grid gap-5 md:grid-cols-2">
          {guides.map((g) => (
            <li key={g.slug} className="flex">
              <Link
                href={`/dicas/${g.slug}`}
                className="flex w-full flex-col rounded-2xl border border-mist bg-paper p-7 transition-colors hover:border-royal"
              >
                <h2 className="display text-[clamp(1.5rem,2.4vw,2rem)] text-abyss">{g.title}</h2>
                <p className="mt-3 flex-1 text-ink/85">{g.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-bold text-royal">
                  Ler o guia <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
