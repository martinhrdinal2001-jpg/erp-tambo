// Datos de ejemplo (mock). Cuando conectemos Supabase, esto se reemplaza por una consulta a la base.
// Mantener el shape del objeto estable para no tener que cambiar los componentes.

export const ROLES = [
  "Administrador",
  "Jefe de Ordeñe",
  "Ordeñador",
  "Criancero",
  "Tractorista",
  "Veterinario",
  "Inseminador",
  "Peón general",
  "Mantenimiento",
  "Casero",
];

export const ESTADOS = ["Activo", "Vacaciones", "Licencia médica", "Inactivo"];

export const TRABAJADORES = [
  {
    id: 1,
    nombre: "Hernán Catrileo Quintrequeo",
    rol: "Administrador",
    estado: "Activo",
    fechaIngreso: "2014-03-10",
    telefono: "+56 9 8123 4567",
    rut: "10.234.567-8",
    sector: "Casa patronal",
    viveEnElCampo: true,
    notas: "Capataz general. Coordina todas las áreas y reporta a la familia.",
  },
  {
    id: 2,
    nombre: "María Soledad Sanhueza Vidal",
    rol: "Jefe de Ordeñe",
    estado: "Activo",
    fechaIngreso: "2017-06-22",
    telefono: "+56 9 7456 8910",
    rut: "14.567.890-1",
    sector: "Sala de ordeñe",
    viveEnElCampo: true,
    notas: "Coordina turnos de mañana y tarde. Capacita a ordeñadores nuevos.",
  },
  {
    id: 3,
    nombre: "Pedro Antillanca Millao",
    rol: "Ordeñador",
    estado: "Activo",
    fechaIngreso: "2019-09-05",
    telefono: "+56 9 5678 1234",
    rut: "16.234.890-2",
    sector: "Sala de ordeñe",
    viveEnElCampo: true,
    notas: "Turno de mañana.",
  },
  {
    id: 4,
    nombre: "Juan Carlos Burgos Hernández",
    rol: "Ordeñador",
    estado: "Activo",
    fechaIngreso: "2021-04-12",
    telefono: "+56 9 4321 8765",
    rut: "18.765.432-9",
    sector: "Sala de ordeñe",
    viveEnElCampo: true,
    notas: "Turno de tarde.",
  },
  {
    id: 5,
    nombre: "Sergio Müller González",
    rol: "Tractorista",
    estado: "Activo",
    fechaIngreso: "2015-11-18",
    telefono: "+56 9 9876 5432",
    rut: "12.345.678-9",
    sector: "Maquinaria",
    viveEnElCampo: false,
    notas: "A cargo del tractor principal y el mixer.",
  },
  {
    id: 6,
    nombre: "Roberto Painén Carrasco",
    rol: "Ordeñador",
    estado: "Vacaciones",
    fechaIngreso: "2020-02-14",
    telefono: "+56 9 6543 2109",
    rut: "17.456.123-K",
    sector: "Sala de ordeñe",
    viveEnElCampo: true,
    notas: "Vuelve el 28 del próximo mes.",
  },
  {
    id: 7,
    nombre: "José Manuel Aravena Soto",
    rol: "Tractorista",
    estado: "Activo",
    fechaIngreso: "2018-07-30",
    telefono: "+56 9 3210 9876",
    rut: "15.789.234-5",
    sector: "Maquinaria",
    viveEnElCampo: false,
    notas: "Maneja la enfardadora y el tractor secundario.",
  },
  {
    id: 8,
    nombre: "Andrés Schmidt Lefián",
    rol: "Veterinario",
    estado: "Activo",
    fechaIngreso: "2016-05-08",
    telefono: "+56 9 8765 4321",
    rut: "13.456.789-0",
    sector: "Sanidad",
    viveEnElCampo: false,
    notas: "Visitas programadas dos veces por semana. Emergencias por teléfono.",
  },
  {
    id: 9,
    nombre: "Carolina Beltrán Ñancupil",
    rol: "Criancero",
    estado: "Activo",
    fechaIngreso: "2020-08-20",
    telefono: "+56 9 2109 8765",
    rut: "17.890.123-4",
    sector: "Crianza de terneros",
    viveEnElCampo: true,
    notas: "A cargo de los terneros desde el nacimiento hasta el destete.",
  },
  {
    id: 10,
    nombre: "Felipe Quezada Saldivia",
    rol: "Peón general",
    estado: "Activo",
    fechaIngreso: "2022-01-15",
    telefono: "+56 9 1098 7654",
    rut: "19.234.567-8",
    sector: "Operaciones",
    viveEnElCampo: true,
    notas: "Apoya en limpieza de salas, cercos y traslados de animales.",
  },
  {
    id: 11,
    nombre: "Luis Caniumir Garrido",
    rol: "Peón general",
    estado: "Activo",
    fechaIngreso: "2021-10-03",
    telefono: "+56 9 0987 6543",
    rut: "18.345.678-9",
    sector: "Operaciones",
    viveEnElCampo: true,
    notas: "",
  },
  {
    id: 12,
    nombre: "Ricardo Bórquez Alvarado",
    rol: "Mantenimiento",
    estado: "Activo",
    fechaIngreso: "2017-03-25",
    telefono: "+56 9 9012 3456",
    rut: "14.123.456-7",
    sector: "Mantenimiento",
    viveEnElCampo: false,
    notas: "Reparación de equipos de ordeñe, cercos eléctricos y maquinaria.",
  },
  {
    id: 13,
    nombre: "Manuel Huenupán Reyes",
    rol: "Casero",
    estado: "Activo",
    fechaIngreso: "2012-11-30",
    telefono: "+56 9 8901 2345",
    rut: "9.876.543-2",
    sector: "Casa patronal",
    viveEnElCampo: true,
    notas: "Vigilancia, mantención de jardines y apoyo general.",
  },
  {
    id: 14,
    nombre: "Patricio Jara Mella",
    rol: "Inseminador",
    estado: "Activo",
    fechaIngreso: "2019-04-18",
    telefono: "+56 9 7890 1234",
    rut: "16.567.890-1",
    sector: "Sanidad",
    viveEnElCampo: false,
    notas: "Asesor externo. Visitas según protocolo de celos.",
  },
  {
    id: 15,
    nombre: "Fernando Lagos Carrillo",
    rol: "Ordeñador",
    estado: "Licencia médica",
    fechaIngreso: "2020-06-11",
    telefono: "+56 9 6789 0123",
    rut: "17.678.901-2",
    sector: "Sala de ordeñe",
    viveEnElCampo: true,
    notas: "Licencia hasta fin de mes por lesión lumbar.",
  },
  {
    id: 16,
    nombre: "Daniel Vergara Cumin",
    rol: "Peón general",
    estado: "Activo",
    fechaIngreso: "2026-02-01",
    telefono: "+56 9 5678 9012",
    rut: "20.123.456-K",
    sector: "Operaciones",
    viveEnElCampo: true,
    notas: "Avanzando bien en onboarding. Cierra su 4ª semana este mes.",
    rutinasCompletadas: [
      "onb-induccion",
      "onb-manejo-rebano",
      "onb-anatomia-ordene",
      "onb-sanidad",
      "onb-celo-reproduccion",
      "onb-pastoreo",
    ],
  },
  {
    id: 17,
    nombre: "Alex Pacheco Liempi",
    rol: "Tractorista",
    estado: "Activo",
    fechaIngreso: "2022-09-15",
    telefono: "+56 9 4567 8901",
    rut: "19.456.789-0",
    sector: "Maquinaria",
    viveEnElCampo: false,
    notas: "Recientemente certificado en operación de mixer.",
  },
  {
    id: 18,
    nombre: "Diego Ávila Morán",
    rol: "Ordeñador",
    estado: "Activo",
    fechaIngreso: "2026-04-15",
    telefono: "+56 9 3456 7890",
    rut: "20.567.890-1",
    sector: "Sala de ordeñe",
    viveEnElCampo: true,
    notas: "Cubriendo la licencia de Fernando. Va por la semana 3 del onboarding.",
    rutinasCompletadas: [
      "onb-induccion",
      "onb-manejo-rebano",
      "onb-anatomia-ordene",
      "onb-sanidad",
    ],
  },
  {
    id: 19,
    nombre: "Camilo Espinoza Loncón",
    rol: "Peón general",
    estado: "Inactivo",
    fechaIngreso: "2018-05-04",
    telefono: "+56 9 2345 6789",
    rut: "15.890.123-4",
    sector: "Operaciones",
    viveEnElCampo: false,
    notas: "Renunció a fines del año pasado.",
  },
  {
    id: 20,
    nombre: "Patricia Riffo Manquilef",
    rol: "Criancero",
    estado: "Activo",
    fechaIngreso: "2022-04-08",
    telefono: "+56 9 1234 5678",
    rut: "19.789.012-3",
    sector: "Crianza de terneros",
    viveEnElCampo: true,
    notas: "Apoyo a Carolina en crianza, también colabora en sanidad básica.",
  },
  {
    id: 21,
    nombre: "Camila Andrade Huilipán",
    rol: "Ordeñador",
    estado: "Activo",
    fechaIngreso: "2026-06-01",
    telefono: "+56 9 4123 0876",
    rut: "21.345.789-2",
    sector: "Sala de ordeñe",
    viveEnElCampo: true,
    notas: "Recién contratada. Va por la semana 1 del onboarding, acompañando a María Soledad.",
    rutinasCompletadas: ["onb-induccion", "onb-manejo-rebano"],
  },
];

