import type { Metadata } from "next";
import { RegionPage } from "@/components/RegionPage";
import { destinations } from "@/content/places";
import { abs } from "@/lib/seo";

const path = "/viagens-internacionais";

export const metadata: Metadata = {
  title: "Viagens internacionais: turismo no exterior",
  description:
    "Viagens internacionais e turismo no exterior: Cancún, Paris, Lisboa e Buenos Aires. Peça a cotação de passagens, hotéis e pacotes com a GRG Viagens.",
  keywords: ["viagens internacionais", "turismo internacional", "viajar para o exterior", "destinos internacionais", "pacotes internacionais", "primeira viagem internacional", "passagens internacionais"],
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "GRG Viagens",
    url: abs(path),
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "GRG Viagens: agência de viagens" }],
  },
};

export default function InternationalTrips() {
  return (
    <RegionPage
      path={path}
      crumb="Viagens internacionais"
      eyebrow="Turismo no exterior"
      h1="Viagens internacionais: o mundo à sua espera"
      intro="Viajar para o exterior é conhecer outras culturas, cidades e paisagens. A GRG Viagens ajuda você a planejar viagens internacionais: passagens aéreas, hotéis, passeios, ingressos, aluguel de veículos e assessoria para a emissão do passaporte. É a sua primeira viagem ao exterior? A equipe orienta você em cada etapa."
      places={destinations.filter((d) => d.region === "Exterior")}
      points={[
        { title: "Passaporte com antecedência", text: "Os prazos de agendamento e de emissão variam e dependem do órgão competente. A GRG oferece assessoria no processo." },
        { title: "Regras de entrada do destino", text: "Alguns países exigem visto ou autorização eletrônica, além de validade mínima do passaporte. Confira sempre nas fontes oficiais." },
        { title: "Passagens e hospedagem", text: "Compare voos, escalas e o que está incluído na tarifa. Em viagens internacionais, o tempo total e as conexões pesam na escolha." },
        { title: "Viaje com tranquilidade", text: "A GRG realiza o check-in dos clientes e orienta sobre o embarque, conforme as condições do voo." },
      ]}
      faq={[
        { q: "A GRG ajuda na primeira viagem internacional?", a: "Sim. A equipe orienta você no planejamento, na documentação e no embarque. Veja também o nosso guia da primeira viagem internacional." },
        { q: "A GRG emite passaporte?", a: "Não. A agência oferece assessoria no processo de emissão. A emissão do documento é responsabilidade do órgão competente." },
        { q: "Como peço uma cotação de pacote internacional?", a: "Preencha o planejador com destino, datas, passageiros e preferências. A mensagem sai pronta para o WhatsApp e a equipe responde com as opções, valores e condições." },
      ]}
    />
  );
}
