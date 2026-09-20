"use client";

import { useId, useState } from "react";

export type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

/**
 * Acordeão acessível: cada título é um botão com aria-expanded/aria-controls,
 * o painel é uma região rotulada. Painéis fechados ficam fora da ordem de foco
 * (visibility: hidden). Vários painéis podem ficar abertos ao mesmo tempo.
 */
export function Accordion({
  items,
  variant,
}: {
  items: AccordionItem[];
  variant: "tips" | "faq";
}) {
  const base = useId();
  const [open, setOpen] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const big = variant === "tips";

  return (
    <div className={big ? "border-t-2 border-abyss" : "border-t border-mist"}>
      {items.map((item) => {
        const isOpen = open.has(item.id);
        const btnId = `${base}-${item.id}-btn`;
        const panelId = `${base}-${item.id}-panel`;
        return (
          <div key={item.id} className={big ? "border-b-2 border-abyss" : "border-b border-mist"}>
            <h3>
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className={`flex w-full items-center justify-between gap-6 text-left ${
                  big
                    ? "display py-6 text-[clamp(1.5rem,3vw,2.5rem)] text-abyss sm:py-8"
                    : "py-5 text-lg font-bold text-abyss sm:text-xl"
                }`}
              >
                <span className={big ? "max-w-[34ch]" : ""}>{item.title}</span>
                <span
                  className={`acc-icon flex flex-none items-center justify-center rounded-full bg-abyss text-white ${
                    big ? "h-12 w-12" : "h-10 w-10"
                  }`}
                  aria-hidden="true"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M9 3v12M3 9h12" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className="acc-panel"
              data-open={isOpen}
            >
              <div>
                <div className={big ? "pb-8 sm:pb-10" : "pb-6"}>{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
