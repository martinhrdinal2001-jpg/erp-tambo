import { Package, AlertTriangle, Clock, Tag } from "lucide-react";
import {
  ITEMS,
  CATEGORIAS,
  tieneStockBajo,
  venceProximamente,
} from "@/data/inventario";

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

export default function StatsInventario() {
  const total = ITEMS.length;
  const stockBajo = ITEMS.filter(tieneStockBajo).length;
  const porVencer = ITEMS.filter((i) => venceProximamente(i)).length;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <Card
        Icon={Package}
        label="Items totales"
        value={total}
        color="bg-emerald-600"
      />
      <Card
        Icon={AlertTriangle}
        label="Stock bajo"
        value={stockBajo}
        sub="Necesitan reposición"
        color="bg-amber-500"
      />
      <Card
        Icon={Clock}
        label="Próximos a vencer"
        value={porVencer}
        sub="En los próximos 60 días"
        color="bg-rose-500"
      />
      <Card
        Icon={Tag}
        label="Categorías"
        value={CATEGORIAS.length}
        color="bg-sky-500"
      />
    </div>
  );
}
