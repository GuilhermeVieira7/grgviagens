"use client";

import Script from "next/script";
import { useEffect } from "react";
import { siteConfig } from "@/config/site";
import { track } from "@/lib/analytics";

/**
 * Carrega o script de analytics (se configurado) e registra cliques em qualquer
 * elemento com data-track="nome" e, opcionalmente, data-track-local / data-track-destino.
 */
export function Analytics() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const props: Record<string, string> = {};
      if (el.dataset.trackLocal) props.local = el.dataset.trackLocal;
      if (el.dataset.trackDestino) props.destino = el.dataset.trackDestino;
      track(el.dataset.track!, Object.keys(props).length ? props : undefined);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const { plausibleDomain, umamiId, umamiSrc } = siteConfig;
  return (
    <>
      {plausibleDomain && (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
      {umamiId && <Script defer data-website-id={umamiId} src={umamiSrc} strategy="afterInteractive" />}
    </>
  );
}
