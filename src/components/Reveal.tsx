"use client";

import { useEffect, useRef } from "react";

/**
 * Entrada progressiva: o conteúdo já nasce visível (sem JS, tudo aparece).
 * Só o que está abaixo da dobra é preparado e revelado ao entrar na tela.
 * Não faz nada com prefers-reduced-motion.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    el.classList.add("reveal-pre");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-in");
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={{ ["--d" as string]: `${delay}s` }}>
      {children}
    </div>
  );
}
