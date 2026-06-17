// Motor C: Optimizador de Riego y ROI (verano).
//
// El brief explicita "Verano". En junio (Purranque) estamos en pleno invierno,
// con > 200 mm/mes de lluvia. El motor debe ser inteligente:
//   - Si el mes actual NO está en temporada de riego → devolver "NO_REGAR"
//     con la razón estacional (sin déficit hídrico).
//   - Si estamos en temporada Y se proyecta poca lluvia → calcular ROI:
//        ingreso = kg MS extra × eficiencia → litros leche × precio
//        costo  = kWh bomba × CLP/kWh
//        ROI = (ingreso - costo) / costo
//   - Si estamos en temporada con lluvias proyectadas → "NO_REGAR" por
//     suficiencia hídrica natural.

import { CLIMA_HOY, lluviaProyectada } from "@/data/clima";
import { PRECIOS, RIEGO, UMBRALES } from "@/data/precios";

const HOY = new Date("2026-06-16");
const MES = HOY.getMonth() + 1;

export function optimizadorRiego() {
  const enTemporada = UMBRALES.meses_temporada_riego.includes(MES);
  const lluvia7d = lluviaProyectada(7);

  // ── Caso invierno (no temporada): no aplica ──────────────────
  if (!enTemporada) {
    return {
      recomendacion: "NO_REGAR",
      severidad: "VERDE",
      aplica: false,
      razon: `Estamos en invierno (junio). En Purranque los meses con déficit hídrico son octubre a marzo. No hay riesgo de pérdida de pasto por sequía ahora.`,
      accion:
        "Mantener la bomba apagada y los aspersores cubiertos. Programar mantención preventiva antes de octubre.",
      detalle: {
        mes_actual: MES,
        meses_riego: UMBRALES.meses_temporada_riego,
        lluvia_proxima_semana_mm: lluvia7d,
      },
    };
  }

  // ── Caso temporada con lluvia esperada ───────────────────────
  if (lluvia7d >= RIEGO.mm_aporte_riego_dia * 4) {
    return {
      recomendacion: "NO_REGAR",
      severidad: "VERDE",
      aplica: true,
      razon: `${lluvia7d} mm de lluvia proyectada en los próximos 7 días cubre el déficit hídrico naturalmente.`,
      accion: "Posponer el riego. Revisar de nuevo en 3 días.",
      detalle: { lluvia_proxima_semana_mm: lluvia7d },
    };
  }

  // ── Caso temporada con déficit: calcular ROI ─────────────────
  // Costo energético de un ciclo de riego diario.
  const consumoKWh = RIEGO.consumo_bomba_kw * RIEGO.horas_riego_dia;
  const costoEnergiaDia = consumoKWh * PRECIOS.costo_energia_clp_por_kwh;

  // Ganancia: pasto extra por aporte de agua.
  const msExtraDiariaTotal =
    RIEGO.area_regada_ha *
    RIEGO.mm_aporte_riego_dia *
    RIEGO.ms_extra_por_mm_riego;

  // Conversión MS → leche: 1 kg MS ≈ 0.8 L leche extra (tasa típica).
  const litrosExtraDia = msExtraDiariaTotal * 0.8;
  const ingresoDia = litrosExtraDia * PRECIOS.precio_leche_clp_por_litro;

  const roi = (ingresoDia - costoEnergiaDia) / costoEnergiaDia;

  return {
    recomendacion: roi > 0.2 ? "REGAR" : "NO_REGAR",
    severidad: roi > 0.5 ? "VERDE" : roi > 0 ? "AMARILLO" : "ROJO",
    aplica: true,
    razon:
      roi > 0.2
        ? `Costo energético ${Math.round(costoEnergiaDia / 1000)}k CLP/día vs ingreso esperado ${Math.round(ingresoDia / 1000)}k CLP/día. ROI ${(roi * 100).toFixed(0)}%.`
        : `Costo energético no se compensa con producción extra esperada (ROI ${(roi * 100).toFixed(0)}%).`,
    accion:
      roi > 0.2
        ? `Activar la bomba ${RIEGO.horas_riego_dia} h por día durante el período de déficit.`
        : "Posponer el riego, evaluar precio de leche o costo de energía.",
    detalle: {
      area_ha: RIEGO.area_regada_ha,
      costo_energia_dia_clp: Math.round(costoEnergiaDia),
      kg_ms_extra_dia: Math.round(msExtraDiariaTotal),
      litros_extra_dia: Math.round(litrosExtraDia),
      ingreso_extra_dia_clp: Math.round(ingresoDia),
      roi,
    },
  };
}
