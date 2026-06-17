"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Clock,
  Info,
  Sparkles,
  LineChart,
  Droplets,
} from "lucide-react";
import { formatCLP } from "@/data/precios";

// Mapeo de nombres a componentes: RSC no puede pasar funciones, así que el
// padre server-side manda un string y resolvemos acá en el cliente.
const ICONOS = {
  lineChart: LineChart,
  droplets: Droplets,
};

const SEVERIDAD = {
  ROJO: {
    barra: "bg-rose-500",
    chip: "bg-rose-100 text-rose-700 ring-rose-200",
    Icon: AlertCircle,
    label: "Actuar ahora",
  },
  AMARILLO: {
    barra: "bg-amber-500",
    chip: "bg-amber-100 text-amber-800 ring-amber-200",
    Icon: Clock,
    label: "Revisar hoy",
  },
  VERDE: {
    barra: "bg-emerald-500",
    chip: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    Icon: Info,
    label: "Informativo",
  },
};

export default function RecomendacionCard({
  titulo,
  resultado,
  icono = "lineChart",
  montoLabel,
  monto,
}) {
  const [abierto, setAbierto] = useState(false);
  const sev = SEVERIDAD[resultado.severidad] || SEVERIDAD.VERDE;
  const Icon = ICONOS[icono] || LineChart;

  return (
    <div className="flex items-stretch overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
      {/* Barra de severidad */}
      <div className={`w-1.5 shrink-0 ${sev.barra}`} />

      <div className="flex-1 p-5">
        {/* Encabezado */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <Icon size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">{titulo}</h3>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-stone-500">
                <Sparkles size={12} className="text-purple-500" />
                Confianza{" "}
                {resultado.confianza
                  ? `${Math.round(resultado.confianza * 100)}%`
                  : "—"}
              </div>
            </div>
          </div>
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${sev.chip}`}
          >
            <sev.Icon size={12} />
            {sev.label}
          </span>
        </div>

        {/* Recomendación grande */}
        <div className="mb-3 flex flex-col gap-2 rounded-xl bg-stone-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-stone-500">
              Recomendación
            </p>
            <p className="text-2xl font-bold text-stone-900">
              {resultado.recomendacion.replace(/_/g, " ")}
            </p>
          </div>
          {monto !== undefined && monto !== null && (
            <div className="text-right">
              <p className="text-xs uppercase tracking-wider text-stone-500">
                {montoLabel}
              </p>
              <p className="text-lg font-bold text-emerald-700">
                {formatCLP(monto)}
              </p>
            </div>
          )}
        </div>

        {/* Razón */}
        <p className="mb-3 text-sm text-stone-700">{resultado.razon}</p>

        {/* Acción sugerida */}
        {resultado.accion && (
          <div className="mb-3 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
            <strong className="text-xs uppercase tracking-wider">
              Acción sugerida
            </strong>
            <p className="mt-1">{resultado.accion}</p>
          </div>
        )}

        {/* Detalle expandible */}
        <button
          type="button"
          onClick={() => setAbierto((v) => !v)}
          className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-900"
        >
          {abierto ? "Ocultar cálculo" : "Ver cálculo paso a paso"}
          {abierto ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {abierto && resultado.detalle && (
          <div className="mt-3 overflow-x-auto rounded-lg border border-stone-200 bg-stone-50 p-3">
            <dl className="grid grid-cols-1 gap-x-6 gap-y-2 text-xs sm:grid-cols-2">
              {Object.entries(resultado.detalle).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-2">
                  <dt className="text-stone-500">{prettyKey(k)}</dt>
                  <dd className="font-mono font-medium text-stone-800">
                    {formatValue(k, v)}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}

function prettyKey(k) {
  return k
    .replace(/_/g, " ")
    .replace(/clp/i, "CLP")
    .replace(/pct/i, "%")
    .replace(/^./, (c) => c.toUpperCase());
}

function formatValue(key, v) {
  if (typeof v === "number") {
    if (key.endsWith("_clp")) return formatCLP(v);
    if (key.endsWith("_pct")) return `${v}%`;
    if (key === "factor_riesgo" || key === "roi")
      return `${(v * 100).toFixed(0)}%`;
    if (key.endsWith("_kg") || key.endsWith("_kg_ha"))
      return `${v.toLocaleString("es-CL")} kg`;
    if (key.endsWith("_mm")) return `${v} mm`;
    if (key === "hectareas_listas" || key === "area_ha") return `${v} ha`;
    return v.toLocaleString("es-CL");
  }
  if (Array.isArray(v)) return v.join(", ");
  return String(v);
}
