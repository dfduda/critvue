// valores e conteúdo dos pacotes: edite aqui que o site atualiza
export const packages = [
  {
    id: "single",
    color: "teal",
    name: "Single",
    tagline: "Pra quem precisa estar online rápido",
    price: 990,
    deadline: "10 dias úteis",
    items: ["1 página, até 5 seções", "Layout limpo e responsivo", "Botão de WhatsApp", "1 rodada de ajustes"],
  },
  {
    id: "ep",
    color: "pink",
    name: "EP",
    tagline: "Pra empresa que quer vender pela página",
    price: 1990,
    deadline: "20 dias úteis",
    featured: true,
    items: ["1 página, até 8 seções", "Protótipo no Figma antes de codar", "Formulário que salva os contatos", "Animações e SEO básico", "Google Analytics", "2 rodadas de ajustes"],
  },
  {
    id: "album",
    color: "peri",
    name: "Álbum",
    tagline: "Pra quem quer um site com visual próprio e consistente",
    price: 3490,
    deadline: "35 dias úteis",
    items: ["Até 3 páginas", "Mini design system: cores, fontes e componentes", "Protótipo no Figma", "Formulário, animações e SEO básico", "Google Analytics", "3 rodadas de ajustes"],
  },
  {
    id: "boxset",
    color: "dark",
    custom: true,
    name: "Box Set",
    tagline: "Pra quem quer um produto completo, como a IKIZY",
    price: null,
    deadline: "prazo definido junto com você",
    items: ["Marca, design system e produto", "Sistema ou plataforma web sob medida", "Front-end e back-end", "Banco de dados e painel de gestão", "Hospedagem e deploy", "Acompanhamento depois do lançamento"],
  },
];

export const included = ["Domínio .com.br no 1º ano", "Hospedagem e configuração", "Versão para celular", "30 dias de suporte"];

export const extras = [
  { name: "Página extra", detail: "Mais uma página no mesmo visual do site (ex.: sobre, serviços, portfólio)", price: 300 },
  { name: "Cartão de visita", detail: "Arte frente e verso, pronta pra gráfica e em versão digital", price: 190 },
  { name: "Kit de posts", detail: "Artes estáticas pro Instagram: post único, carrossel e story (sem vídeo)", price: 290 },
];

export const maintenance = {
  name: "Lado B",
  price: 89,
  items: ["Hospedagem, domínio e cadeado de segurança", "Backup", "Até 1h de alterações por mês"],
};

export const steps = [
  { title: "Briefing", text: "A gente conversa sobre a sua marca, o público e o que a página precisa fazer." },
  { title: "Criação", text: "Monto o layout e te mostro antes de qualquer linha de código." },
  { title: "Ajustes", text: "Você comenta, eu ajusto, até ficar com a sua cara." },
  { title: "No ar", text: "Coloco o site no ar com domínio, e você recebe tudo funcionando." },
];

export const payment = [
  { name: "Entrada + entrega", value: "50% + 50%" },
  { name: "Pix", value: "5% de desconto" },
  { name: "Cartão de crédito", value: "até 6x + taxa do cartão" },
];

export const brl = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
