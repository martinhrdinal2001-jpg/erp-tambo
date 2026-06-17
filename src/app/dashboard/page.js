import Link from "next/link";
import Topbar from "@/components/Topbar";
import WelcomeBanner from "@/components/WelcomeBanner";
import {
  Users,
  Beef,
  Package,
  Wallet,
  AlertTriangle,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { TRABAJADORES } from "@/data/trabajadores";
import { VACAS, produccionEstimada } from "@/data/ganado";
import { ITEMS, tieneStockBajo, venceProximamente } from "@/data/inventario";
import {
  MOVIMIENTOS_MENSUALES,
  totalesDelMes,
  formatCLP,
} from "@/data/finanzas";
import { analizarTodo } from "@/lib/analytics";

export default function DashboardPage() {
  // Métricas reales sacadas de los mocks
  const trabajadoresActivos = TRABAJADORES.filter(
    (t) => t.estado === "Activo"
  ).length;
  const vacasEnOrdene = VACAS.filter((v) => v.estado === "En ordeñe").length;
  const litrosDelDia = VACAS.filter((v) => v.estado === "En ordeñe").reduce(
    (s, v) => s + produccionEstimada(v),
    0
  );
  const alertasStock = ITEMS.filter(
    (i) => tieneStockBajo(i) || venceProximamente(i)
  ).length;
  const ultimoMes = MOVIMIENTOS_MENSUALES[MOVIMIENTOS_MENSUALES.length - 1];
  const totalUltimoMes = totalesDelMes(ultimoMes);

  const stats = [
    {
      label: "Trabajadores activos",
      value: trabajadoresActivos,
      sub: `de ${TRABAJADORES.length} en el equipo`,
      icon: Users,
      color: "bg-blue-500",
      href: "/dashboard/recursos-humanos",
    },
    {
      label: "Vacas en ordeñe",
      value: vacasEnOrdene,
      sub: `${litrosDelDia.toFixed(0)} L estimados hoy`,
      icon: Beef,
      color: "bg-amber-500",
      href: "/dashboard/ganado",
    },
    {
      label: "Alertas de stock",
      value: alertasStock,
      sub: "Bajo stock o por vencer",
      icon: Package,
      color: "bg-rose-500",
      href: "/dashboard/inventario",
    },
    {
      label: "Resultado del mes",
      value: formatCLP(totalUltimoMes.resultado),
      sub: ultimoMes.nombreMes,
      icon: Wallet,
      color:
        totalUltimoMes.resultado >= 0 ? "bg-emerald-500" : "bg-rose-600",
      href: "/dashboard/finanzas",
    },
  ];

  // Trabajadores con menos de 6 meses (foco onboarding)
  const recientes = TRABAJADORES.filter((t) => {
    if (t.estado !== "Activo") return false;
    const ingreso = new Date(t.fechaIngreso);
    const seisMesesAtras = new Date();
    seisMesesAtras.setMonth(seisMesesAtras.getMonth() - 6);
    return ingreso > seisMesesAtras;
  });

  const itemsAlerta = ITEMS.filter(
    (i) => tieneStockBajo(i) || venceProximamente(i)
  ).slice(0, 5);

  // Recomendación más urgente del motor analítico
  const { pastoreo, riego, anomalias } = analizarTodo();
  const decisiones = [pastoreo, riego].filter((d) => d.severidad !== "VERDE");
  const decisionTop =
    decisiones.find((d) => d.severidad === "ROJO") ||
    decisiones.find((d) => d.severidad === "AMARILLO") ||
    null;

  return (
    <>
      <Topbar title="Dashboard" />
      <div className="p-4 sm:p-8">
        <WelcomeBanner />

        {/* Franja con la recomendación más urgente del motor analítico */}
        {decisionTop && (
          <Link
            href="/dashboard/recomendaciones"
            className={`mb-6 flex flex-col gap-2 rounded-2xl border p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between ${
              decisionTop.severidad === "ROJO"
                ? "border-rose-200 bg-rose-50"
                : "border-amber-200 bg-amber-50"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  decisionTop.severidad === "ROJO"
                    ? "bg-rose-500 text-white"
                    : "bg-amber-500 text-white"
                }`}
              >
                <Sparkles size={18} />
              </div>
              <div>
                <p
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    decisionTop.severidad === "ROJO"
                      ? "text-rose-700"
                      : "text-amber-800"
                  }`}
                >
                  Recomendación del motor — {decisionTop.severidad === "ROJO" ? "actuar ahora" : "revisar hoy"}
                </p>
                <p className="text-sm font-bold text-stone-900">
                  {decisionTop.recomendacion.replace(/_/g, " ")} ·{" "}
                  <span className="font-normal text-stone-700">
                    {decisionTop.razon}
                  </span>
                </p>
                {anomalias.length > 0 && (
                  <p className="mt-1 text-xs text-stone-600">
                    + {anomalias.length} anomalía{anomalias.length > 1 ? "s" : ""} de producción detectada{anomalias.length > 1 ? "s" : ""}.
                  </p>
                )}
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-stone-700">
              Ver detalle <ChevronRight size={14} />
            </span>
          </Link>
        )}

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="group rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:ring-2 hover:ring-emerald-200"
              >
                <div className={`mb-3 inline-flex rounded-lg p-2 text-white ${stat.color}`}>
                  <Icon size={20} />
                </div>
                <p className="truncate text-xl font-bold text-stone-800">{stat.value}</p>
                <p className="text-sm text-stone-500">{stat.label}</p>
                <p className="mt-0.5 text-xs text-stone-400">{stat.sub}</p>
              </Link>
            );
          })}
        </div>

        {/* Widgets de foco */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Onboarding reciente */}
          <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
              <div>
                <h3 className="text-sm font-semibold text-stone-800">
                  Onboarding reciente
                </h3>
                <p className="text-xs text-stone-500">
                  Trabajadores con menos de 6 meses en el campo
                </p>
              </div>
              <Link
                href="/dashboard/recursos-humanos/rutinas"
                className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-900"
              >
                Ver rutinas
                <ChevronRight size={12} />
              </Link>
            </div>
            <ul className="divide-y divide-stone-100">
              {recientes.length > 0 ? (
                recientes.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/dashboard/recursos-humanos/${t.id}`}
                      className="flex items-center justify-between px-5 py-3 transition hover:bg-emerald-50/40"
                    >
                      <div>
                        <p className="text-sm font-medium text-stone-800">
                          {t.nombre}
                        </p>
                        <p className="text-xs text-stone-500">
                          {t.rol} · ingresó el{" "}
                          {new Date(t.fechaIngreso).toLocaleDateString("es-CL")}
                        </p>
                      </div>
                      <ChevronRight size={16} className="text-stone-400" />
                    </Link>
                  </li>
                ))
              ) : (
                <li className="px-5 py-6 text-center text-sm text-stone-400">
                  No hay trabajadores en onboarding
                </li>
              )}
            </ul>
          </div>

          {/* Alertas de inventario */}
          <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-stone-800">
                  <AlertTriangle size={14} className="text-amber-500" />
                  Alertas de inventario
                </h3>
                <p className="text-xs text-stone-500">
                  Items con stock bajo o próximos a vencer
                </p>
              </div>
              <Link
                href="/dashboard/inventario"
                className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 hover:text-emerald-900"
              >
                Ver todo
                <ChevronRight size={12} />
              </Link>
            </div>
            <ul className="divide-y divide-stone-100">
              {itemsAlerta.length > 0 ? (
                itemsAlerta.map((i) => (
                  <li
                    key={i.id}
                    className="flex items-center justify-between px-5 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-stone-800">
                        {i.nombre}
                      </p>
                      <p className="text-xs text-stone-500">
                        Stock: {i.stockActual} {i.unidad} (mín: {i.stockMinimo})
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        tieneStockBajo(i)
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {tieneStockBajo(i) ? "Stock bajo" : "Por vencer"}
                    </span>
                  </li>
                ))
              ) : (
                <li className="px-5 py-6 text-center text-sm text-stone-400">
                  Sin alertas en este momento
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
