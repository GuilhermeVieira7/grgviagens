"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { destinations, destinationLabel, filters, type Place } from "@/content/places";
import { photos } from "@/content/photos";
import { track } from "@/lib/analytics";
import { ChooseButton } from "./ChooseButton";
import { Reveal } from "./Reveal";

/**
 * Vitrine: 3 colunas no desktop, 2 no tablet, 1 no celular (cards verticais e grandes).
 * Cidade, país, descrição e botão ficam sempre visíveis. No hover/foco: zoom lento na foto,
 * mais contraste e elevação do card. O título leva ao guia do destino.
 */
function Card({ d, index }: { d: Place; index: number }) {
  const p = photos[d.photo];
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <article className="dest group relative aspect-[4/5] overflow-hidden rounded-[20px] bg-abyss text-white shadow-[0_18px_40px_-24px_rgb(6_38_94/0.6)]">
        <Image
          src={p.src}
          alt={d.alt}
          fill
          loading="lazy"
          quality={82}
          sizes="(min-width:1900px) 540px, (min-width:1024px) 30vw, (min-width:640px) 48vw, 92vw"
          className="dest-img object-cover"
          style={{ objectPosition: d.position }}
        />
        <div className="dest-scrim absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
          <p className="eyebrow text-white [text-shadow:0_1px_10px_rgb(4_27_69/0.8)]">{d.country}</p>
          <h3 className="display mt-2 text-[clamp(2rem,3vw,2.75rem)] [text-shadow:0_2px_18px_rgb(4_27_69/0.55)]">
            <Link
              href={`/destinos/${d.slug}`}
              className="inline-flex min-h-11 items-center underline-offset-[6px] hover:underline"
              aria-label={`${d.city}: ver o guia do destino`}
            >
              {d.city}
            </Link>
          </h3>
          <p className="mt-3 max-w-[24rem] text-[1.0625rem] leading-snug text-white [text-shadow:0_1px_12px_rgb(4_27_69/0.7)]">
            {d.description}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <ChooseButton label={destinationLabel(d)} city={d.city} />
            <Link
              href={`/destinos/${d.slug}`}
              className="inline-flex min-h-11 items-center font-semibold text-white underline decoration-white/50 underline-offset-[5px] hover:text-lagoon hover:decoration-lagoon"
            >
              Ver guia
              <span className="sr-only"> de {d.city}</span>
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Destinations() {
  const [active, setActive] = useState("todos");
  const filter = filters.find((f) => f.id === active) ?? filters[0];
  const shown = destinations.filter(filter.match);

  return (
    <section id="destinos" aria-labelledby="destinos-title" className="section-y bg-paper">
      <div className="wrap-wide">
        <Reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-royal">Destinos</p>
            <h2 id="destinos-title" className="h-section mt-5 text-abyss">
              O próximo destino pode mudar tudo.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-1">
            <p className="lead text-ink/85">
              De praias paradisíacas a cidades que atravessam séculos de história, descubra lugares
              para viver novas experiências.
            </p>
            <p className="mt-3 text-sm text-ink/70">Roteiros e condições sob consulta.</p>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filtrar destinos">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              className="chip"
              aria-pressed={active === f.id}
              onClick={() => {
                setActive(f.id);
                track("filtro_destino", { filtro: f.id });
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          {shown.length === 1 ? "1 destino encontrado" : `${shown.length} destinos encontrados`}
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {shown.map((d, i) => (
            <Card key={d.slug} d={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
