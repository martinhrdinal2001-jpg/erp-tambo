"use client";

import { useState, useEffect } from "react";
import {
  X,
  CheckCircle2,
  Trash2,
  MessageCircle,
  User,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";
import PrioridadBadge from "@/components/monitor/PrioridadBadge";
import { ReproductorAudio, VisorImagen } from "@/components/monitor/Evidencia";
import {
  TIPOS_EVENTO,
  PRIORIDADES,
  tiempoRelativo,
  horaCorta,
} from "@/data/monitor";

export default function ModalValidacion({ mensaje, onConfirmar, onDescartar, onCerrar }) {
  // Estado local de los campos editables
  const [tipo, setTipo] = useState(mensaje?.tipo_evento_sugerido || "OTRO");
  const [prioridad, setPrioridad] = useState(mensaje?.prioridad_sugerida || "VERDE");
  const [caravana, setCaravana] = useState(mensaje?.caravana_sugerida || "");
  const [descripcion, setDescripcion] = useState(mensaje?.mensaje_texto || "");

  // Reset cuando cambia el mensaje
  useEffect(() => {
    if (!mensaje) return;
    setTipo(mensaje.tipo_evento_sugerido || "OTRO");
    setPrioridad(mensaje.prioridad_sugerida || "VERDE");
    setCaravana(mensaje.caravana_sugerida || "");
    setDescripcion(mensaje.mensaje_texto || "");
  }, [mensaje]);

  if (!mensaje) return null;

  function handleConfirmar() {
    onConfirmar({
      mensaje_campo_id: mensaje.id,
      tipo_evento: tipo,
      prioridad,
      caravana_vaca: caravana || null,
      descripcion,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <div className="flex max-h-[95vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        {/* Cabecera */}
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Revisar mensaje</h2>
            <p className="text-xs text-stone-500">
              {tiempoRelativo(mensaje.recibido_at)} ·{" "}
              {horaCorta(mensaje.recibido_at)} · canal {mensaje.canal_origen}
            </p>
          </div>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar"
            className="rounded-lg p-2 text-stone-500 hover:bg-stone-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cuerpo scrolleable */}
        <div className="flex-1 space-y-5 overflow-y-auto p-5">
          {/* Origen */}
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
            <div className="grid grid-cols-1 gap-2 text-xs text-stone-600 sm:grid-cols-3">
              <span className="inline-flex items-center gap-1">
                <User size={12} />
                {mensaje.from_name || "Desconocido"}
              </span>
              <span className="inline-flex items-center gap-1">
                <MessageCircle size={12} />
                {mensaje.from_phone || "—"}
              </span>
              {mensaje.ubicacion_texto && (
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} />
                  {mensaje.ubicacion_texto}
                </span>
              )}
            </div>
          </div>

          {/* Texto original */}
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-stone-500">
              Mensaje original
            </div>
            <p className="rounded-lg bg-emerald-50 p-3 text-sm italic text-stone-800 ring-1 ring-emerald-100">
              "{mensaje.mensaje_texto}"
            </p>
          </div>

          {/* Evidencias */}
          {(mensaje.audio_url || mensaje.imagen_url) && (
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Evidencia
              </div>
              {mensaje.audio_url && (
                <ReproductorAudio duracion={mensaje.audio_duracion} />
              )}
              {mensaje.imagen_url && <VisorImagen nombre={mensaje.imagen_url} />}
            </div>
          )}

          {/* Sugerencia IA */}
          <div className="rounded-lg border border-purple-100 bg-purple-50 p-3 text-xs text-purple-900">
            <div className="mb-1 flex items-center gap-1.5 font-semibold uppercase tracking-wider">
              <Sparkles size={12} />
              Sugerencia del analizador
            </div>
            <div>
              Tipo: <strong>{mensaje.tipo_evento_sugerido}</strong> · Prioridad{" "}
              <PrioridadBadge prioridad={mensaje.prioridad_sugerida} size="sm" />{" "}
              · Confianza: {Math.round((mensaje.confianza_ia || 0) * 100)}%
            </div>
          </div>

          {/* Campos editables */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Campo label="Tipo de evento">
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              >
                {TIPOS_EVENTO.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Campo>
            <Campo label="Prioridad">
              <div className="grid grid-cols-3 gap-1">
                {PRIORIDADES.filter((p) => p !== "GRIS").map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPrioridad(p)}
                    className={`rounded-lg border px-2 py-1.5 text-xs font-semibold transition ${
                      prioridad === p
                        ? "border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-200"
                        : "border-stone-200 bg-white text-stone-500 hover:bg-stone-50"
                    }`}
                  >
                    {p === "ROJO" ? "Urgente" : p === "AMARILLO" ? "Hoy" : "Info"}
                  </button>
                ))}
              </div>
            </Campo>
            <Campo label="Caravana / animal">
              <input
                type="text"
                value={caravana}
                onChange={(e) => setCaravana(e.target.value)}
                placeholder="0428"
                className="w-full rounded-lg border border-stone-300 px-3 py-2 font-mono text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </Campo>
            <Campo label="Recibido">
              <div className="flex items-center gap-2 px-3 py-2 text-sm text-stone-600">
                <Clock size={14} />
                {horaCorta(mensaje.recibido_at)} ·{" "}
                {tiempoRelativo(mensaje.recibido_at)}
              </div>
            </Campo>
          </div>

          <Campo label="Descripción del evento oficial">
            <textarea
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="Cómo queda registrado en el ERP oficial..."
            />
          </Campo>
        </div>

        {/* Acciones */}
        <div className="flex items-center justify-between gap-2 border-t border-stone-200 bg-stone-50 px-5 py-4">
          <button
            type="button"
            onClick={() => onDescartar(mensaje.id)}
            className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50"
          >
            <Trash2 size={15} />
            Descartar
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onCerrar}
              className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirmar}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-700"
            >
              <CheckCircle2 size={16} />
              Confirmar evento
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Campo({ label, children }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-stone-500">
        {label}
      </label>
      {children}
    </div>
  );
}
