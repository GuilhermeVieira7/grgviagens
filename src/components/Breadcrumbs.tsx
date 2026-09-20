import Link from "next/link";
import { breadcrumbLd } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export type Crumb = { name: string; path: string };

/** Migalhas de pão visíveis + BreadcrumbList estruturado. O último item é a página atual. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "Início", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Você está em" className="text-sm">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="font-semibold text-abyss">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={c.path}
                      className="inline-flex min-h-11 items-center text-royal underline-offset-4 hover:underline"
                    >
                      {c.name}
                    </Link>
                    <span aria-hidden="true" className="text-ink/40">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(all)} />
    </>
  );
}
