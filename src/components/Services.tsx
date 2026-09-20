import { services } from "@/content/text";
import { Arrow } from "./Arrow";
import { Reveal } from "./Reveal";
import { ServiceIcon } from "./ServiceIcon";

/** Fundo escuro, título centralizado e grade 3x3: oito serviços + um cartão de convite ao planejador. */
export function Services() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-title"
      className="on-dark section-y bg-abyss text-white"
    >
      <div className="wrap-wide">
        <Reveal className="mx-auto max-w-[44rem] text-center">
          <p className="eyebrow justify-center text-lagoon">Serviços</p>
          <h2 id="servicos-title" className="h-section mt-5">
            Tudo para sua viagem em um só lugar.
          </h2>
          <p className="lead mt-6 text-white/85">
            Da escolha do destino aos detalhes do embarque, a GRG acompanha você em cada etapa da
            sua viagem.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-20 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.key} className="flex">
              <Reveal className="flex w-full" delay={(i % 3) * 0.07}>
                <article className="svc group flex w-full flex-col rounded-2xl border border-white/15 bg-white/[0.04] p-7 sm:p-8">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-lagoon/40 text-lagoon transition-colors group-hover:bg-lagoon group-hover:text-abyss">
                    <ServiceIcon name={s.key} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold leading-snug">{s.title}</h3>
                  <p className="mt-2 text-[1.0625rem] leading-relaxed text-white/80">{s.text}</p>
                </article>
              </Reveal>
            </li>
          ))}

          <li className="flex sm:col-span-2 lg:col-span-1">
            <Reveal className="flex w-full" delay={0.14}>
              <article className="flex w-full flex-col justify-between rounded-2xl bg-lagoon p-7 text-abyss sm:p-8">
                <div>
                  <h3 className="display text-[clamp(1.75rem,2.4vw,2.125rem)]">
                    Cada viagem é única.
                  </h3>
                  <p className="mt-3 text-[1.0625rem] font-medium leading-relaxed">
                    Conte o que você imagina e a equipe da GRG prepara uma cotação personalizada.
                  </p>
                </div>
                <a
                  href="#planejador"
                  className="btn mt-8 self-start bg-abyss text-white hover:bg-royal"
                >
                  Planejar minha viagem <Arrow />
                </a>
              </article>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
