"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { Arrow } from "./Arrow";

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29Z" />
    </svg>
  );
}

/**
 * Botões fixos:
 *  - WhatsApp (todas as telas), depois da abertura. No celular só aparece ao rolar
 *    para cima, para não cobrir a leitura, e some sobre o planejador.
 *  - "Planejar minha viagem" (só celular/tablet), com a mesma regra, e também some
 *    no encerramento.
 * Ambos somem no rodapé, onde o contato já está.
 */
export function Dock() {
  const [pastHero, setPastHero] = useState(false);
  const [up, setUp] = useState(false);
  const [small, setSmall] = useState(false);
  const [inView, setInView] = useState<Set<string>>(() => new Set());
  const lastY = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const sync = () => setSmall(mq.matches);
    sync();
    mq.addEventListener("change", sync);

    const hero = document.getElementById("hero-cta");
    const ids = ["planejador", "encerramento", "rodape"];
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) {
          setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0);
        } else {
          setInView((prev) => {
            const next = new Set(prev);
            if (e.isIntersecting) next.add(e.target.id);
            else next.delete(e.target.id);
            return next;
          });
        }
      }
    });
    if (hero) io.observe(hero);
    const noHero = hero ? 0 : window.setTimeout(() => setPastHero(true), 0); // páginas sem abertura
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    lastY.current = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - lastY.current;
        if (Math.abs(dy) > 6) {
          setUp(dy < 0);
          lastY.current = y;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(noHero);
      mq.removeEventListener("change", sync);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const inFooter = inView.has("rodape");
  const waShow = pastHero && !inFooter && (small ? up && !inView.has("planejador") : true);
  const pillShow = small && pastHero && up && inView.size === 0;

  return (
    <div
      className="pointer-events-none fixed bottom-4 right-4 z-30 flex items-center gap-3"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        id="dock-planejar"
        href="#planejador"
        tabIndex={pillShow ? 0 : -1}
        aria-hidden={!pillShow}
        data-track="dock_planejar"
        className={`btn btn-lagoon on-dark shadow-[0_10px_30px_rgb(2_12_40/0.45)] transition-[opacity,transform] duration-300 hide-lg ${
          pillShow ? "pointer-events-auto translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        Planejar minha viagem <Arrow />
      </a>
      <a
        id="dock-whatsapp"
        href={siteConfig.whatsappContactUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={waShow ? 0 : -1}
        aria-hidden={!waShow}
        aria-label="Falar com a GRG no WhatsApp"
        data-track="whatsapp_contato"
        data-track-local="botao_flutuante"
        className={`on-dark flex h-14 w-14 flex-none items-center justify-center rounded-full bg-[#189d5b] text-white shadow-[0_10px_30px_rgb(2_12_40/0.45)] transition-[opacity,transform,background-color] duration-300 hover:bg-[#127a47] ${
          waShow ? "pointer-events-auto translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <WhatsAppIcon className="h-8 w-8" />
      </a>
    </div>
  );
}
