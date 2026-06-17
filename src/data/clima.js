// Histórico + proyección de clima para Purranque (Región de Los Lagos).
// Junio es pleno invierno: frío, lluvias frecuentes, humedad alta, ITH bajo.
// Datos simulados deterministas para que los motores analíticos den siempre
// el mismo resultado en demo. Cuando integremos open-meteo en producción,
// reemplazamos esta función por la API.

const HOY = new Date("2026-06-16T08:00:00-04:00");

function fechaISO(diasOffset) {
  const d = new Date(HOY);
  d.setDate(HOY.getDate() + diasOffset);
  return d.toISOString().slice(0, 10);
}

// Índice Temperatura-Humedad (Thom). T en °C, RH en %.
function ITH(tempProm, humedad) {
  const tF = tempProm * 1.8 + 32;
  return Math.round(tF - (0.55 - 0.0055 * humedad) * (tF - 26));
}

function diaClima(offset, tMin, tMax, lluviaMm, humedad, vientoKmh) {
  const tProm = (tMin + tMax) / 2;
  return {
    fecha: fechaISO(offset),
    es_futuro: offset > 0,
    es_hoy: offset === 0,
    temp_min: tMin,
    temp_max: tMax,
    temp_prom: Math.round(tProm * 10) / 10,
    lluvia_mm: lluviaMm,
    humedad: humedad,
    viento_kmh: vientoKmh,
    ITH: ITH(tProm, humedad),
  };
}

// 14 días atrás + hoy + 7 días de pronóstico.
// Realista para Purranque en junio: temperaturas 3-12°C, lluvias frecuentes.
export const CLIMA = [
  // Histórico (offset negativo)
  diaClima(-14,  4, 10,  5, 88, 18),
  diaClima(-13,  3,  9, 12, 92, 22),
  diaClima(-12,  2,  8,  0, 78, 14),
  diaClima(-11,  3,  7,  2, 82, 16),
  diaClima(-10,  5, 11,  8, 86, 20),
  diaClima( -9,  6, 12, 22, 94, 28), // tormenta
  diaClima( -8,  4, 10, 14, 90, 24),
  diaClima( -7,  3,  9,  0, 75, 12),
  diaClima( -6,  4,  8,  3, 80, 14),
  diaClima( -5,  5, 10,  6, 84, 18),
  diaClima( -4,  6, 11, 10, 88, 22),
  diaClima( -3,  4,  9, 16, 92, 26), // lluvia fuerte
  diaClima( -2,  3,  8,  2, 78, 14),
  diaClima( -1,  4,  9,  4, 82, 16),

  // Hoy
  diaClima(  0,  5, 11,  3, 80, 16),

  // Pronóstico (offset positivo)
  diaClima(  1,  6, 12, 18, 90, 24), // ⚠ lluvia fuerte mañana
  diaClima(  2,  4, 10, 25, 94, 30), // ⚠⚠ tormenta pasado mañana
  diaClima(  3,  3,  9,  8, 86, 20),
  diaClima(  4,  2,  8,  0, 72, 12),
  diaClima(  5,  4, 11,  4, 80, 16),
  diaClima(  6,  6, 12, 12, 88, 22),
  diaClima(  7,  5, 11,  6, 84, 18),
];

export const CLIMA_HOY = CLIMA.find((d) => d.es_hoy);
export const PRONOSTICO_7D = CLIMA.filter((d) => d.es_futuro);
export const HISTORICO = CLIMA.filter((d) => !d.es_futuro && !d.es_hoy);

export function lluviaProyectada(diasAdelante = 3) {
  return PRONOSTICO_7D.slice(0, diasAdelante).reduce(
    (s, d) => s + d.lluvia_mm,
    0
  );
}

export function diasConEstresCalorico(periodo = HISTORICO, umbral = 72) {
  return periodo.filter((d) => d.ITH > umbral);
}

export function getClimaDia(fechaISO) {
  return CLIMA.find((d) => d.fecha === fechaISO);
}
