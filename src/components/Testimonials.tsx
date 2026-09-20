import { testimonials } from "@/content/testimonials";
import { Reveal } from "./Reveal";

/** Só aparece quando houver depoimentos reais e autorizados em content/testimonials.ts. */
export function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section id="depoimentos" aria-labelledby="depoimentos-title" className="section-y bg-white">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow text-royal">Depoimentos</p>
          <h2 id="depoimentos-title" className="h-section mt-5 max-w-[18ch] text-abyss">
            Quem viajou com a GRG.
          </h2>
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name + t.trip}>
              <figure className="flex h-full flex-col rounded-2xl border border-mist bg-paper p-7">
                <blockquote className="text-lg leading-relaxed text-ink">“{t.text}”</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="block font-bold text-abyss">{t.name}</span>
                  <span className="text-ink/70">{t.trip}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
