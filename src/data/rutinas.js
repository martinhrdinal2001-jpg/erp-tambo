// Rutinas y checklists estandarizadas para onboarding.
// Cada rutina tiene pasos numerados que el trabajador nuevo puede marcar.
// Estas son sugerencias iniciales: hay que validarlas con el capataz del fundo.

export const RUTINAS = [
  {
    id: "ordene-manana",
    nombre: "Ordeñe de la mañana",
    rol: "Ordeñador",
    duracion: "4 horas",
    descripcion:
      "Rutina diaria para el turno de ordeñe matutino. Es el proceso más crítico del campo: cualquier error afecta directamente la calidad de la leche y la salud de las vacas.",
    pasos: [
      "Llegar 30 min antes del horario de ordeñe y revisar el estado de la sala.",
      "Encender el equipo de ordeñe y verificar el vacío correcto (38–42 kPa).",
      "Lavar y desinfectar las pezoneras antes del primer animal.",
      "Arrear el lote desde el corral de espera con calma, sin gritos ni golpes.",
      "Limpiar y secar los pezones de cada vaca con toalla individual.",
      "Realizar el despunte (primeros chorros) en cada cuarto: revisar grumos o sangre.",
      "Colocar las pezoneras y supervisar el ordeñe sin sobreordeñar.",
      "Aplicar sellador post-ordeñe (yodo) en los 4 pezones.",
      "Anotar en la planilla cualquier vaca con mastitis, cojera o comportamiento anormal.",
      "Lavar la sala y el equipo de ordeñe al terminar (CIP + manual).",
      "Despachar la leche al estanque y verificar temperatura (≤ 4°C).",
    ],
  },
  {
    id: "ordene-tarde",
    nombre: "Ordeñe de la tarde",
    rol: "Ordeñador",
    duracion: "3 horas",
    descripcion:
      "Rutina del turno de ordeñe vespertino. Similar al de la mañana pero adaptada al ritmo y condición de las vacas en la segunda ordeña del día.",
    pasos: [
      "Llegar al menos 20 min antes de la hora de inicio.",
      "Revisar que el equipo esté limpio y funcional desde el ordeñe matutino.",
      "Repetir el procedimiento de ordeñe matutino con atención especial a vacas en celo.",
      "Anotar producción individual de cada vaca en la planilla.",
      "Cierre completo: lavado del equipo, sala y vereda.",
      "Revisar que el estanque haya enfriado correctamente la leche del día.",
    ],
  },
  {
    id: "crianza-terneros",
    nombre: "Crianza diaria de terneros",
    rol: "Criancero",
    duracion: "3 horas",
    descripcion:
      "Cuidado diario de los terneros desde el nacimiento hasta el destete. Período crítico: define el desarrollo futuro como vaca de producción.",
    pasos: [
      "Revisar a cada ternero: alerta, temperatura, consistencia de heces.",
      "Preparar la leche o sustituto a 38–40°C, mezcla homogénea.",
      "Alimentar 2 veces al día (mañana y tarde), 4–6 litros según edad.",
      "Lavar baldes y mamaderas con agua caliente y detergente luego de cada toma.",
      "Reponer agua limpia, heno y concentrado de iniciación en cada corral.",
      "Limpiar camas, sacar deyecciones y agregar viruta seca si es necesario.",
      "Aislar a cualquier ternero con diarrea o decaimiento y avisar al veterinario.",
      "Anotar peso semanal y observaciones en la planilla individual.",
    ],
  },
  {
    id: "rotacion-potreros",
    nombre: "Rotación de potreros",
    rol: "Peón general",
    duracion: "1 hora",
    descripcion:
      "Cambio diario de las vacas entre potreros para optimizar el pastoreo y el descanso de la pradera.",
    pasos: [
      "Consultar el mapa de rotación del día con el capataz.",
      "Verificar el estado del potrero próximo: pasto disponible, agua, cercos.",
      "Revisar el cerco eléctrico (tester) antes de mover al lote.",
      "Mover las vacas con calma, manteniendo el grupo unido.",
      "Cerrar el potrero de salida y abrir el de entrada.",
      "Anotar en planilla: nombre del potrero, hora, cualquier observación.",
    ],
  },
  {
    id: "limpieza-sala",
    nombre: "Limpieza profunda de la sala",
    rol: "Peón general",
    duracion: "2 horas",
    descripcion:
      "Limpieza completa semanal del equipo y la sala de ordeñe. Fundamental para mantener la calidad sanitaria de la leche.",
    pasos: [
      "Desarmar pezoneras y mangueras según indicaciones del fabricante.",
      "Lavar todas las piezas con detergente alcalino caliente.",
      "Enjuagar y aplicar desinfectante ácido (rotar productos).",
      "Cepillar pisos y paredes con detergente alcalino.",
      "Revisar y reportar piezas gastadas o con fisuras.",
      "Armar todo nuevamente y dejar listo para el próximo ordeñe.",
    ],
  },
  {
    id: "induccion-nuevo",
    nombre: "Inducción del primer día",
    rol: "Todos los nuevos",
    duracion: "Día completo",
    descripcion:
      "Recorrido y presentación obligatoria para todo trabajador nuevo en el Fundo el Raulí. A cargo del capataz.",
    pasos: [
      "Recorrido por las instalaciones: sala de ordeñe, corrales, casa patronal, bodegas.",
      "Presentación al equipo completo del campo.",
      "Entrega de ropa de trabajo, botas y elementos de protección.",
      "Revisión de protocolos de seguridad: manejo de animales, maquinaria, eléctricos.",
      "Explicación del mapa del fundo y los potreros principales.",
      "Definición del rol específico y el equipo al que se integra.",
      "Asignación de un mentor de los primeros 30 días.",
      "Firma de la documentación laboral y de salud.",
    ],
  },
];

export function getRutinaById(id) {
  return RUTINAS.find((r) => r.id === id);
}
