"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { activeShowcase, formatBRL, selectionFrom, type ShowcaseItem } from "@/content/offers";
import { photos } from "@/content/photos";
import { track } from "@/lib/analytics";
import { todayISO } from "@/lib/whatsapp";
import { chooseSelection } from "@/lib/planner-bus";
import { Arrow } from "./Arrow";

const noopSubscribe = () => () => {};

function choose(item: ShowcaseItem) {
  track("oferta_selecionada", { oferta: item.id, tipo: item.kind });
  chooseSelection(selectionFrom(item));
}

function Card({ item }: { item: ShowcaseItem }) {
  const p = photos[item.photo];
  const offer = item.kind === "oferta" ? item : null;
  return (
    <article className="offer group flex h-full flex-col bg-white">
      <div className="offer-photo relative aspect-[4/3] overflow-hidden bg-mist">
        <Image
          src={p.src}
          alt={item.alt}
          fill
          loading="lazy"
          quality={75}
          sizes="(min-width:1640px) 480px, (min-width:1024px) 30vw, (min-width:640px) 46vw, 84vw"
          className="offer-img object-cover"
          style={{ objectPosition: item.position ?? "50% 50%" }}
        />
        {offer && (
          <span className="absolute left-0 top-4 bg-lagoon px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-abyss">
            Oferta
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="eyebrow text-royal">{item.country}</p>
        <h3 className="display mt-2 text-[clamp(1.75rem,2.2vw,2.25rem)] text-abyss">{item.destination}</h3>
        <p className="mt-2 text-ink/80">{item.blurb}</p>

        {offer && (
          <dl className="offer-facts mt-5">
            <div>
              <dt>Saída</dt>
              <dd>{offer.origin}</dd>
            </div>
            <div>
              <dt>Período</dt>
              <dd>{offer.period}</dd>
            </div>
            <div>
              <dt>Noites</dt>
              <dd>{offer.nights}</dd>
            </div>
            {offer.includes.length > 0 && (
              <div>
                <dt>Inclui</dt>
                <dd>{offer.includes.join(" · ")}</dd>
              </div>
            )}
          </dl>
        )}

        <div className="mt-auto pt-6">
          <div className="border-t border-mist pt-4">
            {offer?.pricePerPerson ? (
              <p className="text-abyss">
                <span className="block text-sm text-ink/70">Por pessoa</span>
                <span className="display text-[1.875rem]">{formatBRL(offer.pricePerPerson)}</span>
                {offer.priceNote && <span className="ml-2 text-sm text-ink/70">{offer.priceNote}</span>}
              </p>
            ) : (
              <p className="font-bold text-abyss">
                Valor sob cotação
                <span className="block text-sm font-normal text-ink/70">
                  {offer ? "Consulte o valor com o atendimento." : "Datas, noites e serviços você define no pedido."}
                </span>
              </p>
            )}
            {offer && offer.conditions.length > 0 && (
              <ul className="mt-3 space-y-1 text-sm text-ink/70">
                {offer.conditions.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
            <button type="button" className="btn btn-royal !min-h-12 !px-5" onClick={() => choose(item)}>
              {offer ? "Quero esse pacote" : "Solicitar cotação"}
              <span className="sr-only"> para {item.destination}</span>
              <Arrow />
            </button>
            {item.guide && (
              <Link
                href={`/destinos/${item.guide}`}
                data-track="guia_aberto"
                data-track-destino={item.destination}
                className="inline-flex min-h-11 items-center font-semibold text-royal underline decoration-royal/40 underline-offset-[5px] hover:decoration-royal"
              >
                Ver guia<span className="sr-only"> de {item.destination}</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * Vitrine principal: ofertas confirmadas (com preço e condições) e destinos sob cotação.
 * Os dados vêm de src/content/offers.ts. Celular: deslize lateral, sem rolagem automática.
 */
export function Offers() {
  // ofertas vencidas somem; no servidor (data vazia) nenhuma é filtrada
  const today = useSyncExternalStore(noopSubscribe, () => todayISO(), () => "");
  const items = activeShowcase(today);
  const hasOffers = items.some((i) => i.kind === "oferta");

  return (
    <section id="destinos" aria-labelledby="destinos-title" className="section-y bg-paper">
      <div className="wrap-wide">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-royal">{hasOffers ? "Ofertas e destinos" : "Destinos em destaque"}</p>
            <h2 id="destinos-title" className="h-section mt-5 text-abyss">
              Qual vai ser o seu próximo destino?
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-1">
            <p className="text-lg leading-relaxed text-ink/85">
              Saídas de Carajás, Marabá e Belém, e atendimento para outras origens. Escolha um destino e a GRG
              prepara uma cotação para as suas datas.
            </p>
          </div>
        </div>
      </div>

      <div className="offer-rail mt-10 lg:mt-14">
        <ul className="offer-track">
          {items.map((item) => (
            <li key={item.id}>
              <Card item={item} />
            </li>
          ))}
        </ul>
      </div>

      <div className="wrap-wide mt-8">
        <p className="text-ink/80">
          Não encontrou o seu destino?{" "}
          <a href="#planejador" data-track="vitrine_outro_destino" className="font-semibold text-royal underline underline-offset-4">
            Peça uma cotação para qualquer lugar
          </a>
          .
        </p>
      </div>
    </section>
  );
}
