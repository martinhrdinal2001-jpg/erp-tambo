// Rutinas y checklists estandarizadas.
// Hay dos tipos:
//   - Operativas diarias (esOnboarding: false): se ejecutan cada día por el equipo.
//   - De onboarding (esOnboarding: true): se completan UNA VEZ por cada trabajador nuevo,
//     organizadas por semana, con foco en ordeñe y manejo seguro de animales.
//
// El campo `semana` solo aplica a rutinas de onboarding (1 a 4).

export const RUTINAS = [
  // ─────────── ONBOARDING — SEMANA 1 ───────────
  {
    id: "onb-induccion",
    nombre: "Día 1 — Inducción al Fundo el Raulí",
    rol: "Todos los nuevos",
    duracion: "Día completo",
    esOnboarding: true,
    semana: 1,
    descripcion:
      "Recorrido y presentación obligatoria. A cargo del capataz. Sienta las bases para todo el resto del onboarding.",
    pasos: [
      "Recorrido por las instalaciones: sala de ordeñe, corrales, casa patronal, bodegas, talleres.",
      "Presentación al equipo completo del fundo.",
      "Entrega de ropa de trabajo, botas y elementos de protección personal.",
      "Revisión de protocolos de seguridad: animales, maquinaria, riesgos eléctricos.",
      "Explicación del mapa del fundo y los nombres de los potreros principales.",
      "Definición del rol específico y el equipo al que se integra.",
      "Asignación de un mentor para los primeros 30 días.",
      "Firma de documentación laboral, contrato y exámenes de salud.",
    ],
  },
  {
    id: "onb-manejo-rebano",
    nombre: "S1 — Manejo seguro del rebaño",
    rol: "Todos los nuevos",
    duracion: "2 días acompañado",
    esOnboarding: true,
    semana: 1,
    descripcion:
      "Aprender a leer y mover vacas Holstein sin estresarlas ni exponerse a riesgo. Crítico: una vaca asustada produce menos y puede lesionar a un trabajador inexperto.",
    pasos: [
      "Acompañar a un ordeñador experimentado durante un arreo completo (sala ↔ potrero).",
      "Aprender a leer el lenguaje corporal: orejas, cola, postura.",
      "Reconocer signos de estrés y agresividad en la vaca.",
      "Movimientos calmados, sin gritos, sin perros sueltos, sin golpes.",
      "Uso correcto de la vara/bastón como guía visual, NO como castigo.",
      "Identificar la zona de fuga y la zona de presión del animal.",
      "Manejo extra cuidadoso de vacas en celo (más reactivas).",
      "Salida segura ante embestida: nunca correr en línea recta.",
      "Reconocer la \"vaca líder\" del lote y moverse con ella.",
    ],
  },
  {
    id: "onb-anatomia-ordene",
    nombre: "S1 — Anatomía de la ubre y técnica de ordeñe",
    rol: "Ordeñador",
    duracion: "1 día teórico + 3 días en sala",
    esOnboarding: true,
    semana: 1,
    descripcion:
      "Base técnica del ordeñe. Sin esto, el trabajador puede dañar la ubre, contaminar la leche o causar mastitis. Es la rutina más importante del onboarding.",
    pasos: [
      "Reconocer las partes externas de la ubre y los 4 cuartos.",
      "Identificar diferencias entre los cuartos: producción no es uniforme.",
      "Cómo agarrar el pezón sin lastimar: técnica de \"mano cerrada\".",
      "Procedimiento de despunte: primeros 3-4 chorros revisando grumos, sangre o suero.",
      "Limpieza pre-ordeñe con toalla individual (una por vaca).",
      "Colocación correcta de pezoneras: alineadas, sin pliegues, en orden.",
      "Detección de mastitis clínica: leche con grumos, suero o sangre.",
      "Nunca sobreordeñar: retirar pezoneras cuando el flujo baja.",
      "Aplicación de sellador post-ordeñe en los 4 pezones.",
      "Higiene de manos del operador entre vacas.",
    ],
  },

  // ─────────── ONBOARDING — SEMANA 2 ───────────
  {
    id: "onb-sanidad",
    nombre: "S2 — Sanidad y signos de alerta",
    rol: "Todos los nuevos",
    duracion: "2 días con veterinario o jefe",
    esOnboarding: true,
    semana: 2,
    descripcion:
      "El trabajador nuevo tiene que poder distinguir una vaca sana de una que necesita atención. Aprender a observar es lo que más rotación evita: nadie quiere estar en un equipo donde el animal sufre por desconocimiento.",
    pasos: [
      "Diferenciar visualmente vaca sana vs vaca enferma.",
      "Reconocer mastitis clínica vs subclínica (ubre caliente, dura, leche rara).",
      "Detectar cojera: cómo camina, si apoya el peso parejo.",
      "Cetosis (vacas recién paridas): vaca decaída, mirada apagada, mal aliento.",
      "Acidosis ruminal: heces muy líquidas, baja producción.",
      "Cuándo llamar al veterinario vs cuándo informar al capataz.",
      "Cuándo aislar a la vaca en enfermería y por qué.",
      "Cuidados básicos posparto: retención de placenta, fiebre de leche.",
    ],
  },
  {
    id: "onb-celo-reproduccion",
    nombre: "S2 — Detección de celo y reproducción",
    rol: "Todos los nuevos",
    duracion: "2 días",
    esOnboarding: true,
    semana: 2,
    descripcion:
      "La reproducción es el motor económico del fundo. Una vaca con celo no detectado significa 21 días perdidos. El trabajador debe saber reportar lo que ve.",
    pasos: [
      "Signos visuales de celo: monta de otras vacas, vulva hinchada, mucosidad clara.",
      "Tiempo del celo en Holstein: corto (12-18 hs), atención permanente.",
      "Horario de mayor expresión del celo: amanecer y atardecer.",
      "Cómo y cuándo avisar al inseminador.",
      "Manejo seguro de la vaca preñada: evitar golpes, presión en los flancos.",
      "Signos de parto inminente: ubre llena, vulva relajada, búsqueda de aislamiento.",
      "Cuándo intervenir en un parto y cuándo no (regla de oro: dejar que la naturaleza opere).",
      "Cuidados del ternero recién nacido: secado, calostro en las primeras 2 horas.",
    ],
  },

  // ─────────── ONBOARDING — SEMANA 3 ───────────
  {
    id: "onb-pastoreo",
    nombre: "S3 — Pastoreo y rotación de potreros",
    rol: "Todos los nuevos",
    duracion: "3 días en terreno",
    esOnboarding: true,
    semana: 3,
    descripcion:
      "Manejo del recurso forrajero: el pasto es lo más barato. Saber cuándo entrar y salir de un potrero ahorra millones al año.",
    pasos: [
      "Lectura de la pradera: altura de entrada (~25 cm) y de salida (~5-7 cm).",
      "Reconocer trébol, ballica, otras especies típicas del sur.",
      "Mover el cerco eléctrico: técnica, tester, no electrocutarse.",
      "Revisar bebederos y disponibilidad de agua antes de mover el lote.",
      "Mover el lote al potrero nuevo sin dispersión.",
      "Cerrar potrero anterior y dejarlo en descanso.",
      "Anotar la rotación: potrero, hora, observaciones.",
      "Reconocer una pradera sobrepastoreada y avisar.",
    ],
  },

  // ─────────── ONBOARDING — SEMANA 4 ───────────
  {
    id: "onb-protocolos-rauli",
    nombre: "S4 — Protocolos del Fundo el Raulí",
    rol: "Todos los nuevos",
    duracion: "1 día con el capataz",
    esOnboarding: true,
    semana: 4,
    descripcion:
      "Comunicación, reportes y emergencias. Estandariza la información que viaja entre el equipo y la administración.",
    pasos: [
      "Comunicación con el capataz: horarios, canales, urgencias.",
      "Reporte diario: qué se anota en planilla, qué pasa al capataz.",
      "Protocolo ante emergencias: lesión humana, animal en riesgo, incendio.",
      "Uso de radio/celular en terreno: códigos básicos.",
      "Mapas detallados del fundo y todos los nombres de potreros.",
      "Reglas de la casa patronal y zonas restringidas.",
      "Cuándo y cómo pedir ayuda — política de \"preguntar siempre\".",
      "Evaluación de cierre: dudas, ajustes, definir próximos 60 días.",
    ],
  },

  // ─────────── OPERATIVAS DIARIAS ───────────
  {
    id: "op-ordene-manana",
    nombre: "Ordeñe de la mañana",
    rol: "Ordeñador",
    duracion: "4 horas",
    esOnboarding: false,
    descripcion:
      "Rutina diaria del turno matutino. Es el proceso más crítico: cualquier error afecta directo la calidad de la leche y la salud de las vacas.",
    pasos: [
      "Llegar 30 min antes del horario y revisar el estado de la sala.",
      "Encender el equipo y verificar vacío correcto (38–42 kPa).",
      "Lavar y desinfectar las pezoneras antes del primer animal.",
      "Arrear el lote desde el corral de espera con calma.",
      "Limpiar y secar los pezones de cada vaca con toalla individual.",
      "Despunte: primeros chorros revisando grumos o sangre.",
      "Colocar pezoneras y supervisar sin sobreordeñar.",
      "Aplicar sellador post-ordeñe (yodo) en los 4 pezones.",
      "Anotar vacas con mastitis, cojera o comportamiento anormal.",
      "Lavar sala y equipo al terminar (CIP + manual).",
      "Despachar leche al estanque y verificar temperatura (≤ 4°C).",
    ],
  },
  {
    id: "op-ordene-tarde",
    nombre: "Ordeñe de la tarde",
    rol: "Ordeñador",
    duracion: "3 horas",
    esOnboarding: false,
    descripcion:
      "Turno vespertino. Atención especial a vacas en celo, comunes en la tarde.",
    pasos: [
      "Llegar 20 min antes de la hora de inicio.",
      "Revisar equipo limpio y funcional desde el ordeñe matutino.",
      "Repetir procedimiento con atención a vacas en celo.",
      "Anotar producción individual de cada vaca en planilla.",
      "Cierre completo: lavado del equipo, sala y vereda.",
      "Revisar enfriamiento de la leche del día en el estanque.",
    ],
  },
  {
    id: "op-crianza-terneros",
    nombre: "Crianza diaria de terneros",
    rol: "Criancero",
    duracion: "3 horas",
    esOnboarding: false,
    descripcion:
      "Cuidado diario desde el nacimiento hasta el destete. Define el desarrollo futuro de la vaca.",
    pasos: [
      "Revisar a cada ternero: alerta, temperatura, consistencia de heces.",
      "Preparar leche o sustituto a 38–40°C.",
      "Alimentar 2 veces al día, 4–6 litros según edad.",
      "Lavar baldes y mamaderas con agua caliente y detergente.",
      "Reponer agua, heno y concentrado de iniciación.",
      "Limpiar camas y agregar viruta seca si es necesario.",
      "Aislar terneros con diarrea o decaimiento, avisar al veterinario.",
      "Anotar peso semanal y observaciones individuales.",
    ],
  },
  {
    id: "op-limpieza-sala",
    nombre: "Limpieza profunda de la sala (semanal)",
    rol: "Peón general",
    duracion: "2 horas",
    esOnboarding: false,
    descripcion:
      "Limpieza completa del equipo y la sala. Mantiene la calidad sanitaria de la leche.",
    pasos: [
      "Desarmar pezoneras y mangueras.",
      "Lavar con detergente alcalino caliente.",
      "Enjuagar y aplicar desinfectante ácido (rotar productos).",
      "Cepillar pisos y paredes con alcalino.",
      "Revisar piezas gastadas o con fisuras y reportar.",
      "Armar todo y dejar listo para el próximo ordeñe.",
    ],
  },
];

export function getRutinaById(id) {
  return RUTINAS.find((r) => r.id === id);
}

export const RUTINAS_ONBOARDING = RUTINAS.filter((r) => r.esOnboarding);

export function rutinasPorSemana() {
  return RUTINAS_ONBOARDING.reduce((acc, r) => {
    acc[r.semana] = acc[r.semana] || [];
    acc[r.semana].push(r);
    return acc;
  }, {});
}
