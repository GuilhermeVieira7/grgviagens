"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { Arrow } from "./Arrow";
import { WhatsAppIcon } from "./WhatsAppIcon";


/**
 * Botões fixos:
 *  - WhatsApp: visível desde o primeiro carregamento (já vem no HTML). Sai de cena
 *    enquanto o formulário está na tela, para não cobrir campos nem botões (o
 *    formulário tem o próprio caminho para o WhatsApp), e, no celular, também na
 *    abertura, na chamada final e no rodapé, que já mostram o contato.
 *  - "Planejar minha viagem" (só celular/tablet): aparece depois da abertura, ao
 *    rolar para cima, e some no planejador, no encerramento e no rodapé, para não
 *    cobrir campos nem outros botões.
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

  const pillShow = small && pastHero && up && inView.size === 0;
  // No celular, a abertura e a chamada final já têm o botão do WhatsApp
  const fabShow = !inView.has("planejador") && (!small || (pastHero && inView.size === 0));

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
        aria-label="Falar com a GRG no WhatsApp"
        data-track="whatsapp_contato"
        data-track-local="botao_flutuante"
        tabIndex={fabShow ? 0 : -1}
        aria-hidden={!fabShow}
        className={`on-dark flex h-14 w-14 flex-none items-center justify-center rounded-full bg-[#14874e] text-white shadow-[0_8px_24px_rgb(2_12_40/0.35)] transition-[opacity,transform,background-color] duration-300 hover:bg-[#0f6b3d] ${
          fabShow ? "pointer-events-auto opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <WhatsAppIcon className="h-8 w-8" />
      </a>
    </div>
  );
}
