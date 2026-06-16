# Fundo el Raulí 🌳

Sistema de planificación de recursos (ERP) para administrar el Fundo el Raulí,
campo lechero familiar con 1.000+ vacas Holstein. Construido de forma modular
e iterativa.

## Stack

- **Framework:** Next.js 14 (App Router) + React 18
- **Estilos:** Tailwind CSS
- **Íconos:** lucide-react
- **Auth:** cookie de sesión + server actions (clave única compartida)
- **Base de datos / Backend:** Supabase (PostgreSQL) — _próximas fases_
- **Despliegue:** Vercel

## Estado actual

### Fase 1 — Cascarón visual ✅
- Pantalla de Login con clave compartida (`APP_PASSWORD`).
- Middleware que protege `/dashboard/*`.
- Sidebar **responsive con drawer en mobile** y Topbar con botón hamburguesa.
- Dashboard con bienvenida.

### Fase 2 — Lógica frontend sobre mock data ✅
Cada módulo opera contra datos ficticios en `src/data/*.js`. Cuando se conecte
Supabase, esas funciones pasan a ser queries y el resto del código no se entera.

- **Ganado:** rebaño con búsqueda, filtros (lote, estado) y paginación. Ficha
  individual por vaca con cálculo de DEL (días en leche), edad, producción
  estimada y gráfico de los últimos 7 días.
- **Recursos Humanos:** trabajadores con búsqueda, filtros, ficha individual,
  formulario de alta y checklist de rutinas.
- **Inventario:** items con stock, vencimientos, alertas de stock bajo y
  productos por vencer.
- **Finanzas:** stats, gráfico mensual y tabla P&L.

Todas las vistas tienen **versión mobile (cards) y versión desktop (tablas)**.

### Próximas fases
- **Fase 3:** conectar Supabase (auth real + persistencia).
- **Fase 4:** PWA + offline-first (registrar en campo sin señal y sincronizar).
- **Fase 5:** escaneo de caravanas/aretes por cámara del celular.

## Cómo correrlo en tu PC

Requiere **Node.js LTS** instalado (https://nodejs.org).

```bash
npm install      # instala las dependencias (solo la primera vez)
npm run dev      # levanta el servidor de desarrollo
```

Luego abre http://localhost:3000 en el navegador.

### Variables de entorno

Copiar `.env.example` a `.env.local` y definir:

```
APP_PASSWORD=tu-clave-aqui
```

En desarrollo, si no se define, usa `FundoRauli2026` como fallback. En
producción (Vercel) es **obligatoria**.

## Estructura

```
src/
├── app/
│   ├── page.js                       → redirige al login
│   ├── login/page.js                 → pantalla de Login
│   ├── layout.js                     → layout raíz
│   ├── globals.css                   → estilos globales
│   └── dashboard/
│       ├── layout.js                 → Sidebar + Topbar + provider
│       ├── page.js                   → inicio del Dashboard
│       ├── ganado/
│       │   ├── page.js               → listado del rebaño
│       │   └── [id]/page.js          → ficha individual
│       ├── recursos-humanos/
│       │   ├── page.js               → listado de trabajadores
│       │   ├── nuevo/page.js         → alta de trabajador
│       │   ├── rutinas/page.js       → checklist de rutinas
│       │   └── [id]/page.js          → ficha individual
│       ├── inventario/page.js
│       └── finanzas/page.js
├── components/
│   ├── Sidebar.js                    → drawer responsive
│   ├── SidebarContext.js             → estado compartido del drawer
│   ├── Topbar.js                     → barra con hamburguesa
│   ├── ModulePlaceholder.js          → plantilla para módulos en construcción
│   ├── DemoBanner.js, WelcomeBanner.js, ScenicBackground.js
│   ├── ganado/                       → tabla, ficha, stats, gráfico, badge
│   ├── rrhh/                         → tabla, ficha, formulario, checklist, badge
│   ├── inventario/                   → tabla, stats
│   └── finanzas/                     → tabla P&L, stats, gráfico mensual
├── data/                             → mock data (Supabase la reemplaza)
│   ├── ganado.js, trabajadores.js, rutinas.js
│   ├── inventario.js, finanzas.js
├── lib/
│   └── auth.js                       → server actions de login/logout
└── middleware.js                     → protege /dashboard/*
```

## Notas de diseño

- **Mobile-first**: pensado para usarse en terreno desde el celular. Tablas
  grandes se renderizan como cards en pantallas chicas.
- **Mock data aislada**: toda la lógica vive sobre funciones de `src/data/`,
  para que la migración a Supabase sea quirúrgica.
- **Sin estado global pesado**: solo un `SidebarContext` para el drawer.
  El resto vive en componentes con `useState`.
