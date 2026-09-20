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

export const steps = [
  {
    title: "Conte seus planos.",
    text: "Informe o destino, as datas e como você gostaria de viajar.",
  },
  {
    title: "Pesquisamos as possibilidades.",
    text: "Nossa equipe consulta as opções disponíveis conforme suas preferências.",
  },
  {
    title: "Receba sua cotação.",
    text: "Apresentamos as alternativas, os valores e as condições da viagem.",
  },
  {
    title: "Prepare-se para embarcar.",
    text: "Após a confirmação da reserva, você recebe as informações e orientações necessárias para sua viagem.",
  },
];

export const differentials = [
  {
    title: "Cotação personalizada",
    text: "Cada pedido é analisado pela equipe, de acordo com o seu roteiro.",
  },
  {
    title: "Atendimento próximo",
    text: "Você conversa direto com quem está planejando a sua viagem.",
  },
  {
    title: "Check-in pela GRG",
    text: "A agência realiza o check-in dos clientes e orienta sobre o embarque.",
  },
  {
    title: "Orientação em cada escolha",
    text: "Da hospedagem ao voo, ajudamos você a comparar e decidir.",
  },
];

export const faq = [
  {
    q: "Preciso saber o destino para pedir uma cotação?",
    a: "Não. Se você ainda não escolheu, é só marcar “Ainda não escolhi o destino” e contar o tipo de viagem e as suas preferências. A gente ajuda a encontrar o lugar.",
  },
  {
    q: "Vocês fazem o check-in?",
    a: "Sim. A GRG realiza o check-in dos clientes e orienta sobre o embarque, conforme as condições do voo.",
  },
  {
    q: "Posso solicitar apenas hospedagem ou passagem?",
    a: "Sim. Passagens e hospedagem fazem parte do atendimento da GRG e podem ser solicitadas separadamente.",
  },
  {
    q: "Como consulto valores e formas de pagamento?",
    a: "Pelo atendimento, conforme a viagem e as condições disponíveis. Conte seus planos no formulário e a GRG responde com as opções.",
  },
  {
    q: "O que a GRG Viagens oferece?",
    a: "A GRG é uma agência de viagens com atendimento próximo. Trabalha com passagens aéreas, hospedagem, pacotes personalizados, passeios, ingressos, aluguel de veículos, assessoria para passaporte e check-in assistido.",
  },
  {
    q: "Como funciona a cotação de pacotes de viagem?",
    a: "Você conta o destino, as datas e o seu estilo de viagem no planejador. A equipe pesquisa as possibilidades, apresenta as opções com valores e condições e, depois da confirmação, orienta você para o embarque.",
  },
  {
    q: "A GRG ajuda a planejar viagem em família, com crianças?",
    a: "Sim. No planejador você informa quantos adultos e crianças vão, com a idade de cada criança, e a equipe considera isso ao preparar a cotação.",
  },
  {
    q: "Vocês fazem reserva de hotel e pedem passeios e ingressos?",
    a: "Sim. Hospedagem, passeios e ingressos fazem parte do atendimento e podem ser pedidos junto com a viagem ou separadamente.",
  },
  {
    q: "A GRG faz aluguel de carro?",
    a: "Sim. O aluguel de veículos faz parte do atendimento e pode ser solicitado junto com passagens e hospedagem.",
  },
  {
    q: "A GRG emite passaporte?",
    a: "A agência oferece assessoria no processo de emissão. A emissão do documento é responsabilidade do órgão competente.",
  },
];
