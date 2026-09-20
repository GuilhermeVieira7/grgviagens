import Image from "next/image";
import { differentials } from "@/content/text";
import { Arrow } from "./Arrow";
import { Reveal } from "./Reveal";

/** Apresentação institucional: somente informações confirmadas. */
export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="section-y bg-paper">
      <div className="wrap">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <h2 id="sobre-title" className="display text-[clamp(2.5rem,6vw,4.75rem)] text-abyss">
              Prazer, somos a <span className="text-royal">GRG Viagens.</span>
            </h2>
            <p className="lead mt-8 max-w-[36rem] text-ink/90">
              Ajudamos você a organizar sua viagem com atendimento próximo e orientação em cada
              escolha. Seja para conhecer um lugar novo, descansar ou reencontrar alguém, queremos
              fazer parte dos seus próximos planos.
            </p>
          </Reveal>
          <div className="flex justify-start lg:col-span-5 lg:justify-end">
            <Image
              src="/brand/logo-512.png"
              alt="Logo da GRG Viagens"
              width={512}
              height={512}
              loading="lazy"
              sizes="(min-width: 1024px) 320px, 200px"
              className="h-auto w-[12.5rem] drop-shadow-[0_18px_30px_rgb(6_38_94/0.28)] lg:w-[20rem]"
            />
          </div>
        </div>

        <ul className="mt-14 grid gap-x-10 gap-y-8 border-t-2 border-abyss pt-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {differentials.map((d) => (
            <li key={d.title}>
              <h3 className="text-lg font-bold text-abyss">{d.title}</h3>
              <p className="mt-2 text-ink/85">{d.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href="#planejador" className="btn btn-royal">
            Falar com a GRG <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
