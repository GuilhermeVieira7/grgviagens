import Image from "next/image";
import Link from "next/link";
import { Arrow } from "./Arrow";
import { Breadcrumbs } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
import { Planner } from "./Planner";
import { siteConfig } from "@/config/site";
import { photos } from "@/content/photos";
import type { Place } from "@/content/places";
import { faqLd } from "@/lib/seo";

type Props = {
  path: string;
  crumb: string;
  eyebrow: string;
  h1: string;
  intro: string;
  places: Place[];
  points: { title: string; text: string }[];
  faq: { q: string; a: string }[];
};

/** Página de intenção (ex.: viagens nacionais / internacionais): texto, destinos e perguntas. */
export function RegionPage({ path, crumb, eyebrow, h1, intro, places, points, faq }: Props) {
  return (
    <main id="conteudo">
      <article className="bg-paper pt-[calc(var(--header-h)+1.5rem)]">
        <div className="wrap-wide pb-16 lg:pb-24">
          <Breadcrumbs items={[{ name: crumb, path }]} />
          <p className="eyebrow mt-6 text-royal">{eyebrow}</p>
          <h1 className="display mt-4 max-w-[22ch] text-[clamp(2.25rem,1rem+4.6vw,4.5rem)] text-abyss">{h1}</h1>
          <p className="lead mt-6 max-w-[46rem] text-ink/90">{intro}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="#planejador" className="btn btn-royal" data-track="regiao_cotar" data-track-local={path}>
              Pedir minha cotação <Arrow />
            </a>
            <a
              href={siteConfig.whatsappContactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-dark"
              data-track="whatsapp_contato"
              data-track-local={`regiao_${path.slice(1)}`}
            >
              Falar no WhatsApp
            </a>
          </div>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {places.map((d) => (
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

          <section aria-labelledby="pontos" className="mt-16 lg:mt-24">
            <h2 id="pontos" className="display max-w-[24ch] text-[clamp(1.75rem,3vw,2.75rem)] text-abyss">
              O que considerar ao planejar
            </h2>
            <ul className="mt-8 grid gap-x-10 gap-y-8 border-t-2 border-abyss pt-8 md:grid-cols-2">
              {points.map((p) => (
                <li key={p.title}>
                  <h3 className="text-lg font-bold text-abyss">{p.title}</h3>
                  <p className="mt-2 text-ink/90">{p.text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink/70">
              Roteiros, valores e condições são informados no atendimento, conforme a viagem e a disponibilidade.
            </p>
          </section>

          <section aria-labelledby="duvidas-regiao" className="mt-16 max-w-[48rem]">
            <h2 id="duvidas-regiao" className="display text-[clamp(1.75rem,3vw,2.5rem)] text-abyss">
              Dúvidas frequentes
            </h2>
            <dl className="mt-6 border-t border-mist">
              {faq.map((f) => (
                <div key={f.q} className="border-b border-mist py-5">
                  <dt className="text-lg font-bold text-abyss">{f.q}</dt>
                  <dd className="mt-2 text-ink/90">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </article>
      <Planner />
      <JsonLd data={faqLd(faq)} />
    </main>
  );
}
