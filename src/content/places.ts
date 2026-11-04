import type { PhotoKey } from "./photos";

/**
 * Todas as fotografias são reais, de lugares identificados, e vêm do Wikimedia
 * Commons com créditos (ver photos.ts e o rodapé). Nenhuma foto é repetida.
 * As fontes têm até 3200 px de largura; o Next serve a versão certa para cada tela.
 */

export type PlaceTag = "praia" | "cidade" | "serra";

export type Place = {
  slug: string;
  city: string;
  country: string;
  region: "Brasil" | "Exterior";
  tags: PlaceTag[];
  description: string;
  photo: PhotoKey;
  alt: string;
  position: string;
  /** Foto larga (2000 px) usada na página do destino; mesma foto e mesmo crédito do card. */
  wide: { src: string; width: number; height: number };
  intro: string;
  /** Referências gerais e bem conhecidas do lugar (sem preços, datas ou disponibilidade). */
  highlights: string[];
  goodFor: string[];
  note?: string;
};

export const destinations: Place[] = [
  {
    slug: "gramado",
    city: "Gramado",
    country: "Brasil",
    region: "Brasil",
    tags: ["serra"],
    description: "Serra Gaúcha, gastronomia e aconchego em cada esquina.",
    photo: "dest-gramado",
    alt: "Casa de telhado vermelho com uma escultura dourada e canteiros de flores, no centro de Gramado.",
    position: "50% 50%",
    wide: { src: "/images/fotos/wide/gramado.jpg", width: 2000, height: 1334 },
    intro:
      "Na Serra Gaúcha, Gramado reúne arquitetura de inspiração europeia, jardins bem cuidados e uma gastronomia que faz parte do passeio. É um destino de clima de serra, bom para passear a pé e desacelerar.",
    highlights: [
      "Lago Negro, cercado de pinheiros, com passeio de pedalinho.",
      "O centro da cidade e a Rua Coberta, para caminhar, fazer compras e comer bem.",
      "Gastronomia local: chocolates, queijos, fondue e cafés.",
      "Canela, cidade vizinha, com parques e cascatas.",
      "O Natal Luz, evento de fim de ano que a cidade realiza todos os anos.",
    ],
    goodFor: ["Casais", "Famílias", "Descanso", "Gastronomia"],
  },
  {
    slug: "maceio",
    city: "Maceió",
    country: "Brasil",
    region: "Brasil",
    tags: ["praia"],
    description: "Mar de cor turquesa, piscinas naturais e dias de descanso.",
    photo: "dest-maceio",
    alt: "Coqueiros inclinados sobre a praia de Pajuçara, com o mar claro e a orla ao fundo, em Maceió.",
    position: "50% 50%",
    wide: { src: "/images/fotos/wide/maceio.jpg", width: 2000, height: 1333 },
    intro:
      "Capital de Alagoas, Maceió é conhecida pelo mar de tons claros, pelas piscinas naturais e por uma orla urbana com quiosques, coqueiros e boa estrutura para passar o dia na praia.",
    highlights: [
      "Piscinas naturais de Pajuçara, que se visitam de jangada.",
      "Praias urbanas como Ponta Verde e Jatiúca.",
      "Praia do Francês e Barra de São Miguel, no litoral sul.",
      "Litoral norte de Alagoas, com destinos como Maragogi e São Miguel dos Milagres.",
      "Culinária alagoana, com frutos do mar e tapioca.",
    ],
    goodFor: ["Praia", "Famílias", "Casais", "Descanso"],
  },
  {
    slug: "cancun",
    city: "Cancún",
    country: "México",
    region: "Exterior",
    tags: ["praia"],
    description: "O azul do Caribe, areia clara e tempo para aproveitar o sol.",
    photo: "dest-cancun",
    alt: "Ondas turquesa quebrando em uma praia de areia clara, com hotéis ao fundo, em Cancún.",
    position: "50% 50%",
    wide: { src: "/images/fotos/wide/cancun.jpg", width: 2000, height: 1056 },
    intro:
      "No Caribe mexicano, Cancún tem praias de areia clara e mar azul-turquesa, além de servir de ponto de partida para conhecer a região da Riviera Maya e da Península de Yucatán.",
    highlights: [
      "A Zona Hotelera, faixa de praias e resorts à beira-mar.",
      "Isla Mujeres, ilha próxima, com praias calmas.",
      "Sítios arqueológicos maias da região, como Chichén Itzá e Tulum.",
      "Cenotes, poços naturais de água doce típicos de Yucatán.",
      "Gastronomia mexicana, dos tacos aos frutos do mar.",
    ],
    goodFor: ["Praia", "Casais", "Famílias", "Passeios culturais"],
    note: "Os documentos exigidos para entrar no México podem mudar. Confirme as regras oficiais antes de viajar.",
  },
  {
    slug: "paris",
    city: "Paris",
    country: "França",
    region: "Exterior",
    tags: ["cidade"],
    description: "Museus, cafés e a silhueta inconfundível da Torre Eiffel.",
    photo: "dest-paris",
    alt: "Torre Eiffel e as pontes sobre o rio Sena, vistas do alto, em Paris.",
    position: "50% 50%",
    wide: { src: "/images/fotos/wide/paris.jpg", width: 2000, height: 1250 },
    intro:
      "Paris combina alguns dos museus e monumentos mais conhecidos do mundo com bairros charmosos, passeios ao longo do Sena e uma cultura de cafés e padarias que vale ser vivida sem pressa.",
    highlights: [
      "A Torre Eiffel e os jardins do Champ de Mars.",
      "O Museu do Louvre e outros museus da cidade.",
      "Montmartre e a Basílica do Sacré-Cœur, com vista para a cidade.",
      "O Arco do Triunfo e a avenida Champs-Élysées.",
      "Passeios de barco e a pé ao longo do Sena.",
    ],
    goodFor: ["Casais", "Cultura", "Gastronomia", "Primeira viagem à Europa"],
    note: "Os documentos exigidos para entrar na França e no espaço Schengen podem mudar. Confirme as regras oficiais antes de viajar.",
  },
  {
    slug: "lisboa",
    city: "Lisboa",
    country: "Portugal",
    region: "Exterior",
    tags: ["cidade"],
    description: "Ladeiras, telhados alaranjados e miradouros sobre o rio Tejo.",
    photo: "dest-lisboa",
    alt: "Telhados alaranjados do bairro de Alfama e o rio Tejo ao fundo, em Lisboa.",
    position: "50% 50%",
    wide: { src: "/images/fotos/wide/lisboa.jpg", width: 2000, height: 1125 },
    intro:
      "Construída sobre colinas à beira do rio Tejo, Lisboa tem bairros históricos, miradouros, bondes amarelos e uma mesa farta. Por falar a mesma língua, é um destino europeu muito acolhedor para brasileiros.",
    highlights: [
      "Alfama e seus miradouros sobre os telhados e o rio Tejo.",
      "A Torre de Belém e o Mosteiro dos Jerónimos, em Belém.",
      "Os bondes históricos, como o elétrico 28.",
      "A Praça do Comércio e a região da Baixa.",
      "Sintra, cidade próxima, ideal para um dia de passeio.",
    ],
    goodFor: ["Cultura", "Gastronomia", "Casais", "Primeira viagem à Europa"],
    note: "Confirme as regras oficiais de entrada em Portugal antes de viajar.",
  },
  {
    slug: "buenos-aires",
    city: "Buenos Aires",
    country: "Argentina",
    region: "Exterior",
    tags: ["cidade"],
    description: "Tango, gastronomia e arquitetura em uma capital vibrante.",
    photo: "dest-buenos-aires",
    alt: "Praça de Maio e a Casa Rosada, vistas do alto com uma estátua em primeiro plano, em Buenos Aires.",
    position: "50% 50%",
    wide: { src: "/images/fotos/wide/buenos-aires.jpg", width: 2000, height: 1125 },
    intro:
      "Capital da Argentina, Buenos Aires é uma cidade de grandes avenidas, teatros, livrarias e uma vida noturna intensa. O tango, a carne e o café fazem parte da experiência.",
    highlights: [
      "A Praça de Maio e a Casa Rosada, no centro histórico.",
      "La Boca e a rua Caminito, com casas coloridas.",
      "O Teatro Colón, um dos teatros de ópera mais conhecidos do mundo.",
      "Recoleta e Palermo, bairros para passear e comer bem.",
      "Shows e aulas de tango.",
    ],
    goodFor: ["Cultura", "Gastronomia", "Casais", "Viagem internacional próxima"],
    note: "Confirme os documentos exigidos para entrar na Argentina antes de viajar.",
  },
];

