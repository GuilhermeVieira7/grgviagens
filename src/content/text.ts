export type ServiceKey =
  | "plane"
  | "bed"
  | "suitcase"
  | "pin"
  | "ticket"
  | "car"
  | "passport"
  | "checkin";

/**
 * Serviços confirmados para a GRG: passagens, hospedagem, pacotes, passeios,
 * ingressos, locação de veículos, assessoria na emissão de passaporte e check-in.
 * "Seguro viagem" e "Cruzeiros" NÃO foram publicados por falta de confirmação:
 * inclua aqui quando a GRG confirmar que oferece.
 */
export const services: { key: ServiceKey; title: string; text: string }[] = [
  {
    key: "plane",
    title: "Passagens aéreas",
    text: "Opções de voos de acordo com o seu roteiro, com orientação em cada escolha.",
  },
  {
    key: "bed",
    title: "Hospedagem",
    text: "Hotéis e resorts selecionados conforme suas preferências e o seu orçamento.",
  },
  {
    key: "suitcase",
    title: "Pacotes personalizados",
    text: "Planejamento de viagens de acordo com seu destino, período e estilo.",
  },
  {
    key: "pin",
    title: "Passeios",
    text: "Roteiros e passeios para aproveitar o destino. Condições sob consulta.",
  },
  {
    key: "ticket",
    title: "Ingressos",
    text: "Ingressos para atrações e experiências, solicitados junto com a sua viagem.",
  },
  {
    key: "car",
    title: "Aluguel de veículos",
    text: "Opções de mobilidade conforme o destino da sua viagem.",
  },
  {
    key: "passport",
    title: "Assessoria para passaporte",
    text: "Orientação no processo de emissão. A emissão é responsabilidade do órgão competente.",
  },
  {
    key: "checkin",
    title: "Check-in assistido",
    text: "A GRG realiza o check-in dos clientes e orienta sobre o embarque, conforme as condições do voo.",
  },
];

/** Faixa logo após a abertura. */
export const benefits = [
  {
    title: "Cotação personalizada",
    text: "Cada pedido é montado conforme o seu roteiro, as datas e o orçamento.",
  },
  {
    title: "Atendimento próximo",
    text: "Você conversa direto com quem está cuidando da sua viagem.",
  },
  {
    title: "Check-in assistido",
    text: "A GRG faz o check-in e orienta sobre o embarque, conforme as condições do voo.",
  },
];

/** O trabalho da agência (seção "Você escolhe o destino…"). */
export const agencyWork = [
  {
    title: "Entender a sua viagem",
    text: "Origem, datas, quem vai e o que você espera do destino: começamos pelas suas preferências.",
  },
  {
    title: "Pesquisar voos e hospedagem",
    text: "Consultamos as opções disponíveis para o seu roteiro, em vez de você comparar sozinho.",
  },
  {
    title: "Apresentar valores e condições",
    text: "Você recebe as alternativas encontradas, com valores e condições, para decidir com clareza.",
  },
  {
    title: "Orientar reservas e embarque",
    text: "Depois da confirmação, a GRG orienta sobre documentos, reservas e o dia do embarque.",
  },
];

/** Serviços agrupados na página inicial (cada um aponta para a página existente). */
export const serviceGroups: {
  title: string;
  text: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: "Passagens e hospedagens",
    text: "Voos nacionais e internacionais e hotéis conforme o roteiro. Podem ser cotados juntos ou separados.",
    links: [
      { label: "Passagens aéreas", href: "/servicos/passagens-aereas" },
      { label: "Hospedagem", href: "/servicos/hospedagem" },
    ],
  },
  {
    title: "Pacotes personalizados",
    text: "Voo, hospedagem e o que mais fizer sentido, montados para o seu período e estilo de viagem.",
    links: [{ label: "Pacotes de viagem", href: "/servicos/pacotes-de-viagem" }],
  },
  {
    title: "Passeios e ingressos",
    text: "Passeios e ingressos para atrações, solicitados junto com a viagem ou à parte.",
    links: [{ label: "Passeios e ingressos", href: "/servicos/passeios-e-ingressos" }],
  },
  {
    title: "Locação de veículos",
    text: "Opções de carro no destino para quem prefere se deslocar por conta própria.",
    links: [{ label: "Locação de veículos", href: "/servicos/aluguel-de-veiculos" }],
  },
  {
    title: "Assessoria para passaporte",
    text: "Orientação sobre as etapas e os documentos do pedido. A emissão do passaporte é feita pelo órgão oficial.",
    links: [{ label: "Assessoria para passaporte", href: "/servicos/assessoria-para-passaporte" }],
  },
  {
    title: "Check-in assistido",
    text: "A GRG realiza o check-in dos clientes e orienta sobre o embarque, conforme as condições do voo.",
    links: [{ label: "Check-in assistido", href: "/servicos/check-in-assistido" }],
  },
];

export const steps = [
  {
    title: "Conte seus planos.",
    text: "Informe origem, destino e período desejado.",
  },
  {
    title: "Receba uma proposta.",
    text: "Compare as opções, os valores e as condições apresentados pela GRG.",
  },
  {
    title: "Confirme sua viagem.",
    text: "Após a confirmação da reserva, receba os documentos e as orientações para embarcar.",
  },
];

export const faq = [
  {
    q: "Posso comprar somente passagem ou hospedagem?",
    a: "Sim. Passagens aéreas e hospedagem podem ser cotadas separadamente ou juntas, assim como passeios, ingressos e locação de veículos.",
  },
  {
    q: "Preciso ter destino e datas definidos?",
    a: "Não. No formulário você pode marcar “Ainda não escolhi o destino” ou “Ainda não defini as datas” e contar o período aproximado e o tipo de viagem que imagina. A equipe ajuda a definir.",
  },
  {
    q: "Como recebo a cotação?",
    a: "O pedido segue pelo WhatsApp oficial da GRG. Você revisa a mensagem antes de enviar e, pela conversa, a equipe apresenta as opções encontradas com valores e condições.",
  },
  {
    q: "Como consulto as formas de pagamento?",
    a: "As formas de pagamento dependem da viagem e das condições disponíveis no momento. Elas são informadas pelo atendimento, junto com a proposta.",
  },
  {
    q: "A GRG realiza meu check-in?",
    a: "Sim. A GRG realiza o check-in dos clientes e orienta sobre o embarque, conforme as condições do voo.",
  },
  {
    q: "Como são informadas as condições de alteração e cancelamento?",
    a: "Elas variam conforme a tarifa, a companhia aérea, o hotel e os demais fornecedores de cada viagem. Por isso fazem parte das informações da proposta: confira com o atendimento antes de confirmar a reserva.",
  },
  {
    q: "A GRG emite passaporte?",
    a: "Não. A agência oferece assessoria no processo; a emissão do documento é responsabilidade do órgão oficial competente.",
  },
];
