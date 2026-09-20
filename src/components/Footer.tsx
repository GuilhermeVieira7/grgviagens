import Image from "next/image";
import Link from "next/link";
import { footerLinks, siteConfig } from "@/config/site";
import { photoLabels } from "@/content/places";
import { photos, type PhotoKey } from "@/content/photos";
import { guides } from "@/content/guides";
import { Year } from "./Year";

const creditKeys = Object.keys(photos) as PhotoKey[];

function formatPhone(n: string) {
  const d = n.replace(/\D/g, "").replace(/^55/, "");
  return d.length === 11 ? `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}` : d;
}

export function Footer() {
  const wa = siteConfig.whatsappContactUrl;
  return (
    <footer className="on-dark bg-deep text-white">
      <div className="wrap-wide grid gap-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-5">
          <Image
            src="/brand/logo-256.png"
            alt="Logo da GRG Viagens"
            width={96}
            height={96}
            loading="lazy"
            className="h-20 w-20"
          />
          <p className="display mt-5 text-2xl">{siteConfig.name}</p>
          <p className="mt-2 max-w-[22rem] text-white/75">
            Passagens, hospedagens e experiências para uma viagem do seu jeito.
          </p>
          <ul className="mt-5 space-y-1">
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" data-track="whatsapp_contato" data-track-local="rodape" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-lagoon">
                  WhatsApp: {formatPhone(siteConfig.whatsappNumber)}
                </a>
              </li>
            )}
            {siteConfig.instagramUrl && (
              <li>
                <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" data-track="instagram_click" data-track-local="rodape" className="inline-flex min-h-11 items-center underline underline-offset-4 hover:text-lagoon">
                  Instagram: @{siteConfig.instagramUrl.replace(/\/+$/, "").split("/").pop()}
                </a>
              </li>
            )}
          </ul>
          {siteConfig.cadastur && (
            <p className="mt-4 text-sm text-white/75">
              Cadastur nº {siteConfig.cadastur}.{" "}
              <a href="https://cadastur.turismo.gov.br" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-lagoon">
                Consultar cadastro
              </a>
            </p>
          )}
        </div>

        <nav aria-label="Rodapé" className="lg:col-span-4 lg:col-start-7">
          <p className="eyebrow text-lagoon">Navegue</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1 lg:grid-cols-1">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link prefetch={false}
                  href={l.href}
                  className="inline-flex min-h-11 items-center text-white/90 underline-offset-4 hover:text-lagoon hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="eyebrow mt-8 text-lagoon">Guias de viagem</p>
          <ul className="mt-4 space-y-1">
            {guides.map((g) => (
              <li key={g.slug}>
                <Link prefetch={false}
                  href={`/dicas/${g.slug}`}
                  className="inline-flex min-h-11 items-center text-white/90 underline-offset-4 hover:text-lagoon hover:underline"
                >
                  {g.title.replace(/\.$/, "")}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <details className="group lg:col-span-12">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-3 text-white/85 hover:text-lagoon">
            <span className="eyebrow text-lagoon">Créditos das fotografias</span>
            <span className="text-sm text-white/60 group-open:hidden">(ver lista)</span>
          </summary>
          <p className="mt-3 max-w-[46rem] text-sm text-white/70">
            Fotografias reais de cada destino, publicadas sob licenças Creative Commons ou em
            domínio público, via Wikimedia Commons.
          </p>
          <ul className="mt-4 grid gap-x-8 gap-y-2 text-sm leading-relaxed text-white/75 sm:grid-cols-2 lg:grid-cols-3">
            {creditKeys.map((k) => {
              const c = photos[k].credit;
              return (
                <li key={k}>
                  {photoLabels[k]}:{" "}
                  <a href={c.source} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-lagoon">
                    {c.author}
                  </a>
                  ,{" "}
                  <a href={c.licenseUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-lagoon">
                    {c.license}
                  </a>
                  .
                </li>
              );
            })}
          </ul>
        </details>
      </div>

      <div className="border-t border-white/15">
        <p className="wrap-wide py-6 text-sm text-white/70">
          © <Year /> {siteConfig.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
