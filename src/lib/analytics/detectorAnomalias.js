// Motor B: Detector Causal de Anomalías de Producción.
//
// Para cada lote productivo:
//   1) Calcula baseline rolling de los últimos 7 días.
//   2) Marca como anomalía cualquier día con caída > umbral (5%).
//   3) Para cada anomalía cruza con:
//        - Turnos: ¿hubo ausencias/atrasos del equipo de ordeñe ese día?
//        - Inventario/Dieta: ¿hubo cambio de concentrado cerca de esa fecha?
//        - Clima: ¿ITH > 72 ese día u 1-2 días antes (estrés calórico tardío)?
//   4) Asigna probabilidad relativa a cada causa según la fuerza de la señal.
//
// Próximo paso: cuando lleguen datos reales, reemplazar reglas de cruce por
// un modelo de regresión causal (ej. DoWhy o tratamiento sintético).

import {
  PRODUCCION_DIARIA,
  EVENTOS_DIETA,
  LOTES_PRODUCTIVOS,
  baselineLote,
} from "@/data/produccionDiaria";
import { TURNOS } from "@/data/turnos";
import { getClimaDia } from "@/data/clima";
import { UMBRALES } from "@/data/precios";

const VENTANA_DIAS = 7;

function fechaMenosDias(fechaIso, dias) {
  const d = new Date(fechaIso + "T08:00:00-04:00");
  d.setDate(d.getDate() - dias);
  return d.toISOString().slice(0, 10);
}

// ── Detección de anomalías por lote ──────────────────────────────
function detectarAnomaliasLote(loteId) {
  const serie = PRODUCCION_DIARIA.filter((p) => p.lote === loteId).sort((a, b) =>
    a.fecha.localeCompare(b.fecha)
  );
  const anomalias = [];

  for (let i = VENTANA_DIAS; i < serie.length; i++) {
    const ventana = serie.slice(i - VENTANA_DIAS, i);
    const baseline =
      ventana.reduce((s, p) => s + p.litros, 0) / ventana.length;
    const actual = serie[i].litros;
    const caidaPct = ((baseline - actual) / baseline) * 100;

    if (caidaPct >= UMBRALES.caida_produccion_umbral) {
      anomalias.push({
        lote: loteId,
        fecha: serie[i].fecha,
        litros: actual,
        baseline_7d: Math.round(baseline),
        caida_pct: Math.round(caidaPct * 10) / 10,
        caida_litros: Math.round(baseline - actual),
      });
    }
  }
  return anomalias;
}

// ── Cruzar con turnos: % de ausentismo + atrasos del turno AM ────
function evidenciaTurnos(fechaIso) {
  const turnosDia = TURNOS.filter((t) => t.fecha === fechaIso && t.tipo === "AM");
  if (turnosDia.length === 0) return null;
  const ausentes = turnosDia.filter((t) => t.estado === "Ausente").length;
  const atrasados = turnosDia.filter((t) => t.estado === "Atrasado").length;
  const total = turnosDia.length;
  const incidentes = ausentes + atrasados;
  if (incidentes === 0) return null;
  return {
    causa: "Turno de ordeñe AM degradado",
    detalle: `${ausentes} ausentes y ${atrasados} atrasos sobre ${total} en el turno de la mañana del ${fechaIso}.`,
    intensidad: incidentes / total,
  };
}

// ── Cruzar con eventos de cambio de dieta cerca de la fecha ──────
function evidenciaDieta(fechaIso, loteId) {
  const evento = EVENTOS_DIETA.find((e) => {
    const diasDesdeEvento =
      (new Date(fechaIso).getTime() - new Date(e.fecha).getTime()) /
      86_400_000;
    return (
      diasDesdeEvento >= 0 &&
      diasDesdeEvento <= 3 &&
      e.lotes_afectados.includes(loteId)
    );
  });
  if (!evento) return null;
  return {
    causa: "Cambio de dieta sin adaptación",
    detalle: evento.detalle + ` Registrado el ${evento.fecha}.`,
    intensidad: 0.9,
  };
}

// ── Cruzar con clima: ITH alto el día de la caída o 1-2 días antes ─
function evidenciaClima(fechaIso) {
  for (let off = 0; off <= 2; off++) {
    const f = fechaMenosDias(fechaIso, off);
    const clima = getClimaDia(f);
    if (!clima) continue;
    if (clima.ITH > UMBRALES.ith_estres_leve) {
      return {
        causa: "Estrés calórico",
        detalle: `ITH ${clima.ITH} el ${f} (umbral ${UMBRALES.ith_estres_leve}). El estrés calórico baja la producción 1-2 días después.`,
        intensidad: (clima.ITH - UMBRALES.ith_estres_leve) / 10,
      };
    }
  }
  return null;
}

// ── Pipeline principal ───────────────────────────────────────────
export function detectarAnomalias() {
  const todas = LOTES_PRODUCTIVOS.flatMap(detectarAnomaliasLote);

  return todas
    .map((a) => {
      const evidencias = [
        evidenciaTurnos(a.fecha),
        evidenciaDieta(a.fecha, a.lote),
        evidenciaClima(a.fecha),
      ].filter(Boolean);

      // Normalizamos intensidades en probabilidades relativas
      const suma = evidencias.reduce((s, e) => s + e.intensidad, 0);
      const causas = evidencias
        .map((e) => ({
          ...e,
          probabilidad: suma > 0 ? e.intensidad / suma : 0,
        }))
        .sort((a, b) => b.probabilidad - a.probabilidad);

      return {
        ...a,
        severidad: a.caida_pct >= 8 ? "ROJO" : "AMARILLO",
        causas_probables: causas,
        sin_explicacion: causas.length === 0,
      };
    })
    .sort((a, b) => b.fecha.localeCompare(a.fecha));
}
