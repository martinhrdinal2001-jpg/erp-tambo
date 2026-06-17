// Inventario de potreros con estado del pasto.
// En invierno (junio en Purranque), el crecimiento es bajo (1-5 kg MS/ha/día)
// porque las temperaturas frías limitan la fotosíntesis.

// Tasa de crecimiento típica del sur de Chile por mes (kg MS/ha/día).
export const CRECIMIENTO_MENSUAL = {
  1: 65, 2: 55, 3: 42, 4: 28, 5: 12, 6: 4,
  7: 3, 8: 6, 9: 20, 10: 48, 11: 68, 12: 70,
};

// Mes actual (junio).
const MES = 6;
export const CRECIMIENTO_HOY = CRECIMIENTO_MENSUAL[MES];

export const POTREROS = [
  {
    id: "p1",
    nombre: "Potrero Los Robles",
    hectareas: 12,
    altura_pasto_cm: 11,
    ms_disponible_kg_ha: 2200,
    crecimiento_kg_ms_ha_dia: CRECIMIENTO_HOY,
    ultimo_pastoreo: "2026-05-20",
    dias_descanso: 27,
    estado: "listo",
  },
  {
    id: "p2",
    nombre: "Potrero La Loma",
    hectareas: 9,
    altura_pasto_cm: 13,
    ms_disponible_kg_ha: 2500,
    crecimiento_kg_ms_ha_dia: CRECIMIENTO_HOY,
    ultimo_pastoreo: "2026-05-18",
    dias_descanso: 29,
    estado: "listo",
  },
  {
    id: "p3",
    nombre: "Potrero del Estero",
    hectareas: 14,
    altura_pasto_cm: 8,
    ms_disponible_kg_ha: 1500,
    crecimiento_kg_ms_ha_dia: CRECIMIENTO_HOY,
    ultimo_pastoreo: "2026-05-30",
    dias_descanso: 17,
    estado: "descanso",
  },
  {
    id: "p4",
    nombre: "Cancha Grande",
    hectareas: 18,
    altura_pasto_cm: 10,
    ms_disponible_kg_ha: 2000,
    crecimiento_kg_ms_ha_dia: CRECIMIENTO_HOY,
    ultimo_pastoreo: "2026-05-25",
    dias_descanso: 22,
    estado: "listo",
  },
  {
    id: "p5",
    nombre: "Potrero del Galpón",
    hectareas: 7,
    altura_pasto_cm: 6,
    ms_disponible_kg_ha: 1100,
    crecimiento_kg_ms_ha_dia: CRECIMIENTO_HOY,
    ultimo_pastoreo: "2026-06-05",
    dias_descanso: 11,
    estado: "descanso",
  },
  {
    id: "p6",
    nombre: "Potrero Las Encinas",
    hectareas: 11,
    altura_pasto_cm: 12,
    ms_disponible_kg_ha: 2300,
    crecimiento_kg_ms_ha_dia: CRECIMIENTO_HOY,
    ultimo_pastoreo: "2026-05-22",
    dias_descanso: 25,
    estado: "listo",
  },
];

export const POTREROS_LISTOS = POTREROS.filter((p) => p.estado === "listo");

export function msDisponibleTotal() {
  return POTREROS_LISTOS.reduce(
    (s, p) => s + p.ms_disponible_kg_ha * p.hectareas,
    0
  );
}

export function hectareasListas() {
  return POTREROS_LISTOS.reduce((s, p) => s + p.hectareas, 0);
}
