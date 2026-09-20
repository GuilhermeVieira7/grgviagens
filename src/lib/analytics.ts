/**
 * Eventos de conversão, sem cookies. Só enviam algo se o Plausible ou o Umami
 * estiverem configurados (ver src/config/site.ts); caso contrário são no-ops.
 */
type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: Props }) => void;
    umami?: { track: (event: string, props?: Props) => void };
  }
}

export function track(event: string, props?: Props) {
  if (typeof window === "undefined") return;
  try {
    window.plausible?.(event, props ? { props } : undefined);
    window.umami?.track(event, props);
  } catch {
    /* analytics nunca pode quebrar o site */
  }
}
