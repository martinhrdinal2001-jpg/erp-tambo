import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Droplets,
  Activity,
  Syringe,
  StickyNote,
  Cake,
  Layers,
} from "lucide-react";
import EstadoVacaBadge from "@/components/ganado/EstadoVacaBadge";
import GraficoProduccion from "@/components/ganado/GraficoProduccion";
import {
  calcularDEL,
  produccionEstimada,
  produccion7Dias,
  edadVaca,
  getLoteById,
} from "@/data/ganado";

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
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function FichaVaca({ vaca }) {
  const { anios, meses } = edadVaca(vaca.fechaNacimiento);
  const del = calcularDEL(vaca.ultimoParto);
  const prodHoy = produccionEstimada(vaca);
  const grafico = produccion7Dias(vaca);
  const lote = getLoteById(vaca.lote);

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/ganado"
        className="inline-flex items-center gap-1 text-sm text-emerald-700 hover:text-emerald-900"
      >
        <ArrowLeft size={14} />
        Volver al rebaño
      </Link>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
        {/* Encabezado */}
        <div className="flex flex-col gap-4 border-b border-stone-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 font-mono text-lg font-bold text-white shadow">
              #{vaca.caravana}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-stone-900">
                {vaca.nombre || `Vaca #${vaca.caravana}`}
              </h1>
              <p className="mt-1 text-sm text-stone-500">
                Holstein · {anios} año{anios !== 1 ? "s" : ""} {meses} m
              </p>
            </div>
          </div>
          <EstadoVacaBadge estado={vaca.estado} />
        </div>

        {/* Datos generales */}
        <div className="grid grid-cols-1 gap-5 pt-5 sm:grid-cols-2 lg:grid-cols-3">
          <Campo Icon={Cake} label="Fecha de nacimiento">
            {formatFecha(vaca.fechaNacimiento)}
          </Campo>
          <Campo Icon={Layers} label="Lote actual">
            {lote ? lote.nombre : "Sin lote asignado"}
          </Campo>
          <Campo Icon={Activity} label="Número de lactancia">
            {vaca.numLactancia > 0 ? vaca.numLactancia : "Aún no ha parido"}
          </Campo>
          <Campo Icon={Calendar} label="Último parto">
            {formatFecha(vaca.ultimoParto)}
          </Campo>
          <Campo Icon={Calendar} label="Días en leche">
            {del !== null ? `${del} días` : "—"}
          </Campo>
          <Campo Icon={Syringe} label="Próxima inseminación">
            {formatFecha(vaca.proximaInseminacion)}
          </Campo>
        </div>

        {vaca.observaciones && (
          <div className="mt-6 rounded-lg border border-amber-100 bg-amber-50 p-4">
            <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-wider text-amber-800">
              <StickyNote size={14} />
              Observaciones
            </div>
            <p className="text-sm text-amber-900">{vaca.observaciones}</p>
          </div>
        )}
      </div>

      {/* Producción */}
      {vaca.estado === "En ordeñe" && (
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-base font-semibold text-stone-800">
                <Droplets size={18} className="text-emerald-600" />
                Producción de leche
              </h2>
              <p className="text-xs text-stone-500">Últimos 7 días (estimado)</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-emerald-700">{prodHoy} L</p>
              <p className="text-xs text-stone-500">producción de hoy</p>
            </div>
          </div>
          <GraficoProduccion datos={grafico} />
        </div>
      )}
    </div>
  );
}
