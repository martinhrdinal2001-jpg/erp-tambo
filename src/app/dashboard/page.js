import Topbar from "@/components/Topbar";
import { Users, Beef, Package, Wallet } from "lucide-react";

const stats = [
  { label: "Trabajadores activos", value: "—", icon: Users, color: "bg-blue-500" },
  { label: "Vacas en ordeñe", value: "—", icon: Beef, color: "bg-amber-500" },
  { label: "Stock de alimento", value: "—", icon: Package, color: "bg-orange-500" },
  { label: "Ventas del mes", value: "—", icon: Wallet, color: "bg-emerald-500" },
];

export default function DashboardPage() {
  return (
    <>
      <Topbar title="Dashboard" />
      <div className="p-8">
        <p className="mb-6 text-stone-500">
          Resumen general del campo. Los datos se conectarán en próximas fases.
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
              >
                <div className={`mb-3 inline-flex rounded-lg p-2 text-white ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <p className="text-2xl font-bold text-stone-800">{stat.value}</p>
                <p className="text-sm text-stone-500">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
