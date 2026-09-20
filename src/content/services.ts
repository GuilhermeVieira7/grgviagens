import type { ServiceKey } from "./text";

/**
 * Páginas de serviço (uma por serviço confirmado). Só descrevem o que a GRG
 * confirmou oferecer; nada de preços, prazos, descontos ou garantias.
 * Regras de companhias, locadoras, hotéis e órgãos públicos variam: o texto
 * sempre remete à consulta oficial.
 */
export type ServicePage = {
  slug: string;
  icon: ServiceKey;
  /** Nome curto (menus, cartões, migalhas). */
  name: string;
  /** Título da aba/Google (a marca é acrescentada automaticamente). */
  metaTitle: string;
  h1: string;
  description: string;
  intro: string;
  helps: string[];
  inform: string[];
  tips: string[];
  faq: { q: string; a: string }[];
  /** Guias relacionados (slugs de /dicas). */
  related?: string[];
  note?: string;
};

export const servicePages: ServicePage[] = [
  {
    slug: "passagens-aereas",
    icon: "plane",
    name: "Passagens aéreas",
    metaTitle: "Passagens aéreas: cotação personalizada",
    h1: "Passagens aéreas para o seu roteiro",
    description:
      "Peça a cotação de passagens aéreas nacionais e internacionais com a GRG Viagens. Informe origem, destino e datas e receba opções conforme o seu roteiro.",
    intro:
      "Se você quer viajar de avião, a GRG Viagens pesquisa as opções de voo conforme o seu roteiro e apresenta as alternativas para você comparar e escolher com tranquilidade. Valores e condições são informados no atendimento, de acordo com a viagem.",
    helps: [
      "Pesquisa de opções de voos nacionais e internacionais de acordo com o seu roteiro.",
      "Comparação de horários, datas e escalas, para você decidir com clareza.",
      "Orientação sobre o que conferir antes de fechar: bagagem, alterações e documentos.",
      "Check-in feito pela GRG para os clientes, com orientação sobre o embarque, conforme as condições do voo.",
    ],
    inform: [
      "Cidade ou aeroporto de saída e o destino desejado.",
      "Datas de ida e volta, ou o período aproximado se você ainda não definiu.",
      "Quantidade de adultos e de crianças, com a idade de cada criança.",
      "Se as suas datas são flexíveis: isso pode ampliar as opções.",
      "Preferências, como voo direto ou horários melhores para você.",
    ],
    tips: [
      "Compare mais de uma data e, quando possível, mais de um aeroporto de saída ou de chegada.",
      "Confira o que está incluído na tarifa, como bagagem e marcação de assento, porque isso varia por companhia.",
      "Verifique com antecedência os documentos exigidos pelo destino, principalmente em viagens internacionais.",
      "Informe o nome dos passageiros exatamente como consta no documento de viagem.",
    ],
    faq: [
      {
        q: "Como peço uma cotação de passagem aérea?",
        a: "Preencha o planejador de viagem com origem, destino, datas e passageiros. A mensagem sai pronta para o WhatsApp e a equipe da GRG responde com as opções.",
      },
      {
        q: "A GRG faz o check-in?",
        a: "Sim. A GRG realiza o check-in dos clientes e orienta sobre o embarque, conforme as condições do voo.",
      },
      {
        q: "Posso pedir só a passagem, sem hospedagem?",
        a: "Sim. Passagens e hospedagem podem ser solicitadas separadamente.",
      },
    ],
    related: ["passagens-aereas-como-comparar", "primeira-viagem-de-aviao"],
  },
  {
    slug: "hospedagem",
    icon: "bed",
    name: "Hospedagem",
    metaTitle: "Hotéis e hospedagem: cotação personalizada",
    h1: "Hotéis e hospedagem escolhidos com você",
    description:
      "Cotação de hotéis, resorts e outras hospedagens com a GRG Viagens. Conte o destino, as datas e o seu estilo de viagem e receba opções para comparar.",
    intro:
      "Escolher onde ficar muda a viagem inteira. A GRG apresenta opções de hospedagem conforme as suas preferências e o seu orçamento, para você comparar localização, o que está incluído e as condições de cada uma.",
    helps: [
      "Opções de hotéis e resorts conforme suas preferências e o seu orçamento.",
      "Ajuda para comparar localização, o que está incluído e regras de cancelamento.",
      "Hospedagem sozinha ou combinada com passagens e passeios.",
      "Atenção às viagens em família, considerando a idade das crianças.",
    ],
    inform: [
      "Destino e, se tiver, a região ou o bairro que você prefere.",
      "Datas de entrada e de saída, ou o período aproximado.",
      "Quantas pessoas vão e a idade das crianças.",
      "O estilo de hospedagem que você imagina: perto da praia, no centro, com café da manhã incluído.",
      "Orçamento aproximado, se quiser informar (é opcional).",
    ],
    tips: [
      "A diária mais baixa nem sempre é a mais vantajosa: some transporte e refeições ao comparar.",
      "Veja no mapa a distância até o que você quer visitar e como vai se locomover.",
      "Confira política de cancelamento, horários de entrada e saída e taxas cobradas no local.",
    ],
    faq: [
      {
        q: "Posso solicitar apenas a hospedagem?",
        a: "Sim. A hospedagem faz parte do atendimento da GRG e pode ser pedida separadamente das passagens.",
      },
      {
        q: "A GRG ajuda a comparar hotéis?",
        a: "Sim. A equipe apresenta opções conforme a sua solicitação e você compara com calma antes de decidir.",
      },
      {
        q: "Como sei se a região é boa para ficar?",
        a: "Depende do que você quer fazer na viagem. Veja o nosso guia sobre como escolher uma hospedagem bem localizada ou conte seus planos para a equipe.",
      },
    ],
    related: ["hospedagem-bem-localizada", "viajar-com-familia"],
  },
  {
    slug: "pacotes-de-viagem",
    icon: "suitcase",
    name: "Pacotes personalizados",
    metaTitle: "Pacotes de viagem personalizados",
    h1: "Pacotes de viagem personalizados",
    description:
      "Pacotes de viagem sob medida: destino, período e estilo definidos com você. Peça a cotação com a GRG Viagens pelo WhatsApp.",
    intro:
      "Em vez de um pacote pronto para todo mundo, a GRG monta o planejamento a partir do que você procura: destino, período e estilo de viagem. Você conta o que imagina e recebe uma cotação personalizada.",
    helps: [
      "Planejamento de viagens de acordo com seu destino, período e estilo.",
      "Combinação de passagens, hospedagem, passeios e ingressos, quando você quiser.",
      "Opções para diferentes perfis de viagem: casal, família, amigos.",
      "Cotação personalizada: valores e condições informados no atendimento.",
    ],
    inform: [
      "Para onde você quer ir, ou o tipo de viagem que procura se ainda não escolheu o destino.",
      "Período aproximado e quantos dias pretende ficar.",
      "Quantas pessoas vão, com a idade das crianças.",
      "O que não pode faltar: praia, passeios, gastronomia, descanso.",
      "Orçamento aproximado, se preferir informar.",
    ],
    tips: [
      "Compare pacotes pelo custo total e pelo que está incluído, não só pelo valor final.",
      "Confira as condições de cancelamento e de alteração antes de confirmar.",
      "Verifique os documentos exigidos pelo destino com antecedência.",
    ],
    faq: [
      {
        q: "O pacote tem preço fixo no site?",
        a: "Não. Como cada viagem é diferente, os valores e as condições são informados no atendimento, conforme o destino, o período e as preferências.",
      },
      {
        q: "Posso escolher o que entra no pacote?",
        a: "Sim. Você conta o que imagina e a equipe monta a cotação conforme a sua solicitação e a disponibilidade.",
      },
      {
        q: "Preciso saber o destino para pedir?",
        a: "Não. Você pode informar o tipo de viagem e as suas preferências que a equipe ajuda a encontrar o lugar.",
      },
    ],
    related: ["como-escolher-pacote-de-viagem", "viajar-com-familia"],
  },
  {
    slug: "passeios-e-ingressos",
    icon: "pin",
    name: "Passeios e ingressos",
    metaTitle: "Passeios e ingressos para o seu destino",
    h1: "Passeios e ingressos para aproveitar o destino",
    description:
      "Peça passeios e ingressos para atrações junto com a sua viagem. A GRG Viagens ajuda a montar o roteiro e informa as condições no atendimento.",
    intro:
      "Os melhores momentos de uma viagem costumam estar nos passeios. A GRG ajuda você a incluir roteiros, atrações e ingressos no planejamento, para chegar ao destino com tudo combinado.",
    helps: [
      "Roteiros e passeios para conhecer o destino. Condições sob consulta.",
      "Ingressos para atrações e experiências, solicitados junto com a sua viagem.",
      "Ajuda para encaixar os passeios no roteiro, sem correria.",
    ],
    inform: [
      "O destino e as datas da viagem.",
      "Quantas pessoas vão e a idade das crianças.",
      "O tipo de passeio que você prefere: natureza, cultura, gastronomia, aventura ou descanso.",
      "Atrações que você já sabe que quer visitar.",
    ],
    tips: [
      "Não lote o roteiro: deixe tempo livre entre um passeio e outro.",
      "Confira horários de funcionamento e exigências de cada atração, como idade mínima e vestimenta.",
      "Em viagens com crianças, considere o ritmo delas na hora de escolher os passeios.",
    ],
    faq: [
      {
        q: "Posso pedir passeios e ingressos junto com a passagem e a hospedagem?",
        a: "Sim. Você pode incluir passeios e ingressos no mesmo pedido de cotação.",
      },
      {
        q: "Os passeios têm preço no site?",
        a: "Não. As condições dependem do destino, da data e do número de pessoas e são informadas no atendimento.",
      },
    ],
    related: ["viajar-com-familia"],
  },
  {
    slug: "aluguel-de-veiculos",
    icon: "car",
    name: "Aluguel de veículos",
    metaTitle: "Aluguel de carros e veículos na viagem",
    h1: "Aluguel de veículos no seu destino",
    description:
      "Precisa de carro na viagem? Peça a cotação de aluguel de veículos junto com passagens e hospedagem pela GRG Viagens.",
    intro:
      "Alugar um veículo dá liberdade para conhecer o destino no seu ritmo. A GRG apresenta opções de mobilidade conforme o destino da sua viagem, para você decidir se compensa alugar ou usar o transporte local.",
    helps: [
      "Opções de mobilidade conforme o destino da sua viagem.",
      "Ajuda para decidir entre alugar um veículo e usar o transporte local.",
      "Solicitação junto com passagens e hospedagem, quando fizer sentido.",
    ],
    inform: [
      "Cidade e local de retirada e de devolução.",
      "Datas e horários.",
      "Quantas pessoas e quantas malas o veículo precisa comportar.",
      "O tipo de veículo que você prefere.",
    ],
    tips: [
      "As exigências para alugar, como habilitação, idade mínima e forma de pagamento, variam por locadora e por país. Confira antes.",
      "Em viagens ao exterior, verifique se a sua habilitação é aceita no destino.",
      "Compare o custo total, considerando combustível, estacionamento e taxas.",
    ],
    faq: [
      {
        q: "A GRG faz aluguel de carro?",
        a: "Sim. O aluguel de veículos faz parte do atendimento da GRG e pode ser solicitado junto com a viagem.",
      },
      {
        q: "Posso alugar sem comprar passagem pela GRG?",
        a: "Consulte a equipe: conte o que você precisa e ela informa como pode ajudar.",
      },
    ],
    related: ["hospedagem-bem-localizada"],
  },
  {
    slug: "assessoria-para-passaporte",
    icon: "passport",
    name: "Assessoria para passaporte",
    metaTitle: "Assessoria para emissão de passaporte",
    h1: "Assessoria para emissão de passaporte",
    description:
      "A GRG Viagens orienta você no processo de emissão do passaporte. A emissão do documento é responsabilidade do órgão competente.",
    intro:
      "Emitir o passaporte é um passo importante para quem vai viajar ao exterior. A GRG oferece assessoria no processo, orientando você nas etapas. A emissão do documento, os prazos e a aprovação são responsabilidade do órgão competente.",
    helps: [
      "Orientação sobre as etapas e os documentos do processo de emissão.",
      "Apoio para você chegar organizado ao atendimento oficial.",
      "Alinhamento do passaporte com o planejamento da viagem internacional.",
    ],
    inform: [
      "Se é a primeira emissão ou uma renovação.",
      "A data aproximada da viagem, para planejar com antecedência.",
      "Se o passaporte é para adulto ou para criança ou adolescente.",
    ],
    tips: [
      "Comece cedo: os prazos de agendamento e de emissão variam e não dependem da agência.",
      "Confira a validade do passaporte antes de comprar passagens internacionais: alguns países exigem validade mínima.",
      "Consulte sempre as regras oficiais, que podem mudar.",
    ],
    faq: [
      {
        q: "A GRG emite passaporte?",
        a: "Não. A agência oferece assessoria no processo. A emissão do passaporte é responsabilidade do órgão competente.",
      },
      {
        q: "A GRG garante a aprovação ou o prazo do passaporte?",
        a: "Não. A aprovação e os prazos dependem do órgão que emite o documento.",
      },
    ],
    related: ["primeira-viagem-de-aviao"],
    note: "No Brasil, o passaporte é emitido pela Polícia Federal. Consulte sempre as regras oficiais.",
  },
  {
    slug: "check-in-assistido",
    icon: "checkin",
    name: "Check-in assistido",
    metaTitle: "Check-in feito pela agência",
    h1: "Check-in feito pela GRG para você",
    description:
      "A GRG Viagens realiza o check-in dos clientes e orienta sobre o embarque, conforme as condições do voo. Viaje com mais tranquilidade.",
    intro:
      "Para quem voa pela primeira vez, ou simplesmente prefere não se preocupar, a GRG realiza o check-in dos clientes e orienta sobre o embarque, conforme as condições do voo.",
    helps: [
      "Check-in realizado pela GRG para os clientes.",
      "Orientação sobre o embarque, conforme as condições do voo.",
      "Apoio para você chegar ao aeroporto sabendo o que conferir.",
    ],
    inform: [
      "Os dados da reserva e dos passageiros, conforme combinado com o atendimento.",
      "Dúvidas sobre horário, portão e documentos.",
    ],
    tips: [
      "Confira no cartão de embarque o seu nome, o horário, o portão e o assento.",
      "Acompanhe os painéis do aeroporto e a comunicação da companhia: o portão pode mudar.",
      "Em viagens internacionais, confirme com antecedência os documentos exigidos pelo destino.",
    ],
    faq: [
      {
        q: "Vocês fazem o check-in?",
        a: "Sim. A GRG realiza o check-in dos clientes e orienta sobre o embarque, conforme as condições do voo.",
      },
      {
        q: "É a minha primeira viagem de avião. A GRG ajuda?",
        a: "Sim, a equipe orienta você. Veja também o nosso guia com o passo a passo da primeira viagem de avião.",
      },
    ],
    related: ["primeira-viagem-de-aviao", "durante-o-voo"],
  },
];

export const servicePageBySlug = (slug: string) => servicePages.find((s) => s.slug === slug);

/** Página de serviço correspondente a cada cartão da seção Serviços da home. */
export const servicePathByIcon: Record<ServiceKey, string> = {
  plane: "passagens-aereas",
  bed: "hospedagem",
  suitcase: "pacotes-de-viagem",
  pin: "passeios-e-ingressos",
  ticket: "passeios-e-ingressos",
  car: "aluguel-de-veiculos",
  passport: "assessoria-para-passaporte",
  checkin: "check-in-assistido",
};
