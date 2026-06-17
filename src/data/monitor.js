// ──────────────────────────────────────────────────────────────────────
// Central El Raulí — datos del Monitor Campo
//
// Mock data realista para el MVP. Cuando conectemos Supabase, esto pasa
// a ser un query. La forma de los objetos coincide con la migración SQL.
//
// Tipos (JSDoc para que sirvan como referencia sin pasar a TypeScript):
//
// @typedef {"WHATSAPP"|"MANUAL"|"QR"|"SENSOR"|"GPS"|"OTRO"} CanalOrigen
// @typedef {"ROJO"|"AMARILLO"|"VERDE"|"GRIS"} Prioridad
// @typedef {"MASTITIS"|"PARTO"|"TRATAMIENTO"|"TERNERA_ENFERMA"|"PROBLEMA_AGUA"|"FALLA_MAQUINARIA"|"FALTA_INSUMO"|"PROBLEMA_ORDENA"|"OTRO"} TipoEvento
// @typedef {"PENDIENTE"|"EN_REVISION"|"CONVERTIDO"|"DESCARTADO"} EstadoMensaje
// ──────────────────────────────────────────────────────────────────────

export const TIPOS_EVENTO = [
  { id: "MASTITIS", label: "Mastitis" },
  { id: "PARTO", label: "Parto" },
  { id: "TRATAMIENTO", label: "Tratamiento" },
  { id: "TERNERA_ENFERMA", label: "Ternera enferma" },
  { id: "PROBLEMA_AGUA", label: "Problema de agua" },
  { id: "FALLA_MAQUINARIA", label: "Falla de maquinaria" },
  { id: "FALTA_INSUMO", label: "Falta de insumo" },
  { id: "PROBLEMA_ORDENA", label: "Problema en ordeña" },
  { id: "OTRO", label: "Otro" },
];

export const PRIORIDADES = ["ROJO", "AMARILLO", "VERDE", "GRIS"];

export const CANALES = ["WHATSAPP", "MANUAL", "QR", "SENSOR", "GPS", "OTRO"];

// Fecha base "ahora" para que los timestamps relativos sean estables.
const AHORA = new Date("2026-06-16T11:00:00-04:00");

function hace(minutos) {
  return new Date(AHORA.getTime() - minutos * 60_000).toISOString();
}

