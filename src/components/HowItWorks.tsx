import { steps } from "@/content/text";
import { Arrow } from "./Arrow";

/** Três etapas objetivas, sem promessa de prazo, disponibilidade ou condição comercial. */
export function HowItWorks() {
  return (
    <section id="como-funciona" aria-labelledby="como-title" className="section-y bg-white">
      <div className="wrap-wide">
        <p className="eyebrow text-royal">Como funciona</p>
        <h2 id="como-title" className="h-section mt-5 max-w-[18ch] text-abyss">
          Do pedido ao embarque, em três passos.
        </h2>

        <ol className="mt-12 grid gap-0 md:grid-cols-3 md:gap-10 lg:mt-16 lg:gap-16">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t-2 border-abyss py-6 md:py-8">
              <span className="display block text-[clamp(2.75rem,4vw,4rem)] leading-none text-royal" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl font-bold leading-snug text-abyss">
                <span className="sr-only">Passo {i + 1}: </span>
                {s.title}
              </h3>
              <p className="mt-2 max-w-[22rem] text-ink/85">{s.text}</p>
            </li>
          ))}
        </ol>

        <a href="#planejador" className="btn btn-royal mt-6" data-track="como_planejar">
          Planejar minha viagem <Arrow />
        </a>
      </div>
    </section>
  );
}
