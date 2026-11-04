import Link from "next/link";
import { faq } from "@/content/text";
import { Accordion } from "./Accordion";

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="section-y bg-paper">
      <div className="wrap-wide grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="eyebrow text-royal">Dúvidas frequentes</p>
          <h2 id="duvidas-title" className="h-section mt-5 text-abyss">
            Antes de pedir a sua cotação.
          </h2>
          <p className="mt-6 max-w-[22rem] text-ink/80">
            Para dicas de documentos, bagagem e roteiros, veja os{" "}
            <Link href="/dicas" className="font-semibold text-royal underline underline-offset-4">
              guias de viagem
            </Link>
            .
          </p>
        </div>
        <div className="lg:col-span-8">
          <Accordion
            variant="faq"
            items={faq.map((f, i) => ({
              id: `q${i}`,
              title: f.q,
              content: <p className="max-w-[40rem] text-ink/90">{f.a}</p>,
            }))}
          />
        </div>
      </div>
    </section>
  );
}
