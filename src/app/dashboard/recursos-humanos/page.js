import Link from "next/link";
import {
  UserPlus,
  ListChecks,
  Users,
  GraduationCap,
  ClipboardList,
} from "lucide-react";
import Topbar from "@/components/Topbar";
import TrabajadorTable from "@/components/rrhh/TrabajadorTable";
import {
  TRABAJADORES,
  trabajadoresEnOnboarding,
} from "@/data/trabajadores";

export default function RecursosHumanosPage() {
  const activos = TRABAJADORES.filter((t) => t.estado === "Activo").length;
  const totales = TRABAJADORES.length;
  const enOnboarding = trabajadoresEnOnboarding().length;

  return (
    <>
      <Topbar title="Recursos Humanos" />
      <div className="p-4 sm:p-8">
        {/* Encabezado de sección */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-stone-800">
              <Users size={22} className="text-emerald-600" />
              Trabajadores del Fundo
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              {activos} activos de {totales} en el equipo
              {enOnboarding > 0 && (
                <>
                  {" · "}
                  <span className="font-medium text-sky-700">
                    {enOnboarding} en onboarding
                  </span>
                </>
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard/recursos-humanos/turnos"
              className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-800 transition hover:bg-amber-100"
            >
              <ClipboardList size={16} />
              Bitácora de Turnos
            </Link>
            <Link
              href="/dashboard/recursos-humanos/onboarding"
              className="inline-flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-medium text-sky-800 transition hover:bg-sky-100"
            >
              <GraduationCap size={16} />
              Panel de Onboarding
            </Link>
            <Link
              href="/dashboard/recursos-humanos/rutinas"
              className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            >
              <ListChecks size={16} />
              Rutinas y checklists
            </Link>
            <Link
              href="/dashboard/recursos-humanos/nuevo"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-700"
            >
              <UserPlus size={16} />
              Nuevo trabajador
            </Link>
          </div>
        </div>

        <TrabajadorTable trabajadores={TRABAJADORES} />
      </div>
    </>
  );
}
