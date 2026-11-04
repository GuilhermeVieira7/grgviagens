"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { siteConfig } from "@/config/site";
import type { SelectionContext } from "@/content/offers";
import { destinationOptions, originOptions } from "@/content/locations";
import { track } from "@/lib/analytics";
import { DESTINATION_EVENT } from "@/lib/planner-bus";
import {
  buildMessage,
  serviceChoiceLabels,
  todayISO,
  validateRequest,
  whatsappHref,
  type BudgetBasis,
  type FieldErrors,
  type ServiceChoice,
  type TripRequest,
} from "@/lib/whatsapp";
import { Arrow } from "./Arrow";
import { Combobox } from "./Combobox";
import { WhatsAppIcon } from "./WhatsAppIcon";

const noopSubscribe = () => () => {};
const toInt = (s: string) => (s.trim() === "" ? NaN : Number(s));

const MAX_CHILDREN = 10;
const MAX_ADULTS = 20;
const TRIP_LENGTHS = [7, 10, 14];

const AGE_OPTIONS = [
  { value: "0", label: "Menos de 1 ano" },
  ...Array.from({ length: 17 }, (_, i) => ({
    value: String(i + 1),
    label: i === 0 ? "1 ano" : `${i + 1} anos`,
  })),
];

function addDays(iso: string, n: number) {
  const d = new Date(`${iso}T12:00:00`);
  d.setDate(d.getDate() + n);
  return todayISO(d);
}

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-ink/70">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

function Stepper({
  id,
  label,
  value,
  min,
  max,
  onChange,
  invalid,
  describedBy,
  noun,
}: {
  id: string;
  label: string;
  value: string;
  min: number;
  max: number;
  onChange: (v: string) => void;
  invalid?: boolean;
  describedBy?: string;
  noun: string;
}) {
  const n = toInt(value);
  const num = Number.isFinite(n) ? n : 0;
  return (
    <div className="pax">
      <label htmlFor={id} className="pax-label">
        {label}
      </label>
      <div className="stepper">
        <button type="button" aria-label={`Diminuir ${noun}`} onClick={() => onChange(String(Math.max(min, num - 1)))} disabled={num <= min}>
          −
        </button>
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={invalid ? true : undefined}
          aria-describedby={describedBy}
        />
        <button type="button" aria-label={`Aumentar ${noun}`} onClick={() => onChange(String(Math.min(max, num + 1)))} disabled={num >= max}>
          +
        </button>
      </div>
    </div>
  );
}

const ERROR_ORDER: [keyof FieldErrors, string][] = [
  ["name", "f-name"],
  ["origin", "f-origin"],
  ["destination", "f-destination"],
  ["departure", "f-departure"],
  ["returnDate", "f-return"],
  ["adults", "f-adults"],
  ["children", "f-children"],
  ["childAges", "f-age-0"],
];

/**
 * Pedido de cotação. Três grupos curtos (viagem, datas, viajantes) e uma área
 * opcional "Personalizar minha viagem". Ao final o visitante revisa (e pode
 * editar) a mensagem, que abre no WhatsApp oficial para ele mesmo enviar.
 * Nada é enviado pelo site e nenhum dado é guardado.
 */
