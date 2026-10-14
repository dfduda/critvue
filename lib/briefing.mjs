// perguntas do briefing: edite aqui que o formulário e a página de respostas atualizam
export const briefingSections = [
  {
    title: "O projeto",
    fields: [
      { id: "projeto", label: "Nome do projeto e da marca", short: true },
      { id: "precisa", label: "Em uma frase: o que você precisa criar?", hint: "logo, site, página de vendas…", required: true },
      { id: "porque", label: "Por que agora? O que mudou ou o que você quer resolver?" },
    ],
  },
  {
    title: "Objetivo e resultado",
    fields: [
      { id: "objetivo", label: "Qual é o principal objetivo?", hint: "ex.: receber mais contatos, parecer mais profissional, vender online" },
      { id: "acao", label: "O que o visitante deve fazer ao chegar?", hint: "chamar no WhatsApp, comprar, pedir orçamento" },
      { id: "sucesso", label: "Como você vai saber que deu certo?" },
    ],
  },
  {
    title: "Seu cliente",
    fields: [
      { id: "publico", label: "Para quem você vende?", hint: "perfil, idade, região" },
      { id: "dores", label: "O que ele procura e o que mais o incomoda?" },
      { id: "diferencial", label: "Por que ele escolheria você e não outro?" },
    ],
  },
  {
    title: "Mensagem e estilo",
    fields: [
      { id: "personalidade", label: "Se a marca fosse uma pessoa, como ela seria?", hint: "3 palavras" },
      { id: "ideia", label: "Qual é a ideia principal que você quer passar?" },
      { id: "estilo", label: "Cores ou estilos que você gosta, e os que não quer" },
      { id: "identidade", label: "Você já tem logo, cores ou fontes?", hint: "se tiver, me envie os arquivos depois pelo WhatsApp" },
    ],
  },
  {
    title: "Referências e concorrentes",
    fields: [
      { id: "referencias", label: "Cole links de 2 ou 3 sites ou marcas que você admira", hint: "e diga o que gosta em cada um" },
      { id: "concorrentes", label: "Quem são seus concorrentes? Algo que eles façam bem ou mal?" },
    ],
  },
  {
    title: "O que vamos entregar",
    fields: [
      { id: "paginas", label: "Páginas ou peças que você imagina", hint: "ex.: início, sobre, serviços, contato" },
      { id: "conteudo", label: "Você já tem textos e fotos, ou precisa de ajuda com isso?" },
      { id: "extras", label: "Precisa de algo a mais?", hint: "formulário, WhatsApp, agenda, loja" },
      { id: "dominio", label: "Já tem domínio e hospedagem?" },
    ],
  },
  {
    title: "Prazo, valor e aprovação",
    fields: [
      { id: "prazo", label: "Existe data limite? Por quê?" },
      { id: "investimento", label: "Qual pacote ou faixa de investimento você tem em mente?" },
      { id: "aprova", label: "Quem aprova as etapas?" },
      { id: "contato", label: "Melhor canal e horário para eu falar com você" },
    ],
  },
];

export const briefingFieldIds = briefingSections.flatMap((s) => s.fields.map((f) => f.id));
