import { TrendingUp, TrendingDown, Wallet, Calendar } from "lucide-react";
import {
  MOVIMIENTOS_MENSUALES,
  totalesDelMes,
  totalesAcumulados,
  formatCLP,
} from "@/data/finanzas";

function Card({ Icon, label, value, sub, color }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className={`mb-2 inline-flex rounded-lg p-2 text-white ${color}`}>
        <Icon size={18} />
      </div>
      <p className="truncate text-xl font-bold text-stone-800">{value}</p>
      <p className="text-xs text-stone-500">{label}</p>
      {sub && <p className="mt-1 text-xs text-stone-400">{sub}</p>}
    </div>
  );
}

export default function StatsFinanzas() {
  const ultimo = MOVIMIENTOS_MENSUALES[MOVIMIENTOS_MENSUALES.length - 1];
  const totalUltimo = totalesDelMes(ultimo);
  const acumulado = totalesAcumulados(MOVIMIENTOS_MENSUALES);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <Card
        Icon={TrendingUp}
        label="Ingresos del mes"
        value={formatCLP(totalUltimo.ingresos)}
        sub={ultimo.nombreMes}
        color="bg-emerald-600"
      />
      <Card
        Icon={TrendingDown}
        label="Egresos del mes"
        value={formatCLP(totalUltimo.egresos)}
        sub={ultimo.nombreMes}
        color="bg-rose-500"
      />
      <Card
        Icon={Wallet}
        label="Resultado del mes"
        value={formatCLP(totalUltimo.resultado)}
        sub="Ingresos − Egresos"
        color={totalUltimo.resultado >= 0 ? "bg-emerald-500" : "bg-rose-600"}
      />
      <Card
        Icon={Calendar}
        label="Resultado acumulado"
        value={formatCLP(acumulado.resultado)}
        sub="Últimos 6 meses"
        color="bg-amber-500"
      />
    </div>
  );
}
