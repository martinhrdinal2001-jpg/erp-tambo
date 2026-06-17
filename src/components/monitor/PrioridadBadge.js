import { AlertCircle, Clock, Info, MinusCircle } from "lucide-react";

const CONFIG = {
  ROJO: {
    bg: "bg-rose-100",
    text: "text-rose-700",
    ring: "ring-rose-200",
    barra: "bg-rose-500",
    Icon: AlertCircle,
    label: "Urgente",
  },
  AMARILLO: {
    bg: "bg-amber-100",
    text: "text-amber-800",
    ring: "ring-amber-200",
    barra: "bg-amber-500",
    Icon: Clock,
    label: "Revisar hoy",
  },
  VERDE: {
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    ring: "ring-emerald-200",
    barra: "bg-emerald-500",
    Icon: Info,
    label: "Informativo",
  },
  GRIS: {
    bg: "bg-stone-100",
    text: "text-stone-500",
    ring: "ring-stone-200",
    barra: "bg-stone-300",
    Icon: MinusCircle,
    label: "Descartado",
  },
};

export default function PrioridadBadge({ prioridad, size = "md" }) {
  const c = CONFIG[prioridad] || CONFIG.GRIS;
  const { Icon, bg, text, ring, label } = c;
  const cls =
    size === "sm"
      ? "px-2 py-0.5 text-[10px]"
      : "px-2.5 py-1 text-xs";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold ring-1 ring-inset ${bg} ${text} ${ring} ${cls}`}
    >
      <Icon size={size === "sm" ? 10 : 12} />
      {label}
    </span>
  );
}

export function barraPrioridad(prioridad) {
  return (CONFIG[prioridad] || CONFIG.GRIS).barra;
}
