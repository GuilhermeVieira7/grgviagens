import type { Metadata } from "next";
import { Benefits } from "@/components/Benefits";
import { Closing } from "@/components/Closing";
import { Faq } from "@/components/Faq";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { Offers } from "@/components/Offers";
import { Planner } from "@/components/Planner";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { WhyGrg } from "@/components/WhyGrg";
import { faq } from "@/content/text";
import { faqLd } from "@/lib/seo";

export const metadata: Metadata = { alternates: { canonical: "/" } };

/**
 * Página inicial, na ordem de decisão: abertura → benefícios → vitrine →
 * por que a GRG → cotação → serviços → como funciona → dúvidas → chamada final.
 * Depoimentos só aparecem quando houver depoimentos reais em content/testimonials.ts.
 */
export default function Home() {
  return (
    <main id="conteudo">
      <Hero />
      <Benefits />
      <Offers />
      <WhyGrg />
      <Testimonials />
      <Planner />
      <Services />
      <HowItWorks />
      <Faq />
      <Closing />
      <JsonLd data={faqLd(faq)} />
    </main>
  );
}
