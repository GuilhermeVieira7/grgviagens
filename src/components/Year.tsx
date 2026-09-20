"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Ano corrente calculado no navegador, sem congelar o ano do build. */
export function Year() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => new Date().getFullYear(),
  );
  return <span suppressHydrationWarning>{year}</span>;
}
