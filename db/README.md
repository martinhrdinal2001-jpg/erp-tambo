# Migraciones de base de datos — Fundo el Raulí

Estas migraciones están escritas en SQL PostgreSQL puro y son compatibles
con **Supabase** (que es lo que vamos a usar en producción).

## Estructura

```
db/
├── migrations/   → cambios estructurales en orden cronológico (NUNCA editar uno ya aplicado)
└── seeds/        → datos iniciales para llenar tablas vacías
```

## Cómo correr una migración en Supabase

1. Entrá a https://supabase.com → tu proyecto → **SQL Editor**
2. Hacé clic en **New query**
3. Copiá el contenido del archivo `.sql` de la migración
4. **Run**
5. Verificá en **Table Editor** que las tablas se hayan creado

Las migraciones son **idempotentes** (usan `if not exists`), así que
es seguro correrlas más de una vez.

## Orden recomendado para arranque limpio

```sql
-- 1. Estructura (crea tablas)
-- Copiar y correr: migrations/001_monitor_campo.sql

-- 2. Datos de prueba (opcional, solo en dev)
-- Copiar y correr: seeds/001_monitor_campo_seed.sql
```

## Migraciones aplicadas

| # | Archivo | Descripción | Aplicada |
|---|---|---|---|
| 001 | `migrations/001_monitor_campo.sql` | Tablas para Monitor Campo: trabajadores, mensajes_campo, eventos_campo + vista bandeja_actual + trigger de auto-conversión | _Pendiente_ |

> Cuando apliques una en producción, actualizá la columna "Aplicada" con la fecha.

## Próximas migraciones planeadas

- `002_ganado.sql` — vacas, lotes, lactancias, partos
- `003_inventario_trazabilidad.sql` — ubicaciones, movimientos (la idea anti-robo)
- `004_rrhh.sql` — turnos, asistencia, rutinas, onboarding tracking
- `005_finanzas.sql` — movimientos mensuales

## Convenciones

- Todo en **snake_case** (`mensajes_campo`, no `mensajesCampo`)
- Timestamps con timezone (`timestamptz`), nunca `timestamp`
- UUID como PK por defecto
- Comentarios `comment on` para documentar intención en la base
- Row Level Security habilitado siempre (con políticas restrictivas en producción)
- Los enums se modelan como `check constraint` con lista — son más fáciles de extender que `create type`
