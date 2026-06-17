// Badge compacto del estado de un turno. Usado en grilla y en cards.
import { Check, AlertTriangle, X, Plane, Stethoscope } from "lucide-react";

const ESTILOS = {
  Presente: {
    bg: "bg-emerald-500",
    text: "text-white",
    Icon: Check,
    label: "P",
  },
  Atrasado: {
    bg: "bg-amber-500",
    text: "text-white",
    Icon: AlertTriangle,
    label: "A",
  },
  Ausente: {
    bg: "bg-rose-500",
    text: "text-white",
    Icon: X,
    label: "X",
  },
  Vacaciones: {
    bg: "bg-sky-300",
    text: "text-sky-900",
    Icon: Plane,
    label: "V",
  },
  "Licencia médica": {
    bg: "bg-stone-300",
    text: "text-stone-700",
    Icon: Stethoscope,
    label: "L",
  },
};

export default function TurnoBadge({ estado, minAtraso, mostrarTexto = false }) {
  const e = ESTILOS[estado];
  if (!e) return <span className="text-stone-300">—</span>;
  const { bg, text, Icon, label } = e;

  if (mostrarTexto) {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${bg} ${text}`}
      >
        <Icon size={11} />
        {estado === "Atrasado" && minAtraso ? `Atrasado ${minAtraso}'` : estado}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex h-6 w-6 items-center justify-center rounded text-xs font-bold ${bg} ${text}`}
      title={estado + (estado === "Atrasado" && minAtraso ? ` ${minAtraso} min` : "")}
    >
      {label}
    </span>
  );
}
