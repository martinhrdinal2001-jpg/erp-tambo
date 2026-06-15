"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { ROLES, ESTADOS } from "@/data/trabajadores";

const VACIO = {
  nombre: "",
  rut: "",
  rol: "",
  estado: "Activo",
  fechaIngreso: new Date().toISOString().slice(0, 10),
  telefono: "",
  sector: "",
  viveEnElCampo: false,
  notas: "",
};

export default function FormularioTrabajador({ inicial = VACIO }) {
  const [form, setForm] = useState(inicial);
  const [guardado, setGuardado] = useState(false);

  function handleChange(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Sin backend todavía: lo dejamos como acuso de recibo visual.
    setGuardado(true);
    setTimeout(() => setGuardado(false), 4000);
  }

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/recursos-humanos"
        className="inline-flex items-center gap-1 text-sm text-emerald-700 hover:text-emerald-900"
      >
        <ArrowLeft size={14} />
        Volver al listado
      </Link>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-200"
      >
        <h1 className="mb-1 text-xl font-bold text-stone-900">
          Nuevo trabajador
        </h1>
        <p className="mb-6 text-sm text-stone-500">
          Completá los datos básicos. Podés ampliar la ficha después.
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Input
            label="Nombre completo"
            value={form.nombre}
            onChange={(v) => handleChange("nombre", v)}
            required
            placeholder="Ej: María Soledad Sanhueza Vidal"
          />
          <Input
            label="RUT"
            value={form.rut}
            onChange={(v) => handleChange("rut", v)}
            placeholder="12.345.678-9"
          />
          <Select
            label="Rol"
            value={form.rol}
            onChange={(v) => handleChange("rol", v)}
            options={ROLES}
            required
          />
          <Select
            label="Estado"
            value={form.estado}
            onChange={(v) => handleChange("estado", v)}
            options={ESTADOS}
          />
          <Input
            label="Fecha de ingreso"
            type="date"
            value={form.fechaIngreso}
            onChange={(v) => handleChange("fechaIngreso", v)}
          />
          <Input
            label="Teléfono"
            value={form.telefono}
            onChange={(v) => handleChange("telefono", v)}
            placeholder="+56 9 1234 5678"
          />
          <Input
            label="Sector asignado"
            value={form.sector}
            onChange={(v) => handleChange("sector", v)}
            placeholder="Sala de ordeñe / Maquinaria / Crianza..."
          />
          <label className="flex items-center gap-2 self-end pb-2 text-sm text-stone-700">
            <input
              type="checkbox"
              checked={form.viveEnElCampo}
              onChange={(e) => handleChange("viveEnElCampo", e.target.checked)}
              className="h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
            />
            Vive en el campo
          </label>
        </div>

        <div className="mt-5">
          <label className="mb-1 block text-sm font-medium text-stone-700">
            Notas
          </label>
          <textarea
            value={form.notas}
            onChange={(e) => handleChange("notas", e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            placeholder="Observaciones, turno, contacto de emergencia..."
          />
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          {guardado && (
            <span className="text-sm text-emerald-700">
              ✓ Recibido (sin base de datos todavía)
            </span>
          )}
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-700"
          >
            <Save size={16} />
            Guardar trabajador
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({ label, value, onChange, type = "text", required, placeholder }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-stone-700">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
      />
    </div>
  );
}

function Select({ label, value, onChange, options, required }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-stone-700">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
      >
        <option value="">Seleccionar...</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
