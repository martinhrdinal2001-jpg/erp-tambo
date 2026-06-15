// Gráfico de barras agrupadas: ingresos vs egresos por mes.
import { MOVIMIENTOS_MENSUALES, totalesDelMes, formatCLP } from "@/data/finanzas";

export default function GraficoMensual() {
  const datos = MOVIMIENTOS_MENSUALES.map((m) => ({
    nombre: m.nombreMes.split(" ")[0].slice(0, 3),
    ...totalesDelMes(m),
  }));

  const max = Math.max(...datos.map((d) => Math.max(d.ingresos, d.egresos)));
  const ancho = 600;
  const alto = 220;
  const padding = { top: 20, right: 16, bottom: 36, left: 60 };
  const w = ancho - padding.left - padding.right;
  const h = alto - padding.top - padding.bottom;
  const grupoW = w / datos.length;
  const barW = grupoW * 0.35;

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-stone-800">
          Ingresos vs Egresos por mes
        </h3>
        <div className="flex gap-3 text-xs text-stone-600">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-emerald-500" />
            Ingresos
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-sm bg-rose-500" />
            Egresos
          </span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${ancho} ${alto}`}
        className="h-auto w-full"
        role="img"
      >
        {/* Guías horizontales */}
        {[0, 0.25, 0.5, 0.75, 1].map((p) => {
          const y = padding.top + h * (1 - p);
          return (
            <g key={p}>
              <line
                x1={padding.left}
                y1={y}
                x2={padding.left + w}
                y2={y}
                stroke="#e7e5e4"
                strokeDasharray="2 3"
              />
              <text x={4} y={y + 3} fontSize="9" fill="#a8a29e">
                ${Math.round((max * p) / 1_000_000)} M
              </text>
            </g>
          );
        })}

        {/* Barras */}
        {datos.map((d, i) => {
          const xBase = padding.left + i * grupoW + grupoW * 0.1;
          const hIng = (d.ingresos / max) * h;
          const hEg = (d.egresos / max) * h;
          return (
            <g key={i}>
              <rect
                x={xBase}
                y={padding.top + h - hIng}
                width={barW}
                height={hIng}
                fill="#10b981"
                rx={2}
              />
              <rect
                x={xBase + barW + 4}
                y={padding.top + h - hEg}
                width={barW}
                height={hEg}
                fill="#f43f5e"
                rx={2}
              />
              <text
                x={xBase + barW + 2}
                y={alto - 12}
                fontSize="10"
                textAnchor="middle"
                fill="#57534e"
                fontWeight="500"
              >
                {d.nombre}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
