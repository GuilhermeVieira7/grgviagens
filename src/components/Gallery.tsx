"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gallery } from "@/content/places";
import { photos } from "@/content/photos";
import { Reveal } from "./Reveal";

/**
 * Mosaico editorial. Cada foto é um botão que abre uma ampliação em <dialog>
 * (Esc fecha, setas navegam, o foco volta ao botão de origem).
 * É uma galeria de inspiração: nenhuma legenda afirma que a GRG levou clientes.
 */
export function Gallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  const open = (i: number) => {
    setCurrent(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback((d: number) => {
    setCurrent((c) => (c === null ? c : (c + d + gallery.length) % gallery.length));
  }, []);

  useEffect(() => {
    if (current === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [current, step]);

  const item = current === null ? null : gallery[current];
  const photo = item ? photos[item.photo] : null;

  return (
    <section id="galeria" aria-labelledby="galeria-title" className="section-y bg-paper">
      <div className="wrap-wide">
        <Reveal className="mx-auto max-w-[46rem] text-center">
          <p className="eyebrow justify-center text-royal">Inspiração</p>
          <h2 id="galeria-title" className="h-section mt-5 text-abyss">
            Existem lugares que merecem ser vividos.
          </h2>
          <p className="lead mt-6 text-ink/85">
            Uma seleção de paisagens, cidades e experiências para inspirar sua próxima viagem.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:auto-rows-[clamp(14rem,17vw,20rem)] lg:grid-cols-4 lg:gap-5">
          {gallery.map((g, i) => {
            const p = photos[g.photo];
            return (
              <li key={g.photo} className={`relative ${g.className}`}>
                <button
                  type="button"
                  onClick={() => open(i)}
                  className="gal group absolute inset-0 block h-full w-full overflow-hidden rounded-[18px] bg-mist text-left"
                  aria-label={`Ampliar foto: ${g.place}`}
                  aria-haspopup="dialog"
                >
                  <Image
                    src={p.src}
                    alt={g.alt}
                    fill
                    loading="lazy"
                    quality={82}
                    sizes={g.sizes}
                    className="gal-img object-cover"
                    style={{ objectPosition: g.position }}
                  />
                  <span className="gal-cap absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-white">
                    <span className="display text-2xl">{g.place}</span>
                    <span className="gal-zoom flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white/95 text-abyss" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M11 2h5v5M7 16H2v-5M16 2l-5.5 5.5M2 16l5.5-5.5" />
                      </svg>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={item ? `Foto ampliada: ${item.place}` : "Foto ampliada"}
        onClose={() => setCurrent(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        {item && photo && (
          <div className="lightbox-inner">
            <div className="lightbox-frame">
              <Image
                key={item.photo}
                src={photo.src}
                alt={item.alt}
                width={photo.width}
                height={photo.height}
                sizes="100vw"
                quality={82}
                className="lightbox-img"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-white">
              <div>
                <p className="display text-2xl">{item.place}</p>
                <p className="mt-1 text-sm text-white/75">
                  Foto:{" "}
                  <a
                    href={photo.credit.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-lagoon"
                  >
                    {photo.credit.author}
                  </a>
                  , {photo.credit.license}, via Wikimedia Commons
                </p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="lb-btn" onClick={() => step(-1)} aria-label="Foto anterior">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 4 6 10l6 6" /></svg>
                </button>
                <button type="button" className="lb-btn" onClick={() => step(1)} aria-label="Próxima foto">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m8 4 6 6-6 6" /></svg>
                </button>
                <button type="button" className="lb-btn" onClick={close} aria-label="Fechar">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="m4 4 12 12M16 4 4 16" /></svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
