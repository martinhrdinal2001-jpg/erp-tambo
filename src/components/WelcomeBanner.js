import { TreeDeciduous } from "lucide-react";
import ScenicBackground from "@/components/ScenicBackground";

export default function WelcomeBanner() {
  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl shadow-md ring-1 ring-emerald-900/10">
      {/* Fondo escénico difuminado */}
      <div className="absolute inset-0">
        <ScenicBackground className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/70 via-emerald-800/50 to-transparent" />
      </div>

      {/* Contenido */}
      <div className="relative flex items-center gap-4 px-6 py-7 text-white">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/30 backdrop-blur-sm">
          <TreeDeciduous size={26} className="text-amber-200" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-emerald-100/80">
            Bienvenido a
          </p>
          <h2 className="text-2xl font-bold">Fundo el Raulí</h2>
          <p className="mt-1 text-sm text-emerald-50/90">
            Resumen general del campo · Los datos se conectarán en próximas fases
          </p>
        </div>
      </div>
    </div>
  );
}
