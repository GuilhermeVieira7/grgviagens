import Image from "next/image";
import { siteConfig } from "@/config/site";
import { agencyWork } from "@/content/text";
import { formatPhone } from "@/lib/format";
import { Arrow } from "./Arrow";

/**
 * Apresentação institucional. Só dados confirmados: Cadastur, CNPJ e canais oficiais.
 * Sem fotos da equipe (não fornecidas): a composição usa a logo original e a
 * paleta da marca. Razão social, endereço, e-mail e horário entram sozinhos
 * quando forem preenchidos em src/config/site.ts.
 */
export function WhyGrg() {
  const facts = [
    siteConfig.cadastur ? { k: "Cadastur", v: "Agência cadastrada no Cadastur" } : null,
    siteConfig.legalName ? { k: "Razão social", v: siteConfig.legalName } : null,
    siteConfig.cnpj ? { k: "CNPJ", v: siteConfig.cnpj } : null,
    siteConfig.address ? { k: "Endereço", v: siteConfig.address } : null,
    siteConfig.hours ? { k: "Horário", v: siteConfig.hours } : null,
    { k: "WhatsApp", v: formatPhone(siteConfig.whatsappNumber) },
    siteConfig.email ? { k: "E-mail", v: siteConfig.email } : null,
  ].filter((f): f is { k: string; v: string } => !!f);

  return (
    <section id="sobre" aria-labelledby="sobre-title" className="section-y bg-white">
      <div className="wrap-wide grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7 lg:order-2">
          <p className="eyebrow text-royal">A GRG Viagens</p>
          <h2 id="sobre-title" className="h-section mt-5 max-w-[17ch] text-abyss">
            Você escolhe o destino. A gente ajuda com o caminho.
          </h2>
          <p className="lead mt-6 max-w-[36rem] text-ink/85">
            Planejar uma viagem envolve muitas escolhas. A GRG cuida da pesquisa e dos detalhes com você, do
            primeiro contato ao embarque.
          </p>

          <ol className="mt-10 grid gap-x-10 border-t-2 border-abyss sm:grid-cols-2">
            {agencyWork.map((w, i) => (
              <li key={w.title} className="border-b border-mist py-6">
                <p className="text-sm font-bold text-royal">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-lg font-bold leading-snug text-abyss">{w.title}</h3>
                <p className="mt-1.5 text-ink/80">{w.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <aside
          aria-label="Dados da agência"
          className="on-dark relative flex flex-col justify-between overflow-hidden bg-abyss p-8 text-white sm:p-10 lg:col-span-5 lg:order-1"
        >
          <div className="about-lines absolute inset-0" aria-hidden="true" />
          <div className="relative">
            <Image
              src="/brand/logo-512.png"
              alt="Logo da GRG Viagens"
              width={512}
              height={512}
              loading="lazy"
              sizes="(min-width:1024px) 176px, 136px"
              className="h-auto w-34 lg:w-44"
            />
            <p className="display mt-8 max-w-[14ch] text-[clamp(1.75rem,2.6vw,2.5rem)]">
              Atendimento humano, do pedido ao embarque.
            </p>
          </div>

          <dl className="relative mt-10 grid gap-4 border-t border-white/20 pt-6 text-[1rem]">
            {facts.map((f) => (
              <div key={f.k} className="grid gap-0.5 sm:grid-cols-[7.5rem_1fr] sm:gap-4">
                <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-lagoon">{f.k}</dt>
                <dd className="text-white/90">{f.v}</dd>
              </div>
            ))}
          </dl>

          <a href="#planejador" className="btn btn-lagoon relative mt-8 self-start" data-track="sobre_planejar">
            Pedir cotação <Arrow />
          </a>
        </aside>
      </div>
    </section>
  );
}
