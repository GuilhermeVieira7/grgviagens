"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { strip } from "@/content/places";
import { photos } from "@/content/photos";
import { Reveal } from "./Reveal";

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Tile({ i, dup = false }: { i: number; dup?: boolean }) {
  const s = strip[i];
  const p = photos[s.photo];
  return (
    <li
      className="relative aspect-[4/5] w-[15.5rem] flex-none snap-start overflow-hidden rounded-[20px] bg-white/10 sm:w-[17.5rem] lg:w-[19rem] 2xl:w-[21rem]"
      aria-hidden={dup || undefined}
    >
      <Image
        src={p.src}
        alt={dup ? "" : s.alt}
        fill
        loading="lazy"
        quality={82}
        sizes="(min-width:1536px) 336px, (min-width:1024px) 304px, (min-width:640px) 280px, 248px"
        className="object-cover"
        style={{ objectPosition: s.position }}
      />
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-deep/80 to-transparent p-4 pt-12 text-sm font-semibold text-white">
        {s.place}
      </span>
    </li>
  );
}

/**
 * Faixa de inspirações (não são publicações reais do Instagram).
 * No desktop com mouse ela anda sozinha, bem devagar, e NÃO para com o mouse em
 * cima. Ela só cede o controle quando o visitante realmente a manipula: segura e
 * arrasta, ou navega por teclado (foco visível). Rolagem horizontal do trackpad é
 * acompanhada sem travar. No celular e com movimento reduzido ela fica parada, com
 * rolagem natural por gestos.
 */
export function InstagramStrip() {
  const scroller = useRef<HTMLDivElement>(null);
  const [auto, setAuto] = useState(false);
  const ig = siteConfig.instagramUrl;

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const sync = () => setAuto(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!auto || !el) return;
    let raf = 0;
    let last = 0;
    let holding = false; // botão/dedo pressionado (arrastando)
    let keyboard = false; // foco por teclado dentro da faixa
    let inView = true;
    let pos = el.scrollLeft;

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      if (holding || keyboard || !inView || document.hidden) {
        pos = el.scrollLeft;
        return;
      }
      pos += 28 * dt; // px/s: lento e constante
      const half = el.scrollWidth / 2;
      if (pos >= half) pos -= half;
      el.scrollLeft = pos;
    };
    // Rolagem feita pelo visitante (trackpad, barra, teclado): continua de onde ele parou
    const onScroll = () => {
      if (Math.abs(el.scrollLeft - pos) > 2) pos = el.scrollLeft;
    };
    const down = () => (holding = true);
    const up = () => (holding = false);
    const focusIn = () => (keyboard = el.matches(":focus-visible") || !!el.querySelector(":focus-visible"));
    const focusOut = () => (keyboard = false);

    el.addEventListener("pointerdown", down, { passive: true });
    el.addEventListener("touchstart", down, { passive: true });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    window.addEventListener("touchend", up);
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("focusin", focusIn);
    el.addEventListener("focusout", focusOut);
    const io = new IntersectionObserver(([e]) => (inView = e.isIntersecting));
    io.observe(el);
    raf = requestAnimationFrame((t) => {
      last = t;
      tick(t);
    });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("touchstart", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      window.removeEventListener("touchend", up);
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("focusin", focusIn);
      el.removeEventListener("focusout", focusOut);
      io.disconnect();
    };
  }, [auto]);

  return (
    <section
      id="instagram"
      aria-labelledby="ig-title"
      className="on-dark section-y overflow-hidden bg-deep text-white"
    >
      <div className="wrap-wide">
        <Reveal className="mx-auto max-w-[46rem] text-center">
          <p className="eyebrow justify-center text-lagoon">Instagram</p>
          <h2 id="ig-title" className="h-section mt-5">
            O mundo também passa pelo nosso Instagram.
          </h2>
          <p className="lead mt-6 text-white/85">
            Destinos, dicas e inspirações para você começar a planejar sua próxima viagem.
          </p>
        </Reveal>
      </div>

      <div
        ref={scroller}
        className="strip mt-12 lg:mt-14"
        role="region"
        aria-label="Faixa de fotografias de destinos, inspirações visuais"
        tabIndex={0}
      >
        <ul className="strip-track">
          {strip.map((_, i) => (
            <Tile key={i} i={i} />
          ))}
          {auto && strip.map((_, i) => <Tile key={`d${i}`} i={i} dup />)}
        </ul>
      </div>

      <div className="wrap-wide mt-10 flex flex-col items-center gap-4 text-center lg:mt-12">
        {ig ? (
          <a
            href={ig}
            target="_blank"
            rel="noopener noreferrer"
            data-track="instagram_click"
            data-track-local="faixa"
            className="btn btn-lagoon !min-h-14 !px-8 text-[1.0625rem]"
          >
            <InstagramIcon className="h-6 w-6 flex-none" />
            Seguir a GRG no Instagram
          </a>
        ) : (
          <>
            <span
              role="link"
              aria-disabled="true"
              className="btn btn-lagoon !min-h-14 !px-8 text-[1.0625rem] cursor-not-allowed opacity-60"
            >
              <InstagramIcon className="h-6 w-6 flex-none" />
              Seguir a GRG no Instagram
            </span>
            {process.env.NODE_ENV !== "production" && (
              <p className="text-sm text-lagoon">
                Preencha INSTAGRAM_URL em src/config/site.ts para ativar este botão.
              </p>
            )}
          </>
        )}
        <p className="max-w-[34rem] text-sm text-white/65">
          Imagens de inspiração, sem relação com publicações do perfil. Créditos no rodapé.
        </p>
      </div>
    </section>
  );
}
