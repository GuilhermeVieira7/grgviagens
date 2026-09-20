"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { destinationLabels } from "@/content/places";
import { track } from "@/lib/analytics";
import { DESTINATION_EVENT } from "@/lib/planner-bus";
import {
  buildMessage,
  interestLabels,
  todayISO,
  validateRequest,
  whatsappHref,
  type FieldErrors,
  type Interest,
  type TripRequest,
} from "@/lib/whatsapp";
import { Arrow } from "./Arrow";

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
      {hint && !error && <p className="mt-1.5 text-sm text-ink/70">{hint}</p>}
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

const STEP_KEYS: (keyof FieldErrors)[][] = [
  ["name", "origin", "destination"],
  ["departure", "returnDate"],
  ["adults", "children", "childAges"],
  [],
];
const STEP_NAMES = ["Sua viagem", "Quando", "Quem vai", "O que você imagina"];
const isMobile = () => window.matchMedia("(max-width: 639px)").matches;

export function Planner({ defaultDestination = "" }: { defaultDestination?: string }) {
  const uid = useId();
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState(defaultDestination);
  const [step, setStep] = useState(0);
  const [undecidedDest, setUndecidedDest] = useState(false);
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [undecidedDates, setUndecidedDates] = useState(false);
  const [flexibleDates, setFlexibleDates] = useState(false);
  const [interest, setInterest] = useState<Interest>("");
  const [budget, setBudget] = useState("");
  const [approx, setApprox] = useState("");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [childAges, setChildAges] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [announce, setAnnounce] = useState("");
  const [copied, setCopied] = useState<"idle" | "ok" | "fail">("idle");
  // vazio no servidor; data local do visitante no navegador
  const today = useSyncExternalStore(noopSubscribe, () => todayISO(), () => "");

  const originRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const applyDestination = useCallback((label: string) => {
    setDestination(label);
    setUndecidedDest(false);
    setErrors((e) => ({ ...e, destination: undefined }));
    setSubmitted(false);
    setAnnounce(`Destino escolhido: ${label}. Agora conte de onde você vai sair.`);
    // Em telas de toque, focar abriria o teclado e cobriria o formulário
    if (window.matchMedia("(pointer: fine)").matches) {
      window.setTimeout(() => originRef.current?.focus({ preventScroll: true }), 450);
    }
  }, []);

  useEffect(() => {
    // Destino escolhido antes da hidratação do planejador
    const pending = window.setTimeout(() => {
      if (window.__grgDestino) applyDestination(window.__grgDestino);
    }, 0);
    const onChoose = (e: Event) => applyDestination((e as CustomEvent<string>).detail);
    window.addEventListener(DESTINATION_EVENT, onChoose);
    return () => {
      window.clearTimeout(pending);
      window.removeEventListener(DESTINATION_EVENT, onChoose);
    };
  }, [applyDestination]);

  const childrenN = (() => {
    const n = toInt(children);
    return Number.isInteger(n) && n > 0 ? Math.min(n, MAX_CHILDREN) : 0;
  })();

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
    interest,
    budget,
    notes,
  });

  const focusFirstError = (errs: FieldErrors) => {
    const order: [keyof FieldErrors, string][] = [
      ["name", "f-name"],
      ["origin", "f-origin"],
      ["destination", "f-destination"],
      ["departure", "f-departure"],
      ["returnDate", "f-return"],
      ["adults", "f-adults"],
      ["children", "f-children"],
      ["childAges", "f-age-0"],
    ];
    for (const [key, id] of order) {
      if (errs[key]) {
        let target = document.getElementById(id);
        if (key === "childAges") {
          const firstEmpty = Array.from({ length: childrenN }, (_, i) => i).find((i) => !(childAges[i] ?? ""));
          target = document.getElementById(`f-age-${firstEmpty ?? 0}`);
        }
        target?.focus();
        return;
      }
    }
  };

  const grp = (i: number) => (step === i ? "" : "step-hidden");
  const stepOf = (key: keyof FieldErrors) => STEP_KEYS.findIndex((keys) => keys.includes(key));

  const goToStep = (n: number) => {
    setStep(n);
    window.setTimeout(() => {
      const t = document.getElementById(`step-title-${n}`);
      t?.focus({ preventScroll: true });
      t?.scrollIntoView({ block: "center", behavior: "auto" });
    }, 60);
  };
  const next = () => {
    const errs = validateRequest(request(), today || todayISO());
    const mine: FieldErrors = {};
    for (const k of STEP_KEYS[step]) if (errs[k]) mine[k] = errs[k];
    setErrors(mine);
    if (Object.keys(mine).length > 0) {
      setAnnounce("Confira os campos destacados para continuar.");
      window.setTimeout(() => focusFirstError(mine), 30);
      return;
    }
    setAnnounce("");
    goToStep(Math.min(3, step + 1));
  };
  const back = () => {
    setAnnounce("");
    goToStep(Math.max(0, step - 1));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isMobile() && step < 3) {
      next();
      return;
    }
    const errs = validateRequest(request(), today || todayISO());
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setAnnounce("Confira os campos destacados para continuar.");
      const first = (Object.keys(errs) as (keyof FieldErrors)[]).map(stepOf).sort()[0];
      if (isMobile() && first >= 0 && first !== step) {
        setStep(first);
        window.setTimeout(() => focusFirstError(errs), 80);
      } else {
        focusFirstError(errs);
      }
      return;
    }
    track("form_submit_valido", { destino: undecidedDest ? "indefinido" : destination });
    setAnnounce("");
    setCopied("idle");
    setSubmitted(true);
    window.setTimeout(() => summaryRef.current?.focus(), 50);
  };

  const message = submitted ? buildMessage(request()) : "";
  const href = submitted ? whatsappHref(message) : null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied("ok");
      track("mensagem_copiada");
    } catch {
      const ta = messageRef.current;
      if (ta) {
        ta.focus();
        ta.select();
        try {
          setCopied(document.execCommand("copy") ? "ok" : "fail");
          return;
        } catch {
          /* segue para a mensagem de falha */
        }
      }
      setCopied("fail");
    }
  };

  const invalid = (k: keyof FieldErrors) => (errors[k] ? true : undefined);
  const describe = (k: keyof FieldErrors, id: string) => (errors[k] ? `${id}-err` : undefined);
  const showAlert = announce.startsWith("Confira");
  const showChosen = announce.startsWith("Destino escolhido");

  return (
    <section
      id="planejador"
      aria-labelledby="planejador-title"
      className="on-dark section-y relative overflow-hidden bg-abyss text-white"
    >
      <div className="wrap-wide grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <p className="eyebrow text-lagoon">Planejador de viagem</p>
            <h2 id="planejador-title" className="h-section mt-5">
              Sua próxima viagem começa aqui.
            </h2>
            <p className="lead mt-6 max-w-[32rem] text-white/90">
              Conte para a GRG o que você está planejando. Nossa equipe pesquisa as possibilidades e prepara uma cotação
              personalizada para você.
            </p>
            <ul className="mt-8 space-y-3 text-white/85">
              {[
                "Leva poucos minutos para preencher.",
                "Você confere a mensagem antes de enviar: nada é enviado automaticamente.",
                "Valores e condições são informados pelo atendimento.",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-[0.7em] h-1.5 w-1.5 flex-none rounded-full bg-lagoon" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="on-light rounded-[28px] bg-white p-6 text-ink shadow-[0_30px_70px_-20px_rgb(1_10_38/0.6)] sm:p-10 lg:p-12">
            <p className="sr-only" role="status" aria-live="polite">
              {announce}
            </p>

            {!submitted ? (
              <form onSubmit={onSubmit} noValidate aria-label="Pedido de cotação de viagem" className="grid gap-8">
                <div className="sm:hidden" role="group" aria-label={`Passo ${step + 1} de 4: ${STEP_NAMES[step]}`}>
                  <p className="text-sm font-bold text-abyss">
                    Passo {step + 1} de 4 <span className="font-normal text-ink/70">· {STEP_NAMES[step]}</span>
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-mist" aria-hidden="true">
                    <div className="h-full rounded-full bg-royal transition-[width] duration-300" style={{ width: `${(step + 1) * 25}%` }} />
                  </div>
                </div>

                {showAlert && (
                  <p className="rounded-xl border-2 border-[#b3261e] bg-[#fdf1f0] px-4 py-3 font-semibold text-[#8c1d18]">
                    {announce}
                  </p>
                )}
                {showChosen && (
                  <p className="rounded-xl bg-paper px-4 py-3 font-semibold text-abyss">{announce.split(".")[0]}.</p>
                )}

                {/* Viagem */}
                <div className={`form-group sm:grid-cols-2 ${grp(0)}`}>
                  <h3 id="step-title-0" tabIndex={-1} className="form-title outline-none sm:col-span-2">Sua viagem</h3>
                  <div className="sm:col-span-2">
                    <Field id="f-name" label="Seu nome" error={errors.name}>
                      <input
                        id="f-name"
                        className="field"
                        type="text"
                        autoComplete="name"
                        placeholder="Como podemos chamar você?"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        aria-invalid={invalid("name")}
                        aria-describedby={describe("name", "f-name")}
                        aria-required="true"
                      />
                    </Field>
                  </div>
                  <Field id="f-origin" label="Cidade ou aeroporto de origem" error={errors.origin}>
                    <input
                      ref={originRef}
                      id="f-origin"
                      className="field"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="De onde você vai sair?"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      aria-invalid={invalid("origin")}
                      aria-describedby={describe("origin", "f-origin")}
                      aria-required="true"
                    />
                  </Field>
                  <div>
                    <Field id="f-destination" label="Destino desejado" error={errors.destination}>
                      <input
                        id="f-destination"
                        className="field"
                        type="text"
                        list={`${uid}-destinos`}
                        placeholder="Para onde quer ir?"
                        value={undecidedDest ? "" : destination}
                        disabled={undecidedDest}
                        onChange={(e) => setDestination(e.target.value)}
                        aria-invalid={invalid("destination")}
                        aria-describedby={describe("destination", "f-destination")}
                        aria-required={!undecidedDest}
                      />
                    </Field>
                    <datalist id={`${uid}-destinos`}>
                      {destinationLabels.map((n) => (
                        <option key={n} value={n} />
                      ))}
                    </datalist>
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
                <div className={`form-group sm:grid-cols-2 ${grp(1)}`}>
                  <h3 id="step-title-1" tabIndex={-1} className="form-title outline-none sm:col-span-2">Quando</h3>
                  <Field id="f-departure" label="Data de ida" error={errors.departure}>
                    <input
                      id="f-departure"
                      className="field"
                      type="date"
                      min={today}
                      value={undecidedDates ? "" : departure}
                      disabled={undecidedDates}
                      onChange={(e) => {
                        const v = e.target.value;
                        setDeparture(v);
                        if (returnDate && v && returnDate < v) setReturnDate("");
                        setErrors((x) => ({ ...x, departure: undefined }));
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
                      min={departure || today}
                      value={undecidedDates ? "" : returnDate}
                      disabled={undecidedDates}
                      onChange={(e) => setReturnDate(e.target.value)}
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
                          label="Época aproximada (opcional)"
                          hint="Por exemplo: julho, férias de fim de ano, feriado prolongado."
                        >
                          <input id="f-approx" className="field" type="text" value={approx} onChange={(e) => setApprox(e.target.value)} />
                        </Field>
                      </div>
                    )}
                  </div>
                </div>

                {/* Viajantes */}
                <div className={`form-group sm:grid-cols-2 ${grp(2)}`}>
                  <h3 id="step-title-2" tabIndex={-1} className="form-title outline-none sm:col-span-2">Quem vai</h3>
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
                    <fieldset className="min-w-0 sm:col-span-2" aria-describedby={errors.childAges ? "f-ages-err" : undefined}>
                      <legend className="field-label">Idade de cada criança</legend>
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

                {/* Preferências */}
                <div className={`form-group ${grp(3)}`}>
                  <h3 id="step-title-3" tabIndex={-1} className="form-title outline-none">O que você imagina</h3>
                  <fieldset>
                    <legend className="field-label">O que você quer cotar? (opcional)</legend>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                      {(Object.keys(interestLabels) as Exclude<Interest, "">[]).map((k) => (
                        <label key={k} className="pill-radio">
                          <input type="radio" name="interesse" value={k} checked={interest === k} onChange={() => setInterest(k)} />
                          <span>{interestLabels[k]}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <Field id="f-budget" label="Orçamento aproximado (opcional)" hint="Ajuda a equipe a buscar opções no seu perfil. Não é um compromisso.">
                    <input
                      id="f-budget"
                      className="field"
                      type="text"
                      placeholder="Ex.: até R$ 8.000 no total"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      maxLength={80}
                    />
                  </Field>
                  <Field id="f-notes" label="Observações adicionais (opcional)">
                    <textarea
                      id="f-notes"
                      className="field min-h-28 resize-y"
                      rows={3}
                      maxLength={500}
                      placeholder="Ex.: hotel perto da praia, passeios, aluguel de carro, viagem de lua de mel…"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </Field>
                </div>

                <div className="flex gap-3 sm:hidden">
                  {step > 0 && (
                    <button type="button" className="btn btn-outline-dark flex-1" onClick={back}>
                      Voltar
                    </button>
                  )}
                  {step < 3 && (
                    <button type="button" className="btn btn-royal flex-[2]" onClick={next}>
                      Continuar <Arrow />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className={`btn btn-royal !min-h-16 w-full !text-[1.0625rem] ${step === 3 ? "" : "step-hidden"}`}
                >
                  Solicitar minha cotação <Arrow />
                </button>
              </form>
            ) : (
              <div>
                <h3
                  ref={summaryRef}
                  tabIndex={-1}
                  className="display text-[clamp(1.75rem,3vw,2.375rem)] text-abyss outline-none"
                >
                  Confira o seu pedido
                </h3>
                <p className="mt-3 text-ink/80">
                  {href
                    ? "Revise a mensagem abaixo. Ao abrir o WhatsApp, você mesmo envia para a GRG."
                    : "Revise a mensagem abaixo, copie e envie para a GRG pelo WhatsApp."}
                </p>

                <label htmlFor={`${uid}-msg`} className="sr-only">
                  Mensagem do pedido
                </label>
                <textarea
                  id={`${uid}-msg`}
                  ref={messageRef}
                  readOnly
                  value={message}
                  rows={Math.min(14, message.split("\n").length + 1)}
                  className="mt-5 w-full resize-none rounded-2xl border-l-[6px] border-lagoon bg-paper p-5 font-sans text-base leading-relaxed text-ink"
                />

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {href && (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-royal" data-track="whatsapp_abrir" data-track-local="planejador">
                      Abrir no WhatsApp <Arrow />
                    </a>
                  )}
                  <button type="button" onClick={copy} className={`btn ${href ? "btn-outline-dark" : "btn-royal"}`}>
                    Copiar mensagem
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setCopied("idle");
                    }}
                    className="btn btn-outline-dark"
                  >
                    Editar pedido
                  </button>
                </div>

                <p role="status" aria-live="polite" className="mt-4 min-h-6 font-semibold text-abyss">
                  {copied === "ok" && "Mensagem copiada. Agora é só colar no WhatsApp."}
                  {copied === "fail" && "Não foi possível copiar automaticamente. Selecione o texto acima e copie."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
