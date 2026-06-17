import { Inbox, AlertCircle, CheckCircle2, Archive } from "lucide-react";

function Card({ Icon, label, value, color }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className={`mb-2 inline-flex rounded-lg p-2 text-white ${color}`}>
        <Icon size={18} />
      </div>
      <p className="text-2xl font-bold text-stone-800">{value}</p>
      <p className="text-xs text-stone-500">{label}</p>
    </div>
  );
}

export default function KPIsMonitor({ mensajes, eventos }) {
  const pendientes = mensajes.filter((m) => m.estado === "PENDIENTE").length;
  const urgentes = mensajes.filter(
    (m) => m.estado === "PENDIENTE" && m.prioridad_sugerida === "ROJO"
  ).length;
  const confirmadosHoy = eventos.length;
  const descartados = mensajes.filter((m) => m.estado === "DESCARTADO").length;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <Card
        Icon={Inbox}
        label="Mensajes pendientes"
        value={pendientes}
        color="bg-emerald-600"
      />
      <Card
        Icon={AlertCircle}
        label="Eventos urgentes"
        value={urgentes}
        color="bg-rose-500"
      />
      <Card
        Icon={CheckCircle2}
        label="Confirmados hoy"
        value={confirmadosHoy}
        color="bg-sky-500"
      />
      <Card
        Icon={Archive}
        label="Descartados"
        value={descartados}
        color="bg-stone-400"
      />
    </div>
  );
}
