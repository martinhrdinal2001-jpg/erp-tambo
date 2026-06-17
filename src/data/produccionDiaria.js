// Producción diaria de leche POR LOTE (no por vaca individual).
// 30 días retroactivos para los 3 lotes productivos.
// Incluye anomalías sembradas a propósito para que el detector causal las encuentre:
//   - 2026-06-12: Lote 1 cae 8% (turno AM con multiples ausencias ese día)
//   - 2026-06-14: Lote 2 cae 6% (cambio de concentrado registrado)

const HOY = new Date("2026-06-16T08:00:00-04:00");

function fecha(diasAtras) {
  const d = new Date(HOY);
  d.setDate(HOY.getDate() - diasAtras);
  return d.toISOString().slice(0, 10);
}

// Baseline diario por lote (litros) y variabilidad normal ±3%.
const BASELINE = {
  "lote-1": 10640, // alta producción: 280 vacas × 38 L
  "lote-2": 7000,  // media: 250 vacas × 28 L
  "lote-3": 4250,  // baja: 250 vacas × 17 L
};

function ruidoEstable(seed) {
  // Pseudo-aleatorio determinista en [-1, 1] que produce variación ±3%
  return Math.sin(seed * 9301 + 49297) * 0.03;
}

// Anomalías sembradas: {fecha → {lote → caidaPct}}
const ANOMALIAS_SEMBRADAS = {
  "2026-06-12": { "lote-1": 0.085 }, // 8.5% baja
  "2026-06-14": { "lote-2": 0.062 }, // 6.2% baja
};

function generarPunto(loteId, diasAtras) {
  const base = BASELINE[loteId];
  const f = fecha(diasAtras);
  const seed = loteId.charCodeAt(loteId.length - 1) * 100 + diasAtras;
  const ruido = ruidoEstable(seed);
  const caida = ANOMALIAS_SEMBRADAS[f]?.[loteId] || 0;
  const litros = Math.round(base * (1 + ruido) * (1 - caida));
  return { fecha: f, lote: loteId, litros };
}

export const PRODUCCION_DIARIA = [];
for (let d = 30; d >= 1; d--) {
  for (const loteId of Object.keys(BASELINE)) {
    PRODUCCION_DIARIA.push(generarPunto(loteId, d));
  }
}

// Eventos de cambio de dieta que el detector cruza para explicar caídas.
export const EVENTOS_DIETA = [
  {
    fecha: "2026-06-14",
    tipo: "CAMBIO_CONCENTRADO",
    lotes_afectados: ["lote-2"],
    detalle:
      "Cambio de proveedor de concentrado media producción (transición sin período de adaptación).",
  },
];

// Helpers
export function produccionPorLote(loteId) {
  return PRODUCCION_DIARIA.filter((p) => p.lote === loteId);
}

export function produccionEnFecha(fechaIso, loteId) {
  return PRODUCCION_DIARIA.find(
    (p) => p.fecha === fechaIso && p.lote === loteId
  );
}

export function baselineLote(loteId) {
  return BASELINE[loteId] || 0;
}

export const LOTES_PRODUCTIVOS = Object.keys(BASELINE);
