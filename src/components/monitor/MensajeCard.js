"use client";

import { MessageSquare, User, MapPin } from "lucide-react";
import PrioridadBadge, { barraPrioridad } from "@/components/monitor/PrioridadBadge";
import TipoEventoBadge from "@/components/monitor/TipoEventoBadge";
import { ChipAudio, ChipImagen } from "@/components/monitor/Evidencia";
import { tiempoRelativo, horaCorta } from "@/data/monitor";

export default function MensajeCard({ mensaje, onAbrir }) {
  const barra = barraPrioridad(mensaje.prioridad_sugerida);

  return (
    <button
      type="button"
      onClick={() => onAbrir(mensaje)}
      className="group flex w-full items-stretch overflow-hidden rounded-xl border border-stone-200 bg-white text-left shadow-sm transition hover:border-emerald-300 hover:shadow-md"
    >
      {/* Barra lateral de prioridad */}
      <div className={`w-1.5 shrink-0 ${barra}`} />

      <div className="flex-1 p-4">
        {/* Cabecera */}
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <PrioridadBadge prioridad={mensaje.prioridad_sugerida} />
          <TipoEventoBadge tipo={mensaje.tipo_evento_sugerido} />
          {mensaje.caravana_sugerida && (
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
              #{mensaje.caravana_sugerida}
            </span>
          )}
        </div>

        {/* Texto del mensaje */}
        <p className="mb-3 text-sm text-stone-800 line-clamp-2">
          {mensaje.mensaje_texto}
        </p>

        {/* Metadata + evidencias */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
          <span className="inline-flex items-center gap-1">
            <User size={11} />
            {mensaje.from_name || "Desconocido"}
          </span>
          {mensaje.ubicacion_texto && (
            <span className="inline-flex items-center gap-1">
              <MapPin size={11} />
              {mensaje.ubicacion_texto}
            </span>
          )}
          <span className="inline-flex items-center gap-1">
            <MessageSquare size={11} />
            {tiempoRelativo(mensaje.recibido_at)} · {horaCorta(mensaje.recibido_at)}
          </span>
          {mensaje.audio_url && <ChipAudio duracion={mensaje.audio_duracion} />}
          {mensaje.imagen_url && <ChipImagen />}
        </div>
      </div>
    </button>
  );
}
