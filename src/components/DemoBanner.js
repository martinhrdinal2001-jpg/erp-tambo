import { Info } from "lucide-react";

export default function DemoBanner() {
  return (
    <div className="flex items-center justify-center gap-2 bg-amber-100 px-4 py-1.5 text-center text-xs font-medium text-amber-900">
      <Info size={13} />
      <span>
        Datos de demostración · Nombres, vacas y cifras son ficticios. No
        representan al fundo real.
      </span>
    </div>
  );
}
