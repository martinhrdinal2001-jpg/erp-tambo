"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Beef,
  Package,
  Wallet,
  LogOut,
  Milk,
} from "lucide-react";

// Definimos el menú en un array: agregar un módulo nuevo es agregar una línea.
const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Recursos Humanos", href: "/dashboard/recursos-humanos", icon: Users },
  { name: "Ganado", href: "/dashboard/ganado", icon: Beef },
  { name: "Inventario", href: "/dashboard/inventario", icon: Package },
  { name: "Finanzas", href: "/dashboard/finanzas", icon: Wallet },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col bg-emerald-900 text-emerald-50">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b border-emerald-800 px-6 py-5">
        <Milk size={24} className="text-emerald-300" />
        <div className="leading-tight">
          <div className="text-lg font-bold">Fundo el Raulí</div>
          <div className="text-[10px] uppercase tracking-wider text-emerald-300/80">
            Sistema de gestión
          </div>
        </div>
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
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-emerald-700 text-white"
                  : "text-emerald-100 hover:bg-emerald-800"
              }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Salir */}
      <div className="border-t border-emerald-800 p-3">
        <Link
          href="/login"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-100 transition hover:bg-emerald-800"
        >
          <LogOut size={18} />
          Cerrar sesión
        </Link>
      </div>
    </aside>
  );
}
