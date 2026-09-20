import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/Arrow";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { abs } from "@/lib/seo";
import { ServiceIcon } from "@/components/ServiceIcon";
import { servicePages } from "@/content/services";

export const metadata: Metadata = {
  title: "Serviços de viagem: passagens, hotéis e pacotes",
  description:
    "Serviços da GRG Viagens: passagens aéreas, hospedagem, pacotes, passeios, ingressos, aluguel de veículos, assessoria para passaporte e check-in.",
  alternates: { canonical: "/servicos" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "GRG Viagens",
    url: abs("/servicos"),
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "GRG Viagens: agência de viagens" }],
  },
};

export default function ServicesIndex() {
  return (
    <main id="conteudo" className="bg-paper pt-[calc(var(--header-h)+1.5rem)]">
      <div className="wrap pb-20 lg:pb-28">
        <Breadcrumbs items={[{ name: "Serviços", path: "/servicos" }]} />
        <p className="eyebrow mt-6 text-royal">Serviços</p>
        <h1 className="display mt-4 max-w-[20ch] text-[clamp(2.25rem,1rem+4.6vw,4.5rem)] text-abyss">
          Tudo para a sua viagem em um só lugar.
        </h1>
        <p className="lead mt-6 max-w-[42rem] text-ink/90">
          Da escolha do destino aos detalhes do embarque, a GRG Viagens acompanha você em cada etapa: passagens aéreas,
          hospedagem, pacotes, passeios, ingressos, aluguel de veículos, assessoria para passaporte e check-in.
        </p>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {servicePages.map((s) => (
            <li key={s.slug} className="flex">
              <Link
                href={`/servicos/${s.slug}`}
                className="group flex w-full flex-col rounded-2xl border border-mist bg-white p-7 transition-colors hover:border-royal"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-abyss text-lagoon">
                  <ServiceIcon name={s.icon} className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-xl font-bold text-abyss">{s.name}</h2>
                <p className="mt-2 flex-1 text-ink/85">{s.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-bold text-royal">
                  Saiba mais <Arrow />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-[40rem] text-sm text-ink/70">
          Valores, prazos e condições são informados no atendimento, conforme a viagem e a disponibilidade.
        </p>
      </div>
    </main>
  );
}
