// Bitácora de turnos AM/PM del Fundo el Raulí.
// Solo aplica a los trabajadores que hacen ordeñe (Ordeñador + Jefe de Ordeñe).
// Horarios reales del campo:
//   AM: 04:00 – 07:30
//   PM: 16:00 – 19:30
// Sábado y domingo incluidos. Todo el año.

import { TRABAJADORES } from "./trabajadores";

export const TURNOS_TIPOS = ["AM", "PM"];

export const HORARIO_TURNO = {
  AM: { inicio: "04:00", fin: "07:30", label: "Ordeñe de la mañana" },
  PM: { inicio: "16:00", fin: "19:30", label: "Ordeñe de la tarde" },
};

export const ESTADOS_TURNO = [
  "Presente",
  "Atrasado",
  "Ausente",
  "Vacaciones",
  "Licencia médica",
];

// Quiénes hacen ordeñe (los únicos con turno cortado)
export function esOrdenador(trabajador) {
  return ["Ordeñador", "Jefe de Ordeñe"].includes(trabajador.rol);
}

export const ORDENADORES = TRABAJADORES.filter(esOrdenador);

// Pseudo-aleatorio determinista para que el mock sea estable entre recargas.
function hash(trabajadorId, fecha, tipo) {
  const t = tipo === "AM" ? 1 : 2;
  const f = fecha.getDate() + (fecha.getMonth() + 1) * 31;
  const seed = trabajadorId * 7919 + f * 31 + t * 13;
  return (Math.sin(seed) + 1) / 2; // 0..1
}

// Cuánto se atrasó (en minutos). Solo si está "Atrasado".
function minutosAtraso(trabajadorId, fecha, tipo) {
  const h = hash(trabajadorId, fecha, tipo);
  return Math.round(5 + h * 30); // 5–35 min
}

function generarEstado(trabajador, fecha, tipo) {
  // Estados duros del trabajador (vacaciones / licencia / inactivo)
  if (trabajador.estado === "Vacaciones") return "Vacaciones";
  if (trabajador.estado === "Licencia médica") return "Licencia médica";
  if (trabajador.estado === "Inactivo") return null;

  const r = hash(trabajador.id, fecha, tipo);

  // Perfil por trabajador — refleja el "compromiso" según antigüedad y rol
  // Jefes (id 2) son los más responsables; los nuevos en onboarding también
  // se cuidan por el efecto principiante; los veteranos a veces se relajan.
  let presente, atrasado;
  if (trabajador.id === 2) {
    presente = 0.98; atrasado = 0.02; // Jefa de ordeñe: casi perfecto
  } else if (trabajador.id === 21) {
    presente = 0.97; atrasado = 0.03; // Camila, recién contratada
  } else if (trabajador.id === 18) {
    presente = 0.94; atrasado = 0.05; // Diego, en onboarding
  } else if (trabajador.id === 3) {
    presente = 0.92; atrasado = 0.05; // Pedro, veterano confiable
  } else if (trabajador.id === 4) {
    presente = 0.85; atrasado = 0.10; // Juan Carlos, algo relajado
  } else {
    presente = 0.88; atrasado = 0.08;
  }

  if (r < presente) return "Presente";
  if (r < presente + atrasado) return "Atrasado";
  return "Ausente";
}

const HOY = new Date("2026-06-16");

export function generarBitacora(diasAtras = 14) {
  const turnos = [];
  let id = 1;
  for (let d = diasAtras - 1; d >= 0; d--) {
    const fecha = new Date(HOY);
    fecha.setDate(HOY.getDate() - d);
    const fechaStr = fecha.toISOString().slice(0, 10);
    const esFinde = fecha.getDay() === 0 || fecha.getDay() === 6;
    for (const trabajador of ORDENADORES) {
      for (const tipo of TURNOS_TIPOS) {
        const estado = generarEstado(trabajador, fecha, tipo);
        if (!estado) continue;
        const horaProgramada = HORARIO_TURNO[tipo].inicio;
        let horaIngreso = null;
        let minAtraso = 0;
        if (estado === "Presente") {
          // Llega entre 5 min antes y on time
          horaIngreso = horaProgramada;
        } else if (estado === "Atrasado") {
          minAtraso = minutosAtraso(trabajador.id, fecha, tipo);
          const [hh, mm] = horaProgramada.split(":").map(Number);
          const total = hh * 60 + mm + minAtraso;
          const hh2 = Math.floor(total / 60);
          const mm2 = total % 60;
          horaIngreso = `${String(hh2).padStart(2, "0")}:${String(mm2).padStart(2, "0")}`;
        }
        turnos.push({
          id: id++,
          fecha: fechaStr,
          esFinde,
          tipo,
          trabajadorId: trabajador.id,
          estado,
          horaIngreso,
          minAtraso,
        });
      }
    }
  }
  return turnos;
}

export const TURNOS = generarBitacora(14);

export function turnosPorTrabajador(trabajadorId) {
  return TURNOS.filter((t) => t.trabajadorId === trabajadorId);
}

export function turnosPorFecha(fechaStr) {
  return TURNOS.filter((t) => t.fecha === fechaStr);
}

export function turnoDe(trabajadorId, fechaStr, tipo) {
  return TURNOS.find(
    (t) => t.trabajadorId === trabajadorId && t.fecha === fechaStr && t.tipo === tipo
  );
}

// Estadísticas de compromiso por trabajador
export function estadisticasTrabajador(trabajadorId) {
  const turnos = turnosPorTrabajador(trabajadorId);
  const total = turnos.length;
  if (total === 0) return null;
  const presentes = turnos.filter((t) => t.estado === "Presente").length;
  const atrasados = turnos.filter((t) => t.estado === "Atrasado").length;
  const ausentes = turnos.filter((t) => t.estado === "Ausente").length;
  const sumaAtraso = turnos.reduce((s, t) => s + (t.minAtraso || 0), 0);
  const efectivos = presentes + atrasados;
  return {
    total,
    presentes,
    atrasados,
    ausentes,
    asistencia: Math.round((efectivos / total) * 100),
    puntualidad: Math.round((presentes / total) * 100),
    promedioAtraso: atrasados > 0 ? Math.round(sumaAtraso / atrasados) : 0,
  };
}

// Fechas únicas en orden cronológico
export function fechasBitacora() {
  return [...new Set(TURNOS.map((t) => t.fecha))].sort();
}
