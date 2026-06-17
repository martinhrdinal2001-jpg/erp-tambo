// Motor A: Decisión Pastoreo vs Encierro/Suplemento.
//
// Compara dos escenarios para HOY:
//   1) Pastorear: las vacas comen del potrero, se complementa con concentrado.
//      Riesgo: si llueve mucho, dañan el rebrote por pisoteo (costo futuro).
//   2) Encerrar: se da ración completa de concentrado.
//      Costo: 100% del concentrado.
//
// Devuelve la opción más barata más la justificación.
//
// Próximo paso futuro: reemplazar las reglas por un modelo entrenado sobre
// datos reales de producción/clima/suplemento del fundo. La firma queda igual.

import { CLIMA_HOY, lluviaProyectada } from "@/data/clima";
import { POTREROS_LISTOS, msDisponibleTotal, hectareasListas } from "@/data/pasto";
import { PRECIOS, REBANO, UMBRALES } from "@/data/precios";

export function pastoreoVsSuplemento() {
  const lluviaHoy = CLIMA_HOY.lluvia_mm;
  const lluvia72h = lluviaProyectada(3);

  const msDispoTotal = msDisponibleTotal();
  const haListas = hectareasListas();
  const consumoMSDia = REBANO.vacas_en_ordene * REBANO.consumo_ms_kg_vaca_dia;

  // ────────────────────────────────────────────────
  // Escenario A: ENCERRAR (ración completa de concentrado)
  // ────────────────────────────────────────────────
  const concentradoEncierro =
    REBANO.vacas_en_ordene * REBANO.consumo_concentrado_encierro_kg_dia;
  const costoEncierro = concentradoEncierro * PRECIOS.costo_concentrado_clp_por_kg;

  // ────────────────────────────────────────────────
  // Escenario B: PASTOREAR (pasto + suplemento)
  // ────────────────────────────────────────────────
  // Si el pasto no cubre el consumo, se complementa con concentrado.
  const cobertura = Math.min(1, msDispoTotal / (consumoMSDia * 2)); // 2 días de stock
  const concentradoPastoreo =
    REBANO.vacas_en_ordene * REBANO.consumo_concentrado_pastoreo_kg_dia;
  const compensacion = (1 - cobertura) * concentradoEncierro;
  const costoConcentradoPastoreo =
    (concentradoPastoreo + compensacion) * PRECIOS.costo_concentrado_clp_por_kg;

  // Riesgo de daño por pisoteo proporcional a la lluvia
  let factorRiesgo = 0;
  if (lluviaHoy >= UMBRALES.lluvia_riesgo_alto) factorRiesgo = 0.30;
  else if (lluviaHoy >= UMBRALES.lluvia_riesgo_pisoteo) factorRiesgo = 0.15;

  // Si las próximas 72h vienen muy lluviosas, sumamos riesgo
  if (lluvia72h >= 25) factorRiesgo += 0.10;

  // Valor del pasto en riesgo: kg MS × valor energético equivalente al concentrado
  const valorPastoExpuesto =
    msDispoTotal * 0.4 * PRECIOS.costo_concentrado_clp_por_kg;
  const costoPisoteo = factorRiesgo * valorPastoExpuesto;

  const costoPastoreo = costoConcentradoPastoreo + costoPisoteo;

  // ────────────────────────────────────────────────
  // Decisión
  // ────────────────────────────────────────────────
  const ahorro = Math.abs(costoPastoreo - costoEncierro);
  const encerrar = costoEncierro < costoPastoreo;

  const razonesEncerrar = [];
  if (factorRiesgo > 0) {
    razonesEncerrar.push(
      `Lluvia ${lluviaHoy} mm hoy + ${lluvia72h} mm en los próximos 3 días → riesgo de daño al rebrote por pisoteo (${(
        factorRiesgo * 100
      ).toFixed(0)}%).`
    );
  }

  const razonesPastorear = [];
  if (cobertura > 0.8) {
    razonesPastorear.push(
      `Pasto disponible cubre ${(cobertura * 100).toFixed(0)}% del consumo del rebaño (${haListas} ha listas).`
    );
  }

  let confianza = 0.75;
  if (factorRiesgo >= 0.3 || cobertura >= 0.95) confianza = 0.9;
  if (ahorro / Math.min(costoEncierro, costoPastoreo) < 0.05) confianza = 0.5;

  return {
    recomendacion: encerrar ? "ENCERRAR" : "PASTOREAR",
    severidad: factorRiesgo >= 0.3 ? "ROJO" : factorRiesgo > 0 ? "AMARILLO" : "VERDE",
    ahorroCLP: ahorro,
    confianza,
    razon: encerrar
      ? razonesEncerrar.join(" ")
      : razonesPastorear.join(" ") +
        ` Pastorear ahorra ${Math.round(ahorro / 1000).toLocaleString("es-CL")} mil pesos vs encerrar.`,
    accion: encerrar
      ? `Mover el rebaño a estabulación y servir ración completa de concentrado por las próximas 24-48 h.`
      : `Continuar plan de pastoreo. Asignar potreros listos (${POTREROS_LISTOS.map((p) => p.nombre).join(", ")}).`,
    detalle: {
      lluvia_hoy: lluviaHoy,
      lluvia_72h: lluvia72h,
      ms_disponible_kg: Math.round(msDispoTotal),
      hectareas_listas: haListas,
      cobertura_pct: Math.round(cobertura * 100),
      costo_encierro_clp: Math.round(costoEncierro),
      costo_pastoreo_clp: Math.round(costoPastoreo),
      costo_pisoteo_estimado_clp: Math.round(costoPisoteo),
      factor_riesgo: factorRiesgo,
    },
  };
}
