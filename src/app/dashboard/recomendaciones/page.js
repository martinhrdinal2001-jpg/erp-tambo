import {
  Sparkles,
  TrendingDown,
  Sun,
} from "lucide-react";
import Topbar from "@/components/Topbar";
import RecomendacionCard from "@/components/recomendaciones/RecomendacionCard";
import ListaAnomalias from "@/components/recomendaciones/ListaAnomalias";
import { analizarTodo } from "@/lib/analytics";
import { CLIMA_HOY } from "@/data/clima";

export default function RecomendacionesPage() {
  // Se ejecuta server-side: los motores corren al renderizar.
  const { pastoreo, riego, anomalias, resumen } = analizarTodo();

  return (
    <>
      <Topbar title="Recomendaciones de Acción" />
      <div className="p-4 sm:p-8">
        {/* Header */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 via-white to-emerald-50 p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-widest text-purple-700">
                <Sparkles size={14} />
                Motor Analítico
              </div>
              <h2 className="text-2xl font-bold text-stone-900">
                Decisiones de hoy
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-stone-600">
                Cada recomendación cruza datos reales del campo (clima,
                producción, turnos, stock) y propone la acción más rentable. Se
                actualiza cada vez que entrás.
              </p>
            </div>
            <div className="hidden text-right sm:block">
              <div className="text-xs uppercase tracking-wider text-stone-500">
                Clima hoy
              </div>
              <div className="mt-1 flex items-center justify-end gap-2 text-sm font-semibold text-stone-700">
                <Sun size={16} className="text-amber-500" />
                {CLIMA_HOY.temp_min}–{CLIMA_HOY.temp_max}°C
              </div>
              <div className="text-xs text-stone-500">
                {CLIMA_HOY.lluvia_mm} mm lluvia · ITH {CLIMA_HOY.ITH}
              </div>
            </div>
          </div>
          {resumen.rojas > 0 && (
            <div className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-800 ring-1 ring-inset ring-rose-200">
              ⚠ <strong>{resumen.rojas} acción urgente</strong> requiere
              decisión hoy.
            </div>
          )}
        </div>

        {/* 3 cards de decisión */}
        <div className="mb-8 space-y-4">
          <RecomendacionCard
            titulo="Pastoreo vs Encierro"
            icono="lineChart"
            resultado={pastoreo}
            montoLabel="Ahorro estimado del día"
            monto={pastoreo.ahorroCLP}
          />
          <RecomendacionCard
            titulo="Riego — ROI energético"
            icono="droplets"
            resultado={riego}
            montoLabel={
              riego.detalle?.ingreso_extra_dia_clp ? "Ingreso extra/día" : null
            }
            monto={riego.detalle?.ingreso_extra_dia_clp ?? null}
          />
        </div>

        {/* Anomalías */}
        <section>
          <div className="mb-3 flex items-end justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-bold text-stone-800">
                <TrendingDown size={20} className="text-rose-500" />
                Anomalías de producción detectadas
              </h2>
              <p className="mt-0.5 text-sm text-stone-500">
                Caídas mayores al 5% vs baseline de los últimos 7 días, con
                causa probable cruzada.
              </p>
            </div>
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-600">
              {anomalias.length}
            </span>
          </div>
          <ListaAnomalias anomalias={anomalias} />
        </section>

        {/* Nota metodológica */}
        <div className="mt-8 rounded-lg border border-stone-200 bg-stone-50 p-4 text-xs text-stone-600">
          <strong className="text-stone-800">Cómo se calcula:</strong> los 3
          motores usan reglas de negocio agronómico basadas en literatura del
          INIA Remehue y experiencia del sur de Chile. Cuando lleguen los datos
          reales históricos del Raulí (Supabase), las mismas funciones podrán
          reemplazar reglas por modelos entrenados (regresión causal,
          forecasting) sin tocar el resto del código.
        </div>
      </div>
    </>
  );
}
