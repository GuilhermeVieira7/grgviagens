import Link from "next/link";
import { serviceGroups } from "@/content/text";
import { Arrow } from "./Arrow";

/**
 * Serviços resumidos em uma lista editorial (linhas, não caixas). Cada linha leva
 * à página do serviço; a página /servicos reúne todos.
 */
export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="section-y bg-paper">
      <div className="wrap-wide grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <p className="eyebrow text-royal">Serviços</p>
            <h2 id="servicos-title" className="h-section mt-5 text-abyss">
              Do voo ao check-in.
            </h2>
            <p className="mt-6 max-w-[26rem] text-lg leading-relaxed text-ink/85">
              Peça um serviço só ou monte a viagem inteira com a GRG. Tudo começa pelo mesmo pedido de cotação.
            </p>
            <Link
              href="/servicos"
              className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-royal underline decoration-royal/40 underline-offset-[5px] hover:decoration-royal"
            >
              Ver todos os serviços <Arrow />
            </Link>
          </div>
        </div>

        <ul className="border-t-2 border-abyss lg:col-span-8">
          {serviceGroups.map((g) => (
            <li key={g.title} className="grid gap-2 border-b border-mist py-6 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-8 sm:py-7">
              <h3 className="text-xl font-bold leading-snug text-abyss">{g.title}</h3>
              <div>
                <p className="text-ink/85">{g.text}</p>
                <p className="mt-2 flex flex-wrap gap-x-5">
                  {g.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-royal underline decoration-royal/30 underline-offset-[5px] hover:decoration-royal"
                    >
                      {g.links.length > 1 ? l.label : "Saiba mais"}
                      <span className="sr-only">{g.links.length > 1 ? "" : ` sobre ${l.label.toLowerCase()}`}</span>
                    </Link>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
