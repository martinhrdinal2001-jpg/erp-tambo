"use client";

import { Menu, UserCircle } from "lucide-react";
import { useSidebar } from "@/components/SidebarContext";

export default function Topbar({ title }) {
  const { open } = useSidebar();

  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-white px-4 py-3 sm:px-8 sm:py-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={open}
          aria-label="Abrir menú"
          className="rounded-md p-1.5 text-stone-600 hover:bg-stone-100 md:hidden"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-lg font-semibold text-stone-800 sm:text-xl">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-2 text-stone-600">
        <span className="hidden text-sm sm:inline">Encargado</span>
        <UserCircle size={28} className="text-emerald-600" />
      </div>
    </header>
  );
}