// Helpers que vamos a usar en varios lugares
export function getTrabajadorById(id) {
  return TRABAJADORES.find((t) => t.id === Number(id));
}

export function calcularAntiguedad(fechaIngreso) {
  const ingreso = new Date(fechaIngreso);
  const hoy = new Date();
  let anios = hoy.getFullYear() - ingreso.getFullYear();
  let meses = hoy.getMonth() - ingreso.getMonth();
  if (meses < 0) {
    anios -= 1;
    meses += 12;
  }
  return { anios, meses };
}

// Un trabajador está "en onboarding" si entró hace menos de 6 meses y está activo.
export function estaEnOnboarding(trabajador) {
  if (trabajador.estado !== "Activo") return false;
  const { anios, meses } = calcularAntiguedad(trabajador.fechaIngreso);
  return anios === 0 && meses < 6;
}

export function trabajadoresEnOnboarding() {
  return TRABAJADORES.filter(estaEnOnboarding);
}

// Devuelve el % de rutinas de onboarding completadas (0-100).
// Necesita el total de rutinas de onboarding como argumento para no acoplar archivos.
export function progresoOnboarding(trabajador, totalRutinasOnboarding) {
  if (!totalRutinasOnboarding || totalRutinasOnboarding === 0) return 0;
  const completadas = (trabajador.rutinasCompletadas || []).length;
  return Math.round((completadas / totalRutinasOnboarding) * 100);
}
