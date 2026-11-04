import Image from "next/image";
import { siteConfig } from "@/config/site";
import { photos } from "@/content/photos";
import { Arrow } from "./Arrow";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Abertura imersiva: a Praia do Leão (Fernando de Noronha) ocupa toda a largura.
 * Desktop: texto à esquerda, sobre o mar aberto, com um degradê azul-marinho só
 * daquele lado. Celular: a foto mostra o ilhéu e a curva da praia; o texto fica na
 * base, sobre um degradê curto, e cabe na primeira tela (360 × 640).
 * Sem moldura, sem animação de entrada, sem texto dentro da imagem.
 */
export function Hero() {
  const p = photos["hero-noronha"];
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="hero on-dark relative isolate flex overflow-hidden bg-deep text-white"
    >
      <Image
        src={p.src}
        alt="Praia do Leão, em Fernando de Noronha: mar turquesa, faixa de areia dourada, morros e um ilhéu rochoso sob céu azul."
        fill
        loading="eager"
        fetchPriority="high"
        quality={82}
        sizes="100vw"
        className="hero-img -z-20 object-cover"
      />
      <div className="hero-shade absolute inset-0 -z-10" aria-hidden="true" />

      <div className="wrap-wide flex w-full flex-col justify-end pb-10 pt-[calc(var(--header-h)+2rem)] sm:pb-14 lg:justify-center lg:pb-[var(--header-h)]">
        <div className="max-w-[40rem] lg:max-w-[36rem] xl:max-w-[40rem]">
          <h1 id="hero-title" className="display text-[clamp(2.375rem,1.2rem+4.4vw,4.75rem)] [text-shadow:0_2px_24px_rgb(2_14_40/0.35)]">
            O mundo é grande demais para ficar nos planos.
          </h1>
          <p className="lead mt-5 max-w-[32rem] text-white/95 sm:mt-6">
            Passagens, hospedagens e pacotes personalizados, com atendimento próximo para cuidar dos detalhes da
            sua viagem.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
            <a
              id="hero-cta"
              href="#planejador"
              data-track="hero_planejar"
              className="btn btn-lagoon !min-h-14 !px-8 text-[1.0625rem]"
            >
              Planejar minha viagem <Arrow />
            </a>
            <a
              href={siteConfig.whatsappContactUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_contato"
              data-track-local="abertura"
              className="btn btn-outline-light !min-h-14"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Conversar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
