import { CheckCircle2, User } from "lucide-react";
import PrioridadBadge, { barraPrioridad } from "@/components/monitor/PrioridadBadge";
import TipoEventoBadge from "@/components/monitor/TipoEventoBadge";
import { tiempoRelativo, horaCorta } from "@/data/monitor";

export default function EventosConfirmados({ eventos }) {
  if (eventos.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-stone-300 bg-white p-8 text-center text-sm text-stone-400">
        Sin eventos confirmados aún hoy.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {eventos.map((e) => {
        const barra = barraPrioridad(e.prioridad);
        return (
          <div
            key={e.id}
            className="flex items-stretch overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm"
          >
            <div className={`w-1 shrink-0 ${barra}`} />
            <div className="flex-1 p-4">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-200">
                  <CheckCircle2 size={11} />
                  Confirmado
                </span>
                <TipoEventoBadge tipo={e.tipo_evento} size="sm" />
                <PrioridadBadge prioridad={e.prioridad} size="sm" />
                {e.caravana_vaca && (
                  <span className="rounded-full bg-stone-100 px-2 py-0.5 font-mono text-[10px] font-semibold text-stone-700">
                    #{e.caravana_vaca}
                  </span>
                )}
              </div>
              <p className="text-sm text-stone-800">{e.descripcion}</p>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
                <span className="inline-flex items-center gap-1">
                  <User size={11} />
                  Validado por {e.validado_por}
                </span>
                <span>
                  {tiempoRelativo(e.validado_at)} · {horaCorta(e.validado_at)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