export const placeBySlug = (slug: string) => destinations.find((d) => d.slug === slug);

/** Rótulo usado para preencher o planejador. */
export const destinationLabel = (p: Place) => `${p.city}, ${p.country}`;
export const destinationLabels = destinations.map(destinationLabel);

/** Rótulos usados na lista de créditos do rodapé. */
export const photoLabels: Record<PhotoKey, string> = {
  "hero-noronha": "Abertura: Praia do Leão, Fernando de Noronha",
  "dest-gramado": "Gramado (centro)",
  "dest-maceio": "Maceió (Pajuçara)",
  "dest-cancun": "Cancún",
  "dest-paris": "Paris (Torre Eiffel)",
  "dest-lisboa": "Lisboa (Alfama)",
  "dest-buenos-aires": "Buenos Aires (Praça de Maio)",
  "gal-maldivas": "Maldivas",
  "gal-santorini": "Santorini",
  "gal-rio": "Rio de Janeiro (Copacabana)",
  "gal-dubai": "Dubai (Marina)",
  "gal-lisboa": "Lisboa (Praça do Comércio)",
  "gal-paris": "Paris (vista noturna)",
  "gal-maceio": "Maceió (Ponta Verde)",
  "gal-gramado": "Gramado (Lago Negro)",
  "inspira-maldivas": "Maldivas (vista aérea)",
  "inspira-salvador": "Salvador (Pelourinho)",
  "inspira-iguacu": "Cataratas do Iguaçu",
  "inspira-roma": "Roma (Coliseu)",
  "inspira-machu-picchu": "Machu Picchu",
  "inspira-porto-de-galinhas": "Porto de Galinhas",
  "inspira-nova-york": "Nova York (Ponte do Brooklyn)",
  "inspira-lencois": "Lençóis Maranhenses",
};
