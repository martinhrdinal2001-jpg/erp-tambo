// Mock data del rebaño Holstein del Fundo el Raulí.
// Operación real: 1000+ vacas. Acá hay una muestra de 40 para diseñar la interfaz.
// Cuando conectemos Supabase, esto pasa a ser una consulta con paginación real.

export const LOTES = [
  { id: "lote-1", nombre: "Lote 1 — Alta producción", descripcion: "Recién paridas (0–100 DEL)" },
  { id: "lote-2", nombre: "Lote 2 — Media producción", descripcion: "Mitad de lactancia (100–200 DEL)" },
  { id: "lote-3", nombre: "Lote 3 — Baja producción", descripcion: "Fin de lactancia (200+ DEL)" },
  { id: "secas", nombre: "Lote Secas", descripcion: "En período seco, preparándose al parto" },
  { id: "vaquillas", nombre: "Vaquillas", descripcion: "Recría, aún no han parido" },
  { id: "enfermeria", nombre: "Enfermería", descripcion: "En tratamiento veterinario" },
];

export const ESTADOS_VACA = [
  "En ordeñe",
  "Seca",
  "Vaquilla",
  "En tratamiento",
  "Descartada",
];

// "DEL" = días en leche (desde el último parto). 1000+ Holstein típica.
// Las producciones diarias se generan a partir del DEL y el número de lactancia.
export const VACAS = [
  // Lote 1 — Alta producción
  { id: 1, caravana: "0042", nombre: "Manchita", fechaNacimiento: "2020-04-15", lote: "lote-1", estado: "En ordeñe", numLactancia: 3, ultimoParto: "2026-04-20", proximaInseminacion: "2026-06-25", observaciones: "Top productora del lote." },
  { id: 2, caravana: "0087", nombre: null, fechaNacimiento: "2021-08-09", lote: "lote-1", estado: "En ordeñe", numLactancia: 2, ultimoParto: "2026-05-02", proximaInseminacion: null, observaciones: "" },
  { id: 3, caravana: "0103", nombre: "Estrella", fechaNacimiento: "2019-11-22", lote: "lote-1", estado: "En ordeñe", numLactancia: 4, ultimoParto: "2026-04-10", proximaInseminacion: "2026-06-20", observaciones: "Excelente conformación de ubre." },
  { id: 4, caravana: "0128", nombre: null, fechaNacimiento: "2022-01-30", lote: "lote-1", estado: "En ordeñe", numLactancia: 2, ultimoParto: "2026-05-12", proximaInseminacion: null, observaciones: "" },
  { id: 5, caravana: "0156", nombre: "Linda", fechaNacimiento: "2020-07-05", lote: "lote-1", estado: "En ordeñe", numLactancia: 3, ultimoParto: "2026-03-28", proximaInseminacion: "2026-06-18", observaciones: "" },
  { id: 6, caravana: "0171", nombre: null, fechaNacimiento: "2021-03-14", lote: "lote-1", estado: "En ordeñe", numLactancia: 2, ultimoParto: "2026-05-25", proximaInseminacion: null, observaciones: "" },
  { id: 7, caravana: "0204", nombre: "Luna", fechaNacimiento: "2019-05-18", lote: "lote-1", estado: "En ordeñe", numLactancia: 4, ultimoParto: "2026-04-30", proximaInseminacion: "2026-06-28", observaciones: "" },
  { id: 8, caravana: "0238", nombre: null, fechaNacimiento: "2021-09-12", lote: "lote-1", estado: "En ordeñe", numLactancia: 2, ultimoParto: "2026-05-08", proximaInseminacion: null, observaciones: "" },

  // Lote 2 — Media producción
  { id: 9, caravana: "0276", nombre: "Negra", fechaNacimiento: "2020-02-25", lote: "lote-2", estado: "En ordeñe", numLactancia: 3, ultimoParto: "2026-01-18", proximaInseminacion: null, observaciones: "Preñada confirmada por palpación." },
  { id: 10, caravana: "0291", nombre: null, fechaNacimiento: "2018-12-08", lote: "lote-2", estado: "En ordeñe", numLactancia: 5, ultimoParto: "2026-02-02", proximaInseminacion: null, observaciones: "" },
  { id: 11, caravana: "0314", nombre: "Bella", fechaNacimiento: "2020-08-20", lote: "lote-2", estado: "En ordeñe", numLactancia: 3, ultimoParto: "2026-02-14", proximaInseminacion: null, observaciones: "" },
  { id: 12, caravana: "0345", nombre: null, fechaNacimiento: "2019-10-03", lote: "lote-2", estado: "En ordeñe", numLactancia: 4, ultimoParto: "2026-01-25", proximaInseminacion: null, observaciones: "" },
  { id: 13, caravana: "0378", nombre: "Pinta", fechaNacimiento: "2021-04-11", lote: "lote-2", estado: "En ordeñe", numLactancia: 2, ultimoParto: "2026-02-28", proximaInseminacion: null, observaciones: "" },
  { id: 14, caravana: "0402", nombre: null, fechaNacimiento: "2020-06-14", lote: "lote-2", estado: "En ordeñe", numLactancia: 3, ultimoParto: "2026-03-05", proximaInseminacion: null, observaciones: "" },
  { id: 15, caravana: "0429", nombre: "Mora", fechaNacimiento: "2019-03-29", lote: "lote-2", estado: "En ordeñe", numLactancia: 4, ultimoParto: "2026-02-20", proximaInseminacion: null, observaciones: "" },

  // Lote 3 — Baja producción
  { id: 16, caravana: "0456", nombre: null, fechaNacimiento: "2018-07-11", lote: "lote-3", estado: "En ordeñe", numLactancia: 5, ultimoParto: "2025-11-08", proximaInseminacion: null, observaciones: "Preñada — próxima al secado." },
  { id: 17, caravana: "0483", nombre: "Rosa", fechaNacimiento: "2019-12-22", lote: "lote-3", estado: "En ordeñe", numLactancia: 4, ultimoParto: "2025-10-30", proximaInseminacion: null, observaciones: "Preñada." },
  { id: 18, caravana: "0512", nombre: null, fechaNacimiento: "2018-04-04", lote: "lote-3", estado: "En ordeñe", numLactancia: 5, ultimoParto: "2025-11-15", proximaInseminacion: null, observaciones: "" },
  { id: 19, caravana: "0537", nombre: "Sol", fechaNacimiento: "2019-08-17", lote: "lote-3", estado: "En ordeñe", numLactancia: 4, ultimoParto: "2025-10-25", proximaInseminacion: null, observaciones: "" },
  { id: 20, caravana: "0561", nombre: null, fechaNacimiento: "2020-01-09", lote: "lote-3", estado: "En ordeñe", numLactancia: 3, ultimoParto: "2025-11-22", proximaInseminacion: null, observaciones: "" },
  { id: 21, caravana: "0598", nombre: "Princesa", fechaNacimiento: "2018-11-13", lote: "lote-3", estado: "En ordeñe", numLactancia: 5, ultimoParto: "2025-12-01", proximaInseminacion: null, observaciones: "" },

  // Secas
  { id: 22, caravana: "0612", nombre: null, fechaNacimiento: "2019-05-26", lote: "secas", estado: "Seca", numLactancia: 4, ultimoParto: "2025-09-12", proximaInseminacion: null, observaciones: "Parto estimado: 25/06." },
  { id: 23, caravana: "0645", nombre: "Lola", fechaNacimiento: "2020-03-18", lote: "secas", estado: "Seca", numLactancia: 3, ultimoParto: "2025-09-20", proximaInseminacion: null, observaciones: "Parto estimado: 02/07." },
  { id: 24, caravana: "0671", nombre: null, fechaNacimiento: "2018-09-30", lote: "secas", estado: "Seca", numLactancia: 5, ultimoParto: "2025-10-05", proximaInseminacion: null, observaciones: "" },
  { id: 25, caravana: "0708", nombre: "Coqueta", fechaNacimiento: "2020-11-22", lote: "secas", estado: "Seca", numLactancia: 3, ultimoParto: "2025-09-28", proximaInseminacion: null, observaciones: "" },
  { id: 26, caravana: "0734", nombre: null, fechaNacimiento: "2019-07-08", lote: "secas", estado: "Seca", numLactancia: 4, ultimoParto: "2025-10-15", proximaInseminacion: null, observaciones: "" },

  // Vaquillas
  { id: 27, caravana: "1024", nombre: null, fechaNacimiento: "2023-04-12", lote: "vaquillas", estado: "Vaquilla", numLactancia: 0, ultimoParto: null, proximaInseminacion: "2026-07-15", observaciones: "Lista para inseminar." },
  { id: 28, caravana: "1056", nombre: "Trébol", fechaNacimiento: "2023-06-25", lote: "vaquillas", estado: "Vaquilla", numLactancia: 0, ultimoParto: null, proximaInseminacion: "2026-08-10", observaciones: "" },
  { id: 29, caravana: "1089", nombre: null, fechaNacimiento: "2023-08-03", lote: "vaquillas", estado: "Vaquilla", numLactancia: 0, ultimoParto: null, proximaInseminacion: "2026-09-05", observaciones: "" },
  { id: 30, caravana: "1112", nombre: null, fechaNacimiento: "2023-09-17", lote: "vaquillas", estado: "Vaquilla", numLactancia: 0, ultimoParto: null, proximaInseminacion: "2026-10-12", observaciones: "" },
  { id: 31, caravana: "1145", nombre: "Margarita", fechaNacimiento: "2023-11-08", lote: "vaquillas", estado: "Vaquilla", numLactancia: 0, ultimoParto: null, proximaInseminacion: "2026-12-01", observaciones: "" },
  { id: 32, caravana: "1178", nombre: null, fechaNacimiento: "2024-01-20", lote: "vaquillas", estado: "Vaquilla", numLactancia: 0, ultimoParto: null, proximaInseminacion: null, observaciones: "" },
  { id: 33, caravana: "1203", nombre: null, fechaNacimiento: "2024-02-14", lote: "vaquillas", estado: "Vaquilla", numLactancia: 0, ultimoParto: null, proximaInseminacion: null, observaciones: "" },
  { id: 34, caravana: "1235", nombre: "Lucía", fechaNacimiento: "2024-03-22", lote: "vaquillas", estado: "Vaquilla", numLactancia: 0, ultimoParto: null, proximaInseminacion: null, observaciones: "" },

  // Enfermería
  { id: 35, caravana: "0823", nombre: "Negrita", fechaNacimiento: "2019-11-04", lote: "enfermeria", estado: "En tratamiento", numLactancia: 4, ultimoParto: "2026-02-08", proximaInseminacion: null, observaciones: "Mastitis clínica cuarto trasero derecho. Antibiótico día 3 de 5." },
  { id: 36, caravana: "0857", nombre: null, fechaNacimiento: "2020-08-19", lote: "enfermeria", estado: "En tratamiento", numLactancia: 3, ultimoParto: "2026-03-15", proximaInseminacion: null, observaciones: "Cojera, sospecha de pododermatitis. En tratamiento podal." },
  { id: 37, caravana: "0891", nombre: null, fechaNacimiento: "2018-06-30", lote: "enfermeria", estado: "En tratamiento", numLactancia: 5, ultimoParto: "2025-12-22", proximaInseminacion: null, observaciones: "Cetosis subclínica. Suplementación energética." },

  // Descartadas
  { id: 38, caravana: "0445", nombre: null, fechaNacimiento: "2017-03-18", lote: null, estado: "Descartada", numLactancia: 6, ultimoParto: "2025-08-04", proximaInseminacion: null, observaciones: "Vendida para faena: baja producción y problemas reproductivos." },
  { id: 39, caravana: "0489", nombre: "Vieja", fechaNacimiento: "2016-10-25", lote: null, estado: "Descartada", numLactancia: 7, ultimoParto: "2025-09-30", proximaInseminacion: null, observaciones: "Edad avanzada, recomendado descarte." },
  { id: 40, caravana: "0521", nombre: null, fechaNacimiento: "2018-02-08", lote: null, estado: "Descartada", numLactancia: 5, ultimoParto: "2025-07-15", proximaInseminacion: null, observaciones: "Vendida a otro fundo como vaca lechera." },
];

