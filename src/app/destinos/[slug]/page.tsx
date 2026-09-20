import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/Arrow";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Planner } from "@/components/Planner";
import { siteConfig } from "@/config/site";
import { services } from "@/content/text";
import { destinationLabel, destinations, placeBySlug } from "@/content/places";
import { photos } from "@/content/photos";
import { abs, destinationLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = placeBySlug(slug);
  if (!d) return {};
  const title = `Viagem para ${d.city}: guia, dicas e cotação`;
  return {
    title,
    description: `Planeje sua viagem para ${d.city}, ${d.country}. ${d.description} Cotação de passagens, hotel e passeios com a GRG Viagens.`,
    keywords: [`viagem para ${d.city}`, `pacotes para ${d.city}`, `passagens para ${d.city}`, `hotéis em ${d.city}`, `turismo em ${d.city}`, `o que fazer em ${d.city}`, `${d.city} ${d.country}`, "agência de viagens"],
    alternates: { canonical: `/destinos/${d.slug}` },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      siteName: "GRG Viagens",
      url: abs(`/destinos/${d.slug}`),
      title: `${title} | GRG Viagens`,
      description: `Guia de viagem para ${d.city}, ${d.country}, com o que costuma atrair e cotação personalizada.`,
      images: [{ url: d.wide.src, width: d.wide.width, height: d.wide.height, alt: d.alt }],
    },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const d = placeBySlug(slug);
  if (!d) notFound();
  const credit = photos[d.photo].credit;
  const others = destinations.filter((o) => o.slug !== d.slug).slice(0, 3);

  return (
    <main id="conteudo">
      <article className="bg-paper pt-[calc(var(--header-h)+2rem)]">
        <div className="wrap-wide pb-14 lg:pb-20">
          <Breadcrumbs items={[{ name: "Destinos", path: "/destinos" }, { name: d.city, path: `/destinos/${d.slug}` }]} />

          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-7">
              <p className="eyebrow text-royal">{d.country}</p>
              <h1 className="display mt-5 text-[clamp(2.75rem,1.2rem+5.2vw,5.5rem)] text-abyss">{d.city}</h1>
            </div>
            <div className="lg:col-span-5">
              <p className="lead text-ink/90">{d.intro}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a href="#planejador" className="btn btn-royal" data-track="destino_cotar" data-track-destino={d.city}>
                  Quero cotar {d.city} <Arrow />
                </a>
                <a
                  href={siteConfig.whatsappContactUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-dark"
                  data-track="whatsapp_contato"
                  data-track-local={`destino_${d.slug}`}
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </div>

          <figure className="mt-10 lg:mt-14">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[24px] bg-mist sm:aspect-[2/1]">
              <Image
                src={d.wide.src}
                alt={d.alt}
                fill
                loading="eager"
                fetchPriority="high"
                quality={82}
                sizes="(min-width:1900px) 1500px, 92vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-sm text-ink/70">
              Foto:{" "}
              <a href={credit.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-royal">
                {credit.author}
              </a>
              ,{" "}
              <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-royal">
                {credit.license}
              </a>
              , via Wikimedia Commons.
            </figcaption>
          </figure>

          <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
            <section aria-labelledby="atrai" className="lg:col-span-7">
              <h2 id="atrai" className="h-section text-[clamp(1.875rem,3.6vw,3rem)] text-abyss">
                O que costuma atrair em {d.city}
              </h2>
              <ul className="mt-8 border-t-2 border-abyss">
                {d.highlights.map((h) => (
                  <li key={h} className="border-b border-mist py-5 text-lg text-ink/90">
                    {h}
                  </li>
                ))}
              </ul>
              {d.note && <p className="mt-6 rounded-xl bg-white px-5 py-4 text-[0.9375rem] text-ink/85">{d.note}</p>}
              <p className="mt-4 text-sm text-ink/70">
                Informações gerais e sem valores. Roteiros, datas, disponibilidade e condições são definidos no atendimento.
              </p>
            </section>

            <aside className="lg:col-span-5" aria-label="Sobre a viagem">
              <h2 className="display text-2xl text-abyss">Bom para</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {d.goodFor.map((g) => (
                  <li key={g} className="rounded-full border border-mist bg-white px-4 py-2 text-sm font-bold text-abyss">
                    {g}
                  </li>
                ))}
              </ul>

              <h2 className="display mt-10 text-2xl text-abyss">Como a GRG ajuda</h2>
              <ul className="mt-4 space-y-2 text-ink/90">
                {services.slice(0, 6).map((s) => (
                  <li key={s.key} className="flex gap-3">
                    <span className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-royal" aria-hidden="true" />
                    {s.title}
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <section aria-labelledby="outros" className="mt-16 lg:mt-24">
            <h2 id="outros" className="display text-[clamp(1.5rem,2.4vw,2rem)] text-abyss">
              Outros destinos para explorar
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/destinos/${o.slug}`}
                    className="dest group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-abyss text-white sm:aspect-[3/4]"
                  >
                    <Image
                      src={photos[o.photo].src}
                      alt=""
                      fill
                      loading="lazy"
                      quality={82}
                      sizes="(min-width:640px) 30vw, 92vw"
                      className="dest-img object-cover"
                    />
                    <span className="dest-scrim absolute inset-0" aria-hidden="true" />
                    <span className="absolute inset-x-0 bottom-0 p-5">
                      <span className="eyebrow text-white">{o.country}</span>
                      <span className="display mt-1 block text-3xl [text-shadow:0_2px_14px_rgb(4_27_69/0.6)]">{o.city}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>

      <Planner defaultDestination={destinationLabel(d)} />
      <JsonLd data={destinationLd({ name: `${d.city}, ${d.country}`, description: d.intro, path: `/destinos/${d.slug}`, image: d.wide.src, country: d.country })} />
    </main>
  );
}
