import Link from "next/link";
import { guides } from "@/content/guides";
import { Accordion } from "./Accordion";
import { Arrow } from "./Arrow";

export function Tips() {
  return (
    <section id="dicas" aria-labelledby="dicas-title" className="section-y bg-white">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <p className="eyebrow text-royal">Guias de viagem</p>
          <h2 id="dicas-title" className="h-section mt-5 text-abyss">
            Antes de fazer as malas.
          </h2>
          <p className="mt-6 max-w-[24rem] text-ink/80">
            Orientações gerais para viajar com mais tranquilidade. Toque em um título para ler o resumo ou abra o guia completo.
          </p>
        </div>
        <div className="lg:col-span-8">
          <Accordion
            variant="tips"
            items={guides.map((g) => ({
              id: g.slug,
              title: g.title,
              content: (
                <div className="max-w-[40rem]">
                  <p className="text-lg font-semibold text-ink">{g.intro}</p>
                  <ul className="mt-5 space-y-3">
                    {g.quick.map((it) => (
                      <li key={it} className="relative pl-6 text-ink/90">
                        <span
                          className="absolute left-0 top-[0.75em] h-1.5 w-1.5 rounded-full bg-royal"
                          aria-hidden="true"
                        />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 rounded-lg bg-paper px-5 py-4 text-[0.9375rem] text-ink/85">{g.note}</p>
                  <Link
                    href={`/dicas/${g.slug}`}
                    className="btn btn-outline-dark mt-6"
                    data-track="guia_aberto"
                    data-track-local={g.slug}
                  >
                    Ler o guia completo <Arrow />
                  </Link>
                </div>
              ),
            }))}
          />
        </div>
      </div>
    </section>
  );
}
