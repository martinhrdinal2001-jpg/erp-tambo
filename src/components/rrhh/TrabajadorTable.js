"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import EstadoBadge from "@/components/rrhh/EstadoBadge";
import { calcularAntiguedad, ROLES, ESTADOS } from "@/data/trabajadores";

export default function TrabajadorTable({ trabajadores }) {
  const [busqueda, setBusqueda] = useState("");
  const [filtroRol, setFiltroRol] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return trabajadores.filter((t) => {
      const okBusqueda =
        !q ||
        t.nombre.toLowerCase().includes(q) ||
        t.rol.toLowerCase().includes(q) ||
        t.sector.toLowerCase().includes(q);
      const okRol = !filtroRol || t.rol === filtroRol;
      const okEstado = !filtroEstado || t.estado === filtroEstado;
      return okBusqueda && okRol && okEstado;
    });
  }, [trabajadores, busqueda, filtroRol, filtroEstado]);

  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-sm">
      {/* Filtros */}
      <div className="flex flex-col gap-3 border-b border-stone-200 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre, rol o sector..."
            className="w-full rounded-lg border border-stone-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>
        <select
          value={filtroRol}
          onChange={(e) => setFiltroRol(e.target.value)}
          className="rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
        >
          <option value="">Todos los roles</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select
          value={filtroEstado}
          onChange={(e) => setFiltroEstado(e.target.value)}
          className="rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
        >
          <option value="">Todos los estados</option>
          {ESTADOS.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-left text-xs uppercase tracking-wider text-stone-500">
            <tr>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Rol</th>
              <th className="px-4 py-3 font-medium">Sector</th>
              <th className="px-4 py-3 font-medium">Antigüedad</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtrados.map((t) => {
              const { anios, meses } = calcularAntiguedad(t.fechaIngreso);
              return (
                <tr key={t.id} className="transition hover:bg-emerald-50/40">
                  <td className="px-4 py-3 font-medium text-stone-800">
                    {t.nombre}
                  </td>
                  <td className="px-4 py-3 text-stone-600">{t.rol}</td>
                  <td className="px-4 py-3 text-stone-600">{t.sector}</td>
                  <td className="px-4 py-3 text-stone-600">
                    {anios > 0 ? `${anios} a` : ""} {meses} m
                  </td>
                  <td className="px-4 py-3">
                    <EstadoBadge estado={t.estado} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/dashboard/recursos-humanos/${t.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-900"
                    >
                      Ver ficha
                      <ChevronRight size={14} />
                    </Link>
                  </td>
                </tr>
              );
            })}
            {filtrados.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-12 text-center text-sm text-stone-400"
                >
                  No se encontraron trabajadores con esos filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-stone-200 px-4 py-3 text-xs text-stone-500">
        Mostrando {filtrados.length} de {trabajadores.length} trabajadores
      </div>
    </div>
  );
}
