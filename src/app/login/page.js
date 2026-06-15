import Link from "next/link";
import { Milk } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-emerald-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg ring-1 ring-emerald-100">
        {/* Logo / encabezado */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <Milk size={28} />
          </div>
          <h1 className="text-2xl font-bold text-emerald-900">ERP Tambo</h1>
          <p className="mt-1 text-sm text-stone-500">
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
              placeholder="ej: encargado@tambo.com"
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-stone-700">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          {/* Por ahora es un link al dashboard para poder navegar mientras desarrollamos */}
          <Link
            href="/dashboard"
            className="block w-full rounded-lg bg-emerald-600 py-2.5 text-center font-semibold text-white transition hover:bg-emerald-700"
          >
            Ingresar
          </Link>
        </form>

        <p className="mt-6 text-center text-xs text-stone-400">
          Acceso solo para personal autorizado
        </p>
      </div>
    </div>
  );
}
