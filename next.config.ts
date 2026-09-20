import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Política de segurança de conteúdo (CSP).
 * - Só o próprio site pode carregar scripts, estilos, fontes e imagens.
 * - 'unsafe-inline' em script/style é necessário porque o Next injeta os scripts
 *   de hidratação e os estilos da página no HTML (não usamos nonce em páginas estáticas).
 *   'unsafe-eval' só existe no modo de desenvolvimento.
 * - Plausible e Umami (analytics opcional, sem cookies) já estão liberados: só
 *   carregam se forem ativados em src/config/site.ts.
 * - A Vercel Analytics é servida do próprio domínio (/_vercel/...).
 * - Ninguém pode colocar o site dentro de um iframe (frame-ancestors 'none').
 */
const analyticsHosts = "https://plausible.io https://cloud.umami.is https://gateway.umami.is https://api-gateway.umami.dev";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${analyticsHosts}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  `connect-src 'self' ${analyticsHosts}${isDev ? " ws: wss:" : ""}`,
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Impede que o navegador "adivinhe" o tipo de um arquivo (ataques por tipo trocado)
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Compatibilidade com navegadores antigos que não entendem frame-ancestors
  { key: "X-Frame-Options", value: "DENY" },
  // Envia o endereço completo só dentro do próprio site; para fora, só o domínio
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // O site não usa câmera, microfone, localização, pagamento nem outros recursos sensíveis
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=(), serial=(), accelerometer=(), gyroscope=(), magnetometer=(), interest-cohort=(), browsing-topics=()",
  },
  // Isola a janela do site de janelas abertas por outros sites
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // Não anuncia a tecnologia do servidor (cabeçalho X-Powered-By)
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 82] },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    // www.grgviagens.com.br -> grgviagens.com.br (redirecionamento permanente, mantém o caminho)
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.grgviagens.com.br" }],
        destination: "https://grgviagens.com.br/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
