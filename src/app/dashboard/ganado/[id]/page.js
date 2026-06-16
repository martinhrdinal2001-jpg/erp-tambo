import { notFound } from "next/navigation";
import Topbar from "@/components/Topbar";
import FichaVaca from "@/components/ganado/FichaVaca";
import { getVacaById } from "@/data/ganado";

export default function VacaDetallePage({ params }) {
  const vaca = getVacaById(params.id);

  if (!vaca) {
    notFound();
  }

  return (
    <>
      <Topbar title={`Vaca #${vaca.caravana}`} />
      <div className="p-4 sm:p-8">
        <FichaVaca vaca={vaca} />
      </div>
    </>
  );
}
