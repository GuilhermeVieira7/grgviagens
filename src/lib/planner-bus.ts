import type { SelectionContext } from "@/content/offers";

/**
 * Ponte entre a vitrine ("Quero esse pacote" / "Solicitar cotação") e o formulário.
 * Guarda a escolha na janela (caso o formulário ainda não tenha hidratado),
 * avisa o formulário por um evento e rola até o cartão do formulário, onde o
 * destino escolhido aparece logo no topo.
 */
export const DESTINATION_EVENT = "grg:destino";

declare global {
  interface Window {
    __grgEscolha?: SelectionContext;
  }
}

export function chooseSelection(sel: SelectionContext) {
  window.__grgEscolha = sel;
  window.dispatchEvent(new CustomEvent<SelectionContext>(DESTINATION_EVENT, { detail: sel }));

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const target = document.getElementById("cotacao-form") ?? document.getElementById("planejador");
  target?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.replaceState(null, "", "#planejador");
}
