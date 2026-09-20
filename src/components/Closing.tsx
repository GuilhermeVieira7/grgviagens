import { Arrow } from "./Arrow";
import { Reveal } from "./Reveal";

/**
 * Encerramento: fundo azul-marinho que sobe sobre a seção anterior (cantos
 * arredondados no topo), título em duas cores e um único botão em destaque.
 */
export function Closing() {
  return (
    <section
      id="encerramento"
      aria-labelledby="fim-title"
      className="on-dark relative -mt-10 overflow-hidden rounded-t-[2.5rem] bg-abyss text-white lg:-mt-14 lg:rounded-t-[4rem]"
    >
      <div className="closing-glow absolute inset-x-0 top-0 -z-0 h-full" aria-hidden="true" />
      <div className="wrap-wide relative py-24 text-center sm:py-32 lg:py-40">
        <Reveal>
          <p className="eyebrow justify-center text-lagoon">Sua próxima viagem</p>
          <h2
            id="fim-title"
            className="display mx-auto mt-6 max-w-[18ch] text-[clamp(2.5rem,1.2rem+5.6vw,6rem)]"
          >
            Seu “um dia” pode ganhar <span className="text-lagoon">uma data.</span>
          </h2>
          <p className="lead mx-auto mt-7 max-w-[30rem] text-white/85">
            Conte pra gente a viagem que você quer viver.
          </p>
          <a
            href="#planejador"
            className="btn btn-lagoon mt-11 !min-h-16 !px-10 text-lg shadow-[0_18px_40px_-14px_rgb(22_223_229/0.55)]"
          >
            Planejar minha viagem <Arrow />
          </a>
          <p className="mt-5 text-sm text-white/65">Sem compromisso: você confere a mensagem antes de enviar.</p>
        </Reveal>
      </div>
    </section>
  );
}
