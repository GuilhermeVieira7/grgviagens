import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { Dock } from "@/components/Dock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";
import { agencyLd, websiteLd } from "@/lib/seo";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["opsz"],
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

const title = "GRG Viagens: agência de viagens e turismo, pacotes e passagens";
const description =
  "Agência de viagens e turismo: passagens aéreas, hotéis, pacotes de viagem, passeios, ingressos e aluguel de carro. Peça sua cotação personalizada pelo WhatsApp.";

export const metadata: Metadata = {
  // Domínio oficial em src/config/site.ts (ou NEXT_PUBLIC_SITE_URL)
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: title, template: "%s | GRG Viagens" },
  description,
  applicationName: "GRG Viagens",
  keywords: [
    // agência e serviços
    "agência de viagens", "agência de viagem", "agência de turismo", "agência de viagens e turismo", "consultoria de viagens", "planejamento de viagem",
    // viagens e turismo
    "viagens", "viagem", "viajar", "turismo", "turismo nacional", "turismo internacional", "viagens nacionais", "viagens internacionais", "roteiros de viagem",
    // perfis
    "primeira viagem", "primeira viagem de avião", "primeira viagem internacional", "viajar em família", "viagem com crianças", "viagem em casal", "lua de mel", "viagem romântica", "férias", "feriado prolongado",
    // destinos e pacotes
    "destinos", "destinos nacionais", "destinos internacionais", "pacotes", "pacotes de viagem", "pacotes turísticos", "pacote personalizado", "pacote para Gramado", "pacote para Maceió", "pacote para Cancún", "pacote para Paris", "pacote para Lisboa",
    // passagens, hospedagem, passeios
    "passagens aéreas", "passagem aérea", "passagens", "voos", "hotéis", "hotel", "hospedagem", "resorts", "passeios", "ingressos", "atrações turísticas",
    // outros serviços
    "aluguel de carro", "locação de veículos", "passaporte", "assessoria de passaporte", "check-in", "cotação de viagem", "orçamento de viagem",
    "GRG Viagens",
  ],
  authors: [{ name: "GRG Viagens" }],
  creator: "GRG Viagens",
  publisher: "GRG Viagens",
  formatDetection: { telephone: false },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  ...(siteConfig.googleVerification ? { verification: { google: siteConfig.googleVerification } } : {}),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "GRG Viagens",
    url: siteConfig.siteUrl,
    title,
    description,
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "Cartão-postal da Praia do Leão, em Fernando de Noronha, ao lado da logo da GRG Viagens.",
      },
    ],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/images/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#06265e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bricolage.variable} ${figtree.variable}`}>
      <body>
        <a href="#conteudo" className="sr-only-focusable btn btn-lagoon fixed left-4 top-4 z-[60]">
          Ir para o conteúdo
        </a>
        <Header />
        {children}
        <div id="rodape">
          <Footer />
        </div>
        <Dock />
        <Analytics />
        <JsonLd data={[agencyLd(), websiteLd()]} />
      </body>
    </html>
  );
}
