"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export default function ChecklistRutina({ pasos }) {
  // Estado local: paso marcado o no. No se persiste (es un mock para el onboarding).
  const [marcados, setMarcados] = useState(() => new Set());

  function toggle(idx) {
    setMarcados((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  const progreso = Math.round((marcados.size / pasos.length) * 100);

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-200">
          <div
            className="h-full bg-emerald-500 transition-all"
            style={{ width: `${progreso}%` }}
          />
        </div>
        <span className="text-sm font-medium text-stone-600">
          {marcados.size} / {pasos.length}
        </span>
      </div>

      <ol className="space-y-2">
        {pasos.map((paso, idx) => {
          const marcado = marcados.has(idx);
          return (
            <li key={idx}>
              <button
                type="button"
                onClick={() => toggle(idx)}
                className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left text-sm transition ${
                  marcado
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-stone-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/40"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                    marcado
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-stone-300 bg-white"
                  }`}
                >
                  {marcado && <Check size={12} />}
                </span>
                <span
                  className={`flex-1 ${
                    marcado ? "text-stone-500 line-through" : "text-stone-800"
                  }`}
                >
                  <span className="mr-2 font-semibold text-emerald-700">
                    {idx + 1}.
                  </span>
                  {paso}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
