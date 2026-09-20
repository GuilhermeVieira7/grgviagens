"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { navLinks } from "@/config/site";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback((returnFocus = true) => {
    document.body.style.overflow = "";
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  const openMenu = () => {
    document.body.style.overflow = "hidden";
    setOpen(true);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Foco no botão de fechar ao abrir; fecha com Escape; mantém o foco dentro do painel
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) closeMenu(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, closeMenu]);

  useEffect(() => () => {
    document.body.style.overflow = "";
  }, []);

  return (
    <>
      <header
        className={`on-dark fixed inset-x-0 top-0 z-40 h-[var(--header-h)] text-white transition-[background-color,box-shadow] duration-300 ${
          scrolled || pathname !== "/" ? "bg-abyss shadow-[0_6px_24px_rgb(2_12_40/0.35)]" : "bg-transparent"
        }`}
      >
        <div className="wrap-wide flex h-full items-center justify-between">
          <Link prefetch={false} href="/" className="flex-none rounded-full" aria-label="GRG Viagens, agência de viagens: voltar ao início">
            <Image
              src="/brand/logo-256.png"
              alt=""
              width={56}
              height={56}
              className="h-12 w-12 md:h-14 md:w-14"
              loading="eager"
            />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-9 lg:flex">
            {navLinks.map((l) => (
              <Link prefetch={false}
                key={l.href}
                href={l.href}
                className="inline-flex min-h-11 items-center text-base font-semibold text-white/90 underline-offset-8 transition-colors hover:text-lagoon hover:underline"
              >
                {l.label}
              </Link>
            ))}
            <Link prefetch={false} href="/#planejador" data-track="header_planejar" className="btn btn-lagoon !min-h-11 !px-5 !py-2">
              Planejar minha viagem
            </Link>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 flex h-12 w-12 items-center justify-center rounded-full lg:hidden"
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={openMenu}
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
              <path d="M4 8h18M4 13h18M4 18h18" />
            </svg>
          </button>
        </div>
      </header>

      {open && (
        <div
          id="menu-mobile"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu principal"
          className="on-dark fixed inset-0 z-50 flex flex-col bg-abyss text-white lg:hidden"
        >
          <div className="wrap-wide flex h-[var(--header-h)] flex-none items-center justify-between">
            <Link prefetch={false} href="/" onClick={() => closeMenu(false)} aria-label="GRG Viagens, voltar ao início">
              <Image src="/brand/logo-256.png" alt="" width={48} height={48} className="h-12 w-12" />
            </Link>
            <button
              ref={closeRef}
              type="button"
              className="-mr-2 flex h-12 w-12 items-center justify-center rounded-full"
              aria-label="Fechar menu"
              onClick={() => closeMenu()}
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <path d="M5 5l16 16M21 5 5 21" />
              </svg>
            </button>
          </div>

          <nav aria-label="Menu" className="wrap-wide flex flex-1 flex-col justify-center gap-1 pb-6">
            {navLinks.map((l) => (
              <Link prefetch={false}
                key={l.href}
                href={l.href}
                onClick={() => closeMenu(false)}
                className="display border-b border-white/15 py-4 text-[2.25rem] transition-colors hover:text-lagoon"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="wrap-wide flex-none pb-[max(2rem,env(safe-area-inset-bottom))]">
            <Link prefetch={false} href="/#planejador" onClick={() => closeMenu(false)} className="btn btn-lagoon w-full">
              Planejar minha viagem
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
