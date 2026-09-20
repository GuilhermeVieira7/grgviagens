import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/Arrow";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Planner } from "@/components/Planner";
import { ServiceIcon } from "@/components/ServiceIcon";
import { siteConfig } from "@/config/site";
import { guideBySlug } from "@/content/guides";
import { servicePageBySlug, servicePages } from "@/content/services";
import { abs, faqLd, serviceLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = servicePageBySlug(slug);
  if (!s) return {};
  const path = `/servicos/${s.slug}`;
  return {
    title: s.metaTitle,
    description: s.description,
    keywords: [s.name, s.metaTitle, "agência de viagens", "viagens", "turismo", "cotação de viagem"],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: "GRG Viagens",
      url: abs(path),
      title: `${s.metaTitle} | GRG Viagens`,
      description: s.description,
      images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "GRG Viagens: agência de viagens" }],
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const s = servicePageBySlug(slug);
  if (!s) notFound();
  const path = `/servicos/${s.slug}`;
  const related = (s.related ?? []).map((r) => guideBySlug(r)).filter((g) => !!g);
  const others = servicePages.filter((o) => o.slug !== s.slug);

  return (
    <main id="conteudo">
      <article className="bg-paper pt-[calc(var(--header-h)+1.5rem)]">
        <div className="wrap pb-16 lg:pb-24">
          <Breadcrumbs items={[{ name: "Serviços", path: "/servicos" }, { name: s.name, path }]} />

          <div className="mt-6 flex items-start gap-5">
            <span className="hidden h-14 w-14 flex-none items-center justify-center rounded-2xl bg-abyss text-lagoon sm:flex">
              <ServiceIcon name={s.icon} className="h-7 w-7" />
            </span>
            <div>
              <p className="eyebrow text-royal">Serviço da GRG Viagens</p>
              <h1 className="display mt-4 max-w-[22ch] text-[clamp(2.25rem,1rem+4.4vw,4.25rem)] text-abyss">{s.h1}</h1>
            </div>
          </div>
          <p className="lead mt-6 max-w-[46rem] text-ink/90">{s.intro}</p>
          <div className="mt-7 cta-row flex flex-col gap-3 sm:flex-row">
            <a href="#planejador" className="btn btn-royal" data-track="servico_cotar" data-track-local={s.slug}>
              Pedir minha cotação <Arrow />
            </a>
            <a
              href={siteConfig.whatsappContactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-dark"
              data-track="whatsapp_contato"
              data-track-local={`servico_${s.slug}`}
            >
              Falar no WhatsApp
            </a>
          </div>

          <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
            <section aria-labelledby="ajuda" className="lg:col-span-7">
              <h2 id="ajuda" className="display text-[clamp(1.75rem,3vw,2.5rem)] text-abyss">
                Como a GRG ajuda
              </h2>
              <ul className="mt-6 border-t-2 border-abyss">
                {s.helps.map((h) => (
                  <li key={h} className="border-b border-mist py-4 text-lg text-ink/90">
                    {h}
                  </li>
                ))}
              </ul>

              <h2 className="display mt-12 text-[clamp(1.75rem,3vw,2.5rem)] text-abyss">Dicas antes de decidir</h2>
              <ul className="mt-5 space-y-3">
                {s.tips.map((t) => (
                  <li key={t} className="relative pl-6 text-lg leading-relaxed text-ink/90">
                    <span className="absolute left-0 top-[0.8em] h-1.5 w-1.5 rounded-full bg-royal" aria-hidden="true" />
                    {t}
                  </li>
                ))}
              </ul>
              {s.note && <p className="mt-6 rounded-xl bg-white px-5 py-4 text-[0.9375rem] text-ink/85">{s.note}</p>}
              <p className="mt-4 text-sm text-ink/70">
                Valores, prazos e condições são informados no atendimento, conforme a viagem e a disponibilidade.
              </p>
            </section>

            <aside className="lg:col-span-5" aria-label="Para pedir a cotação">
              <div className="rounded-3xl bg-white p-7 shadow-[0_18px_40px_-28px_rgb(6_38_94/0.5)] sm:p-9">
                <h2 className="display text-2xl text-abyss">O que informar para a cotação</h2>
                <ul className="mt-5 space-y-3">
                  {s.inform.map((i) => (
                    <li key={i} className="relative pl-6 text-ink/90">
                      <span className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-royal" aria-hidden="true" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>

          <section aria-labelledby="duvidas-servico" className="mt-16 max-w-[48rem] lg:mt-24">
            <h2 id="duvidas-servico" className="display text-[clamp(1.75rem,3vw,2.5rem)] text-abyss">
              Dúvidas frequentes
            </h2>
            <dl className="mt-6 border-t border-mist">
              {s.faq.map((f) => (
                <div key={f.q} className="border-b border-mist py-5">
                  <dt className="text-lg font-bold text-abyss">{f.q}</dt>
                  <dd className="mt-2 text-ink/90">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {related.length > 0 && (
            <section aria-labelledby="leia-mais" className="mt-14">
              <h2 id="leia-mais" className="display text-2xl text-abyss">
                Guias relacionados
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {related.map((g) => (
                  <li key={g!.slug}>
                    <Link
                      href={`/dicas/${g!.slug}`}
                      className="block rounded-2xl border border-mist bg-white p-5 font-bold text-abyss transition-colors hover:border-royal"
                    >
                      {g!.title.replace(/\.$/, "")}
                      <span className="mt-1 block text-sm font-normal text-ink/75">{g!.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <nav aria-label="Outros serviços" className="mt-14">
            <h2 className="display text-2xl text-abyss">Outros serviços</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/servicos/${o.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-mist bg-white px-4 text-sm font-bold text-abyss transition-colors hover:border-royal"
                  >
                    {o.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </article>

      <Planner />
      <JsonLd data={[serviceLd({ name: s.name, description: s.description, path }), faqLd(s.faq)]} />
    </main>
  );
}
