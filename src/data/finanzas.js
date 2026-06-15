// Datos financieros mock del Fundo el Raulí.
// Operación con 1000+ Holstein → ~800-900 vacas en ordeñe → ~25.000-30.000 L/día → ventas mensuales sustanciales.
// Cifras en pesos chilenos (CLP). Realistas para escala de la operación pero ficticias.

export const TIPOS_INGRESO = ["Venta de leche", "Venta de animales", "Otros ingresos"];
export const TIPOS_EGRESO = [
  "Alimento concentrado",
  "Insumos veterinarios",
  "Combustible",
  "Sueldos",
  "Mantenimiento",
  "Servicios",
  "Otros egresos",
];

// Últimos 6 meses (más reciente al final).
export const MOVIMIENTOS_MENSUALES = [
  {
    mes: "2026-01",
    nombreMes: "Enero 2026",
    ingresos: [
      { concepto: "Venta de leche a planta", tipo: "Venta de leche", monto: 218_500_000 },
      { concepto: "Venta vacas descarte (5 cab)", tipo: "Venta de animales", monto: 12_400_000 },
    ],
    egresos: [
      { concepto: "Concentrado y mezclas", tipo: "Alimento concentrado", monto: 68_300_000 },
      { concepto: "Sueldos del personal", tipo: "Sueldos", monto: 32_100_000 },
      { concepto: "Insumos sanitarios y veterinario", tipo: "Insumos veterinarios", monto: 9_800_000 },
      { concepto: "Combustible y energía", tipo: "Combustible", monto: 8_600_000 },
      { concepto: "Mantención equipos", tipo: "Mantenimiento", monto: 4_200_000 },
      { concepto: "Servicios contables y agronómicos", tipo: "Servicios", monto: 3_500_000 },
    ],
  },
  {
    mes: "2026-02",
    nombreMes: "Febrero 2026",
    ingresos: [
      { concepto: "Venta de leche a planta", tipo: "Venta de leche", monto: 205_200_000 },
      { concepto: "Venta terneros", tipo: "Venta de animales", monto: 6_800_000 },
    ],
    egresos: [
      { concepto: "Concentrado y mezclas", tipo: "Alimento concentrado", monto: 64_100_000 },
      { concepto: "Sueldos del personal", tipo: "Sueldos", monto: 32_100_000 },
      { concepto: "Insumos sanitarios", tipo: "Insumos veterinarios", monto: 7_200_000 },
      { concepto: "Combustible y energía", tipo: "Combustible", monto: 7_900_000 },
      { concepto: "Mantención", tipo: "Mantenimiento", monto: 3_100_000 },
      { concepto: "Servicios contables", tipo: "Servicios", monto: 3_500_000 },
    ],
  },
  {
    mes: "2026-03",
    nombreMes: "Marzo 2026",
    ingresos: [
      { concepto: "Venta de leche a planta", tipo: "Venta de leche", monto: 232_800_000 },
      { concepto: "Venta vacas descarte (8 cab)", tipo: "Venta de animales", monto: 19_500_000 },
    ],
    egresos: [
      { concepto: "Concentrado y mezclas", tipo: "Alimento concentrado", monto: 71_500_000 },
      { concepto: "Sueldos del personal + aguinaldo", tipo: "Sueldos", monto: 38_400_000 },
      { concepto: "Insumos veterinarios + vacunación", tipo: "Insumos veterinarios", monto: 14_300_000 },
      { concepto: "Combustible y energía", tipo: "Combustible", monto: 9_200_000 },
      { concepto: "Mantención", tipo: "Mantenimiento", monto: 5_800_000 },
      { concepto: "Servicios", tipo: "Servicios", monto: 3_500_000 },
    ],
  },
  {
    mes: "2026-04",
    nombreMes: "Abril 2026",
    ingresos: [
      { concepto: "Venta de leche a planta", tipo: "Venta de leche", monto: 248_700_000 },
      { concepto: "Venta terneros", tipo: "Venta de animales", monto: 11_200_000 },
    ],
    egresos: [
      { concepto: "Concentrado y mezclas", tipo: "Alimento concentrado", monto: 74_200_000 },
      { concepto: "Sueldos del personal", tipo: "Sueldos", monto: 32_100_000 },
      { concepto: "Insumos veterinarios", tipo: "Insumos veterinarios", monto: 8_900_000 },
      { concepto: "Combustible", tipo: "Combustible", monto: 8_400_000 },
      { concepto: "Mantención y repuestos", tipo: "Mantenimiento", monto: 6_700_000 },
      { concepto: "Servicios", tipo: "Servicios", monto: 3_500_000 },
    ],
  },
  {
    mes: "2026-05",
    nombreMes: "Mayo 2026",
    ingresos: [
      { concepto: "Venta de leche a planta", tipo: "Venta de leche", monto: 261_300_000 },
      { concepto: "Venta vacas descarte (6 cab)", tipo: "Venta de animales", monto: 14_800_000 },
      { concepto: "Venta de fardos a vecinos", tipo: "Otros ingresos", monto: 3_200_000 },
    ],
    egresos: [
      { concepto: "Concentrado y mezclas", tipo: "Alimento concentrado", monto: 78_900_000 },
      { concepto: "Sueldos del personal", tipo: "Sueldos", monto: 33_500_000 },
      { concepto: "Insumos veterinarios", tipo: "Insumos veterinarios", monto: 9_400_000 },
      { concepto: "Combustible", tipo: "Combustible", monto: 8_800_000 },
      { concepto: "Mantención", tipo: "Mantenimiento", monto: 5_100_000 },
      { concepto: "Servicios", tipo: "Servicios", monto: 3_500_000 },
    ],
  },
  {
    mes: "2026-06",
    nombreMes: "Junio 2026 (parcial)",
    ingresos: [
      { concepto: "Venta de leche a planta (1ª quincena)", tipo: "Venta de leche", monto: 128_500_000 },
      { concepto: "Venta terneros", tipo: "Venta de animales", monto: 5_400_000 },
    ],
    egresos: [
      { concepto: "Concentrado y mezclas", tipo: "Alimento concentrado", monto: 39_200_000 },
      { concepto: "Sueldos primera quincena", tipo: "Sueldos", monto: 16_700_000 },
      { concepto: "Insumos veterinarios", tipo: "Insumos veterinarios", monto: 4_600_000 },
      { concepto: "Combustible", tipo: "Combustible", monto: 4_200_000 },
      { concepto: "Mantención", tipo: "Mantenimiento", monto: 2_300_000 },
      { concepto: "Servicios", tipo: "Servicios", monto: 1_750_000 },
    ],
  },
];

export function totalesDelMes(m) {
  const ingresos = m.ingresos.reduce((s, x) => s + x.monto, 0);
  const egresos = m.egresos.reduce((s, x) => s + x.monto, 0);
  return { ingresos, egresos, resultado: ingresos - egresos };
}

export function formatCLP(monto) {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(monto);
}

export function totalesAcumulados(meses) {
  return meses.reduce(
    (acc, m) => {
      const t = totalesDelMes(m);
      return {
        ingresos: acc.ingresos + t.ingresos,
        egresos: acc.egresos + t.egresos,
        resultado: acc.resultado + t.resultado,
      };
    },
    { ingresos: 0, egresos: 0, resultado: 0 }
  );
}
