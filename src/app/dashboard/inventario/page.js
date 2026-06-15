import ModulePlaceholder from "@/components/ModulePlaceholder";
import { Package } from "lucide-react";

export default function InventarioPage() {
  return (
    <ModulePlaceholder
      title="Inventario"
      description="Alimentos (fardos, concentrado) y medicamentos."
      Icon={Package}
    />
  );
}
