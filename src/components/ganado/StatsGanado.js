import { Beef, Droplets, Heart, Stethoscope, Baby, TrendingUp } from "lucide-react";
import { VACAS, produccionEstimada } from "@/data/ganado";

function Card({ Icon, label, value, sub, color }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className={`mb-2 inline-flex rounded-lg p-2 text-white ${color}`}>
        <Icon size={18} />
      </div>
      <p className="text-2xl font-bold text-stone-800">{value}</p>
      <p className="text-xs text-stone-500">{label}</p>
      {sub && <p className="mt-1 text-xs text-stone-400">{sub}</p>}
    </div>
  );
}

export default function StatsGanado() {
  const enOrdene = VACAS.filter((v) => v.estado === "En ordeñe").length;
  const secas = VACAS.filter((v) => v.estado === "Seca").length;
  const vaquillas = VACAS.filter((v) => v.estado === "Vaquilla").length;
  const enTrat = VACAS.filter((v) => v.estado === "En tratamiento").length;
  const masaTotal = enOrdene + secas + vaquillas + enTrat;

  const produccionTotal = VACAS.filter((v) => v.estado === "En ordeñe")
    .reduce((acc, v) => acc + produccionEstimada(v), 0);
  const promedioPorVaca = enOrdene > 0 ? produccionTotal / enOrdene : 0;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      <Card
        Icon={Beef}
        label="Masa total"
        value={masaTotal}
        sub="(muestra de 40)"
        color="bg-emerald-600"
      />
      <Card
        Icon={Droplets}
        label="En ordeñe"
        value={enOrdene}
        color="bg-blue-500"
      />
      <Card
        Icon={Heart}
        label="Secas"
        value={secas}
        color="bg-amber-500"
      />
      <Card
        Icon={Baby}
        label="Vaquillas"
        value={vaquillas}
        color="bg-sky-500"
      />
      <Card
        Icon={Stethoscope}
        label="En tratamiento"
        value={enTrat}
        color="bg-rose-500"
      />
      <Card
        Icon={TrendingUp}
        label="Prod. promedio"
        value={`${promedioPorVaca.toFixed(1)} L`}
        sub="L/vaca/día"
        color="bg-emerald-500"
      />
    </div>
  );
}
