/**
 * Guias de viagem: orientações gerais e práticas. Regras específicas (bagagem,
 * líquidos, baterias, documentos, horários) variam por companhia, aeroporto e
 * destino e NÃO são afirmadas aqui: o texto sempre remete à fonte oficial.
 * Revisar com a GRG antes da publicação.
 */
export type GuideSection = { heading: string; paragraphs?: string[]; list?: string[] };

export type Guide = {
  slug: string;
  /** Aparece no acordeão da página inicial (os demais ficam só em /dicas). */
  featured?: boolean;
  title: string;
  description: string;
  intro: string;
  /** Resumo curto mostrado no acordeão da página inicial. */
  quick: string[];
  sections: GuideSection[];
  note: string;
};

export const guides: Guide[] = [
  {
    slug: "durante-o-voo",
    featured: true,
    title: "O que manter perto de você durante o voo.",
    description:
      "Documentos, remédios, eletrônicos e itens de conforto: o que levar à mão e o que conferir antes de arrumar a mala.",
    intro: "O que você não pode ficar sem viaja com você, e não na mala despachada.",
    quick: [
      "Documentos de identificação e cartão de embarque, sempre fáceis de alcançar.",
      "Celular, carregador e fones de ouvido.",
      "Remédios de uso contínuo e, se for o seu caso, a receita médica.",
      "Dinheiro, cartões e objetos de valor.",
      "Um agasalho leve e itens de conforto para as horas dentro do avião.",
    ],
    sections: [
      {
        heading: "Documentos e reservas",
        paragraphs: [
          "Deixe o documento de identificação (ou o passaporte, em viagens internacionais) e o cartão de embarque em um bolso de fácil acesso. Você vai precisar deles mais de uma vez antes de sentar no seu lugar.",
          "Salve a reserva no celular e, se possível, tenha também uma cópia impressa. Se a bateria acabar ou o sinal cair, você continua com o essencial.",
        ],
      },
      {
        heading: "Saúde e conforto",
        list: [
          "Remédios de uso contínuo ficam na bagagem de mão, de preferência na embalagem original e com a receita.",
          "Leve um agasalho leve: a temperatura dentro do avião costuma ser mais baixa do que se espera.",
          "Beba água ao longo do voo e use roupas confortáveis.",
          "Em voos longos, levante e caminhe um pouco quando a tripulação permitir.",
        ],
      },
      {
        heading: "Eletrônicos e carregadores",
        paragraphs: [
          "Celular, fone de ouvido e carregador entram bem na bagagem de mão. Se você usa bateria portátil, verifique com a companhia aérea as regras para transportá-la, porque elas variam.",
        ],
      },
      {
        heading: "Dinheiro, cartões e objetos de valor",
        paragraphs: [
          "Objetos de valor, cartões e dinheiro devem viajar com você, e não na mala despachada. Guarde-os em um bolso interno ou em uma bolsa que fique sempre à vista.",
        ],
      },
      {
        heading: "O que conferir antes de arrumar a mala",
        paragraphs: [
          "As regras de tamanho e peso da bagagem de mão, de líquidos e de baterias portáteis variam conforme a companhia aérea e o aeroporto. Confira sempre nas orientações oficiais da sua companhia antes de fechar a mala.",
        ],
      },
    ],
    note: "Em caso de dúvida sobre o seu voo, fale com a GRG: a agência orienta você sobre o embarque, conforme as condições do voo.",
  },
  {
    slug: "hospedagem-bem-localizada",
    featured: true,
    title: "Como escolher uma hospedagem bem localizada.",
    description:
      "Um roteiro simples para comparar hospedagens pela localização, pelo transporte e pelo que está incluído.",
    intro: "A diária mais baixa nem sempre é a mais vantajosa: o deslocamento também entra na conta.",
    quick: [
      "Veja no mapa a distância até o que você quer visitar, comer e fazer.",
      "Considere como você vai se locomover: a pé, transporte público, aplicativo ou carro.",
      "Pense no tempo perdido no trânsito e no custo do transporte ao longo dos dias.",
      "Confira o que o entorno oferece à noite e se combina com o seu estilo de viagem.",
      "Leia com atenção o que está incluído na hospedagem antes de decidir.",
    ],
    sections: [
      {
        heading: "Comece pelo que importa para você",
        paragraphs: [
          "Antes de comparar hotéis, responda: o que você mais quer fazer nessa viagem? Ficar perto da praia, caminhar até os pontos turísticos, ter sossego ou estar perto de restaurantes? A resposta define a região certa.",
        ],
      },
      {
        heading: "Veja a localização no mapa",
        list: [
          "Meça a distância até as atrações que você já sabe que vai visitar.",
          "Confira a distância até o aeroporto ou a rodoviária.",
          "Veja se há mercado, farmácia e restaurantes por perto.",
        ],
      },
      {
        heading: "Pense no transporte",
        paragraphs: [
          "Uma hospedagem mais barata e distante pode sair mais cara depois de somar o transporte de todos os dias, além do tempo que você perde no caminho. Verifique se há metrô, ônibus ou aplicativos disponíveis e como é o deslocamento à noite.",
        ],
      },
      {
        heading: "Conheça o entorno",
        paragraphs: [
          "Leia avaliações recentes e observe o que os hóspedes dizem sobre a rua, o barulho e a sensação de segurança. Se possível, veja fotos do entorno e não só do quarto.",
        ],
      },
      {
        heading: "Compare o que está incluído",
        list: [
          "Café da manhã e outras refeições.",
          "Taxas do local, estacionamento e Wi-Fi.",
          "Política de cancelamento e de alteração.",
          "Horários de entrada e saída.",
        ],
      },
      {
        heading: "Compare pelo custo total",
        paragraphs: [
          "Some diária, taxas, transporte e refeições. Em muitos casos, a hospedagem melhor localizada compensa a diferença.",
        ],
      },
    ],
    note: "Quer ajuda para comparar opções? A GRG pode orientar você conforme o seu roteiro.",
  },
  {
    slug: "primeira-viagem-de-aviao",
    featured: true,
    title: "Sua primeira viagem de avião.",
    description:
      "Do que levar ao embarque: um passo a passo tranquilo para quem vai voar pela primeira vez.",
    intro: "Um passo de cada vez, e você chega ao embarque tranquilo.",
    quick: [
      "Deixe documentos e reservas separados e fáceis de encontrar.",
      "Informe-se com a companhia sobre o horário recomendado para chegar ao aeroporto.",
      "A GRG realiza o check-in dos clientes e orienta sobre o embarque, conforme as condições do voo.",
      "Confira no cartão de embarque o seu nome, o horário, o portão e o assento.",
      "Acompanhe os painéis do aeroporto e a comunicação da companhia: o portão pode mudar.",
      "Em caso de dúvida, pergunte à equipe da companhia ou do aeroporto. Eles estão ali para ajudar.",
    ],
    sections: [
      {
        heading: "Antes de sair de casa",
        list: [
          "Separe o documento de identificação (ou o passaporte) e a reserva.",
          "Confirme o horário do voo e o aeroporto de partida.",
          "Lembre que a GRG realiza o check-in dos clientes e orienta sobre o embarque, conforme as condições do voo.",
        ],
      },
      {
        heading: "Chegando ao aeroporto",
        paragraphs: [
          "A companhia aérea informa com que antecedência você deve chegar. Siga essa orientação: ela considera o despacho de bagagem e o controle de segurança.",
          "Se você tem bagagem para despachar, procure o balcão da sua companhia. Depois, siga para o controle de segurança levando a bagagem de mão e o cartão de embarque.",
        ],
      },
      {
        heading: "Na hora do embarque",
        list: [
          "Confira no cartão de embarque o seu nome, o horário, o portão e o assento.",
          "Acompanhe os painéis do aeroporto: o portão pode mudar.",
          "Fique atento aos avisos e vá para o portão com calma.",
        ],
      },
      {
        heading: "Durante o voo",
        paragraphs: [
          "Siga as orientações da tripulação e mantenha o cinto afivelado quando o sinal estiver aceso. É normal sentir um pouco de pressão nos ouvidos na decolagem e na descida; beber água ou mastigar pode ajudar.",
          "Se sentir ansiedade, respire devagar e avise um comissário: a equipe está acostumada a ajudar quem voa pela primeira vez.",
        ],
      },
      {
        heading: "Ao chegar",
        paragraphs: [
          "Siga as placas até a área de bagagens e confira o painel para saber em qual esteira estará a sua mala. Em viagens com conexão, fique atento ao horário e ao portão do próximo voo.",
        ],
      },
    ],
    note: "Em viagens internacionais, confirme com antecedência os documentos exigidos pelo destino.",
  },
  {
    slug: "viajar-com-familia",
    title: "Como planejar uma viagem em família.",
    description:
      "Um guia prático para viajar com crianças: escolha do destino, hospedagem, ritmo do roteiro e o que informar na hora de pedir a cotação.",
    intro: "Viajar em família fica mais leve quando o planejamento considera o ritmo e as necessidades de cada um.",
    quick: [
      "Escolha um destino compatível com a idade das crianças.",
      "Pense em hospedagem com espaço, boa localização e refeições fáceis.",
      "Monte um roteiro com pausas e tempo livre.",
      "Informe a idade das crianças ao pedir a cotação.",
    ],
    sections: [
      {
        heading: "Escolha o destino pensando em todos",
        paragraphs: [
          "O que encanta um adulto nem sempre funciona para uma criança pequena, e vice-versa. Praias calmas, parques, cidades com passeios curtos e destinos de serra costumam agradar a muitas famílias, mas o melhor destino depende da idade das crianças, do tempo disponível e do que cada um quer viver.",
        ],
      },
      {
        heading: "Hospedagem: espaço, localização e conforto",
        list: [
          "Verifique como o quarto acomoda toda a família e se há opções para mais de uma cama ou quarto conjugado.",
          "Prefira uma localização em que você chegue aos passeios e às refeições sem longos deslocamentos.",
          "Confira o que está incluído, como café da manhã, e as regras para crianças, que variam por hospedagem.",
        ],
      },
      {
        heading: "Roteiro com ritmo",
        paragraphs: [
          "Com crianças, menos costuma ser mais. Escolha uma ou duas atividades principais por dia e deixe tempo para descansar, comer e brincar. Se houver imprevistos, o roteiro continua leve.",
        ],
      },
      {
        heading: "No voo e no deslocamento",
        list: [
          "Deixe à mão lanches, água, itens de conforto e o que as crianças costumam usar para se distrair.",
          "Guarde os documentos de todos em um lugar de fácil acesso.",
          "Confira com a companhia aérea as regras para viajar com crianças, que variam.",
        ],
      },
      {
        heading: "Documentos de crianças e adolescentes",
        paragraphs: [
          "As exigências de documentos para menores de idade, principalmente quando viajam sem um dos responsáveis ou sem nenhum deles, são definidas por órgãos oficiais e podem mudar. Consulte as regras atualizadas antes de comprar a viagem.",
        ],
      },
      {
        heading: "O que informar ao pedir a cotação",
        list: [
          "Quantos adultos e quantas crianças vão.",
          "A idade de cada criança.",
          "O ritmo que a família prefere e o que não pode faltar na viagem.",
        ],
      },
    ],
    note: "Quer ajuda para montar uma viagem em família? Conte seus planos no planejador e a equipe da GRG prepara uma cotação personalizada.",
  },
  {
    slug: "como-escolher-pacote-de-viagem",
    title: "Como escolher um pacote de viagem.",
    description:
      "O que conferir antes de fechar um pacote de viagem: o que está incluído, condições de cancelamento, custo total e flexibilidade.",
    intro: "Um bom pacote é o que cabe na sua viagem, e não só no seu orçamento. Veja o que comparar.",
    quick: [
      "Confira exatamente o que está incluído: passagem, hospedagem, passeios, ingressos.",
      "Compare pelo custo total e não só pelo valor final.",
      "Leia as condições de cancelamento e de alteração.",
      "Considere um pacote personalizado se você tem preferências específicas.",
    ],
    sections: [
      {
        heading: "Pacote pronto ou personalizado",
        paragraphs: [
          "Um pacote pronto pode ser prático, mas nem sempre combina com a sua data ou com o seu perfil de viagem. Um pacote personalizado é montado a partir do destino, do período e do estilo que você procura, e permite escolher o que entra: só passagem e hotel, ou também passeios e ingressos.",
        ],
      },
      {
        heading: "Confira o que está incluído",
        list: [
          "Passagens aéreas: datas, horários e bagagem.",
          "Hospedagem: tipo de quarto, refeições e localização.",
          "Passeios e ingressos: quais estão incluídos e quais são opcionais.",
          "Traslados e aluguel de veículo, quando houver.",
        ],
      },
      {
        heading: "Compare pelo custo total",
        paragraphs: [
          "Dois pacotes com o mesmo valor podem incluir coisas diferentes. Some o que você teria de pagar por fora, como refeições, transporte e ingressos, antes de comparar.",
        ],
      },
      {
        heading: "Condições de cancelamento e alteração",
        paragraphs: [
          "Leia com atenção o que acontece se você precisar mudar a data ou cancelar. As condições variam por fornecedor e por tarifa.",
        ],
      },
      {
        heading: "Documentos e exigências do destino",
        paragraphs: [
          "Verifique com antecedência os documentos exigidos pelo destino, principalmente em viagens internacionais, e confirme as regras oficiais antes de viajar.",
        ],
      },
    ],
    note: "A GRG monta pacotes personalizados conforme a sua solicitação. Valores e condições são informados no atendimento.",
  },
  {
    slug: "passagens-aereas-como-comparar",
    title: "Passagens aéreas: como comparar opções.",
    description:
      "Como comparar passagens aéreas: datas, aeroportos, escalas, bagagem incluída e regras de alteração, para escolher com segurança.",
    intro: "O menor valor nem sempre é a melhor escolha. Compare o conjunto: datas, horários, bagagem e regras.",
    quick: [
      "Compare mais de uma data, se as suas datas forem flexíveis.",
      "Veja diferentes aeroportos de saída e de chegada.",
      "Considere o tempo total do voo e as escalas.",
      "Confira bagagem e regras de alteração da tarifa.",
    ],
    sections: [
      {
        heading: "Flexibilidade de datas",
        paragraphs: [
          "Se você pode mudar a data de ida ou de volta em um ou dois dias, vale comparar as opções. Informar que as datas são flexíveis ajuda a equipe a buscar alternativas.",
        ],
      },
      {
        heading: "Aeroportos e escalas",
        list: [
          "Algumas cidades têm mais de um aeroporto. Compare as opções e considere o deslocamento até cada um.",
          "Voos diretos costumam ser mais rápidos; voos com escala podem ter outras vantagens. Avalie o tempo total.",
          "Em conexões, confira o tempo entre um voo e outro.",
        ],
      },
      {
        heading: "O que está incluído na tarifa",
        paragraphs: [
          "Bagagem despachada, marcação de assento e refeições variam por companhia e por tarifa. Compare o que cada opção inclui antes de decidir.",
        ],
      },
      {
        heading: "Regras de alteração e cancelamento",
        paragraphs: [
          "Tarifas diferentes têm regras diferentes para mudar ou cancelar a passagem. Se o seu plano pode mudar, isso pesa na escolha.",
        ],
      },
      {
        heading: "Documentos e dados dos passageiros",
        paragraphs: [
          "Informe o nome exatamente como consta no documento de viagem e verifique com antecedência os documentos exigidos pelo destino.",
        ],
      },
    ],
    note: "Peça a cotação de passagens com a GRG: informe origem, destino, datas e passageiros no planejador.",
  },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);
