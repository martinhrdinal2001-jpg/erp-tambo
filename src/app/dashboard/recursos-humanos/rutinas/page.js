import Link from "next/link";
import { ArrowLeft, Clock, UserCog, ListChecks } from "lucide-react";
import Topbar from "@/components/Topbar";
import ChecklistRutina from "@/components/rrhh/ChecklistRutina";
import { RUTINAS } from "@/data/rutinas";

export default function RutinasPage() {
  return (
    <>
      <Topbar title="Rutinas y checklists" />
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
            <ListChecks size={22} className="text-emerald-600" />
            Rutinas estandarizadas
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-stone-500">
            Cada rutina es un checklist paso a paso. Los trabajadores nuevos las usan durante el
            onboarding para no depender de la memoria de otros. Hacé clic en cada paso para
            marcarlo como completado.
          </p>
        </div>

        <div className="space-y-5">
          {RUTINAS.map((rutina) => (
            <details
              key={rutina.id}
              className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 transition hover:bg-stone-50">
                <div>
                  <h3 className="text-base font-semibold text-stone-900">
                    {rutina.nombre}
                  </h3>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-stone-500">
                    <span className="inline-flex items-center gap-1">
                      <UserCog size={12} />
                      {rutina.rol}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} />
                      {rutina.duracion}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <ListChecks size={12} />
                      {rutina.pasos.length} pasos
                    </span>
                  </div>
                </div>
                <span className="text-xs font-medium text-emerald-700">Ver detalles ▾</span>
              </summary>

              <div className="border-t border-stone-100 bg-stone-50/50 p-5">
                <p className="mb-4 text-sm text-stone-600">{rutina.descripcion}</p>
                <ChecklistRutina pasos={rutina.pasos} />
              </div>
            </details>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Nota:</strong> Las rutinas son sugerencias iniciales basadas en prácticas
          comunes de lechería. Hay que validarlas y ajustarlas con el capataz del fundo según
          los procedimientos reales del Raulí.
        </div>
      </div>
    </>
  );
}
