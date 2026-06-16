"use client";

import { useMemo, useState } from "react";
import {
  Search,
  AlertTriangle,
  Clock,
  Package,
} from "lucide-react";
import {
  CATEGORIAS,
  tieneStockBajo,
  venceProximamente,
  diasParaVencer,
  getCategoriaById,
} from "@/data/inventario";

export default function ItemTable({ items }) {
  const [busqueda, setBusqueda] = useState("");
  const [filtroCat, setFiltroCat] = useState("");
  const [soloAlertas, setSoloAlertas] = useState(false);

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return items.filter((i) => {
      const okBusqueda =
        !q ||
        i.nombre.toLowerCase().includes(q) ||
        (i.proveedor && i.proveedor.toLowerCase().includes(q));
      const okCat = !filtroCat || i.categoria === filtroCat;
      const okAlertas =
        !soloAlertas || tieneStockBajo(i) || venceProximamente(i);
      return okBusqueda && okCat && okAlertas;
    });
  }, [items, busqueda, filtroCat, soloAlertas]);

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
            placeholder="Buscar por nombre o proveedor..."
            className="w-full rounded-lg border border-stone-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>
        <select
          value={filtroCat}
          onChange={(e) => setFiltroCat(e.target.value)}
          className="rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-emerald-500"
        >
          <option value="">Todas las categorías</option>
          {CATEGORIAS.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm text-stone-700">
          <input
            type="checkbox"
            checked={soloAlertas}
            onChange={(e) => setSoloAlertas(e.target.checked)}
            className="h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
          />
          Solo alertas
        </label>
      </div>

      {/* Vista MOBILE: cards */}
      <div className="divide-y divide-stone-100 md:hidden">
        {filtrados.map((i) => {
          const cat = getCategoriaById(i.categoria);
          const bajo = tieneStockBajo(i);
          const porVencer = venceProximamente(i);
          const dias = diasParaVencer(i);
          return (
            <div key={i.id} className="px-4 py-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Package size={14} className="shrink-0 text-stone-400" />
                  <span className="text-sm font-medium text-stone-800">
                    {i.nombre}
                  </span>
                </div>
                <span className="text-sm font-semibold text-stone-800">
                  {i.stockActual} {i.unidad}
                </span>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className={`h-2 w-2 rounded-full ${cat?.color || "bg-stone-300"}`}
                  />
                  {cat?.nombre || "Sin categoría"}
                </span>
                <span>{i.presentacion}</span>
                <span>mín: {i.stockMinimo}</span>
                {i.proveedor && <span>· {i.proveedor}</span>}
              </div>
              {(bajo || porVencer) && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {bajo && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                      <AlertTriangle size={11} />
                      Stock bajo
                    </span>
                  )}
                  {porVencer && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700">
                      <Clock size={11} />
                      Vence en {dias} d
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {filtrados.length === 0 && (
          <div className="px-4 py-12 text-center text-sm text-stone-400">
            No se encontraron items con esos filtros.
          </div>
        )}
      </div>

      {/* Vista DESKTOP: tabla */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-left text-xs uppercase tracking-wider text-stone-500">
            <tr>
              <th className="px-4 py-3 font-medium">Item</th>
              <th className="px-4 py-3 font-medium">Categoría</th>
              <th className="px-4 py-3 font-medium">Presentación</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Vencimiento</th>
              <th className="px-4 py-3 font-medium">Proveedor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtrados.map((i) => {
              const cat = getCategoriaById(i.categoria);
              const bajo = tieneStockBajo(i);
              const porVencer = venceProximamente(i);
              const dias = diasParaVencer(i);
              return (
                <tr key={i.id} className="transition hover:bg-emerald-50/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Package size={14} className="text-stone-400" />
                      <span className="font-medium text-stone-800">{i.nombre}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs text-stone-600`}
                    >
                      <span className={`h-2 w-2 rounded-full ${cat?.color || "bg-stone-300"}`} />
                      {cat?.nombre || "Sin categoría"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-stone-600">{i.presentacion}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-stone-800">
                        {i.stockActual} {i.unidad}
                      </span>
                      {bajo && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                          <AlertTriangle size={11} />
                          Bajo
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 text-xs text-stone-400">
                      mín: {i.stockMinimo}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-stone-600">
                    {i.fechaVencimiento ? (
                      <>
                        <div>{new Date(i.fechaVencimiento).toLocaleDateString("es-CL")}</div>
                        {porVencer && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700">
                            <Clock size={11} />
                            {dias} días
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="text-stone-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-stone-600">{i.proveedor}</td>
                </tr>
              );
            })}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-sm text-stone-400">
                  No se encontraron items con esos filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-stone-200 px-4 py-3 text-xs text-stone-500">
        Mostrando {filtrados.length} de {items.length} items
      </div>
    </div>
  );
}
