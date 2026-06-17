import Link from "next/link";
import { ArrowLeft, ClipboardList, Sunrise, Sunset } from "lucide-react";
import Topbar from "@/components/Topbar";
import ResumenAsistencia from "@/components/rrhh/ResumenAsistencia";
import BitacoraGrid from "@/components/rrhh/BitacoraGrid";
import { HORARIO_TURNO } from "@/data/turnos";

export default function BitacoraTurnosPage() {
  return (
    <>
      <Topbar title="Bitácora de Turnos" />
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
            <ClipboardList size={22} className="text-emerald-600" />
            Bitácora de turnos AM / PM
          </h2>
          <p className="mt-1 max-w-3xl text-sm text-stone-500">
            Registro diario de asistencia y puntualidad del equipo de ordeñe.
            El dolor #1 del campo: mantener el compromiso con turnos cortados
            extremos, sábado y domingo incluidos. Esta vista visibiliza quién
            está sosteniendo el ritmo y quién necesita una conversación.
          </p>
        </div>

        {/* Recordatorio de horarios */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <HorarioCard tipo="AM" Icon={Sunrise} color="bg-amber-100 text-amber-800" />
          <HorarioCard tipo="PM" Icon={Sunset} color="bg-indigo-100 text-indigo-800" />
        </div>

        {/* Stats */}
        <div className="mb-6">
          <ResumenAsistencia />
        </div>

        {/* Grilla */}
        <BitacoraGrid />

        <div className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          <strong>Tip de capataz:</strong> Conversá con cualquier trabajador
          que tenga más de 2 atrasos o ausencias en 14 días.{" "}
          <em>
            Trabajar a las 4 AM, sábado y domingo, todo el año, requiere un
            equipo elegido y reconocido. La asistencia no se exige, se cultiva.
          </em>
        </div>
      </div>
    </>
  );
}

function HorarioCard({ tipo, Icon, color }) {
  const h = HORARIO_TURNO[tipo];
  return (
    <div className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
        <Icon size={20} />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-stone-500">
          Turno {tipo}
        </div>
        <div className="text-sm font-semibold text-stone-800">
          {h.inicio} – {h.fin}{" "}
          <span className="font-normal text-stone-500">· {h.label}</span>
        </div>
      </div>
    </div>
  );
}
