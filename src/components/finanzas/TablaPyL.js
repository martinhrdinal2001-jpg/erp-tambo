// Tabla tipo "Estado de Resultados" (P&L) del último mes con detalle.
import { MOVIMIENTOS_MENSUALES, totalesDelMes, formatCLP } from "@/data/finanzas";

export default function TablaPyL() {
  const ultimo = MOVIMIENTOS_MENSUALES[MOVIMIENTOS_MENSUALES.length - 1];
  const { ingresos, egresos, resultado } = totalesDelMes(ultimo);

  const margen = ingresos > 0 ? (resultado / ingresos) * 100 : 0;

  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="border-b border-stone-200 px-5 py-4">
        <h3 className="text-sm font-semibold text-stone-800">
          Estado de resultados — {ultimo.nombreMes}
        </h3>
        <p className="mt-0.5 text-xs text-stone-500">
          Detalle de ingresos y egresos del período
        </p>
      </div>

      <div className="divide-y divide-stone-100 text-sm">
        {/* Ingresos */}
        <div className="px-5 py-3">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            Ingresos
          </h4>
          <ul className="space-y-1.5">
            {ultimo.ingresos.map((x, i) => (
              <li key={i} className="flex items-center justify-between text-stone-700">
                <span>{x.concepto}</span>
                <span className="font-medium">{formatCLP(x.monto)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-2 font-semibold text-stone-800">
            <span>Total ingresos</span>
            <span className="text-emerald-700">{formatCLP(ingresos)}</span>
          </div>
        </div>

        {/* Egresos */}
        <div className="px-5 py-3">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-rose-700">
            Egresos
          </h4>
          <ul className="space-y-1.5">
            {ultimo.egresos.map((x, i) => (
              <li key={i} className="flex items-center justify-between text-stone-700">
                <span>{x.concepto}</span>
                <span className="font-medium">{formatCLP(x.monto)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t border-stone-100 pt-2 font-semibold text-stone-800">
            <span>Total egresos</span>
            <span className="text-rose-700">{formatCLP(egresos)}</span>
          </div>
        </div>

        {/* Resultado */}
        <div className="bg-stone-50 px-5 py-4">
          <div className="flex items-center justify-between text-base">
            <span className="font-bold text-stone-900">Resultado del período</span>
            <span
              className={`font-bold ${
                resultado >= 0 ? "text-emerald-700" : "text-rose-700"
              }`}
            >
              {formatCLP(resultado)}
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-stone-500">
            <span>Margen sobre ingresos</span>
            <span>{margen.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
