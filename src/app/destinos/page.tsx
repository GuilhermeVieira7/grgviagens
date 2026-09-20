import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { abs } from "@/lib/seo";
import { destinations } from "@/content/places";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Destinos: Gramado, Maceió, Paris, Lisboa e mais",
  description:
    "Descubra destinos para a sua próxima viagem com a GRG Viagens: Gramado, Maceió, Cancún, Paris, Lisboa e Buenos Aires. Peça uma cotação personalizada.",
  alternates: { canonical: "/destinos" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "GRG Viagens",
    url: abs("/destinos"),
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "GRG Viagens: agência de viagens" }],
  },
};

export default function DestinationsIndex() {
  return (
    <main id="conteudo" className="bg-paper pt-[calc(var(--header-h)+1.5rem)]">
      <div className="wrap-wide pb-20 lg:pb-28">
        <Breadcrumbs items={[{ name: "Destinos", path: "/destinos" }]} />
        <p className="eyebrow mt-6 text-royal">Destinos</p>
        <h1 className="display mt-4 max-w-[20ch] text-[clamp(2.25rem,1rem+4.6vw,4.5rem)] text-abyss">
          O próximo destino pode mudar tudo.
        </h1>
        <p className="lead mt-6 max-w-[42rem] text-ink/90">
          De praias paradisíacas a cidades que atravessam séculos de história. Escolha um destino para conhecer o guia e
          pedir a sua cotação. Roteiros e condições sob consulta.
        </p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {destinations.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/destinos/${d.slug}`}
                className="dest group relative block aspect-[4/5] overflow-hidden rounded-[20px] bg-abyss text-white"
              >
                <Image
                  src={photos[d.photo].src}
                  alt={d.alt}
                  fill
                  loading="lazy"
                  quality={82}
                  sizes="(min-width:1900px) 540px, (min-width:1024px) 30vw, (min-width:640px) 48vw, 92vw"
                  className="dest-img object-cover"
                />
                <span className="dest-scrim absolute inset-0" aria-hidden="true" />
                <span className="absolute inset-x-0 bottom-0 p-6">
                  <span className="eyebrow text-white">{d.country}</span>
                  <span className="display mt-2 block text-4xl [text-shadow:0_2px_18px_rgb(4_27_69/0.55)]">{d.city}</span>
                  <span className="mt-2 block text-white [text-shadow:0_1px_12px_rgb(4_27_69/0.7)]">{d.description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
