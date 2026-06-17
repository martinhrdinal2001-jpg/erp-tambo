"use client";

import { useMemo } from "react";
import Link from "next/link";
import TurnoBadge from "@/components/rrhh/TurnoBadge";
import {
  ORDENADORES,
  TURNOS,
  fechasBitacora,
  turnoDe,
  estadisticasTrabajador,
} from "@/data/turnos";

// Formato dd/mm con día de la semana corto
function formatFechaCorta(iso) {
  const d = new Date(iso + "T12:00:00");
  const diaSem = d.toLocaleDateString("es-CL", { weekday: "short" });
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return { diaSem: diaSem.replace(".", ""), fecha: `${dd}/${mm}` };
}

export default function BitacoraGrid() {
  const fechas = useMemo(() => fechasBitacora(), []);

  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="border-b border-stone-200 px-5 py-4">
        <h3 className="text-sm font-semibold text-stone-800">
          Bitácora últimos 14 días
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-stone-500">
          <Leyenda color="bg-emerald-500" label="Presente" />
          <Leyenda color="bg-amber-500" label="Atrasado" />
          <Leyenda color="bg-rose-500" label="Ausente" />
          <Leyenda color="bg-sky-300" label="Vacaciones" />
          <Leyenda color="bg-stone-300" label="Licencia" />
        </div>
      </div>

      {/* ───── Vista DESKTOP: matriz ───── */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-xs text-stone-500">
            <tr>
              <th className="sticky left-0 z-10 bg-stone-50 px-4 py-2 text-left font-medium">
                Trabajador
              </th>
              {fechas.map((f) => {
                const { diaSem, fecha } = formatFechaCorta(f);
                return (
                  <th
                    key={f}
                    className="px-2 py-2 text-center font-medium"
                    colSpan={2}
                  >
                    <div className="text-[10px] uppercase tracking-wider">{diaSem}</div>
                    <div className="text-[10px] text-stone-400">{fecha}</div>
                  </th>
                );
              })}
              <th className="px-3 py-2 text-center font-medium">% Asist.</th>
            </tr>
            <tr className="text-[10px] text-stone-400">
              <th className="sticky left-0 z-10 bg-stone-50"></th>
              {fechas.map((f) => (
                <SubHead key={f} />
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {ORDENADORES.map((trabajador) => {
              const stats = estadisticasTrabajador(trabajador.id);
              return (
                <tr key={trabajador.id} className="transition hover:bg-emerald-50/30">
                  <td className="sticky left-0 z-10 whitespace-nowrap bg-white px-4 py-2 hover:bg-emerald-50/30">
                    <Link
                      href={`/dashboard/recursos-humanos/${trabajador.id}`}
                      className="text-stone-800 hover:text-emerald-700"
                    >
                      <div className="font-medium">{trabajador.nombre}</div>
                      <div className="text-xs text-stone-500">{trabajador.rol}</div>
                    </Link>
                  </td>
                  {fechas.map((f) => {
                    const am = turnoDe(trabajador.id, f, "AM");
                    const pm = turnoDe(trabajador.id, f, "PM");
                    return (
                      <CeldaDoble key={f} am={am?.estado} pm={pm?.estado} amAtraso={am?.minAtraso} pmAtraso={pm?.minAtraso} />
                    );
                  })}
                  <td className="px-3 py-2 text-center text-sm font-semibold text-stone-700">
                    {stats ? `${stats.asistencia}%` : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ───── Vista MOBILE: cards por trabajador ───── */}
      <div className="divide-y divide-stone-100 md:hidden">
        {ORDENADORES.map((trabajador) => {
          const stats = estadisticasTrabajador(trabajador.id);
          if (!stats) return null;
          const ultimosTurnos = TURNOS.filter(
            (t) => t.trabajadorId === trabajador.id
          ).slice(-6); // últimos 3 días
          return (
            <Link
              key={trabajador.id}
              href={`/dashboard/recursos-humanos/${trabajador.id}`}
              className="block px-4 py-3 transition active:bg-emerald-50"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-stone-800">
                    {trabajador.nombre}
                  </div>
                  <div className="mt-0.5 text-xs text-stone-500">
                    {trabajador.rol}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-emerald-700">
                    {stats.asistencia}%
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500">
                    asist.
                  </div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
                <span>Puntualidad: {stats.puntualidad}%</span>
                {stats.atrasados > 0 && (
                  <span>{stats.atrasados} atrasos · prom {stats.promedioAtraso}'</span>
                )}
                {stats.ausentes > 0 && (
                  <span className="text-rose-600">
                    {stats.ausentes} ausencia{stats.ausentes > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {ultimosTurnos.map((t) => (
                  <TurnoBadge
                    key={t.id}
                    estado={t.estado}
                    minAtraso={t.minAtraso}
                  />
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function SubHead() {
  return (
    <>
      <th className="px-1 py-1 text-center font-normal">AM</th>
      <th className="px-1 py-1 text-center font-normal">PM</th>
    </>
  );
}

function CeldaDoble({ am, pm, amAtraso, pmAtraso }) {
  return (
    <>
      <td className="px-1 py-1 text-center">
        <TurnoBadge estado={am} minAtraso={amAtraso} />
      </td>
      <td className="px-1 py-1 text-center">
        <TurnoBadge estado={pm} minAtraso={pmAtraso} />
      </td>
    </>
  );
}

function Leyenda({ color, label }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 rounded-sm ${color}`} />
      {label}
    </span>
  );
}
