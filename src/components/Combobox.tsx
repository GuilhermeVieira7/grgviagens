"use client";

import { useId, useMemo, useRef, useState, type RefObject } from "react";
import type { LocationOption } from "@/content/locations";

const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();

const MAX_RESULTS = 40;

type Row = { kind: "group"; key: string; label: string } | { kind: "option"; key: string; label: string };

function buildRows(options: LocationOption[], query: string): Row[] {
  const q = normalize(query);
  const matches = q
    ? options.filter((o) => normalize(o.label).includes(q))
    : options;
  // Prioriza quem começa com o que foi digitado.
  const sorted = q
    ? [...matches].sort((a, b) => {
        const as = normalize(a.label).startsWith(q) ? 0 : 1;
        const bs = normalize(b.label).startsWith(q) ? 0 : 1;
        return as - bs || a.label.localeCompare(b.label, "pt-BR");
      })
    : matches;
  const capped = sorted.slice(0, MAX_RESULTS);

  const rows: Row[] = [];
  let lastGroup = "";
  for (const o of capped) {
    if (o.group !== lastGroup) {
      rows.push({ kind: "group", key: `g-${o.group}`, label: o.group });
      lastGroup = o.group;
    }
    rows.push({ kind: "option", key: o.label, label: o.label });
  }
  return rows;
}

export function Combobox({
  id,
  value,
  onChange,
  options,
  placeholder,
  disabled,
  autoComplete = "off",
  ariaInvalid,
  ariaDescribedBy,
  ariaRequired,
  inputRef: externalRef,
  onFocusSelectAll,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: LocationOption[];
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
  ariaInvalid?: true;
  ariaDescribedBy?: string;
  ariaRequired?: boolean;
  inputRef?: RefObject<HTMLInputElement | null>;
  onFocusSelectAll?: boolean;
}) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const localRef = useRef<HTMLInputElement>(null);
  const inputRef = externalRef ?? localRef;
  const listRef = useRef<HTMLUListElement>(null);

  const rows = useMemo(() => buildRows(options, value), [options, value]);
  const optionRows = rows.filter((r): r is Extract<Row, { kind: "option" }> => r.kind === "option");

  const activeIndex = activeKey ? optionRows.findIndex((o) => o.key === activeKey) : -1;

  const optionId = (key: string) => `${listId}-${key.replace(/[^a-zA-Z0-9-]/g, "_")}`;

  const scrollIntoView = (key: string) => {
    const el = listRef.current?.querySelector(`[data-key="${CSS.escape(key)}"]`);
    el?.scrollIntoView({ block: "nearest" });
  };

  const moveActive = (dir: 1 | -1) => {
    if (optionRows.length === 0) return;
    const next =
      activeIndex < 0
        ? dir === 1
          ? 0
          : optionRows.length - 1
        : (activeIndex + dir + optionRows.length) % optionRows.length;
    setActiveKey(optionRows[next].key);
    scrollIntoView(optionRows[next].key);
  };

  const choose = (label: string) => {
    onChange(label);
    setOpen(false);
    setActiveKey(null);
  };

  return (
    <div className="combo-wrap">
      <input
        ref={inputRef}
        id={id}
        className="field"
        type="text"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && activeKey ? optionId(activeKey) : undefined}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        aria-required={ariaRequired}
        autoComplete={autoComplete}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setActiveKey(null);
        }}
        onFocus={(e) => {
          setOpen(true);
          if (onFocusSelectAll) e.target.select();
        }}
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
            moveActive(1);
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setOpen(true);
            moveActive(-1);
          } else if (e.key === "Enter") {
            if (open && activeKey) {
              e.preventDefault();
              choose(activeKey);
            }
          } else if (e.key === "Escape") {
            if (open) {
              e.preventDefault();
              setOpen(false);
              setActiveKey(null);
            }
          }
        }}
      />
      {open && optionRows.length > 0 && (
        <ul id={listId} ref={listRef} role="listbox" className="combo-list" aria-label={placeholder}>
          {rows.map((r) =>
            r.kind === "group" ? (
              <li key={r.key} role="presentation" className="combo-group">
                {r.label}
              </li>
            ) : (
              <li
                key={r.key}
                id={optionId(r.key)}
                data-key={r.key}
                role="option"
                aria-selected={r.key === activeKey}
                className={`combo-option${r.key === activeKey ? " is-active" : ""}`}
                // onMouseDown (não onClick) para escolher antes do blur do input fechar a lista
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(r.label);
                }}
              >
                {r.label}
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}
