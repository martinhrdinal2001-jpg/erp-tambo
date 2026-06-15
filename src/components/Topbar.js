import { UserCircle } from "lucide-react";

export default function Topbar({ title }) {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-white px-8 py-4">
      <h1 className="text-xl font-semibold text-stone-800">{title}</h1>
      <div className="flex items-center gap-2 text-stone-600">
        <span className="text-sm">Encargado</span>
        <UserCircle size={28} className="text-emerald-600" />
      </div>
    </header>
  );
}
