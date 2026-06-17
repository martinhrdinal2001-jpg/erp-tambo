"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Radio,
  Users,
  Beef,
  Package,
  Wallet,
  LogOut,
  Milk,
  X,
} from "lucide-react";
import { logout } from "@/lib/auth";
import { useSidebar } from "@/components/SidebarContext";

// Definimos el menú en un array: agregar un módulo nuevo es agregar una línea.
const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Monitor Campo", href: "/dashboard/monitor-campo", icon: Radio, destacado: true },
  { name: "Recursos Humanos", href: "/dashboard/recursos-humanos", icon: Users },
  { name: "Ganado", href: "/dashboard/ganado", icon: Beef },
  { name: "Inventario", href: "/dashboard/inventario", icon: Package },
  { name: "Finanzas", href: "/dashboard/finanzas", icon: Wallet },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();

  return (
    <>
      {/* Overlay oscuro en mobile cuando el drawer está abierto */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col bg-emerald-900 text-emerald-50 transition-transform duration-200 md:static md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo + botón de cerrar (solo mobile) */}
        <div className="flex items-center justify-between border-b border-emerald-800 px-6 py-5">
          <div className="flex items-center gap-2">
            <Milk size={24} className="text-emerald-300" />
            <div className="leading-tight">
              <div className="text-lg font-bold">Fundo el Raulí</div>
              <div className="text-[10px] uppercase tracking-wider text-emerald-300/80">
                Sistema de gestión
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar menú"
            className="rounded-md p-1 text-emerald-100 hover:bg-emerald-800 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-emerald-700 text-white"
                    : "text-emerald-100 hover:bg-emerald-800"
                }`}
              >
                <Icon size={18} />
                <span className="flex-1">{item.name}</span>
                {item.destacado && (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Salir */}
        <div className="border-t border-emerald-800 p-3">
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-100 transition hover:bg-emerald-800"
            >
              <LogOut size={18} />
              Cerrar sesión
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
