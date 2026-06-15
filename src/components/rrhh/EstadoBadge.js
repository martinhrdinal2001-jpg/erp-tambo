// Mapa de estados a estilos. Si agregamos un estado nuevo en trabajadores.js,
// definirlo acá también (caso default cubre lo no listado).
const ESTILOS = {
  Activo: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  Vacaciones: "bg-sky-100 text-sky-700 ring-sky-200",
  "Licencia médica": "bg-amber-100 text-amber-700 ring-amber-200",
  Inactivo: "bg-stone-100 text-stone-500 ring-stone-200",
};

export default function EstadoBadge({ estado }) {
  const estilo = ESTILOS[estado] || "bg-stone-100 text-stone-600 ring-stone-200";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${estilo}`}
    >
      {estado}
    </span>
  );
}
