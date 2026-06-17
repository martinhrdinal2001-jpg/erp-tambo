import { TrendingDown, AlertCircle } from "lucide-react";
import { getLoteById } from "@/data/ganado";

const COLOR_SEV = {
  ROJO: "bg-rose-500",
  AMARILLO: "bg-amber-500",
};

export default function ListaAnomalias({ anomalias }) {
  if (anomalias.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-emerald-300 bg-emerald-50/50 p-8 text-center">
        <p className="text-sm font-medium text-emerald-800">
          Sin anomalías detectadas en los últimos días.
        </p>
        <p className="mt-1 text-xs text-emerald-700/80">
          La producción de los 3 lotes está dentro de la variabilidad normal.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {anomalias.map((a, i) => {
        const lote = getLoteById(a.lote);
        const barra = COLOR_SEV[a.severidad] || "bg-stone-400";
        return (
          <div
            key={i}
            className="flex items-stretch overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm"
          >
            <div className={`w-1 shrink-0 ${barra}`} />
            <div className="flex-1 p-4">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-semibold text-rose-700">
                  <TrendingDown size={12} />
                  Caída {a.caida_pct}%
                </span>
                <span className="text-sm font-semibold text-stone-800">
                  {lote ? lote.nombre.split("—")[0].trim() : a.lote}
                </span>
                <span className="text-xs text-stone-500">{a.fecha}</span>
              </div>
              <p className="text-sm text-stone-700">
                Producción del día:{" "}
                <strong>{a.litros.toLocaleString("es-CL")} L</strong> ·
                Baseline 7d: <strong>{a.baseline_7d.toLocaleString("es-CL")} L</strong> ·
                Falta {a.caida_litros.toLocaleString("es-CL")} L.
              </p>

              {a.sin_explicacion ? (
                <p className="mt-2 inline-flex items-center gap-1 text-xs italic text-stone-500">
                  <AlertCircle size={12} />
                  Sin causa identificada — revisar manualmente.
                </p>
              ) : (
                <div className="mt-3">
                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    Causas probables
                  </p>
                  <ul className="space-y-1.5">
                    {a.causas_probables.map((c, j) => (
                      <li
                        key={j}
                        className="rounded-md border border-stone-100 bg-stone-50 p-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <strong className="text-stone-800">
                            {c.causa}
                          </strong>
                          <span className="font-mono font-semibold text-emerald-700">
                            {Math.round(c.probabilidad * 100)}%
                          </span>
                        </div>
                        <p className="mt-0.5 text-stone-600">{c.detalle}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
