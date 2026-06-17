// Barra de progreso simple. Cambia de color según el avance.
export default function BarraProgreso({ porcentaje, mostrarTexto = true }) {
  const p = Math.max(0, Math.min(100, porcentaje));

  let color = "bg-rose-500";
  if (p >= 75) color = "bg-emerald-500";
  else if (p >= 40) color = "bg-amber-500";

  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-200">
        <div
          className={`h-full transition-all ${color}`}
          style={{ width: `${p}%` }}
        />
      </div>
      {mostrarTexto && (
        <span className="min-w-[3rem] text-right text-sm font-semibold text-stone-600">
          {p}%
        </span>
      )}
    </div>
  );
}
