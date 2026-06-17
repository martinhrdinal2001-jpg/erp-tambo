"use client";

import { useMemo, useState } from "react";
import {
  X,
  Send,
  MessageSquarePlus,
  Sparkles,
  Volume2,
  ImageIcon,
} from "lucide-react";
import PrioridadBadge from "@/components/monitor/PrioridadBadge";
import TipoEventoBadge from "@/components/monitor/TipoEventoBadge";
import { TRABAJADORES } from "@/data/trabajadores";
import { CANALES, getTipoEventoLabel } from "@/data/monitor";
import { analizarMensaje } from "@/lib/analizador";

// Ejemplos rápidos que el usuario puede pegar y disparar.
const EJEMPLOS = [
  "Urgente, la vaca 0428 con mastitis en el cuarto delantero derecho.",
  "La ternera 0032 no tomó leche en la mañana.",
  "La bomba del sector agua no partió.",
  "Falta antibiótico en bodega.",
  "Parto de la 0611, cría viva.",
];

export default function SimuladorMensaje({ onSimular, onCerrar }) {
  const [texto, setTexto] = useState("");
  const [canal, setCanal] = useState("WHATSAPP");
  const [trabajadorId, setTrabajadorId] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [conAudio, setConAudio] = useState(false);
  const [conImagen, setConImagen] = useState(false);

  // El analizador se ejecuta en vivo mientras vos tipeás.
  const sugerencia = useMemo(() => analizarMensaje(texto), [texto]);
  const trabajador = TRABAJADORES.find((t) => t.id === Number(trabajadorId));

  function handleEnviar() {
    if (!texto.trim()) return;

    const nuevo = {
      id: `msg-sim-${Date.now()}`,
      canal_origen: canal,
      whatsapp_message_id: canal === "WHATSAPP" ? `wamid.sim_${Date.now()}` : null,
      from_phone: trabajador?.telefono || null,
      from_name: trabajador?.nombre?.split(" ")[0] || "Simulación",
      trabajador_id: trabajador?.id || null,
      mensaje_texto: texto.trim(),
      audio_url: conAudio ? `audio_sim_${Date.now()}.ogg` : null,
      audio_duracion: conAudio ? Math.floor(Math.random() * 25) + 5 : null,
      imagen_url: conImagen ? `imagen_sim_${Date.now()}.jpg` : null,
      ubicacion_texto: ubicacion || null,
      recibido_at: new Date().toISOString(),
      procesado: true,
      ...sugerencia,
      estado: "PENDIENTE",
    };

    onSimular(nuevo);
    onCerrar();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <div className="flex max-h-[95vh] w-full max-w-xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
        {/* Cabecera */}
        <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-bold text-stone-900">
              <MessageSquarePlus size={18} className="text-emerald-600" />
              Simular mensaje del campo
            </h2>
            <p className="text-xs text-stone-500">
              Probá el flujo sin esperar un mensaje real de WhatsApp.
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

        {/* Cuerpo */}
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {/* Texto */}
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-stone-500">
              Mensaje (texto o transcripción del audio)
            </label>
            <textarea
              autoFocus
              rows={4}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Ej: Urgente, la vaca 0428 con mastitis cuarto delantero derecho..."
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
            <div className="mt-2 flex flex-wrap gap-1">
              {EJEMPLOS.map((ej, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setTexto(ej)}
                  className="rounded-full bg-stone-100 px-2 py-0.5 text-[11px] text-stone-600 hover:bg-stone-200"
                >
                  {ej.slice(0, 32)}…
                </button>
              ))}
            </div>
          </div>

          {/* Sugerencia en vivo del analizador */}
          {texto.trim() && (
            <div className="rounded-lg border border-purple-100 bg-purple-50 p-3 text-xs">
              <div className="mb-2 flex items-center gap-1.5 font-semibold uppercase tracking-wider text-purple-900">
                <Sparkles size={12} />
                Sugerencia del analizador (en vivo)
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <PrioridadBadge prioridad={sugerencia.prioridad_sugerida} size="sm" />
                <TipoEventoBadge tipo={sugerencia.tipo_evento_sugerido} size="sm" />
                {sugerencia.caravana_sugerida && (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                    #{sugerencia.caravana_sugerida}
                  </span>
                )}
                <span className="text-purple-700">
                  Confianza {Math.round((sugerencia.confianza_ia || 0) * 100)}%
                </span>
              </div>
            </div>
          )}

          {/* Origen */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Campo label="Canal">
              <select
                value={canal}
                onChange={(e) => setCanal(e.target.value)}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              >
                {CANALES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Campo>
            <Campo label="Trabajador (opcional)">
              <select
                value={trabajadorId}
                onChange={(e) => setTrabajadorId(e.target.value)}
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              >
                <option value="">— Sin identificar —</option>
                {TRABAJADORES.filter((t) => t.estado === "Activo").map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.nombre.split(" ").slice(0, 2).join(" ")} · {t.rol}
                  </option>
                ))}
              </select>
            </Campo>
            <Campo label="Ubicación">
              <input
                type="text"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                placeholder="Sala de ordeñe / Bodega / Potrero..."
                className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </Campo>
            <Campo label="Evidencia adjunta">
              <div className="flex gap-2">
                <Toggle activo={conAudio} onToggle={() => setConAudio((v) => !v)}>
                  <Volume2 size={14} /> Audio
                </Toggle>
                <Toggle activo={conImagen} onToggle={() => setConImagen((v) => !v)}>
                  <ImageIcon size={14} /> Foto
                </Toggle>
              </div>
            </Campo>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center justify-between gap-2 border-t border-stone-200 bg-stone-50 px-5 py-4">
          <span className="text-xs text-stone-500">
            {texto.trim().length} caracteres · {getTipoEventoLabel(sugerencia.tipo_evento_sugerido)}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onCerrar}
              className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleEnviar}
              disabled={!texto.trim()}
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send size={16} />
              Enviar a la bandeja
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

function Toggle({ activo, onToggle, children }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-xs font-medium transition ${
        activo
          ? "border-emerald-500 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
          : "border-stone-200 bg-white text-stone-500 hover:bg-stone-50"
      }`}
    >
      {children}
    </button>
  );
}
