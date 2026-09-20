import { steps } from "@/content/text";
import { Reveal } from "./Reveal";
import { ServiceIcon } from "./ServiceIcon";

/**
 * Trajeto ascendente em quatro paradas, terminando em um avião. No desktop a
 * linha sobe entre as colunas; no celular ela desce pela lateral.
 */
export function HowItWorks() {
  // Paradas sobre a linha (desktop): y no viewBox (1 unidade = 1px) menos o raio do ponto
  const dotTop = ["lg:top-[106px]", "lg:top-[72px]", "lg:top-[38px]", "lg:top-[4px]"];

  return (
    <section id="como-funciona" aria-labelledby="como-title" className="section-y bg-white">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow text-royal">Como funciona</p>
          <h2 id="como-title" className="h-section mt-5 max-w-[16ch] text-abyss">
            Você sonha. A GRG ajuda a planejar.
          </h2>
        </Reveal>

        <div className="relative mt-14 lg:mt-20">
          <svg
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-[9rem] w-full lg:block"
            viewBox="0 0 1200 144"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="route-path"
              d="M0,124 L12,118 C170,118 190,84 322,84 C470,84 480,50 633,50 C780,50 790,16 943,16 L1110,16"
              fill="none"
              stroke="#0749b5"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <ServiceIcon
            name="plane"
            className="absolute right-0 top-0 hidden h-9 w-9 -translate-y-0.5 text-royal lg:block [&_path]:fill-royal"
          />

          <ol className="relative grid gap-0 lg:grid-cols-4 lg:gap-10">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="relative border-l-2 border-dashed border-royal/40 pb-12 pl-9 last:border-l-0 last:pb-0 lg:border-l-0 lg:pb-0 lg:pl-0 lg:pt-[11.5rem]"
              >
                <span
                  className={`absolute -left-[0.8rem] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-royal ring-[6px] ring-white lg:left-0 ${dotTop[i]}`}
                  aria-hidden="true"
                >
                  <span className="h-2 w-2 rounded-full bg-lagoon" />
                </span>
                <span className="display block text-[clamp(2.5rem,4vw,3.5rem)] text-royal/85" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-xl font-bold leading-snug text-abyss">{s.title}</h3>
                <p className="mt-2 max-w-[19rem] text-ink/85">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
