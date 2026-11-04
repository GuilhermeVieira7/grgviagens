import type { PhotoKey } from "./photos";

/**
 * VITRINE DA PÁGINA INICIAL: fonte única das ofertas e destinos em destaque.
 *
 * Há dois tipos de item:
 *
 *  - "cotacao": destino em destaque SEM condições comerciais. Mostra "Solicitar
 *    cotação" e nenhum preço. É o que está publicado hoje, porque a GRG ainda não
 *    confirmou ofertas vigentes.
 *
 *  - "oferta": pacote com condições CONFIRMADAS pela GRG. Só cadastre com os dados
 *    passados pela agência (nunca reaproveite valores de artes antigas). Campos:
 *      origin       cidade de saída confirmada (ex.: "Marabá")
 *      period       mês ou período confirmado (ex.: "Julho de 2027")
 *      nights       quantidade de noites
 *      includes     serviços incluídos, como a GRG descreve
 *      pricePerPerson  preço por pessoa em reais, SOMENTE se confirmado
 *      priceNote    complemento do preço, se a GRG informar (ex.: "em quarto duplo")
 *      conditions   condições essenciais (ex.: "Sujeito à disponibilidade")
 *      validUntil   último dia de divulgação (yyyy-mm-dd). Depois dessa data a
 *                   oferta sai do site sozinha.
 *
 * Exemplo de oferta (copie, ajuste e coloque no início da lista):
 *
 *   {
 *     kind: "oferta",
 *     id: "maceio-julho-2027",
 *     destination: "Maceió",
 *     country: "Brasil",
 *     guide: "maceio",
 *     photo: "dest-maceio",
 *     alt: "…",
 *     origin: "Marabá",
 *     period: "Julho de 2027",
 *     nights: 5,
 *     includes: ["Passagem aérea", "Hospedagem com café da manhã", "Traslado"],
 *     pricePerPerson: 0, // valor confirmado pela GRG
 *     priceNote: "em quarto duplo",
 *     conditions: ["Valores sujeitos à disponibilidade no momento da reserva."],
 *     validUntil: "2027-03-31",
 *   },
 *
 * Mostre de 3 a 6 itens. A vitrine exibe no máximo 6.
 */

type Base = {
  /** Identificador estável (aparece na mensagem e no analytics, nunca dados pessoais). */
  id: string;
  destination: string;
  country: string;
  /** slug do guia em /destinos/<slug>, se existir */
  guide?: string;
  photo: PhotoKey;
  alt: string;
  position?: string;
  /** Uma frase curta sobre o destino. */
  blurb: string;
};

export type QuoteItem = Base & { kind: "cotacao" };

export type OfferItem = Base & {
  kind: "oferta";
  origin: string;
  period: string;
  nights: number;
  includes: string[];
  pricePerPerson?: number;
  priceNote?: string;
  conditions: string[];
  validUntil?: string;
};

export type ShowcaseItem = QuoteItem | OfferItem;

export const showcase: ShowcaseItem[] = [
  {
    kind: "cotacao",
    id: "maceio",
    destination: "Maceió",
    country: "Brasil",
    guide: "maceio",
    photo: "dest-maceio",
    alt: "Coqueiros inclinados sobre a praia de Pajuçara, com o mar claro e a orla ao fundo, em Maceió.",
    blurb: "Mar de cor turquesa, piscinas naturais e dias de descanso.",
  },
  {
    kind: "cotacao",
    id: "gramado",
    destination: "Gramado",
    country: "Brasil",
    guide: "gramado",
    photo: "dest-gramado",
    alt: "Casa de telhado vermelho com uma escultura dourada e canteiros de flores, no centro de Gramado.",
    blurb: "Serra Gaúcha, gastronomia e clima de serra para desacelerar.",
  },
  {
    kind: "cotacao",
    id: "cancun",
    destination: "Cancún",
    country: "México",
    guide: "cancun",
    photo: "dest-cancun",
    alt: "Ondas turquesa quebrando em uma praia de areia clara, com hotéis ao fundo, em Cancún.",
    blurb: "O azul do Caribe, areia clara e passeios pela Riviera Maya.",
  },
  {
    kind: "cotacao",
    id: "buenos-aires",
    destination: "Buenos Aires",
    country: "Argentina",
    guide: "buenos-aires",
    photo: "dest-buenos-aires",
    alt: "Praça de Maio e a Casa Rosada, vistas do alto, em Buenos Aires.",
    blurb: "Tango, boa mesa e arquitetura em uma capital vizinha.",
  },
  {
    kind: "cotacao",
    id: "lisboa",
    destination: "Lisboa",
    country: "Portugal",
    guide: "lisboa",
    photo: "dest-lisboa",
    alt: "Telhados alaranjados do bairro de Alfama e o rio Tejo ao fundo, em Lisboa.",
    blurb: "Miradouros sobre o Tejo e a Europa no nosso idioma.",
  },
  {
    kind: "cotacao",
    id: "paris",
    destination: "Paris",
    country: "França",
    guide: "paris",
    photo: "dest-paris",
    alt: "Torre Eiffel e as pontes sobre o rio Sena, vistas do alto, em Paris.",
    blurb: "Museus, cafés e passeios sem pressa às margens do Sena.",
  },
];

/** Itens publicados hoje: ofertas vencidas saem automaticamente. */
export function activeShowcase(today: string): ShowcaseItem[] {
  return showcase
    .filter((s) => s.kind !== "oferta" || !s.validUntil || !today || s.validUntil >= today)
    .slice(0, 6);
}

export const formatBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

/** Rótulo do destino no formulário (mesmo formato das opções do campo Destino). */
export const showcaseLabel = (s: ShowcaseItem) => `${s.destination}, ${s.country}`;

/** Contexto que acompanha a escolha até o formulário e a mensagem de WhatsApp. */
export type SelectionContext = {
  id: string;
  destination: string;
  /** Linhas descritivas do pacote (vazio para destinos sob cotação). */
  details: string[];
  /** Origem sugerida pela oferta, se houver. */
  origin?: string;
  isOffer: boolean;
};

export function selectionFrom(s: ShowcaseItem): SelectionContext {
  if (s.kind === "cotacao") {
    return { id: s.id, destination: showcaseLabel(s), details: [], isOffer: false };
  }
  const details = [
    `Saída: ${s.origin}`,
    `Período: ${s.period}`,
    `${s.nights} ${s.nights === 1 ? "noite" : "noites"}`,
    s.includes.length ? `Inclui: ${s.includes.join(", ")}` : "",
    s.pricePerPerson ? `Preço divulgado: ${formatBRL(s.pricePerPerson)} por pessoa${s.priceNote ? ` ${s.priceNote}` : ""}` : "",
  ].filter(Boolean);
  return { id: s.id, destination: showcaseLabel(s), details, origin: s.origin, isOffer: true };
}
