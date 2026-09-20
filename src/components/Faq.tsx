import { faq } from "@/content/text";
import { Accordion } from "./Accordion";

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="section-y bg-paper">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <p className="eyebrow text-royal">Dúvidas frequentes</p>
          <h2 id="duvidas-title" className="h-section mt-5 text-abyss">
            O que você talvez queira saber.
          </h2>
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
