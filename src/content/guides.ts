/**
 * Guias de viagem: orientações gerais e práticas. Regras específicas (bagagem,
 * líquidos, baterias, documentos, horários) variam por companhia, aeroporto e
 * destino e NÃO são afirmadas aqui: o texto sempre remete à fonte oficial.
 * Revisar com a GRG antes da publicação.
 */
export type GuideSection = { heading: string; paragraphs?: string[]; list?: string[] };

export type Guide = {
  slug: string;
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
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);
