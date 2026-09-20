import type { Metadata } from "next";
import { About } from "@/components/About";
import { Closing } from "@/components/Closing";
import { Destinations } from "@/components/Destinations";
import { Faq } from "@/components/Faq";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { HowItWorks } from "@/components/HowItWorks";
import { InstagramStrip } from "@/components/InstagramStrip";
import { Planner } from "@/components/Planner";
import { Services } from "@/components/Services";
import { Testimonials } from "@/components/Testimonials";
import { Tips } from "@/components/Tips";
import { faq } from "@/content/text";
import { faqLd } from "@/lib/seo";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <main id="conteudo">
      <Hero />
      <Destinations />
      <Services />
      <Gallery />
      <Planner />
      <HowItWorks />
      <InstagramStrip />
      <About />
      <Testimonials />
      <Tips />
      <Faq />
      <Closing />
      <JsonLd data={faqLd(faq)} />
    </main>
  );
}
