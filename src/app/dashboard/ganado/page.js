import { Beef, Plus, Layers } from "lucide-react";
import Topbar from "@/components/Topbar";
import StatsGanado from "@/components/ganado/StatsGanado";
import VacaTable from "@/components/ganado/VacaTable";
import { VACAS } from "@/data/ganado";

export default function GanadoPage() {
  return (
    <>
      <Topbar title="Ganado" />
      <div className="p-4 sm:p-8">
        {/* Encabezado */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-stone-800">
              <Beef size={22} className="text-emerald-600" />
              Rebaño Holstein
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Vista resumida del rebaño · Operación con 1000+ vacas, mostrando muestra de prueba
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            >
              <Layers size={16} />
              Lotes
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-700"
            >
              <Plus size={16} />
              Nueva vaca
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6">
          <StatsGanado />
        </div>

        {/* Tabla */}
        <VacaTable vacas={VACAS} />
      </div>
    </>
  );
}
