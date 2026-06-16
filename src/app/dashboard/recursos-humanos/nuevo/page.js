import Topbar from "@/components/Topbar";
import FormularioTrabajador from "@/components/rrhh/FormularioTrabajador";

export default function NuevoTrabajadorPage() {
  return (
    <>
      <Topbar title="Nuevo trabajador" />
      <div className="p-4 sm:p-8">
        <FormularioTrabajador />
      </div>
    </>
  );
}
