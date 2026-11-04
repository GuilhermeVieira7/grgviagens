import { siteConfig } from "@/config/site";
import { Arrow } from "./Arrow";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Chamada final: os dois caminhos de atendimento e um convite discreto ao Instagram. */
export function Closing() {
  const handle = siteConfig.instagramUrl.replace(/\/+$/, "").split("/").pop();
  return (
    <section id="encerramento" aria-labelledby="fim-title" className="on-dark relative overflow-hidden bg-abyss text-white">
      <div className="wrap-wide grid gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:items-end lg:py-32">
        <div className="lg:col-span-7">
          <p className="eyebrow text-lagoon">Sua próxima viagem</p>
          <h2 id="fim-title" className="display mt-6 max-w-[16ch] text-[clamp(2.5rem,1.2rem+4.6vw,5.25rem)]">
            Seu “um dia” pode ganhar <span className="text-lagoon">uma data.</span>
          </h2>
        </div>
        <div className="lg:col-span-5">
          <p className="lead max-w-[28rem] text-white/85">
            Conte a viagem que você quer viver pelo formulário ou chame a equipe da GRG no WhatsApp.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href="#planejador" className="btn btn-lagoon !min-h-14 !px-8" data-track="final_planejar">
              Planejar minha viagem <Arrow />
            </a>
            <a
              href={siteConfig.whatsappContactUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-track="whatsapp_contato"
              data-track-local="chamada_final"
              className="btn btn-outline-light !min-h-14"
            >
              <WhatsAppIcon className="h-5 w-5" /> Conversar no WhatsApp
            </a>
          </div>
          {handle && (
            <p className="mt-8 border-t border-white/15 pt-6 text-white/75">
              Acompanhe destinos e novidades no Instagram:{" "}
              <a
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="instagram_click"
                data-track-local="chamada_final"
                className="inline-flex min-h-11 items-center font-semibold text-white underline decoration-lagoon underline-offset-4 hover:text-lagoon"
              >
                @{handle}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
