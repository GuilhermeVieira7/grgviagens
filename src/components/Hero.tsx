import Image from "next/image";
import { photos } from "@/content/photos";
import { Arrow } from "./Arrow";

/**
 * Abertura: azul-marinho institucional, texto à esquerda e um único cartão-postal
 * (Praia do Leão, Fernando de Noronha) à direita, acima do texto no celular.
 * O selo usa a logo original da GRG.
 */
export function Hero() {
  const p = photos["hero-noronha"];
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="hero on-dark relative isolate overflow-hidden bg-deep text-white"
    >
      <div className="hero-glow absolute -z-10" aria-hidden="true" />

      <div className="wrap-wide grid min-h-[100svh] items-center gap-x-10 gap-y-8 pb-14 pt-[calc(var(--header-h)+1.25rem)] lg:grid-cols-12 lg:pb-16 lg:pt-[var(--header-h)]">
        <figure className="postcard-wrap order-first mx-auto w-[min(100%,25rem)] sm:w-[min(100%,34rem)] md:w-[min(100%,40rem)] lg:order-none lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:mt-6 lg:mr-[clamp(0rem,2.2vw,3rem)] lg:w-full lg:max-w-[43.75rem] lg:justify-self-end">
          <div className="postcard">
            <div className="postcard-photo">
              <Image
                src={p.src}
                alt="Praia do Leão, em Fernando de Noronha: mar turquesa de águas claras, faixa de areia dourada, falésias e um ilhéu rochoso sob céu azul."
                fill
                loading="eager"
                fetchPriority="high"
                quality={82}
                sizes="(min-width:1024px) min(52vw, 700px), (min-width:768px) 40rem, (min-width:640px) 34rem, 92vw"
                className="object-cover"
                style={{ objectPosition: "50% 40%" }}
              />
            </div>
            <figcaption className="postcard-caption">
              <span className="min-w-0">
                <span className="postcard-place block text-abyss">Praia do Leão</span>
                <span className="postcard-region mt-1 block text-abyss/70">Fernando de Noronha · Brasil</span>
              </span>
              <span className="stamp" aria-hidden="true">
                <Image src="/brand/logo-256.png" alt="" width={128} height={128} className="h-full w-full" />
              </span>
            </figcaption>
          </div>
        </figure>

        <div className="lg:col-span-5 lg:row-start-1">
          <h1
            id="hero-title"
            className="display text-[clamp(2.25rem,0.95rem+3.2vw,3.6rem)]"
          >
            O mundo é grande demais para ficar <span className="text-lagoon">nos planos.</span>
          </h1>
          <p
            className="rise lead mt-5 max-w-[30rem] text-white/85"
            style={{ ["--d" as string]: "0.25s" }}
          >
            Da primeira ideia ao próximo embarque, a GRG ajuda você a transformar seus planos em
            experiências inesquecíveis.
          </p>
          <div
            className="rise mt-8 flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-start xl:flex-row xl:items-center"
            style={{ ["--d" as string]: "0.4s" }}
          >
            <a id="hero-cta" href="#planejador" data-track="hero_planejar" className="btn btn-lagoon !min-h-14 !px-8 text-[1.0625rem] whitespace-nowrap">
              Planejar minha viagem <Arrow />
            </a>
            <a
              href="#destinos"
              className="inline-flex min-h-12 items-center justify-center gap-2 px-2 font-semibold text-white/90 underline decoration-white/40 underline-offset-[6px] transition-colors hover:text-lagoon hover:decoration-lagoon"
            >
              Explorar destinos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