// ──────────────────────────────────────────────────────────────────────
// Bandeja de mensajes (estado inicial)
// ──────────────────────────────────────────────────────────────────────
export const MENSAJES_INICIALES = [
  {
    id: "msg-001",
    canal_origen: "WHATSAPP",
    whatsapp_message_id: "wamid.HBgLNTY5Mjk0NjU0AA==",
    from_phone: "+56 9 5678 1234",
    from_name: "Pedro",
    trabajador_id: 3, // Pedro Antillanca
    mensaje_texto:
      "Urgente, la vaca 0428 salió con mastitis en el cuarto delantero derecho. Tiene la ubre caliente y dura.",
    audio_url: "audio_msg_001.ogg",
    audio_duracion: 14,
    imagen_url: null,
    ubicacion_texto: "Sala de ordeñe",
    recibido_at: hace(8),
    procesado: true,
    prioridad_sugerida: "ROJO",
    tipo_evento_sugerido: "MASTITIS",
    caravana_sugerida: "0428",
    confianza_ia: 0.92,
    estado: "PENDIENTE",
  },
  {
    id: "msg-002",
    canal_origen: "WHATSAPP",
    from_phone: "+56 9 2109 8765",
    from_name: "Carolina",
    trabajador_id: 9, // Carolina Beltrán
    mensaje_texto:
      "La ternera 0032 no tomó leche esta mañana. Está decaída y no quiere pararse.",
    audio_url: null,
    imagen_url: "ternera_0032.jpg",
    ubicacion_texto: "Crianza de terneros",
    recibido_at: hace(42),
    procesado: true,
    prioridad_sugerida: "AMARILLO",
    tipo_evento_sugerido: "TERNERA_ENFERMA",
    caravana_sugerida: "0032",
    confianza_ia: 0.88,
    estado: "PENDIENTE",
  },
  {
    id: "msg-003",
    canal_origen: "WHATSAPP",
    from_phone: "+56 9 9876 5432",
    from_name: "Sergio",
    trabajador_id: 5, // Sergio Müller
    mensaje_texto:
      "La bomba del sector agua no parte. Probé los fusibles, están bien.",
    audio_url: null,
    imagen_url: "bomba_agua.jpg",
    ubicacion_texto: "Sector pozo",
    recibido_at: hace(67),
    procesado: true,
    prioridad_sugerida: "ROJO",
    tipo_evento_sugerido: "PROBLEMA_AGUA",
    caravana_sugerida: null,
    confianza_ia: 0.90,
    estado: "PENDIENTE",
  },
  {
    id: "msg-004",
    canal_origen: "WHATSAPP",
    from_phone: "+56 9 8901 2345",
    from_name: "Manuel",
    trabajador_id: 13, // Manuel Huenupán
    mensaje_texto:
      "Falta antibiótico (oxitetraciclina) en la bodega. Solo queda 1 frasco para mañana.",
    audio_url: null,
    imagen_url: null,
    ubicacion_texto: "Bodega central",
    recibido_at: hace(125),
    procesado: true,
    prioridad_sugerida: "AMARILLO",
    tipo_evento_sugerido: "FALTA_INSUMO",
    caravana_sugerida: null,
    confianza_ia: 0.85,
    estado: "PENDIENTE",
  },
  {
    id: "msg-005",
    canal_origen: "WHATSAPP",
    from_phone: "+56 9 7456 8910",
    from_name: "María Soledad",
    trabajador_id: 2, // María Soledad Sanhueza
    mensaje_texto:
      "Parto de la 0611, cría viva, hembra. Sin asistencia.",
    audio_url: null,
    imagen_url: "parto_0611.jpg",
    ubicacion_texto: "Potrero La Loma",
    recibido_at: hace(180),
    procesado: true,
    prioridad_sugerida: "AMARILLO",
    tipo_evento_sugerido: "PARTO",
    caravana_sugerida: "0611",
    confianza_ia: 0.95,
    estado: "PENDIENTE",
  },
  {
    id: "msg-006",
    canal_origen: "WHATSAPP",
    from_phone: "+56 9 4321 8765",
    from_name: "Juan Carlos",
    trabajador_id: 4, // Juan Carlos Burgos
    mensaje_texto:
      "La 0291 tiene la pata trasera derecha hinchada. Cojea fuerte.",
    audio_url: "audio_msg_006.ogg",
    audio_duracion: 8,
    imagen_url: null,
    ubicacion_texto: "Sala de ordeñe",
    recibido_at: hace(240),
    procesado: true,
    prioridad_sugerida: "AMARILLO",
    tipo_evento_sugerido: "TRATAMIENTO",
    caravana_sugerida: "0291",
    confianza_ia: 0.82,
    estado: "PENDIENTE",
  },
  {
    id: "msg-007",
    canal_origen: "WHATSAPP",
    from_phone: "+56 9 3210 9876",
    from_name: "José",
    trabajador_id: 7, // José Aravena
    mensaje_texto:
      "Tractor secundario no arranca. Probé la batería, está cargada.",
    audio_url: null,
    imagen_url: null,
    ubicacion_texto: "Galpón maquinaria",
    recibido_at: hace(305),
    procesado: true,
    prioridad_sugerida: "AMARILLO",
    tipo_evento_sugerido: "FALLA_MAQUINARIA",
    caravana_sugerida: null,
    confianza_ia: 0.88,
    estado: "PENDIENTE",
  },
  {
    id: "msg-008",
    canal_origen: "WHATSAPP",
    from_phone: "+56 9 6543 2109",
    from_name: "Roberto",
    trabajador_id: 6, // Roberto Painén
    mensaje_texto: "Vaca 0156 en celo desde anoche. Avisé al inseminador.",
    audio_url: null,
    imagen_url: null,
    ubicacion_texto: "Potrero Cancha",
    recibido_at: hace(360),
    procesado: true,
    prioridad_sugerida: "VERDE",
    tipo_evento_sugerido: "OTRO",
    caravana_sugerida: "0156",
    confianza_ia: 0.75,
    estado: "PENDIENTE",
  },
  {
    id: "msg-009",
    canal_origen: "WHATSAPP",
    from_phone: "+56 9 1234 0876",
    from_name: "Camila",
    trabajador_id: 21, // Camila Andrade
    mensaje_texto:
      "Salida de la 0042 con problemas en pezones. Creo mastitis subclínica. Le saqué muestra.",
    audio_url: "audio_msg_009.ogg",
    audio_duracion: 22,
    imagen_url: null,
    ubicacion_texto: "Sala de ordeñe",
    recibido_at: hace(480),
    procesado: true,
    prioridad_sugerida: "AMARILLO",
    tipo_evento_sugerido: "MASTITIS",
    caravana_sugerida: "0042",
    confianza_ia: 0.78,
    estado: "PENDIENTE",
  },
  {
    id: "msg-010",
    canal_origen: "WHATSAPP",
    from_phone: "+56 9 3456 7890",
    from_name: "Diego",
    trabajador_id: 18, // Diego Ávila
    mensaje_texto: "Falta pasta selladora post-ordeñe. Hay solo medio bidón.",
    audio_url: null,
    imagen_url: null,
    ubicacion_texto: "Sala de ordeñe",
    recibido_at: hace(540),
    procesado: true,
    prioridad_sugerida: "AMARILLO",
    tipo_evento_sugerido: "FALTA_INSUMO",
    caravana_sugerida: null,
    confianza_ia: 0.83,
    estado: "PENDIENTE",
  },
];

