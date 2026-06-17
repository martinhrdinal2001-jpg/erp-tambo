"use client";

import Link from "next/link";
import { GraduationCap, CheckCircle2, Circle, Clock } from "lucide-react";
import BarraProgreso from "@/components/rrhh/BarraProgreso";
import {
  RUTINAS_ONBOARDING,
  rutinasPorSemana,
} from "@/data/rutinas";
import {
  progresoOnboarding,
  calcularAntiguedad,
} from "@/data/trabajadores";

export default function ResumenOnboarding({ trabajador }) {
  const total = RUTINAS_ONBOARDING.length;
  const completadas = trabajador.rutinasCompletadas || [];
  const porcentaje = progresoOnboarding(trabajador, total);
  const porSemana = rutinasPorSemana();
  const { anios, meses } = calcularAntiguedad(trabajador.fechaIngreso);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200">
      {/* Encabezado */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
            <GraduationCap size={18} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-stone-800">
              Estado de onboarding
            </h2>
            <p className="text-xs text-stone-500">
              Trabajador con {anios > 0 ? `${anios} año${anios > 1 ? "s" : ""} ` : ""}
              {meses} mes{meses !== 1 ? "es" : ""} en el fundo
            </p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          {completadas.length} / {total} rutinas
        </span>
      </div>

      {/* Barra de progreso */}
      <div className="mb-5">
        <BarraProgreso porcentaje={porcentaje} />
      </div>

      {/* Listado por semana */}
      <div className="space-y-3">
        {Object.entries(porSemana)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([semana, rutinas]) => {
            const completadasSemana = rutinas.filter((r) =>
              completadas.includes(r.id)
            ).length;
            const totalSemana = rutinas.length;
            const semanaCompleta = completadasSemana === totalSemana;

            return (
              <div key={semana}>
                <div className="mb-1.5 flex items-center justify-between">
                  <h3 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    {semanaCompleta ? (
                      <CheckCircle2 size={13} className="text-emerald-600" />
                    ) : (
                      <Clock size={13} className="text-stone-400" />
                    )}
                    Semana {semana}
                  </h3>
                  <span className="text-xs text-stone-400">
                    {completadasSemana} / {totalSemana}
                  </span>
                </div>
                <ul className="space-y-1">
                  {rutinas.map((r) => {
                    const done = completadas.includes(r.id);
                    return (
                      <li
                        key={r.id}
                        className={`flex items-start gap-2 rounded-md px-2 py-1.5 text-sm ${
                          done ? "text-stone-500" : "text-stone-800"
                        }`}
                      >
                        {done ? (
                          <CheckCircle2
                            size={15}
                            className="mt-0.5 shrink-0 text-emerald-600"
                          />
                        ) : (
                          <Circle
                            size={15}
                            className="mt-0.5 shrink-0 text-stone-300"
                          />
                        )}
                        <span className={done ? "line-through" : ""}>
                          {r.nombre.replace(/^S\d ?— ?/, "").replace(/^Día 1 ?— ?/, "")}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
      </div>

      <div className="mt-5 flex justify-end">
        <Link
          href="/dashboard/recursos-humanos/rutinas"
          className="text-xs font-medium text-emerald-700 hover:text-emerald-900"
        >
          Ver detalle de rutinas →
        </Link>
      </div>
    </div>
  );
}
