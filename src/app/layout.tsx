import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { Analytics } from "@/components/Analytics";
import { Dock } from "@/components/Dock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { siteConfig } from "@/config/site";
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

const title = "GRG Viagens | Passagens, hospedagem e pacotes de viagem";
const description =
  "O mundo é grande demais para ficar nos planos. Conte para a GRG o que você está planejando e receba uma cotação personalizada de passagens, hospedagem e pacotes.";

export const metadata: Metadata = {
  // Defina NEXT_PUBLIC_SITE_URL com o domínio oficial para links absolutos de compartilhamento
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: title, template: "%s | GRG Viagens" },
  description,
  applicationName: "GRG Viagens",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "GRG Viagens",
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
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  themeColor: "#06265e",
  width: "device-width",
  initialScale: 1,
};

/** Dados estruturados da agência: só informações confirmadas (sem endereço, sem avaliações). */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: siteConfig.name,
  url: siteConfig.siteUrl,
  telephone: `+${siteConfig.whatsappNumber}`,
  areaServed: "BR",
  sameAs: [siteConfig.instagramUrl],
  description,
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
        <VercelAnalytics />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
