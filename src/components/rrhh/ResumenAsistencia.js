// Resumen estadístico del equipo para una ventana de turnos.
import { CheckCircle2, AlertTriangle, X, TrendingUp } from "lucide-react";
import { TURNOS, ORDENADORES, estadisticasTrabajador } from "@/data/turnos";

function Card({ Icon, label, value, sub, color }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
      <div className={`mb-2 inline-flex rounded-lg p-2 text-white ${color}`}>
        <Icon size={18} />
      </div>
      <p className="text-2xl font-bold text-stone-800">{value}</p>
      <p className="text-xs text-stone-500">{label}</p>
      {sub && <p className="mt-0.5 text-xs text-stone-400">{sub}</p>}
    </div>
  );
}

export default function ResumenAsistencia() {
  const total = TURNOS.length;
  const presentes = TURNOS.filter((t) => t.estado === "Presente").length;
  const atrasados = TURNOS.filter((t) => t.estado === "Atrasado").length;
  const ausentes = TURNOS.filter((t) => t.estado === "Ausente").length;

  const pctAsist = total > 0 ? Math.round(((presentes + atrasados) / total) * 100) : 0;
  const pctPunt = total > 0 ? Math.round((presentes / total) * 100) : 0;

  // Top "menos puntual" — quien necesita la conversación
  const ranking = ORDENADORES
    .map((t) => ({ trabajador: t, stats: estadisticasTrabajador(t.id) }))
    .filter((x) => x.stats);
  const peorPuntualidad = [...ranking].sort(
    (a, b) => a.stats.puntualidad - b.stats.puntualidad
  )[0];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <Card
        Icon={TrendingUp}
        label="Asistencia"
        value={`${pctAsist}%`}
        sub={`${presentes + atrasados} de ${total} turnos`}
        color="bg-emerald-600"
      />
      <Card
        Icon={CheckCircle2}
        label="Puntualidad"
        value={`${pctPunt}%`}
        sub="Sin atrasos"
        color="bg-emerald-500"
      />
      <Card
        Icon={AlertTriangle}
        label="Atrasos (14 días)"
        value={atrasados}
        sub="Turnos llegados tarde"
        color="bg-amber-500"
      />
      <Card
        Icon={X}
        label="Ausencias (14 días)"
        value={ausentes}
        sub={
          peorPuntualidad
            ? `Atención: ${peorPuntualidad.trabajador.nombre.split(" ")[0]}`
            : ""
        }
        color="bg-rose-500"
      />
    </div>
  );
}
