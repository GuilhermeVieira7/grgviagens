"use client";

import { track } from "@/lib/analytics";
import { chooseDestination } from "@/lib/planner-bus";
import { Arrow } from "./Arrow";

export function ChooseButton({
  label,
  city,
  className = "",
}: {
  label: string;
  city: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`btn btn-lagoon !min-h-12 !px-5 !py-2.5 ${className}`}
      onClick={() => {
        track("destino_quero_conhecer", { destino: city });
        chooseDestination(label);
      }}
    >
      Quero conhecer
      <span className="sr-only"> {city}</span>
      <Arrow />
    </button>
  );
}
