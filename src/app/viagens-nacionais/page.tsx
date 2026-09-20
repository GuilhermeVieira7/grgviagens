import type { Metadata } from "next";
import { RegionPage } from "@/components/RegionPage";
import { destinations } from "@/content/places";
import { abs } from "@/lib/seo";

const path = "/viagens-nacionais";

export const metadata: Metadata = {
  title: "Viagens nacionais: turismo no Brasil com a GRG",
  description:
    "Viagens nacionais e turismo no Brasil: Gramado, Maceió e outros destinos. Peça a cotação de passagens, hotéis e pacotes com a GRG Viagens.",
  keywords: ["viagens nacionais", "turismo no Brasil", "turismo nacional", "destinos nacionais", "pacotes nacionais", "viajar pelo Brasil", "viagem no Brasil"],
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "GRG Viagens",
    url: abs(path),
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "GRG Viagens: agência de viagens" }],
  },
};

export default function NationalTrips() {
  return (
    <RegionPage
      path={path}
      crumb="Viagens nacionais"
      eyebrow="Turismo no Brasil"
      h1="Viagens nacionais: conheça o Brasil"
      intro="O turismo no Brasil reúne praias, serras, cidades históricas e uma gastronomia para cada região. Se você quer viajar sem passaporte e com deslocamentos mais curtos, uma viagem nacional pode ser o caminho. A GRG Viagens pesquisa passagens aéreas, hotéis, passeios e pacotes de viagem conforme o seu roteiro e prepara uma cotação personalizada."
      places={destinations.filter((d) => d.region === "Brasil")}
      points={[
        { title: "Escolha o estilo da viagem", text: "Praia, serra, cidade ou natureza: cada destino combina com um jeito de viajar. Conte o que você procura e a equipe ajuda a encontrar o lugar." },
        { title: "Considere a época", text: "O clima e o movimento variam ao longo do ano e nos feriados. Comparar datas e planejar com antecedência ajuda a escolher melhor." },
        { title: "Compare passagens e hospedagem", text: "Compare pelo custo total: passagem, hospedagem, transporte no destino e passeios. Informar que as datas são flexíveis pode ampliar as opções." },
        { title: "Viaje em família ou a dois", text: "Informe quantos adultos e crianças vão e a idade de cada criança para que a cotação considere o perfil da viagem." },
      ]}
      faq={[
        { q: "Preciso de passaporte para viajar pelo Brasil?", a: "Em viagens dentro do país, normalmente basta um documento oficial de identificação com foto aceito pela companhia. Confira as regras da sua companhia aérea antes de viajar." },
        { q: "A GRG faz pacotes para destinos nacionais?", a: "Sim. A GRG monta pacotes personalizados, com passagens, hospedagem, passeios e ingressos, conforme o destino, o período e o estilo de viagem que você procura." },
        { q: "Posso pedir só passagem ou só hospedagem?", a: "Sim. Passagens e hospedagem podem ser solicitadas separadamente ou combinadas em um pacote." },
      ]}
    />
  );
}
