import ModulePlaceholder from "@/components/ModulePlaceholder";
import { Wallet } from "lucide-react";

export default function FinanzasPage() {
  return (
    <ModulePlaceholder
      title="Finanzas"
      description="Ventas, precios, facturas y estado de resultados (P&L)."
      Icon={Wallet}
    />
  );
}
