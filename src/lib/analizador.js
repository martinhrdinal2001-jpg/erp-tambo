// Analizador de mensajes de campo. Por ahora reglas simples.
// Cuando integremos IA real (Whisper para audio + LLM para clasificación),
// reemplazamos esta función pero mantenemos la firma.

const REGLAS_TIPO = [
  { regex: /mastitis|cuarto.+(hinchad|durad|caliente)|ubre.+(rara|sangre|grumos)/i, tipo: "MASTITIS" },
  { regex: /\bparto\b|cría viva|recién nacid|placenta/i, tipo: "PARTO" },
  { regex: /\bbomba\b|sin agua|falta agua|cañería/i, tipo: "PROBLEMA_AGUA" },
  { regex: /ternera|ternero|guacho/i, tipo: "TERNERA_ENFERMA" },
  { regex: /tractor|maquinaria|mixer|enfardadora/i, tipo: "FALLA_MAQUINARIA" },
  { regex: /falta\s+\w|se\s+acabó|sin stock/i, tipo: "FALTA_INSUMO" },
  { regex: /pezonera|sala de ordeñ|ordeñ/i, tipo: "PROBLEMA_ORDENA" },
  { regex: /coje|herid|tratamiento|antibiót|inyec/i, tipo: "TRATAMIENTO" },
];

const REGLAS_PRIORIDAD = [
  { regex: /urgente|grave|emergencia|ya\s|ahora\s|inmediato/i, prioridad: "ROJO" },
  { regex: /mastitis clínica|sangre|no arranca|sin agua|hinchad/i, prioridad: "ROJO" },
  { regex: /\?|revisar|chequear|consulta/i, prioridad: "AMARILLO" },
];

const RE_CARAVANA = /\b0?(\d{3,4})\b/;

/**
 * Analiza un mensaje y sugiere tipo, prioridad y caravana.
 * @param {string} texto
 * @returns {{ tipo_evento_sugerido: string, prioridad_sugerida: string, caravana_sugerida: string|null, confianza_ia: number }}
 */
export function analizarMensaje(texto) {
  if (!texto) {
    return {
      tipo_evento_sugerido: "OTRO",
      prioridad_sugerida: "VERDE",
      caravana_sugerida: null,
      confianza_ia: 0,
    };
  }

  // Tipo
  let tipo = "OTRO";
  for (const r of REGLAS_TIPO) {
    if (r.regex.test(texto)) {
      tipo = r.tipo;
      break;
    }
  }

  // Prioridad
  let prioridad = "VERDE";
  for (const r of REGLAS_PRIORIDAD) {
    if (r.regex.test(texto)) {
      prioridad = r.prioridad;
      break;
    }
  }
  // Defaults razonables por tipo cuando no hubo match explícito
  if (prioridad === "VERDE") {
    if (["MASTITIS", "PROBLEMA_AGUA", "FALLA_MAQUINARIA"].includes(tipo)) {
      prioridad = "AMARILLO";
    }
    if (tipo === "TERNERA_ENFERMA") prioridad = "AMARILLO";
  }

  // Caravana
  const m = texto.match(RE_CARAVANA);
  const caravana = m ? m[1].padStart(4, "0") : null;

  // Confianza simple: cuántas reglas matchearon
  const matchedTipo = tipo !== "OTRO";
  const matchedCaravana = !!caravana;
  const confianza =
    0.4 + (matchedTipo ? 0.3 : 0) + (matchedCaravana ? 0.2 : 0);

  return {
    tipo_evento_sugerido: tipo,
    prioridad_sugerida: prioridad,
    caravana_sugerida: caravana,
    confianza_ia: Math.round(confianza * 100) / 100,
  };
}
