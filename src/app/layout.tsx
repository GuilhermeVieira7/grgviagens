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

const title = "GRG Viagens: agência de viagens, passagens, hotéis e pacotes";
const description =
  "Agência de viagens com atendimento próximo: passagens aéreas, hotéis, pacotes, passeios, ingressos e aluguel de carro. Peça sua cotação personalizada pelo WhatsApp.";

export const metadata: Metadata = {
  // Domínio oficial em src/config/site.ts (ou NEXT_PUBLIC_SITE_URL)
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: title, template: "%s | GRG Viagens" },
  description,
  applicationName: "GRG Viagens",
  keywords: [
    "agência de viagens",
    "viagens",
    "viajar",
    "viajar em família",
    "hotéis",
    "passeios",
    "pacotes de viagem",
    "passagens aéreas",
    "aluguel de carro",
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
