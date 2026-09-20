/**
 * Ponte entre os botões "Quero conhecer" e o planejador.
 * Guarda o destino na janela (caso o planejador ainda não tenha hidratado)
 * e avisa o planejador por um evento.
 */
export const DESTINATION_EVENT = "grg:destino";

declare global {
  interface Window {
    __grgDestino?: string;
  }
}

export function chooseDestination(name: string) {
  window.__grgDestino = name;
  window.dispatchEvent(new CustomEvent<string>(DESTINATION_EVENT, { detail: name }));

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document
    .getElementById("planejador")
    ?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", "#planejador");
}
