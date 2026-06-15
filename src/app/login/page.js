import Link from "next/link";
import { Milk } from "lucide-react";
import ScenicBackground from "@/components/ScenicBackground";

export default function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo escénico del Fundo el Raulí */}
      <ScenicBackground className="absolute inset-0 h-full w-full" />

      {/* Velo translúcido para suavizar el fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-emerald-900/10 to-amber-100/20" />

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

          {/* Formulario (solo visual, sin lógica todavía) */}
          <form className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700">
                Usuario o correo
              </label>
              <input
                type="text"
                placeholder="ej: encargado@raulí.cl"
                className="w-full rounded-lg border border-stone-300 bg-white/80 px-3 py-2 text-stone-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700">
                Contraseña
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-stone-300 bg-white/80 px-3 py-2 text-stone-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            {/* Por ahora es un link al dashboard para poder navegar mientras desarrollamos */}
            <Link
              href="/dashboard"
              className="block w-full rounded-lg bg-emerald-600 py-2.5 text-center font-semibold text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-700"
            >
              Ingresar
            </Link>
          </form>

          <p className="mt-6 text-center text-xs text-stone-500">
            Acceso solo para personal autorizado
          </p>
        </div>
      </div>
    </div>
  );
}
