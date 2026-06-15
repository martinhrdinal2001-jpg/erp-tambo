import { Package, Plus, ArrowDownUp } from "lucide-react";
import Topbar from "@/components/Topbar";
import StatsInventario from "@/components/inventario/StatsInventario";
import ItemTable from "@/components/inventario/ItemTable";
import { ITEMS } from "@/data/inventario";

export default function InventarioPage() {
  return (
    <>
      <Topbar title="Inventario" />
      <div className="p-8">
        {/* Encabezado */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-stone-800">
              <Package size={22} className="text-emerald-600" />
              Inventario del Fundo
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Alimento, forraje, medicamentos e insumos sanitarios
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            >
              <ArrowDownUp size={16} />
              Movimientos
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-700"
            >
              <Plus size={16} />
              Nuevo item
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6">
          <StatsInventario />
        </div>

        {/* Tabla */}
        <ItemTable items={ITEMS} />
      </div>
    </>
  );
}
