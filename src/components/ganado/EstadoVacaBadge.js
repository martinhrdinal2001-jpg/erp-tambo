const ESTILOS = {
  "En ordeñe": "bg-emerald-100 text-emerald-700 ring-emerald-200",
  Seca: "bg-amber-100 text-amber-700 ring-amber-200",
  Vaquilla: "bg-sky-100 text-sky-700 ring-sky-200",
  "En tratamiento": "bg-rose-100 text-rose-700 ring-rose-200",
  Descartada: "bg-stone-100 text-stone-500 ring-stone-200",
};

export default function EstadoVacaBadge({ estado }) {
  const estilo = ESTILOS[estado] || "bg-stone-100 text-stone-600 ring-stone-200";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${estilo}`}
    >
      {estado}
    </span>
  );
}
