"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Milk, AlertCircle, Info } from "lucide-react";
import ScenicBackground from "@/components/ScenicBackground";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const [state, formAction] = useFormState(login, { error: null });
  const [fotoLista, setFotoLista] = useState(false);
  const imgRef = useRef(null);

  // Si la foto ya está en cache cuando React monta el <img>, onLoad no dispara.
  // Verificamos al mount: si está completa y tiene contenido, marcarla lista.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setFotoLista(true);
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Capa 1: SVG escénico (fallback si no hay foto) */}
      <ScenicBackground className="absolute inset-0 h-full w-full" />

      {/* Capa 2: Foto real del Fundo en /public/fotos/fundo-rauli.jpg
          Arranca invisible (opacity-0). Si la foto carga bien, fade-in.
          Si no existe el archivo, queda invisible y solo se ve el SVG de abajo. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src="/fotos/fundo-rauli.jpg"
        alt=""
        aria-hidden="true"
        onLoad={() => setFotoLista(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          fotoLista ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Velo translúcido para suavizar el fondo y dar contraste a la tarjeta.
          Se intensifica cuando hay foto, para mantener legibilidad. */}
      <div
        className={`absolute inset-0 transition-opacity ${
          fotoLista
            ? "bg-gradient-to-br from-emerald-950/55 via-emerald-900/30 to-amber-100/10"
            : "bg-gradient-to-br from-emerald-900/30 via-emerald-900/10 to-amber-100/20"
        }`}
      />

      {/* Contenido */}
      <div className="relative flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white/85 p-8 shadow-2xl ring-1 ring-white/40 backdrop-blur-xl">
          {/* Logo / encabezado */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-900/20">
              <Milk size={28} />
            </div>
            <h1 className="text-2xl font-bold text-emerald-900">Fundo el Raulí</h1>
            <p className="mt-1 text-sm text-stone-600">
              Gestión integral del campo lechero
            </p>
          </div>

          {/* Aviso demo */}
          <div className="mb-5 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50/80 px-3 py-2 text-xs text-amber-900">
            <Info size={14} className="mt-0.5 shrink-0" />
            <span>
              <strong>Versión de demostración.</strong> Los datos son ficticios y no
              representan al fundo real.
            </span>
          </div>

          <form action={formAction} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700">
                Clave de acceso
              </label>
              <input
                type="password"
                name="password"
                required
                autoFocus
                placeholder="Ingresá la clave compartida"
                className="w-full rounded-lg border border-stone-300 bg-white/80 px-3 py-2 text-stone-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            {state?.error && (
              <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 ring-1 ring-rose-200">
                <AlertCircle size={16} />
                {state.error}
              </div>
            )}

            <BotonIngresar />
          </form>

          <p className="mt-6 text-center text-xs text-stone-500">
            Acceso solo para personal autorizado
          </p>
        </div>
      </div>
    </div>
  );
}

function BotonIngresar() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="block w-full rounded-lg bg-emerald-600 py-2.5 text-center font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Verificando..." : "Ingresar"}
    </button>
  );
}
