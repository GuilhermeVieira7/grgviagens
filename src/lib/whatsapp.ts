import { siteConfig } from "@/config/site";
import type { SelectionContext } from "@/content/offers";

export type ServiceChoice =
  | "passagem"
  | "hospedagem"
  | "pacote"
  | "passeios"
  | "veiculo"
  | "passaporte"
  | "indefinido";

export const serviceChoiceLabels: Record<ServiceChoice, string> = {
  passagem: "Passagem aérea",
  hospedagem: "Hospedagem",
  pacote: "Pacote completo",
  passeios: "Passeios e ingressos",
  veiculo: "Locação de veículo",
  passaporte: "Assessoria para passaporte",
  indefinido: "Ainda não sei",
};

export type BudgetBasis = "total" | "pessoa";

export type TripRequest = {
  name: string;
  origin: string;
  destination: string;
  undecidedDestination: boolean;
  departure: string; // yyyy-mm-dd
  returnDate: string; // yyyy-mm-dd
  flexibleDates: boolean;
  undecidedDates: boolean;
  approxPeriod: string;
  adults: number;
  children: number;
  childAges: string[]; // "0".."17" ou ""
  services: ServiceChoice[];
  budget: string;
  budgetBasis: BudgetBasis;
  lodging: string;
  notes: string;
  /** Oferta ou destino escolhido na vitrine, se houver. */
  selection?: SelectionContext | null;
};

export type FieldErrors = Partial<
  Record<
    | "name"
    | "origin"
    | "destination"
    | "departure"
    | "returnDate"
    | "adults"
    | "children"
    | "childAges",
    string
  >
>;

const MAX_ADULTS = 20;
const MAX_CHILDREN = 10;

/** yyyy-mm-dd de hoje no fuso local. */
export function todayISO(now = new Date()): string {
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${m}-${d}`;
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export function validateRequest(r: TripRequest, today = todayISO()): FieldErrors {
  const e: FieldErrors = {};

  if (!r.name.trim()) e.name = "Informe o seu nome.";
  if (!r.origin.trim()) e.origin = "Informe a cidade ou o aeroporto de saída.";

  if (!r.undecidedDestination && !r.destination.trim()) {
    e.destination = "Informe o destino ou marque “Ainda não escolhi o destino”.";
  }

  if (!r.undecidedDates) {
    if (!r.departure) {
      e.departure = "Informe a data de ida ou marque “Ainda não defini as datas”.";
    } else if (r.departure < today) {
      e.departure = "A data de ida não pode ser anterior a hoje.";
    }
    if (r.returnDate) {
      if (!r.departure) {
        e.returnDate = "Informe também a data de ida.";
      } else if (r.returnDate < r.departure) {
        e.returnDate = "A volta precisa ser no mesmo dia da ida ou depois dela.";
      }
    }
  }

  if (!Number.isInteger(r.adults) || r.adults < 1) {
    e.adults = "Inclua pelo menos 1 adulto na viagem.";
  } else if (r.adults > MAX_ADULTS) {
    e.adults = `Para grupos com mais de ${MAX_ADULTS} adultos, descreva nas observações.`;
  }

  if (!Number.isInteger(r.children) || r.children < 0) {
    e.children = "Informe uma quantidade válida de crianças, a partir de 0.";
  } else if (r.children > MAX_CHILDREN) {
    e.children = `Para mais de ${MAX_CHILDREN} crianças, descreva nas observações.`;
  } else if (r.children > 0) {
    const missing = r.childAges.slice(0, r.children).some((a) => a === "");
    if (missing || r.childAges.length < r.children) {
      e.childAges = "Informe a idade de cada criança.";
    }
  }

  return e;
}

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

function ageLabel(a: string): string {
  const n = Number(a);
  if (n === 0) return "menos de 1 ano";
  return n === 1 ? "1 ano" : `${n} anos`;
}

export function buildMessage(r: TripRequest): string {
  const destino = r.undecidedDestination ? "Ainda não escolhi o destino" : r.destination.trim();
  // O contexto da vitrine só vale enquanto o destino escolhido não for trocado.
  const sel = r.selection && !r.undecidedDestination && r.selection.destination === r.destination.trim() ? r.selection : null;

  let periodo: string;
  if (r.undecidedDates) {
    periodo = r.approxPeriod.trim()
      ? `Ainda não defini as datas (${r.approxPeriod.trim()})`
      : "Ainda não defini as datas";
  } else {
    periodo = r.returnDate
      ? `${formatDate(r.departure)} a ${formatDate(r.returnDate)}`
      : `Ida em ${formatDate(r.departure)}`;
    if (r.flexibleDates) periodo += " (datas flexíveis)";
  }

  const viajantes = [
    plural(r.adults, "adulto", "adultos"),
    r.children > 0 ? plural(r.children, "criança", "crianças") : null,
  ]
    .filter(Boolean)
    .join(" e ");

  const lines = [
    sel?.isOffer
      ? `Olá, GRG! Tenho interesse no pacote para ${sel.destination} divulgado no site.`
      : "Olá, GRG! Quero planejar uma viagem.",
    "",
    `Nome: ${r.name.trim()}`,
    `Saída: ${r.origin.trim()}`,
    `Destino: ${destino}`,
    `Período: ${periodo}`,
    `Viajantes: ${viajantes}`,
  ];
  if (r.children > 0) {
    lines.push(
      `Idades das crianças: ${r.childAges.slice(0, r.children).map(ageLabel).join(", ")}`,
    );
  }
  if (sel?.isOffer && sel.details.length) {
    lines.push("", `Pacote de interesse (ref. ${sel.id}):`, ...sel.details.map((d) => `- ${d}`));
  }
  const extras: string[] = [];
  if (r.services.length) extras.push(`Quero cotar: ${r.services.map((k) => serviceChoiceLabels[k]).join(", ")}`);
  if (r.budget.trim()) {
    extras.push(`Orçamento aproximado: ${r.budget.trim()} (${r.budgetBasis === "pessoa" ? "por pessoa" : "total da viagem"})`);
  }
  if (r.lodging.trim()) extras.push(`Hospedagem: ${r.lodging.trim()}`);
  if (r.notes.trim()) extras.push(`Observações: ${r.notes.trim()}`);
  if (extras.length) lines.push("", ...extras);

  return lines.join("\n");
}

/** Número oficial (só dígitos) válido, ou null. */
export function whatsappDigits(): string | null {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  return /^55\d{10,11}$/.test(digits) ? digits : null;
}

/** Link do WhatsApp, ou null enquanto o número não estiver configurado. */
export function whatsappHref(message: string): string | null {
  const digits = siteConfig.whatsappNumber.replace(/\D/g, "");
  // 55 + DDD (2) + número (8 ou 9 dígitos)
  if (!/^55\d{10,11}$/.test(digits)) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
