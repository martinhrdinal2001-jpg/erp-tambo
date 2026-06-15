# Fundo el Raulí 🌳

Sistema de planificación de recursos (ERP) para administrar el Fundo el Raulí, campo lechero familiar.
Construido de forma modular e iterativa.

## Stack

- **Framework:** Next.js (App Router) + React
- **Estilos:** Tailwind CSS
- **Base de datos / Backend:** Supabase (PostgreSQL) — _próximas fases_
- **Despliegue:** Vercel — _próximas fases_

## Estado actual (Fase 1: El Cascarón)

Interfaz visual, todavía sin lógica ni base de datos:

- Pantalla de **Login** (solo visual).
- **Dashboard** con menú lateral (Sidebar).
- Módulos: Dashboard, Recursos Humanos, Ganado, Inventario, Finanzas
  (los módulos están "En construcción").

## Cómo correrlo en tu PC

Requiere **Node.js LTS** instalado (https://nodejs.org).

```bash
npm install      # instala las dependencias (solo la primera vez)
npm run dev      # levanta el servidor de desarrollo
```

Luego abrí http://localhost:3000 en el navegador.

## Estructura

```
src/
├── app/
│   ├── page.js              → redirige al login
│   ├── login/page.js        → pantalla de Login
│   └── dashboard/
│       ├── layout.js        → estructura con Sidebar
│       ├── page.js          → inicio del Dashboard
│       └── [módulo]/page.js → cada módulo
└── components/
    ├── Sidebar.js           → menú lateral
    ├── Topbar.js            → barra superior
    └── ModulePlaceholder.js → plantilla reutilizable
```