// ──────────────────────────────────────────────────────────────────────
// Eventos confirmados oficiales del día
// ──────────────────────────────────────────────────────────────────────
export const EVENTOS_INICIALES = [
  {
    id: "evt-001",
    mensaje_campo_id: "msg-archivo-1",
    tipo_evento: "MASTITIS",
    prioridad: "ROJO",
    caravana_vaca: "0823",
    descripcion:
      "Mastitis clínica cuarto trasero derecho. Tratamiento antibiótico iniciado día 3 de 5.",
    creado_por_trabajador_id: 8, // Andrés Schmidt (veterinario)
    validado_por: "Hernán Catrileo (capataz)",
    validado_at: hace(60),
    fecha_hora_evento: hace(75),
  },
  {
    id: "evt-002",
    mensaje_campo_id: "msg-archivo-2",
    tipo_evento: "PARTO",
    prioridad: "VERDE",
    caravana_vaca: "0612",
    descripcion: "Parto normal, cría macho, peso aprox. 38 kg. Calostro suministrado.",
    creado_por_trabajador_id: 9, // Carolina Beltrán
    validado_por: "Hernán Catrileo (capataz)",
    validado_at: hace(150),
    fecha_hora_evento: hace(175),
  },
  {
    id: "evt-003",
    mensaje_campo_id: "msg-archivo-3",
    tipo_evento: "TRATAMIENTO",
    prioridad: "AMARILLO",
    caravana_vaca: "0857",
    descripcion: "Pododermatitis, tratamiento podal aplicado. Reposo en enfermería 3 días.",
    creado_por_trabajador_id: 8, // Andrés Schmidt
    validado_por: "Hernán Catrileo (capataz)",
    validado_at: hace(280),
    fecha_hora_evento: hace(310),
  },
];

// ──────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────
export function getTipoEventoLabel(id) {
  return TIPOS_EVENTO.find((t) => t.id === id)?.label || id;
}

export function tiempoRelativo(iso) {
  const ms = AHORA.getTime() - new Date(iso).getTime();
  const min = Math.round(ms / 60_000);
  if (min < 1) return "ahora";
  if (min < 60) return `hace ${min} min`;
  const hrs = Math.floor(min / 60);
  if (hrs < 24) return `hace ${hrs} h`;
  const dias = Math.floor(hrs / 24);
  return `hace ${dias} d`;
}

export function horaCorta(iso) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
