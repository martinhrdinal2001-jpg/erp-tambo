import Link from "next/link";
import {
  ArrowLeft,
  Phone,
  MapPin,
  Home,
  Calendar,
  IdCard,
  Briefcase,
  StickyNote,
} from "lucide-react";
import EstadoBadge from "@/components/rrhh/EstadoBadge";
import { calcularAntiguedad } from "@/data/trabajadores";

function Campo({ Icon, label, children }) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500">
        <Icon size={14} />
        {label}
      </div>
      <div className="text-sm text-stone-800">{children}</div>
    </div>
  );
}

function formatFecha(iso) {
  return new Date(iso).toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function FichaTrabajador({ trabajador }) {
  const { anios, meses } = calcularAntiguedad(trabajador.fechaIngreso);

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/recursos-humanos"
        className="inline-flex items-center gap-1 text-sm text-emerald-700 hover:text-emerald-900"
      >
        <ArrowLeft size={14} />
        Volver al listado
      </Link>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
        {/* Encabezado */}
        <div className="flex items-start justify-between border-b border-stone-100 pb-5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-700">
              {trabajador.nombre
                .split(" ")
                .slice(0, 2)
                .map((p) => p[0])
                .join("")}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-stone-900">
                {trabajador.nombre}
              </h1>
              <div className="mt-1 flex items-center gap-2 text-sm text-stone-500">
                <Briefcase size={14} />
                {trabajador.rol}
              </div>
            </div>
          </div>
          <EstadoBadge estado={trabajador.estado} />
        </div>

        {/* Campos */}
        <div className="grid grid-cols-1 gap-5 pt-5 sm:grid-cols-2 lg:grid-cols-3">
          <Campo Icon={IdCard} label="RUT">
            {trabajador.rut}
          </Campo>
          <Campo Icon={Phone} label="Teléfono">
            <a
              href={`tel:${trabajador.telefono.replace(/\s/g, "")}`}
              className="hover:text-emerald-700"
            >
              {trabajador.telefono}
            </a>
          </Campo>
          <Campo Icon={Calendar} label="Fecha de ingreso">
            {formatFecha(trabajador.fechaIngreso)}
          </Campo>
          <Campo Icon={Calendar} label="Antigüedad">
            {anios > 0 ? `${anios} año${anios > 1 ? "s" : ""} ` : ""}
            {meses} mes{meses !== 1 ? "es" : ""}
          </Campo>
          <Campo Icon={MapPin} label="Sector asignado">
            {trabajador.sector}
          </Campo>
          <Campo Icon={Home} label="Vivienda">
            {trabajador.viveEnElCampo ? "Vive en el campo" : "Vive fuera del campo"}
          </Campo>
        </div>

        {trabajador.notas && (
          <div className="mt-6 rounded-lg border border-amber-100 bg-amber-50 p-4">
            <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wider text-amber-800">
              <StickyNote size={14} />
              Notas
            </div>
            <p className="text-sm text-amber-900">{trabajador.notas}</p>
          </div>
        )}
      </div>
    </div>
  );
}
