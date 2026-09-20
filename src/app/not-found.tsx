import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { destinations } from "@/content/places";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="conteudo" className="bg-paper pt-[calc(var(--header-h)+3rem)]">
      <div className="wrap pb-24 lg:pb-32">
        <p className="eyebrow text-royal">Erro 404</p>
        <h1 className="display mt-4 max-w-[18ch] text-[clamp(2.25rem,1rem+4.6vw,4.5rem)] text-abyss">
          Essa página tirou férias.
        </h1>
        <p className="lead mt-6 max-w-[36rem] text-ink/90">
          Não encontramos o endereço que você procurou. Volte ao início, escolha um destino ou conte para a GRG a viagem
          que você quer fazer.
        </p>
        <div className="mt-8 cta-row flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-royal">
            Voltar ao início <Arrow />
          </Link>
          <Link href="/#planejador" className="btn btn-outline-dark">
            Planejar minha viagem
          </Link>
        </div>
        <ul className="mt-12 flex flex-wrap gap-2">
          {destinations.map((d) => (
            <li key={d.slug}>
              <Link
                href={`/destinos/${d.slug}`}
                className="inline-flex min-h-11 items-center rounded-full border border-mist bg-white px-4 text-sm font-bold text-abyss hover:border-royal"
              >
                {d.city}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
