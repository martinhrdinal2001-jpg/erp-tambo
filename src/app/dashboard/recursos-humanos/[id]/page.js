import { notFound } from "next/navigation";
import Topbar from "@/components/Topbar";
import FichaTrabajador from "@/components/rrhh/FichaTrabajador";
import { getTrabajadorById } from "@/data/trabajadores";

export default function TrabajadorDetallePage({ params }) {
  const trabajador = getTrabajadorById(params.id);

  if (!trabajador) {
    notFound();
  }

  return (
    <>
      <Topbar title="Ficha del trabajador" />
      <div className="p-8">
        <FichaTrabajador trabajador={trabajador} />
      </div>
    </>
  );
}
