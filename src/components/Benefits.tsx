import { benefits } from "@/content/text";

/** Faixa discreta logo após a abertura: três benefícios concretos, só tipografia. */
export function Benefits() {
  return (
    <section aria-label="Por que pedir sua cotação à GRG" className="border-b border-mist bg-white">
      <ul className="wrap-wide grid divide-y divide-mist md:grid-cols-3 md:divide-x md:divide-y-0">
        {benefits.map((b, i) => (
          <li key={b.title} className="flex gap-4 py-6 md:px-8 md:py-9 md:first:pl-0 md:last:pr-0 lg:px-12">
            <span className="display flex-none pt-0.5 text-lg text-royal" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h2 className="text-lg font-bold leading-snug text-abyss">{b.title}</h2>
              <p className="mt-1 text-[1rem] leading-relaxed text-ink/80">{b.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
