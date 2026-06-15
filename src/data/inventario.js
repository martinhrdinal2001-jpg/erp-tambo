// Inventario del Fundo el Raulí: alimento, forraje, medicamentos, insumos.
// Cada item tiene un stock mínimo: cuando stockActual <= stockMinimo se considera "stock bajo" (alerta).

export const CATEGORIAS = [
  { id: "concentrado", nombre: "Alimento concentrado", color: "bg-amber-500" },
  { id: "forraje", nombre: "Forraje conservado", color: "bg-emerald-600" },
  { id: "medicamento", nombre: "Medicamentos", color: "bg-rose-500" },
  { id: "insumo", nombre: "Insumos sanitarios", color: "bg-sky-500" },
];

export const ITEMS = [
  // ── Concentrados ──
  { id: 1, categoria: "concentrado", nombre: "Concentrado alta producción", presentacion: "Saco 25 kg", stockActual: 180, stockMinimo: 100, unidad: "sacos", fechaVencimiento: "2026-09-15", proveedor: "Cooprinsem", ultimoMovimiento: "2026-06-10", observaciones: "Para Lote 1, mezclado en mixer." },
  { id: 2, categoria: "concentrado", nombre: "Concentrado media producción", presentacion: "Saco 25 kg", stockActual: 95, stockMinimo: 80, unidad: "sacos", fechaVencimiento: "2026-09-20", proveedor: "Cooprinsem", ultimoMovimiento: "2026-06-12", observaciones: "" },
  { id: 3, categoria: "concentrado", nombre: "Concentrado baja producción", presentacion: "Saco 25 kg", stockActual: 40, stockMinimo: 60, unidad: "sacos", fechaVencimiento: "2026-10-01", proveedor: "Cooprinsem", ultimoMovimiento: "2026-06-08", observaciones: "Stock bajo." },
  { id: 4, categoria: "concentrado", nombre: "Concentrado vaquillas", presentacion: "Saco 25 kg", stockActual: 120, stockMinimo: 50, unidad: "sacos", fechaVencimiento: "2026-09-10", proveedor: "Champion", ultimoMovimiento: "2026-06-05", observaciones: "" },
  { id: 5, categoria: "concentrado", nombre: "Sustituto lácteo terneros", presentacion: "Saco 25 kg", stockActual: 60, stockMinimo: 30, unidad: "sacos", fechaVencimiento: "2026-08-15", proveedor: "Sprayfo", ultimoMovimiento: "2026-06-13", observaciones: "" },
  { id: 6, categoria: "concentrado", nombre: "Mezcla mineral", presentacion: "Saco 50 kg", stockActual: 25, stockMinimo: 15, unidad: "sacos", fechaVencimiento: "2027-01-30", proveedor: "Cargill", ultimoMovimiento: "2026-05-28", observaciones: "Mezcla de calcio, fósforo y oligoelementos." },
  { id: 7, categoria: "concentrado", nombre: "Sal mineralizada", presentacion: "Saco 25 kg", stockActual: 8, stockMinimo: 20, unidad: "sacos", fechaVencimiento: "2027-03-10", proveedor: "Sales Anitor", ultimoMovimiento: "2026-05-15", observaciones: "Stock bajo — pedir esta semana." },

  // ── Forraje ──
  { id: 8, categoria: "forraje", nombre: "Heno de alfalfa", presentacion: "Fardo 20 kg", stockActual: 850, stockMinimo: 500, unidad: "fardos", fechaVencimiento: null, proveedor: "Producción propia", ultimoMovimiento: "2026-06-14", observaciones: "Corte verano 2026." },
  { id: 9, categoria: "forraje", nombre: "Heno de avena", presentacion: "Fardo 20 kg", stockActual: 420, stockMinimo: 300, unidad: "fardos", fechaVencimiento: null, proveedor: "Producción propia", ultimoMovimiento: "2026-06-12", observaciones: "" },
  { id: 10, categoria: "forraje", nombre: "Ensilaje de maíz", presentacion: "Tonelada (silo)", stockActual: 320, stockMinimo: 150, unidad: "ton", fechaVencimiento: "2026-12-31", proveedor: "Producción propia", ultimoMovimiento: "2026-06-15", observaciones: "Silo 1 abierto, calidad buena." },
  { id: 11, categoria: "forraje", nombre: "Ensilaje de pradera", presentacion: "Tonelada (silo)", stockActual: 180, stockMinimo: 100, unidad: "ton", fechaVencimiento: "2026-11-15", proveedor: "Producción propia", ultimoMovimiento: "2026-06-13", observaciones: "" },
  { id: 12, categoria: "forraje", nombre: "Henolaje (bolo plástico)", presentacion: "Rollo 600 kg", stockActual: 95, stockMinimo: 50, unidad: "rollos", fechaVencimiento: null, proveedor: "Producción propia", ultimoMovimiento: "2026-06-10", observaciones: "Reserva para invierno." },

  // ── Medicamentos ──
  { id: 13, categoria: "medicamento", nombre: "Oxitetraciclina LA", presentacion: "Frasco 250 ml", stockActual: 12, stockMinimo: 6, unidad: "frascos", fechaVencimiento: "2027-04-20", proveedor: "Drag Pharma", ultimoMovimiento: "2026-06-09", observaciones: "Antibiótico de uso general. Período de retiro: 7 días leche." },
  { id: 14, categoria: "medicamento", nombre: "Penicilina + Estreptomicina", presentacion: "Frasco 100 ml", stockActual: 8, stockMinimo: 5, unidad: "frascos", fechaVencimiento: "2026-11-30", proveedor: "Centrovet", ultimoMovimiento: "2026-06-11", observaciones: "Para mastitis. Retiro leche: 5 días." },
  { id: 15, categoria: "medicamento", nombre: "Ivermectina 1%", presentacion: "Frasco 500 ml", stockActual: 4, stockMinimo: 3, unidad: "frascos", fechaVencimiento: "2027-08-15", proveedor: "Centrovet", ultimoMovimiento: "2026-05-30", observaciones: "Antiparasitario. No usar en vacas en lactancia." },
  { id: 16, categoria: "medicamento", nombre: "Vacuna IBR-DVB-PI3", presentacion: "Frasco 50 dosis", stockActual: 2, stockMinimo: 2, unidad: "frascos", fechaVencimiento: "2026-09-10", proveedor: "Boehringer", ultimoMovimiento: "2026-04-22", observaciones: "Vacunación anual del rebaño completo." },
  { id: 17, categoria: "medicamento", nombre: "Vacuna brucelosis RB51", presentacion: "Frasco 10 dosis", stockActual: 6, stockMinimo: 4, unidad: "frascos", fechaVencimiento: "2026-08-20", proveedor: "SAG", ultimoMovimiento: "2026-05-12", observaciones: "Solo vaquillas 3-8 meses. Programa oficial." },
  { id: 18, categoria: "medicamento", nombre: "Sello pezones post-ordeñe (yodo)", presentacion: "Bidón 20 L", stockActual: 3, stockMinimo: 2, unidad: "bidones", fechaVencimiento: "2027-02-15", proveedor: "Diversey", ultimoMovimiento: "2026-06-14", observaciones: "" },
  { id: 19, categoria: "medicamento", nombre: "Calcio inyectable", presentacion: "Frasco 500 ml", stockActual: 15, stockMinimo: 10, unidad: "frascos", fechaVencimiento: "2027-01-30", proveedor: "Centrovet", ultimoMovimiento: "2026-06-13", observaciones: "Para casos de hipocalcemia post-parto." },
  { id: 20, categoria: "medicamento", nombre: "Antiinflamatorio (Flunixin)", presentacion: "Frasco 100 ml", stockActual: 1, stockMinimo: 3, unidad: "frascos", fechaVencimiento: "2026-07-10", proveedor: "Drag Pharma", ultimoMovimiento: "2026-06-05", observaciones: "Stock bajo Y vence pronto — revisar urgente." },

  // ── Insumos ──
  { id: 21, categoria: "insumo", nombre: "Detergente alcalino CIP", presentacion: "Bidón 25 L", stockActual: 8, stockMinimo: 4, unidad: "bidones", fechaVencimiento: "2028-03-20", proveedor: "Diversey", ultimoMovimiento: "2026-06-14", observaciones: "" },
  { id: 22, categoria: "insumo", nombre: "Detergente ácido CIP", presentacion: "Bidón 25 L", stockActual: 6, stockMinimo: 4, unidad: "bidones", fechaVencimiento: "2028-04-10", proveedor: "Diversey", ultimoMovimiento: "2026-06-12", observaciones: "" },
  { id: 23, categoria: "insumo", nombre: "Pajuelas de semen Holstein", presentacion: "Termo (50 unidades)", stockActual: 320, stockMinimo: 100, unidad: "pajuelas", fechaVencimiento: null, proveedor: "ABS Chile", ultimoMovimiento: "2026-05-25", observaciones: "Diferentes toros. Detalle por planilla." },
  { id: 24, categoria: "insumo", nombre: "Pajuelas semen sexado", presentacion: "Termo (25 unidades)", stockActual: 80, stockMinimo: 50, unidad: "pajuelas", fechaVencimiento: null, proveedor: "ABS Chile", ultimoMovimiento: "2026-06-01", observaciones: "Solo para vaquillas." },
  { id: 25, categoria: "insumo", nombre: "Toallas de papel pre-ordeñe", presentacion: "Caja 500 u", stockActual: 12, stockMinimo: 5, unidad: "cajas", fechaVencimiento: null, proveedor: "Tucapel", ultimoMovimiento: "2026-06-10", observaciones: "" },
  { id: 26, categoria: "insumo", nombre: "Guantes nitrilo veterinarios", presentacion: "Caja 100 u", stockActual: 4, stockMinimo: 6, unidad: "cajas", fechaVencimiento: null, proveedor: "Veterquímica", ultimoMovimiento: "2026-06-08", observaciones: "Stock bajo." },
  { id: 27, categoria: "insumo", nombre: "Jeringas desechables 20 ml", presentacion: "Caja 100 u", stockActual: 9, stockMinimo: 5, unidad: "cajas", fechaVencimiento: "2028-12-01", proveedor: "Veterquímica", ultimoMovimiento: "2026-06-09", observaciones: "" },
  { id: 28, categoria: "insumo", nombre: "Aretes (caravanas) numeradas", presentacion: "Pack 50 u", stockActual: 6, stockMinimo: 3, unidad: "packs", fechaVencimiento: null, proveedor: "Allflex", ultimoMovimiento: "2026-05-20", observaciones: "Continúa numeración desde #1300." },
];

export function getItemById(id) {
  return ITEMS.find((i) => i.id === Number(id));
}

export function getCategoriaById(id) {
  return CATEGORIAS.find((c) => c.id === id);
}

export function tieneStockBajo(item) {
  return item.stockActual <= item.stockMinimo;
}

export function venceProximamente(item, diasUmbral = 60) {
  if (!item.fechaVencimiento) return false;
  const venc = new Date(item.fechaVencimiento);
  const hoy = new Date();
  const dias = Math.floor((venc - hoy) / (1000 * 60 * 60 * 24));
  return dias >= 0 && dias <= diasUmbral;
}

export function diasParaVencer(item) {
  if (!item.fechaVencimiento) return null;
  const venc = new Date(item.fechaVencimiento);
  const hoy = new Date();
  return Math.floor((venc - hoy) / (1000 * 60 * 60 * 24));
}
