/**
 * Lista de lugares para os campos "de onde sai" e "para onde vai" do planejador.
 * São só nomes de cidades, estados e países (dados geográficos públicos, não
 * informações sobre a GRG) para ajudar quem está preenchendo a digitar mais rápido.
 * O campo continua aceitando texto livre: esta lista é uma sugestão, não uma trava.
 */

export type LocationGroup = "Capitais e grandes cidades" | "Outras cidades do Brasil" | "Internacional";

export type LocationOption = {
  label: string;
  group: LocationGroup;
};

// Estado (UF) + capital: as 27 unidades federativas do Brasil.
const capitals: [string, string][] = [
  ["Rio Branco", "AC"],
  ["Maceió", "AL"],
  ["Macapá", "AP"],
  ["Manaus", "AM"],
  ["Salvador", "BA"],
  ["Fortaleza", "CE"],
  ["Brasília", "DF"],
  ["Vitória", "ES"],
  ["Goiânia", "GO"],
  ["São Luís", "MA"],
  ["Cuiabá", "MT"],
  ["Campo Grande", "MS"],
  ["Belo Horizonte", "MG"],
  ["Belém", "PA"],
  ["João Pessoa", "PB"],
  ["Curitiba", "PR"],
  ["Recife", "PE"],
  ["Teresina", "PI"],
  ["Rio de Janeiro", "RJ"],
  ["Natal", "RN"],
  ["Porto Alegre", "RS"],
  ["Porto Velho", "RO"],
  ["Boa Vista", "RR"],
  ["Florianópolis", "SC"],
  ["São Paulo", "SP"],
  ["Aracaju", "SE"],
  ["Palmas", "TO"],
];

// Outras cidades brasileiras bem conhecidas (turismo, aeroportos ou grande porte).
const otherCities: [string, string][] = [
  ["Marabá", "PA"],
  ["Santarém", "PA"],
  ["Parauapebas", "PA"],
  ["Castanhal", "PA"],
  ["Altamira", "PA"],
  ["Imperatriz", "MA"],
  ["Redenção", "PA"],
  ["Gramado", "RS"],
  ["Canela", "RS"],
  ["Caxias do Sul", "RS"],
  ["Bento Gonçalves", "RS"],
  ["Foz do Iguaçu", "PR"],
  ["Londrina", "PR"],
  ["Maringá", "PR"],
  ["Balneário Camboriú", "SC"],
  ["Bombinhas", "SC"],
  ["Blumenau", "SC"],
  ["Joinville", "SC"],
  ["Campinas", "SP"],
  ["Santos", "SP"],
  ["São José dos Campos", "SP"],
  ["Ribeirão Preto", "SP"],
  ["Ilhabela", "SP"],
  ["Paraty", "RJ"],
  ["Búzios", "RJ"],
  ["Angra dos Reis", "RJ"],
  ["Petrópolis", "RJ"],
  ["Campos do Jordão", "SP"],
  ["Ouro Preto", "MG"],
  ["Tiradentes", "MG"],
  ["Uberlândia", "MG"],
  ["Juiz de Fora", "MG"],
  ["Porto Seguro", "BA"],
  ["Ilhéus", "BA"],
  ["Morro de São Paulo", "BA"],
  ["Chapada Diamantina", "BA"],
  ["Feira de Santana", "BA"],
  ["Aracati", "CE"],
  ["Jericoacoara", "CE"],
  ["Canoa Quebrada", "CE"],
  ["Juazeiro do Norte", "CE"],
  ["Pipa", "RN"],
  ["Gramame", "PB"],
  ["Campina Grande", "PB"],
  ["Porto de Galinhas", "PE"],
  ["Fernando de Noronha", "PE"],
  ["Caruaru", "PE"],
  ["Maragogi", "AL"],
  ["Barreirinhas", "MA"],
  ["Lençóis Maranhenses", "MA"],
  ["Alter do Chão", "PA"],
  ["Bonito", "MS"],
  ["Corumbá", "MS"],
  ["Dourados", "MS"],
  ["Pantanal", "MT"],
  ["Chapada dos Guimarães", "MT"],
  ["Caldas Novas", "GO"],
  ["Pirenópolis", "GO"],
  ["Chapada dos Veadeiros", "GO"],
  ["Jalapão", "TO"],
  ["Lençóis", "BA"],
  ["Uberaba", "MG"],
  ["Diamantina", "MG"],
  ["Monte Verde", "MG"],
  ["Vitória da Conquista", "BA"],
];

// Principais destinos internacionais (cidade + país).
const international: [string, string][] = [
  ["Buenos Aires", "Argentina"],
  ["Bariloche", "Argentina"],
  ["Santiago", "Chile"],
  ["Cidade do México", "México"],
  ["Cancún", "México"],
  ["Punta Cana", "República Dominicana"],
  ["Montevidéu", "Uruguai"],
  ["Bogotá", "Colômbia"],
  ["Cartagena", "Colômbia"],
  ["Lima", "Peru"],
  ["Cusco", "Peru"],
  ["Assunção", "Paraguai"],
  ["Nova York", "Estados Unidos"],
  ["Miami", "Estados Unidos"],
  ["Orlando", "Estados Unidos"],
  ["Los Angeles", "Estados Unidos"],
  ["Las Vegas", "Estados Unidos"],
  ["Toronto", "Canadá"],
  ["Cancún/Riviera Maya", "México"],
  ["Lisboa", "Portugal"],
  ["Porto", "Portugal"],
  ["Madri", "Espanha"],
  ["Barcelona", "Espanha"],
  ["Paris", "França"],
  ["Nice", "França"],
  ["Roma", "Itália"],
  ["Milão", "Itália"],
  ["Veneza", "Itália"],
  ["Florença", "Itália"],
  ["Londres", "Reino Unido"],
  ["Amsterdã", "Países Baixos"],
  ["Berlim", "Alemanha"],
  ["Munique", "Alemanha"],
  ["Zurique", "Suíça"],
  ["Genebra", "Suíça"],
  ["Viena", "Áustria"],
  ["Praga", "República Tcheca"],
  ["Atenas", "Grécia"],
  ["Santorini", "Grécia"],
  ["Istambul", "Turquia"],
  ["Dubai", "Emirados Árabes Unidos"],
  ["Doha", "Catar"],
  ["Tóquio", "Japão"],
  ["Quioto", "Japão"],
  ["Seul", "Coreia do Sul"],
  ["Bangkok", "Tailândia"],
  ["Bali", "Indonésia"],
  ["Singapura", "Singapura"],
  ["Sydney", "Austrália"],
  ["Cidade do Cabo", "África do Sul"],
  ["Marrakech", "Marrocos"],
  ["Cairo", "Egito"],
  ["Maldivas", "Maldivas"],
];

const capitalLabels: LocationOption[] = capitals.map(([city, uf]) => ({
  label: `${city}, ${uf}`,
  group: "Capitais e grandes cidades",
}));
const otherLabels: LocationOption[] = otherCities.map(([city, uf]) => ({
  label: `${city}, ${uf}`,
  group: "Outras cidades do Brasil",
}));
const internationalLabels: LocationOption[] = international.map(([city, country]) => ({
  label: `${city}, ${country}`,
  group: "Internacional",
}));

/** Lugares para o campo de origem: cidades do Brasil (de onde a viagem costuma sair). */
export const originOptions: LocationOption[] = [...capitalLabels, ...otherLabels];

/** Lugares para o campo de destino: Brasil inteiro + principais destinos internacionais. */
export const destinationOptions: LocationOption[] = [...capitalLabels, ...otherLabels, ...internationalLabels];
