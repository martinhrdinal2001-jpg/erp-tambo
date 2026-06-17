import {
  Droplets,
  Baby,
  Stethoscope,
  HeartPulse,
  Waves,
  Wrench,
  Package,
  CircleAlert,
  HelpCircle,
} from "lucide-react";
import { getTipoEventoLabel } from "@/data/monitor";

const ICONOS = {
  MASTITIS: Droplets,
  PARTO: Baby,
  TRATAMIENTO: Stethoscope,
  TERNERA_ENFERMA: HeartPulse,
  PROBLEMA_AGUA: Waves,
  FALLA_MAQUINARIA: Wrench,
  FALTA_INSUMO: Package,
  PROBLEMA_ORDENA: CircleAlert,
  OTRO: HelpCircle,
};

export default function TipoEventoBadge({ tipo, size = "md" }) {
  const Icon = ICONOS[tipo] || HelpCircle;
  const label = getTipoEventoLabel(tipo);
  const cls =
    size === "sm"
      ? "px-2 py-0.5 text-[10px] gap-1"
      : "px-2.5 py-1 text-xs gap-1.5";
  return (
    <span
      className={`inline-flex items-center rounded-full bg-stone-100 font-medium text-stone-700 ring-1 ring-inset ring-stone-200 ${cls}`}
    >
      <Icon size={size === "sm" ? 10 : 12} />
      {label}
    </span>
  );
}
