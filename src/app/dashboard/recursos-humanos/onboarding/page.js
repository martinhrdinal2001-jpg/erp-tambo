import Link from "next/link";
import {
  ArrowLeft,
  GraduationCap,
  ChevronRight,
  Calendar,
  Briefcase,
} from "lucide-react";
import Topbar from "@/components/Topbar";
import BarraProgreso from "@/components/rrhh/BarraProgreso";
import {
  trabajadoresEnOnboarding,
  progresoOnboarding,
  calcularAntiguedad,
} from "@/data/trabajadores";
import { RUTINAS_ONBOARDING } from "@/data/rutinas";

export default function OnboardingPage() {
  const enOnboarding = trabajadoresEnOnboarding();
  const total = RUTINAS_ONBOARDING.length;

  return (
    <>
      <Topbar title="Panel de Onboarding" />
      <div className="p-4 sm:p-8">
        <Link
          href="/dashboard/recursos-humanos"
          className="inline-flex items-center gap-1 text-sm text-emerald-700 hover:text-emerald-900"
        >
          <ArrowLeft size={14} />
          Volver a Recursos Humanos
        </Link>

        <div className="mt-4 mb-6">
          <h2 className="flex items-center gap-2 text-xl font-bold text-stone-800">
            <GraduationCap size={22} className="text-emerald-600" />
            Trabajadores en onboarding
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-stone-500">
            Seguimiento de los primeros 6 meses de cada trabajador nuevo. El
            programa de onboarding del Fundo el Raulí tiene{" "}
            <strong>{total} rutinas</strong> distribuidas en{" "}
            <strong>4 semanas</strong>, con foco en ordeñe y manejo seguro de
            animales.
          </p>
        </div>

        {/* Resumen */}
        <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Stat
            label="En onboarding ahora"
            value={enOnboarding.length}
            color="bg-sky-500"
          />
          <Stat
            label="Rutinas del programa"
            value={total}
            color="bg-emerald-500"
          />
          <Stat
            label="Avance promedio"
            value={
              enOnboarding.length > 0
                ? `${Math.round(
                    enOnboarding.reduce(
                      (s, t) => s + progresoOnboarding(t, total),
                      0
                    ) / enOnboarding.length
                  )}%`
                : "—"
            }
            color="bg-amber-500"
          />
        </div>

        {/* Lista */}
        <div className="space-y-4">
          {enOnboarding.length === 0 && (
            <div className="rounded-xl border border-dashed border-stone-300 bg-white py-12 text-center text-sm text-stone-400">
              No hay trabajadores en onboarding en este momento.
            </div>
          )}

          {enOnboarding.map((t) => {
            const p = progresoOnboarding(t, total);
            const { meses } = calcularAntiguedad(t.fechaIngreso);
            const completadas = (t.rutinasCompletadas || []).length;
            return (
              <Link
                key={t.id}
                href={`/dashboard/recursos-humanos/${t.id}`}
                className="block rounded-xl border border-stone-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:ring-2 hover:ring-emerald-200"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-semibold text-stone-800">
                      {t.nombre}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-500">
                      <span className="inline-flex items-center gap-1">
                        <Briefcase size={12} />
                        {t.rol}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={12} />
                        Ingresó hace {meses} mes{meses !== 1 ? "es" : ""}
                      </span>
                      <span>
                        {completadas} / {total} rutinas
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className="mt-1 shrink-0 text-stone-400"
                  />
                </div>

                <div className="mt-4">
                  <BarraProgreso porcentaje={p} />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          <strong>Tip de capataz:</strong> Asigná un mentor por cada nuevo
          ingreso durante los primeros 30 días. Las rutinas son una guía, no un
          reemplazo del acompañamiento humano. La rotación se ataca con
          claridad de expectativas y con alguien a quien preguntarle sin miedo.
        </div>
      </div>
    </>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className={`mb-2 h-2 w-12 rounded-full ${color}`} />
      <p className="text-2xl font-bold text-stone-800">{value}</p>
      <p className="text-xs text-stone-500">{label}</p>
    </div>
  );
}
