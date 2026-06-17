"use client";

import { useEffect, useMemo, useState } from "react";
import { Radio, Inbox, CheckCircle2, MessageSquarePlus } from "lucide-react";
import Topbar from "@/components/Topbar";
import KPIsMonitor from "@/components/monitor/KPIsMonitor";
import MensajeCard from "@/components/monitor/MensajeCard";
import ModalValidacion from "@/components/monitor/ModalValidacion";
import EventosConfirmados from "@/components/monitor/EventosConfirmados";
import SimuladorMensaje from "@/components/monitor/SimuladorMensaje";
import {
  MENSAJES_INICIALES,
  EVENTOS_INICIALES,
} from "@/data/monitor";

const STORAGE_KEY = "monitor-campo-state-v1";

// Hidrata el estado desde localStorage si existe (persistencia mock).
function cargarEstado() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function guardarEstado(state) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // sin espacio: lo ignoramos para el MVP
  }
}

export default function MonitorCampoPage() {
  const [mensajes, setMensajes] = useState(MENSAJES_INICIALES);
  const [eventos, setEventos] = useState(EVENTOS_INICIALES);
  const [hidratado, setHidratado] = useState(false);
  const [seleccion, setSeleccion] = useState(null);
  const [simulando, setSimulando] = useState(false);

  // Hidratar desde localStorage en cliente
  useEffect(() => {
    const stored = cargarEstado();
    if (stored) {
      setMensajes(stored.mensajes || MENSAJES_INICIALES);
      setEventos(stored.eventos || EVENTOS_INICIALES);
    }
    setHidratado(true);
  }, []);

  // Guardar cambios
  useEffect(() => {
    if (!hidratado) return;
    guardarEstado({ mensajes, eventos });
  }, [mensajes, eventos, hidratado]);

  // Bandeja: solo pendientes, urgentes primero, luego por fecha desc
  const bandeja = useMemo(() => {
    const ordenPrioridad = { ROJO: 0, AMARILLO: 1, VERDE: 2, GRIS: 3 };
    return mensajes
      .filter((m) => m.estado === "PENDIENTE")
      .sort((a, b) => {
        const pa = ordenPrioridad[a.prioridad_sugerida] ?? 99;
        const pb = ordenPrioridad[b.prioridad_sugerida] ?? 99;
        if (pa !== pb) return pa - pb;
        return new Date(b.recibido_at) - new Date(a.recibido_at);
      });
  }, [mensajes]);

  function confirmarMensaje(datos) {
    const id = `evt-${Date.now()}`;
    const nuevoEvento = {
      id,
      mensaje_campo_id: datos.mensaje_campo_id,
      tipo_evento: datos.tipo_evento,
      prioridad: datos.prioridad,
      caravana_vaca: datos.caravana_vaca,
      descripcion: datos.descripcion,
      validado_por: "Hernán Catrileo (capataz)",
      validado_at: new Date().toISOString(),
      fecha_hora_evento: new Date().toISOString(),
    };
    setEventos((prev) => [nuevoEvento, ...prev]);
    setMensajes((prev) =>
      prev.map((m) =>
        m.id === datos.mensaje_campo_id ? { ...m, estado: "CONVERTIDO" } : m
      )
    );
    setSeleccion(null);
  }

  function descartarMensaje(mensajeId) {
    setMensajes((prev) =>
      prev.map((m) => (m.id === mensajeId ? { ...m, estado: "DESCARTADO" } : m))
    );
    setSeleccion(null);
  }

  function agregarMensajeSimulado(nuevo) {
    setMensajes((prev) => [nuevo, ...prev]);
  }

  function resetearMock() {
    if (typeof window === "undefined") return;
    if (!window.confirm("¿Resetear la bandeja al estado inicial?")) return;
    window.localStorage.removeItem(STORAGE_KEY);
    setMensajes(MENSAJES_INICIALES);
    setEventos(EVENTOS_INICIALES);
  }

  const hoyStr = new Date().toLocaleDateString("es-CL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Topbar title="Monitor Campo" />
      <div className="p-4 sm:p-8">
        {/* Header */}
        <div className="mb-6 overflow-hidden rounded-2xl border border-stone-200 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 p-5 text-white shadow-md sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-200">
                <Radio size={14} />
                Central El Raulí
                <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-rose-400" />
                <span>En vivo</span>
              </div>
              <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                Bandeja del campo
              </h1>
              <p className="mt-1 text-sm capitalize text-emerald-100">{hoyStr}</p>
            </div>
            <div className="flex gap-2 self-start">
              <button
                type="button"
                onClick={() => setSimulando(true)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow hover:bg-emerald-50"
              >
                <MessageSquarePlus size={14} />
                Simular mensaje
              </button>
              <button
                type="button"
                onClick={resetearMock}
                className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20"
              >
                Resetear demo
              </button>
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-sm text-emerald-50/90">
            Cada audio, foto y mensaje del campo llega acá. Revisalo, ajustá lo
            que sugirió el sistema y confirmalo para que quede como evento oficial
            en el ERP.
          </p>
        </div>

        {/* KPIs */}
        <div className="mb-6">
          <KPIsMonitor mensajes={mensajes} eventos={eventos} />
        </div>

        {/* Bandeja */}
        <section className="mb-8">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-stone-800">
            <Inbox size={18} className="text-emerald-600" />
            Bandeja pendiente
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-600">
              {bandeja.length}
            </span>
          </h2>
          {bandeja.length === 0 ? (
            <div className="rounded-xl border border-dashed border-stone-300 bg-white p-12 text-center">
              <CheckCircle2
                size={32}
                className="mx-auto mb-2 text-emerald-500"
              />
              <p className="text-sm font-medium text-stone-700">
                Bandeja vacía. Buen trabajo.
              </p>
              <p className="mt-1 text-xs text-stone-500">
                Cuando llegue un mensaje nuevo de WhatsApp aparecerá acá.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {bandeja.map((m) => (
                <MensajeCard key={m.id} mensaje={m} onAbrir={setSeleccion} />
              ))}
            </div>
          )}
        </section>

        {/* Eventos confirmados */}
        <section>
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold text-stone-800">
            <CheckCircle2 size={18} className="text-emerald-600" />
            Eventos confirmados hoy
            <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs font-semibold text-stone-600">
              {eventos.length}
            </span>
          </h2>
          <EventosConfirmados eventos={eventos} />
        </section>

        <div className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          <strong>Cómo funciona:</strong> el trabajador manda audio o foto por
          WhatsApp al número central. El sistema lo analiza y sugiere qué tipo
          de evento es, qué prioridad tiene y a qué vaca afecta. Vos revisás,
          ajustás si hace falta y confirmás. Recién ahí queda como{" "}
          <strong>evento oficial</strong> trazable en el ERP.{" "}
          <em>
            El trabajador no se adapta al software — el software se adapta al
            campo.
          </em>
        </div>

        {/* Modal de validación */}
        {seleccion && (
          <ModalValidacion
            mensaje={seleccion}
            onConfirmar={confirmarMensaje}
            onDescartar={descartarMensaje}
            onCerrar={() => setSeleccion(null)}
          />
        )}

        {/* Simulador de mensajes nuevos */}
        {simulando && (
          <SimuladorMensaje
            onSimular={agregarMensajeSimulado}
            onCerrar={() => setSimulando(false)}
          />
        )}
      </div>
    </>
  );
}
