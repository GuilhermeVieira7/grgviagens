import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/Arrow";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig } from "@/config/site";
import { guideBySlug, guides } from "@/content/guides";
import { abs, articleLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) return {};
  const title = g.title.replace(/\.$/, "");
  return {
    title,
    description: g.description,
    keywords: [title, "dicas de viagem", "guia de viagem", "viajar", "viagens", "agência de viagens"],
    alternates: { canonical: `/dicas/${g.slug}` },
    openGraph: {
      type: "article",
      locale: "pt_BR",
      siteName: "GRG Viagens",
      url: abs(`/dicas/${g.slug}`),
      title: `${title} | GRG Viagens`,
      description: g.description,
      images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "GRG Viagens: agência de viagens" }],
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const g = guideBySlug(slug);
  if (!g) notFound();
  const others = guides.filter((o) => o.slug !== g.slug);

  return (
    <main id="conteudo" className="bg-white pt-[calc(var(--header-h)+2rem)]">
      <article className="wrap pb-20 lg:pb-28">
        <Breadcrumbs items={[{ name: "Guias de viagem", path: "/dicas" }, { name: g.title.replace(/\.$/, ""), path: `/dicas/${g.slug}` }]} />
        <p className="eyebrow mt-6 text-royal">Guia de viagem</p>
        <h1 className="display mt-5 max-w-[20ch] text-[clamp(2.25rem,1rem+4.6vw,4.5rem)] text-abyss">{g.title}</h1>
        <p className="lead mt-6 max-w-[40rem] text-ink/90">{g.intro}</p>

        <div className="mt-12 max-w-[44rem]">
          {g.sections.map((s) => (
            <section key={s.heading} className="border-t border-mist py-8">
              <h2 className="display text-[clamp(1.5rem,2.6vw,2rem)] text-abyss">{s.heading}</h2>
              {s.paragraphs?.map((p) => (
                <p key={p} className="mt-4 text-lg leading-relaxed text-ink/90">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-4 space-y-3">
                  {s.list.map((it) => (
                    <li key={it} className="relative pl-6 text-lg leading-relaxed text-ink/90">
                      <span className="absolute left-0 top-[0.8em] h-1.5 w-1.5 rounded-full bg-royal" aria-hidden="true" />
                      {it}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <p className="mt-2 rounded-xl bg-paper px-5 py-4 text-[0.9375rem] text-ink/85">{g.note}</p>
        </div>

        <aside className="on-dark mt-14 rounded-3xl bg-abyss p-8 text-white sm:p-12" aria-label="Fale com a GRG">
          <p className="display text-[clamp(1.75rem,3vw,2.5rem)]">Quer planejar a sua viagem?</p>
          <p className="mt-3 max-w-[32rem] text-white/85">Conte seus planos e a equipe da GRG prepara uma cotação personalizada.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/#planejador" className="btn btn-lagoon" data-track="guia_planejar" data-track-local={g.slug}>
              Planejar minha viagem <Arrow />
            </Link>
            <a
              href={siteConfig.whatsappContactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-light"
              data-track="whatsapp_contato"
              data-track-local={`guia_${g.slug}`}
            >
              Falar no WhatsApp
            </a>
          </div>
        </aside>

        <nav aria-label="Outros guias" className="mt-14">
          <h2 className="display text-2xl text-abyss">Outros guias</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/dicas/${o.slug}`}
                  className="block rounded-2xl border border-mist p-5 font-bold text-abyss transition-colors hover:border-royal"
                >
                  {o.title.replace(/\.$/, "")}
                  <span className="mt-1 block text-sm font-normal text-ink/75">{o.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
      <JsonLd data={articleLd({ title: g.title.replace(/\.$/, ""), description: g.description, path: `/dicas/${g.slug}` })} />
    </main>
  );
}
