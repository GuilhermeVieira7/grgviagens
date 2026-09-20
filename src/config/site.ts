/**
 * Configuração central da GRG Viagens.
 *
 * WhatsApp oficial: só dígitos, com código do país e DDD (55 + DDD + número).
 * Usado no planejador para montar o link com a mensagem pronta (wa.me). Se ficar
 * vazio ou inválido, o site não gera link: o visitante vê e copia a mensagem.
 *
 * Contato direto: link curto do WhatsApp (wa.link) usado nos botões "Falar no
 * WhatsApp" (botão flutuante e rodapé). Aponta para o mesmo número.
 *
 * Cadastur: deixe vazio até a agência ter o registro aprovado. Quando preenchido,
 * o número aparece no rodapé com link para o site oficial de consulta.
 *
 * Analytics (opcional, sem cookies): defina NEXT_PUBLIC_PLAUSIBLE_DOMAIN
 * (ex.: "grgviagens.com.br") ou NEXT_PUBLIC_UMAMI_WEBSITE_ID (+ NEXT_PUBLIC_UMAMI_SRC).
 * Sem essas variáveis, nada é carregado nem enviado.
 */
const WHATSAPP_NUMBER = "5594999099386"; // (94) 99909-9386
const WHATSAPP_CONTACT_URL = "https://wa.link/fj7dxp";
const INSTAGRAM_URL = "https://www.instagram.com/grgviagens";
const CADASTUR_NUMBER = "";

export const siteConfig = {
  name: "GRG Viagens",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || WHATSAPP_NUMBER,
  whatsappContactUrl: process.env.NEXT_PUBLIC_WHATSAPP_CONTACT_URL || WHATSAPP_CONTACT_URL,
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || INSTAGRAM_URL,
  cadastur: process.env.NEXT_PUBLIC_CADASTUR || CADASTUR_NUMBER,
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, ""),
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "",
  umamiId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || "",
  umamiSrc: process.env.NEXT_PUBLIC_UMAMI_SRC || "https://cloud.umami.is/script.js",
};

/** Links com "/" no começo funcionam na página inicial e nas subpáginas. */
export const navLinks = [
  { label: "Destinos", href: "/#destinos" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Dúvidas", href: "/#duvidas" },
];

export const footerLinks = [
  { label: "Destinos", href: "/#destinos" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Galeria", href: "/#galeria" },
  { label: "Planejar minha viagem", href: "/#planejador" },
  { label: "Como funciona", href: "/#como-funciona" },
  { label: "Sobre a GRG", href: "/#sobre" },
  { label: "Guias de viagem", href: "/#dicas" },
  { label: "Dúvidas frequentes", href: "/#duvidas" },
];
