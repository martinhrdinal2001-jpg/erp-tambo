// Parámetros económicos del Fundo el Raulí.
// Valores típicos del sur de Chile (Región de Los Lagos), año 2026.
// Cuando conectemos Supabase, esto pasa a una tabla "parametros" editable.

export const PRECIOS = {
  // Leche cruda pagada por planta (Soprole/Colun típico).
  // Varía con sólidos, calidad, distancia. Asumimos calidad promedio.
  precio_leche_clp_por_litro: 480,

  // Concentrado alta producción comprado al granel/saco.
  costo_concentrado_clp_por_kg: 350,

  // Energía eléctrica para la lechería y bombeos.
  // BT2 típico ~165 CLP/kWh con cargo de potencia.
  costo_energia_clp_por_kwh: 165,
};

export const RIEGO = {
  // Bomba sumergible 15 HP típica para pozo de invierno.
  consumo_bomba_kw: 11,
  // Horas de operación diaria en temporada de riego.
  horas_riego_dia: 6,
  // Hectáreas que cubre la red de riego.
  area_regada_ha: 80,
  // Eficiencia de conversión: 1 mm de riego → kg MS extra/ha/día (verano).
  ms_extra_por_mm_riego: 8,
  // Aporte equivalente del riego en mm/día.
  mm_aporte_riego_dia: 4,
};

export const REBANO = {
  // Vacas en ordeñe a la fecha (productive lotes).
  vacas_en_ordene: 800,
  // Consumo de materia seca por vaca por día (cuerpo + producción).
  consumo_ms_kg_vaca_dia: 18,
  // Consumo de concentrado por vaca por día cuando está en pastoreo (suplemento).
  consumo_concentrado_pastoreo_kg_dia: 6,
  // Consumo de concentrado por vaca cuando está encerrada (ración completa).
  consumo_concentrado_encierro_kg_dia: 12,
  // Litros por vaca promedio en este momento (curva ponderada de lotes).
  litros_promedio_vaca_dia: 28,
};

// Umbrales operativos basados en literatura agronómica del sur de Chile.
export const UMBRALES = {
  // Lluvia diaria a partir de la cual hay riesgo de daño por pisoteo (mm).
  lluvia_riesgo_pisoteo: 8,
  lluvia_riesgo_alto: 15,

  // Caída de producción que activa el detector de anomalías (%).
  caida_produccion_umbral: 5,

  // ITH (índice temperatura-humedad) que indica estrés calórico.
  ith_estres_leve: 72,
  ith_estres_severo: 78,

  // En invierno (junio en Purranque), riego no aplica.
  meses_temporada_riego: [10, 11, 12, 1, 2, 3], // oct-mar
};

export function formatCLP(n) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(n);
}
