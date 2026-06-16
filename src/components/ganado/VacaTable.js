"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import EstadoVacaBadge from "@/components/ganado/EstadoVacaBadge";
import {
  ESTADOS_VACA,
  LOTES,
  calcularDEL,
  produccionEstimada,
  getLoteById,
} from "@/data/ganado";

const POR_PAGINA = 10;

export default function VacaTable({ vacas }) {
  const [busqueda, setBusqueda] = useState("");
  const [filtroLote, setFiltroLote] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [pagina, setPagina] = useState(1);

  const filtradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return vacas.filter((v) => {
      const okBusqueda =
        !q ||
        v.caravana.includes(q) ||
        (v.nombre && v.nombre.toLowerCase().includes(q));
      const okLote = !filtroLote || v.lote === filtroLote;
      const okEstado = !filtroEstado || v.estado === filtroEstado;
      return okBusqueda && okLote && okEstado;
    });
  }, [vacas, busqueda, filtroLote, filtroEstado]);

  const totalPaginas = Math.ceil(filtradas.length / POR_PAGINA);
  const inicio = (pagina - 1) * POR_PAGINA;
  const visibles = filtradas.slice(inicio, inicio + POR_PAGINA);

  // Reset de página al cambiar filtros
  function actualizar(setter) {
    return (val) => {
      setter(val);
      setPagina(1);
    };
  }

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
            onChange={(e) => actualizar(setBusqueda)(e.target.value)}
            placeholder="Buscar por caravana o nombre..."
            className="w-full rounded-lg border border-stone-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>
        <select
          value={filtroLote}
          onChange={(e) => actualizar(setFiltroLote)(e.target.value)}
          className="rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
        >
          <option value="">Todos los lotes</option>
          {LOTES.map((l) => (
            <option key={l.id} value={l.id}>
              {l.nombre}
            </option>
          ))}
        </select>
        <select
          value={filtroEstado}
          onChange={(e) => actualizar(setFiltroEstado)(e.target.value)}
          className="rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
        >
          <option value="">Todos los estados</option>
          {ESTADOS_VACA.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      {/* Vista MOBILE: cards (visible debajo de md) */}
      <div className="divide-y divide-stone-100 md:hidden">
        {visibles.map((v) => {
          const del = calcularDEL(v.ultimoParto);
          const prod = produccionEstimada(v);
          const lote = getLoteById(v.lote);
          return (
            <Link
              key={v.id}
              href={`/dashboard/ganado/${v.id}`}
              className="flex items-center justify-between gap-3 px-4 py-3 transition active:bg-emerald-50"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold text-emerald-700">
                    #{v.caravana}
                  </span>
                  {v.nombre && (
                    <span className="truncate text-sm font-medium text-stone-800">
                      {v.nombre}
                    </span>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
                  {lote && <span>{lote.nombre.split("—")[0].trim()}</span>}
                  <span>Lact. {v.numLactancia}</span>
                  {del !== null && <span>{del} DEL</span>}
                  {prod > 0 && (
                    <span className="font-semibold text-stone-700">
                      {prod} L
                    </span>
                  )}
                </div>
                <div className="mt-2">
                  <EstadoVacaBadge estado={v.estado} />
                </div>
              </div>
              <ChevronRight size={18} className="shrink-0 text-stone-400" />
            </Link>
          );
        })}
        {visibles.length === 0 && (
          <div className="px-4 py-12 text-center text-sm text-stone-400">
            No se encontraron vacas con esos filtros.
          </div>
        )}
      </div>

      {/* Vista DESKTOP: tabla (visible desde md) */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-left text-xs uppercase tracking-wider text-stone-500">
            <tr>
              <th className="px-4 py-3 font-medium">Caravana</th>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Lote</th>
              <th className="px-4 py-3 font-medium">Lact.</th>
              <th className="px-4 py-3 font-medium">DEL</th>
              <th className="px-4 py-3 font-medium">Prod. estim.</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {visibles.map((v) => {
              const del = calcularDEL(v.ultimoParto);
              const prod = produccionEstimada(v);
              const lote = getLoteById(v.lote);
              return (
                <tr key={v.id} className="transition hover:bg-emerald-50/40">
                  <td className="px-4 py-3 font-mono font-semibold text-emerald-700">
                    #{v.caravana}
                  </td>
                  <td className="px-4 py-3 text-stone-800">
                    {v.nombre || <span className="text-stone-400">—</span>}
                  </td>
                  <td className="px-4 py-3 text-stone-600">
                    {lote ? lote.nombre.split("—")[0].trim() : <span className="text-stone-400">—</span>}
                  </td>
                  <td className="px-4 py-3 text-stone-600">{v.numLactancia}</td>
                  <td className="px-4 py-3 text-stone-600">
                    {del !== null ? `${del} d` : <span className="text-stone-400">—</span>}
                  </td>
                  <td className="px-4 py-3 text-stone-800">
                    {prod > 0 ? <span className="font-semibold">{prod} L</span> : <span className="text-stone-400">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <EstadoVacaBadge estado={v.estado} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/dashboard/ganado/${v.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-900"
                    >
                      Ficha
                      <ChevronRight size={14} />
                    </Link>
                  </td>
                </tr>
              );
            })}
            {visibles.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-sm text-stone-400">
                  No se encontraron vacas con esos filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex flex-col gap-2 border-t border-stone-200 px-4 py-3 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <span>
          Mostrando {visibles.length > 0 ? inicio + 1 : 0}–{inicio + visibles.length} de{" "}
          {filtradas.length}
        </span>
        {totalPaginas > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPagina((p) => Math.max(1, p - 1))}
              disabled={pagina === 1}
              className="rounded border border-stone-300 px-3 py-1 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Anterior
            </button>
            <span className="px-2">
              Página {pagina} de {totalPaginas}
            </span>
            <button
              onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
              disabled={pagina === totalPaginas}
              className="rounded border border-stone-300 px-3 py-1 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