// Cálculo de días en leche (DEL) desde el último parto.
export function calcularDEL(fechaUltimoParto) {
  if (!fechaUltimoParto) return null;
  const parto = new Date(fechaUltimoParto);
  const hoy = new Date();
  const ms = hoy - parto;
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

// Producción estimada según curva de lactancia Holstein típica.
// Pico ~50-70 días, declina ~2.5%/semana después.
export function produccionEstimada(vaca) {
  if (vaca.estado !== "En ordeñe") return 0;
  const del = calcularDEL(vaca.ultimoParto);
  if (del === null) return 0;
  // Producción base según número de lactancia
  const pico = 32 + Math.min(vaca.numLactancia, 4) * 3; // 35–44 L/día
  if (del < 50) return Math.round(pico * 0.85 * 10) / 10;
  if (del < 100) return Math.round(pico * 10) / 10;
  if (del < 200) return Math.round(pico * 0.85 * 10) / 10;
  if (del < 300) return Math.round(pico * 0.6 * 10) / 10;
  return Math.round(pico * 0.4 * 10) / 10;
}

// Producción mock de los últimos 7 días con pequeña variación aleatoria estable.
export function produccion7Dias(vaca) {
  const base = produccionEstimada(vaca);
  if (!base) return [];
  // Variación pseudo-aleatoria estable por vaca
  const seed = vaca.id;
  return Array.from({ length: 7 }, (_, i) => {
    const v = ((Math.sin(seed * 7 + i) + 1) / 2) * 4 - 2;
    return Math.max(0, Math.round((base + v) * 10) / 10);
  });
}

export function getVacaById(id) {
  return VACAS.find((v) => v.id === Number(id));
}

export function getLoteById(id) {
  return LOTES.find((l) => l.id === id);
}

export function edadVaca(fechaNacimiento) {
  const nac = new Date(fechaNacimiento);
  const hoy = new Date();
  let anios = hoy.getFullYear() - nac.getFullYear();
  let meses = hoy.getMonth() - nac.getMonth();
  if (meses < 0) {
    anios -= 1;
    meses += 12;
  }
  return { anios, meses };
}