export function Planner({ defaultDestination = "" }: { defaultDestination?: string }) {
  const uid = useId();
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState(defaultDestination);
  const [selection, setSelection] = useState<SelectionContext | null>(null);
  const [undecidedDest, setUndecidedDest] = useState(false);
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [undecidedDates, setUndecidedDates] = useState(false);
  const [flexibleDates, setFlexibleDates] = useState(false);
  const [approx, setApprox] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [childAges, setChildAges] = useState<string[]>([]);
  const [services, setServices] = useState<ServiceChoice[]>([]);
  const [budget, setBudget] = useState("");
  const [budgetBasis, setBudgetBasis] = useState<BudgetBasis>("total");
  const [lodging, setLodging] = useState("");
  const [notes, setNotes] = useState("");
  const [customOpen, setCustomOpen] = useState(false);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [review, setReview] = useState(false);
  const [message, setMessage] = useState("");
  const [announce, setAnnounce] = useState("");
  const [status, setStatus] = useState<"idle" | "copied" | "copy-fail" | "opened">("idle");
  // vazio no servidor; data local do visitante no navegador
  const today = useSyncExternalStore(noopSubscribe, () => todayISO(), () => "");

  const originRef = useRef<HTMLInputElement>(null);
  const reviewRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const applySelection = useCallback((sel: SelectionContext) => {
    setSelection(sel);
    setDestination(sel.destination);
    setUndecidedDest(false);
    if (sel.origin) setOrigin((o) => o || sel.origin!);
    setErrors((e) => ({ ...e, destination: undefined }));
    setReview(false);
    setStatus("idle");
    setAnnounce(`Destino escolhido: ${sel.destination}. Agora conte de onde você vai sair e quando.`);
    // Em telas de toque, focar abriria o teclado e cobriria o formulário
    if (window.matchMedia("(pointer: fine)").matches) {
      window.setTimeout(() => originRef.current?.focus({ preventScroll: true }), 500);
    }
  }, []);

  useEffect(() => {
    // Escolha feita antes da hidratação do formulário
    const pending = window.setTimeout(() => {
      if (window.__grgEscolha) applySelection(window.__grgEscolha);
    }, 0);
    const onChoose = (e: Event) => applySelection((e as CustomEvent<SelectionContext>).detail);
    window.addEventListener(DESTINATION_EVENT, onChoose);
    return () => {
      window.clearTimeout(pending);
      window.removeEventListener(DESTINATION_EVENT, onChoose);
    };
  }, [applySelection]);

  const childrenN = (() => {
    const n = toInt(children);
    return Number.isInteger(n) && n > 0 ? Math.min(n, MAX_CHILDREN) : 0;
  })();

  // A escolha da vitrine continua valendo enquanto o destino não for trocado
  const activeSelection =
    selection && !undecidedDest && selection.destination === destination.trim() ? selection : null;

  const request = (): TripRequest => ({
    name,
    origin,
    destination,
    undecidedDestination: undecidedDest,
    departure,
    returnDate,
    flexibleDates,
    undecidedDates,
    approxPeriod: approx,
    adults: toInt(adults),
    children: toInt(children),
    childAges: Array.from({ length: childrenN }, (_, i) => childAges[i] ?? ""),
    services,
    budget,
    budgetBasis,
    lodging,
    notes,
    selection: activeSelection,
  });

  const focusFirstError = (errs: FieldErrors) => {
    for (const [key, id] of ERROR_ORDER) {
      if (!errs[key]) continue;
      let target = document.getElementById(id);
      if (key === "childAges") {
        const firstEmpty = Array.from({ length: childrenN }, (_, i) => i).find((i) => !(childAges[i] ?? ""));
        target = document.getElementById(`f-age-${firstEmpty ?? 0}`);
      }
      target?.focus();
      target?.scrollIntoView({ block: "center" });
      return;
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateRequest(request(), today || todayISO());
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const n = Object.keys(errs).length;
      setAnnounce(n === 1 ? "Falta 1 informação. Confira o campo destacado." : `Faltam ${n} informações. Confira os campos destacados.`);
      window.setTimeout(() => focusFirstError(errs), 30);
      return;
    }
    track("form_submit_valido", activeSelection ? { oferta: activeSelection.id } : undefined);
    setAnnounce("");
    setStatus("idle");
    setMessage(buildMessage(request()));
    setReview(true);
    window.setTimeout(() => {
      cardRef.current?.scrollIntoView({ block: "start" });
      reviewRef.current?.focus({ preventScroll: true });
    }, 50);
  };

  const href = review && message.trim() ? whatsappHref(message) : null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setStatus("copied");
      track("mensagem_copiada");
    } catch {
      const ta = messageRef.current;
      if (ta) {
        ta.focus();
        ta.select();
        try {
          if (document.execCommand("copy")) {
            setStatus("copied");
            track("mensagem_copiada");
            return;
          }
        } catch {
          /* segue para a mensagem de falha */
        }
      }
      setStatus("copy-fail");
    }
  };

  const backToForm = () => {
    setReview(false);
    setStatus("idle");
    window.setTimeout(() => {
      cardRef.current?.scrollIntoView({ block: "start" });
      document.getElementById("f-name")?.focus({ preventScroll: true });
    }, 50);
  };

  const clearSelection = () => {
    setSelection(null);
    setDestination("");
    window.__grgEscolha = undefined;
    // Sem focar o campo: a lista de sugestões abriria por cima de "Ainda não escolhi o destino"
    setAnnounce("Destino removido. Escolha outro destino ou marque “Ainda não escolhi o destino”.");
  };

  const toggleService = (k: ServiceChoice) =>
    setServices((s) => (s.includes(k) ? s.filter((x) => x !== k) : [...s, k]));

  const invalid = (k: keyof FieldErrors) => (errors[k] ? true : undefined);
  const describe = (k: keyof FieldErrors, id: string) => (errors[k] ? `${id}-err` : undefined);
  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <section
      id="planejador"
      aria-labelledby="planejador-title"
      className="on-dark section-y relative overflow-hidden bg-abyss text-white"
    >
      <div className="wrap-wide grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <p className="eyebrow text-lagoon">Pedido de cotação</p>
            <h2 id="planejador-title" className="h-section mt-5">
              Conte como você quer viajar.
            </h2>
            <p className="lead mt-6 max-w-[32rem] text-white/90">
              Com origem, destino, período e quem vai, a equipe da GRG já consegue pesquisar as opções e montar a sua
              cotação.
            </p>
            <ul className="mt-8 space-y-3 text-white/85">
              {[
                "Sem cadastro e sem pedir telefone ou e-mail.",
                "Você revisa a mensagem antes: nada é enviado automaticamente.",
                "Valores e condições são informados pelo atendimento.",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-lagoon" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-white/80">
              Prefere conversar direto?{" "}
              <a
                href={siteConfig.whatsappContactUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track="whatsapp_contato"
                data-track-local="planejador_lateral"
                className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-white underline decoration-lagoon underline-offset-4 hover:text-lagoon"
              >
                Chame no WhatsApp
              </a>
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div
            id="cotacao-form"
            ref={cardRef}
            className="on-light rounded-[10px] bg-white p-5 text-ink sm:p-9 lg:p-11"
          >
            <p className="sr-only" role="status" aria-live="polite">
              {announce}
            </p>

            {!review ? (
              <form onSubmit={onSubmit} noValidate aria-label="Pedido de cotação de viagem" className="grid gap-8">
                {activeSelection && (
                  <div className="selection" aria-label="Destino escolhido na vitrine">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-royal">
                        {activeSelection.isOffer ? "Pacote escolhido" : "Destino escolhido"}
                      </p>
                      <p className="display mt-1 text-[1.5rem] text-abyss">{activeSelection.destination}</p>
                      {activeSelection.details.length > 0 && (
                        <ul className="mt-2 space-y-0.5 text-[0.9375rem] text-ink/80">
                          {activeSelection.details.map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <button type="button" onClick={clearSelection} className="min-h-11 flex-none font-semibold text-royal underline underline-offset-4">
                      Trocar
                    </button>
                  </div>
                )}

                {errorCount > 0 && (
                  <p className="rounded-[8px] border-2 border-[#b3261e] bg-[#fdf1f0] px-4 py-3 font-semibold text-[#8c1d18]">
                    {errorCount === 1
                      ? "Falta 1 informação. Confira o campo destacado."
                      : `Faltam ${errorCount} informações. Confira os campos destacados.`}
                  </p>
                )}

                {/* Viagem */}
                <div role="group" aria-labelledby="g-viagem" className="form-group form-group-first sm:grid-cols-2">
                  <h3 id="g-viagem" className="form-title sm:col-span-2">Sua viagem</h3>
                  <div className="sm:col-span-2">
                    <Field id="f-name" label="Seu nome" error={errors.name}>
                      <input
                        id="f-name"
                        className="field"
                        type="text"
                        autoComplete="name"
                        placeholder="Como podemos chamar você?"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrors((x) => ({ ...x, name: undefined }));
                        }}
                        aria-invalid={invalid("name")}
                        aria-describedby={describe("name", "f-name")}
                        aria-required="true"
                        maxLength={80}
                      />
                    </Field>
                  </div>
                  <Field id="f-origin" label="Cidade ou aeroporto de origem" error={errors.origin}>
                    <Combobox
                      inputRef={originRef}
                      id="f-origin"
                      autoComplete="address-level2"
                      placeholder="De onde você vai sair?"
                      value={origin}
                      onChange={(v) => {
                        setOrigin(v);
                        setErrors((x) => ({ ...x, origin: undefined }));
                      }}
                      options={originOptions}
                      ariaInvalid={invalid("origin")}
                      ariaDescribedBy={describe("origin", "f-origin")}
                      ariaRequired
                    />
                  </Field>
                  <div className="min-w-0">
                    <Field id="f-destination" label="Destino desejado" error={errors.destination}>
                      <Combobox
                        id="f-destination"
                        placeholder="Para onde quer ir?"
                        value={undecidedDest ? "" : destination}
                        disabled={undecidedDest}
                        onChange={(v) => {
                          setDestination(v);
                          setErrors((x) => ({ ...x, destination: undefined }));
                        }}
                        options={destinationOptions}
                        ariaInvalid={invalid("destination")}
                        ariaDescribedBy={describe("destination", "f-destination")}
                        ariaRequired={!undecidedDest}
                      />
                    </Field>
                    <label className="check mt-1">
                      <input
                        type="checkbox"
                        checked={undecidedDest}
                        onChange={(e) => {
                          setUndecidedDest(e.target.checked);
                          setErrors((x) => ({ ...x, destination: undefined }));
                        }}
                      />
                      Ainda não escolhi o destino
                    </label>
                  </div>
                </div>

                {/* Datas */}
                <div role="group" aria-labelledby="g-quando" className="form-group sm:grid-cols-2">
                  <h3 id="g-quando" className="form-title sm:col-span-2">Quando</h3>
                  <Field id="f-departure" label="Data de ida" error={errors.departure}>
                    <input
                      id="f-departure"
                      className="field"
                      type="date"
                      min={today || undefined}
                      value={undecidedDates ? "" : departure}
                      disabled={undecidedDates}
                      onChange={(e) => {
                        const v = e.target.value;
                        setDeparture(v);
                        if (returnDate && v && returnDate < v) setReturnDate("");
                        setErrors((x) => ({ ...x, departure: undefined, returnDate: undefined }));
                      }}
                      aria-invalid={invalid("departure")}
                      aria-describedby={describe("departure", "f-departure")}
                      aria-required={!undecidedDates}
                    />
                  </Field>
                  <Field id="f-return" label="Data de volta (opcional)" error={errors.returnDate}>
                    <input
                      id="f-return"
                      className="field"
                      type="date"
                      min={departure || today || undefined}
                      value={undecidedDates ? "" : returnDate}
                      disabled={undecidedDates}
                      onChange={(e) => {
                        setReturnDate(e.target.value);
                        setErrors((x) => ({ ...x, returnDate: undefined }));
                      }}
                      aria-invalid={invalid("returnDate")}
                      aria-describedby={describe("returnDate", "f-return")}
                    />
                  </Field>

                  {departure && !undecidedDates && (
                    <div className="sm:col-span-2" role="group" aria-label="Atalhos para a data de volta">
                      <p className="field-label">Volta rápida</p>
                      <div className="flex flex-wrap gap-2">
                        {TRIP_LENGTHS.map((n) => {
                          const target = addDays(departure, n);
                          return (
                            <button
                              key={n}
                              type="button"
                              className="chip"
                              aria-pressed={returnDate === target}
                              onClick={() => {
                                setReturnDate(target);
                                setErrors((x) => ({ ...x, returnDate: undefined }));
                              }}
                            >
                              {n} dias depois
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="sm:col-span-2">
                    <label className="check">
                      <input
                        type="checkbox"
                        checked={flexibleDates && !undecidedDates}
                        disabled={undecidedDates}
                        onChange={(e) => setFlexibleDates(e.target.checked)}
                      />
                      Minhas datas são flexíveis
                    </label>
                    <label className="check">
                      <input
                        type="checkbox"
                        checked={undecidedDates}
                        onChange={(e) => {
                          setUndecidedDates(e.target.checked);
                          setErrors((x) => ({ ...x, departure: undefined, returnDate: undefined }));
                        }}
                      />
                      Ainda não defini as datas
                    </label>
                    {undecidedDates && (
                      <div className="mt-3">
                        <Field
                          id="f-approx"
                          label="Período aproximado (opcional)"
                          hint="Por exemplo: julho, férias de fim de ano, feriado prolongado."
                        >
                          <input
                            id="f-approx"
                            className="field"
                            type="text"
                            maxLength={80}
                            aria-describedby="f-approx-hint"
                            value={approx}
                            onChange={(e) => setApprox(e.target.value)}
                          />
                        </Field>
                      </div>
                    )}
                  </div>
                </div>

                {/* Viajantes */}
                <div role="group" aria-labelledby="g-quem" className="form-group sm:grid-cols-2">
                  <h3 id="g-quem" className="form-title sm:col-span-2">Quem vai</h3>
                  <div className="min-w-0">
                    <Stepper
                      id="f-adults"
                      label="Adultos"
                      noun="adultos"
                      value={adults}
                      min={1}
                      max={MAX_ADULTS}
                      onChange={(v) => {
                        setAdults(v);
                        setErrors((x) => ({ ...x, adults: undefined }));
                      }}
                      invalid={!!errors.adults}
                      describedBy={describe("adults", "f-adults")}
                    />
                    {errors.adults && (
                      <p id="f-adults-err" className="field-error">
                        {errors.adults}
                      </p>
                    )}
                  </div>
                  <div className="min-w-0">
                    <Stepper
                      id="f-children"
                      label="Crianças"
                      noun="crianças"
                      value={children}
                      min={0}
                      max={MAX_CHILDREN}
                      onChange={(v) => {
                        setChildren(v);
                        setErrors((x) => ({ ...x, children: undefined, childAges: undefined }));
                      }}
                      invalid={!!errors.children}
                      describedBy={describe("children", "f-children")}
                    />
                    {errors.children && (
                      <p id="f-children-err" className="field-error">
                        {errors.children}
                      </p>
                    )}
                  </div>

                  {childrenN > 0 && (
                    <fieldset className="min-w-0 sm:col-span-2" aria-describedby={errors.childAges ? "f-ages-err" : "f-ages-hint"}>
                      <legend className="field-label">Idade de cada criança</legend>
                      <p id="f-ages-hint" className="-mt-1 mb-3 text-sm text-ink/70">
                        A idade na data da viagem muda tarifas e regras de hospedagem.
                      </p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {Array.from({ length: childrenN }, (_, i) => (
                          <div key={i} className="min-w-0">
                            <label htmlFor={`f-age-${i}`} className="mb-1 block text-sm font-semibold text-ink/80">
                              Criança {i + 1}
                            </label>
                            <select
                              id={`f-age-${i}`}
                              className="field"
                              value={childAges[i] ?? ""}
                              onChange={(e) => {
                                const next = [...childAges];
                                next[i] = e.target.value;
                                setChildAges(next);
                                setErrors((x) => ({ ...x, childAges: undefined }));
                              }}
                              aria-invalid={errors.childAges && !(childAges[i] ?? "") ? true : undefined}
                            >
                              <option value="">Selecione a idade</option>
                              {AGE_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>
                                  {o.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                      {errors.childAges && (
                        <p id="f-ages-err" className="field-error">
                          {errors.childAges}
                        </p>
                      )}
                    </fieldset>
                  )}
                </div>

                {/* Opcional */}
                <details
                  className="custom"
                  open={customOpen}
                  onToggle={(e) => {
                    const open = (e.currentTarget as HTMLDetailsElement).open;
                    setCustomOpen(open);
                    if (open) track("cotacao_personalizar");
                  }}
                >
                  <summary>
                    <span>
                      <span className="block font-bold text-abyss">Personalizar minha viagem</span>
                      <span className="block text-sm text-ink/70">Opcional: serviços, orçamento, hospedagem e observações.</span>
                    </span>
                    <span className="custom-icon" aria-hidden="true">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M8 3v10M3 8h10" />
                      </svg>
                    </span>
                  </summary>

                  <div className="grid gap-6 pt-5">
                    <fieldset>
                      <legend className="field-label">O que você quer cotar?</legend>
                      <div className="flex flex-wrap gap-2">
                        {(Object.keys(serviceChoiceLabels) as ServiceChoice[]).map((k) => (
                          <label key={k} className="pill-check">
                            <input type="checkbox" checked={services.includes(k)} onChange={() => toggleService(k)} />
                            <span>{serviceChoiceLabels[k]}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <div className="grid gap-3">
                      <Field id="f-budget" label="Orçamento aproximado" hint="Ajuda a buscar opções no seu perfil. Não é um compromisso.">
                        <input
                          id="f-budget"
                          className="field"
                          type="text"
                          inputMode="text"
                          placeholder="Ex.: até R$ 8.000"
                          aria-describedby="f-budget-hint"
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          maxLength={60}
                        />
                      </Field>
                      <fieldset className="flex flex-wrap gap-x-6" aria-label="O orçamento é">
                        <label className="check">
                          <input type="radio" name={`${uid}-basis`} checked={budgetBasis === "total"} onChange={() => setBudgetBasis("total")} />
                          Total da viagem
                        </label>
                        <label className="check">
                          <input type="radio" name={`${uid}-basis`} checked={budgetBasis === "pessoa"} onChange={() => setBudgetBasis("pessoa")} />
                          Por pessoa
                        </label>
                      </fieldset>
                    </div>

                    <Field id="f-lodging" label="Preferências de hospedagem">
                      <input
                        id="f-lodging"
                        className="field"
                        type="text"
                        placeholder="Ex.: perto da praia, com café da manhã, quarto família"
                        value={lodging}
                        onChange={(e) => setLodging(e.target.value)}
                        maxLength={160}
                      />
                    </Field>

                    <Field id="f-notes" label="Observações">
                      <textarea
                        id="f-notes"
                        className="field min-h-28 resize-y"
                        rows={3}
                        maxLength={500}
                        placeholder="Ex.: lua de mel, voo direto se possível, aniversário durante a viagem…"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </Field>
                  </div>
                </details>

                <div>
                  <button type="submit" className="btn btn-royal !min-h-16 w-full !text-[1.0625rem]">
                    Revisar minha mensagem <Arrow />
                  </button>
                  <p className="mt-3 text-center text-sm text-ink/75">
                    No próximo passo você confere o texto e abre o WhatsApp da GRG para enviar.
                  </p>
                </div>
              </form>
            ) : (
              <div>
                <p className="text-sm font-semibold text-royal">Último passo</p>
                <h3
                  ref={reviewRef}
                  tabIndex={-1}
                  className="display mt-1 text-[clamp(1.75rem,3vw,2.375rem)] text-abyss outline-none"
                >
                  Confira a sua mensagem
                </h3>
                <p className="mt-3 text-ink/80">
                  {href
                    ? "Se quiser, ajuste o texto. Ao tocar em “Abrir o WhatsApp”, a conversa com a GRG abre com a mensagem pronta; ela só é enviada quando você tocar em enviar por lá."
                    : "Copie a mensagem e envie para a GRG pelo WhatsApp."}
                </p>

                <label htmlFor={`${uid}-msg`} className="field-label mt-6">
                  Mensagem para a GRG
                </label>
                <textarea
                  id={`${uid}-msg`}
                  ref={messageRef}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setStatus("idle");
                  }}
                  rows={Math.min(16, message.split("\n").length + 1)}
                  className="field review-msg w-full resize-y font-sans leading-relaxed"
                />

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-royal"
                      data-track="whatsapp_abrir"
                      data-track-local="planejador"
                      onClick={() => setStatus("opened")}
                    >
                      <WhatsAppIcon className="h-5 w-5" /> Abrir o WhatsApp
                    </a>
                  )}
                  <button type="button" onClick={copy} className={`btn ${href ? "btn-outline-dark" : "btn-royal"}`}>
                    Copiar mensagem
                  </button>
                  <button type="button" onClick={backToForm} className="btn btn-outline-dark">
                    Editar pedido
                  </button>
                </div>

                <p role="status" aria-live="polite" className="mt-5 min-h-6 text-ink/90">
                  {status === "opened" && (
                    <>
                      <strong className="text-abyss">O WhatsApp foi aberto em outra aba ou no aplicativo.</strong> Envie a
                      mensagem por lá para a GRG receber o pedido. Se ele não abriu, use “Copiar mensagem” e cole na
                      conversa com {siteConfig.name}.
                    </>
                  )}
                  {status === "copied" && <strong className="text-abyss">Mensagem copiada. Agora é só colar no WhatsApp da GRG.</strong>}
                  {status === "copy-fail" && "Não foi possível copiar automaticamente. Selecione o texto acima e copie."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
