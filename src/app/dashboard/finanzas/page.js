import { Wallet, Download, Plus } from "lucide-react";
import Topbar from "@/components/Topbar";
import StatsFinanzas from "@/components/finanzas/StatsFinanzas";
import GraficoMensual from "@/components/finanzas/GraficoMensual";
import TablaPyL from "@/components/finanzas/TablaPyL";

export default function FinanzasPage() {
  return (
    <>
      <Topbar title="Finanzas" />
      <div className="p-8">
        {/* Encabezado */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-stone-800">
              <Wallet size={22} className="text-emerald-600" />
              Finanzas del Fundo
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              Ingresos, egresos y resultado mensual · Cifras en pesos chilenos
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            >
              <Download size={16} />
              Exportar
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-700"
            >
              <Plus size={16} />
              Registrar movimiento
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6">
          <StatsFinanzas />
        </div>

        {/* Gráfico + P&L */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <GraficoMensual />
          <TablaPyL />
        </div>
      </div>
    </>
  );
}
