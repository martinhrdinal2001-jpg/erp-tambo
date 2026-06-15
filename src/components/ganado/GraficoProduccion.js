// Mini-gráfico de barras SVG sin dependencias.
// Recibe array de números (litros) y muestra una barra por día.
const ETIQUETAS = ["L-6", "L-5", "L-4", "L-3", "L-2", "Ayer", "Hoy"];

export default function GraficoProduccion({ datos }) {
  if (!datos || datos.length === 0) {
    return (
      <p className="text-sm text-stone-400">
        Sin datos de producción para este animal.
      </p>
    );
  }

  const max = Math.max(...datos) || 1;
  const ancho = 320;
  const alto = 140;
  const padding = { top: 20, right: 10, bottom: 26, left: 30 };
  const w = ancho - padding.left - padding.right;
  const h = alto - padding.top - padding.bottom;
  const barW = w / datos.length;

  return (
    <svg
      viewBox={`0 0 ${ancho} ${alto}`}
      className="h-auto w-full"
      role="img"
      aria-label="Producción de los últimos 7 días"
    >
      {/* Eje Y simple con dos guías */}
      {[0, 0.5, 1].map((p) => {
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
              {Math.round(max * p)}
            </text>
          </g>
        );
      })}

      {/* Barras */}
      {datos.map((v, i) => {
        const x = padding.left + i * barW + barW * 0.15;
        const altoBar = (v / max) * h;
        const y = padding.top + h - altoBar;
        const ancho = barW * 0.7;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={ancho}
              height={altoBar}
              fill="#10b981"
              rx={2}
            />
            <text
              x={x + ancho / 2}
              y={y - 4}
              fontSize="9"
              textAnchor="middle"
              fill="#065f46"
              fontWeight="600"
            >
              {v}
            </text>
            <text
              x={x + ancho / 2}
              y={alto - 8}
              fontSize="9"
              textAnchor="middle"
              fill="#78716c"
            >
              {ETIQUETAS[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
