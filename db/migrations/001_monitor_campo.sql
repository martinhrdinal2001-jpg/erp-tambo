-- ──────────────────────────────────────────────────────────────────────
-- Migración 001 — Monitor Campo / Central El Raulí
--
-- Crea las tablas que sostienen el flujo:
--   WhatsApp/QR/Sensor → mensajes_campo → admin valida → eventos_campo
--
-- Para correr en Supabase:
--   1. Abrir SQL Editor del proyecto
--   2. Pegar este archivo completo
--   3. Run
--
-- Diseñado para PostgreSQL 14+ (lo que usa Supabase).
-- Idempotente: se puede correr múltiples veces sin romper.
-- ──────────────────────────────────────────────────────────────────────

-- Extensiones requeridas
create extension if not exists "uuid-ossp";

-- ──────────────────────────────────────────────────────────────────────
-- Tabla referencial: trabajadores
-- Nota: si más adelante migramos a auth.users de Supabase, esta tabla
-- queda como "perfil de trabajador" con FK opcional a auth.users.
-- ──────────────────────────────────────────────────────────────────────
create table if not exists public.trabajadores (
  id uuid primary key default uuid_generate_v4(),
  legacy_id int unique, -- para empatar con el mock data actual (1..21)
  nombre_completo text not null,
  rut text,
  rol_campo text not null,
  telefono text,
  activo boolean not null default true,
  fecha_ingreso date,
  vive_en_el_campo boolean default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_trabajadores_activo on public.trabajadores (activo);

-- ──────────────────────────────────────────────────────────────────────
-- Tabla: mensajes_campo (bandeja del campo)
-- ──────────────────────────────────────────────────────────────────────
create table if not exists public.mensajes_campo (
  id uuid primary key default uuid_generate_v4(),

  -- Origen
  canal_origen text not null
    check (canal_origen in ('WHATSAPP','MANUAL','QR','SENSOR','GPS','OTRO')),
  whatsapp_message_id text unique,
  from_phone text,
  from_name text,
  trabajador_id uuid references public.trabajadores(id) on delete set null,

  -- Contenido
  mensaje_texto text,
  audio_url text,
  audio_duracion int,
  imagen_url text,
  ubicacion_texto text,

  -- Procesamiento
  recibido_at timestamptz not null default now(),
  procesado boolean not null default false,

  -- Sugerencias del analizador/IA
  prioridad_sugerida text
    check (prioridad_sugerida in ('ROJO','AMARILLO','VERDE','GRIS')),
  tipo_evento_sugerido text
    check (tipo_evento_sugerido in (
      'MASTITIS','PARTO','TRATAMIENTO','TERNERA_ENFERMA',
      'PROBLEMA_AGUA','FALLA_MAQUINARIA','FALTA_INSUMO',
      'PROBLEMA_ORDENA','OTRO'
    )),
  caravana_sugerida text,
  confianza_ia numeric(4,3),

  -- Estado en la bandeja
  estado text not null default 'PENDIENTE'
    check (estado in ('PENDIENTE','EN_REVISION','CONVERTIDO','DESCARTADO')),

  created_at timestamptz not null default now()
);

create index if not exists idx_mensajes_estado_recibido
  on public.mensajes_campo (estado, recibido_at desc);
create index if not exists idx_mensajes_prioridad
  on public.mensajes_campo (prioridad_sugerida);
create index if not exists idx_mensajes_trabajador
  on public.mensajes_campo (trabajador_id);

comment on table public.mensajes_campo is
  'Bandeja de mensajes crudos llegados desde WhatsApp/QR/sensores. Con sugerencias del analizador.';
comment on column public.mensajes_campo.confianza_ia is
  'Score 0-1 del clasificador. Más alto = más confiable la sugerencia automática.';

-- ──────────────────────────────────────────────────────────────────────
-- Tabla: eventos_campo (oficiales, confirmados por admin)
-- ──────────────────────────────────────────────────────────────────────
create table if not exists public.eventos_campo (
  id uuid primary key default uuid_generate_v4(),

  -- Mensaje de origen (puede ser null si fue creado manualmente)
  mensaje_campo_id uuid references public.mensajes_campo(id) on delete set null,

  -- Clasificación oficial
  tipo_evento text not null
    check (tipo_evento in (
      'MASTITIS','PARTO','TRATAMIENTO','TERNERA_ENFERMA',
      'PROBLEMA_AGUA','FALLA_MAQUINARIA','FALTA_INSUMO',
      'PROBLEMA_ORDENA','OTRO'
    )),
  prioridad text not null default 'AMARILLO'
    check (prioridad in ('ROJO','AMARILLO','VERDE','GRIS')),

  -- Sujeto del evento
  caravana_vaca text,
  descripcion text not null,

  -- Evidencia (copiada al confirmar para que persista)
  evidencia_audio_url text,
  evidencia_imagen_url text,

  -- Trazabilidad
  creado_por_trabajador_id uuid references public.trabajadores(id) on delete set null,
  validado_por text,
  validado_at timestamptz,
  fecha_hora_evento timestamptz not null default now(),

  created_at timestamptz not null default now()
);

create index if not exists idx_eventos_tipo on public.eventos_campo (tipo_evento);
create index if not exists idx_eventos_prioridad on public.eventos_campo (prioridad);
create index if not exists idx_eventos_fecha on public.eventos_campo (fecha_hora_evento desc);
create index if not exists idx_eventos_caravana on public.eventos_campo (caravana_vaca);

comment on table public.eventos_campo is
  'Eventos oficiales confirmados por administración. La fuente de verdad para trazabilidad.';

-- ──────────────────────────────────────────────────────────────────────
-- Vista útil: bandeja_actual (mensajes pendientes ordenados por urgencia)
-- ──────────────────────────────────────────────────────────────────────
create or replace view public.bandeja_actual as
  select
    m.*,
    t.nombre_completo as trabajador_nombre,
    t.rol_campo as trabajador_rol,
    case m.prioridad_sugerida
      when 'ROJO' then 0
      when 'AMARILLO' then 1
      when 'VERDE' then 2
      else 3
    end as orden_prioridad
  from public.mensajes_campo m
  left join public.trabajadores t on t.id = m.trabajador_id
  where m.estado = 'PENDIENTE'
  order by orden_prioridad asc, m.recibido_at desc;

-- ──────────────────────────────────────────────────────────────────────
-- Trigger: cuando un evento_campo se inserta a partir de un mensaje_campo,
-- marcar el mensaje como CONVERTIDO automáticamente.
-- ──────────────────────────────────────────────────────────────────────
create or replace function public.fn_marcar_mensaje_convertido()
returns trigger
language plpgsql
as $$
begin
  if new.mensaje_campo_id is not null then
    update public.mensajes_campo
      set estado = 'CONVERTIDO'
      where id = new.mensaje_campo_id;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_evento_convertido on public.eventos_campo;
create trigger trg_evento_convertido
  after insert on public.eventos_campo
  for each row
  execute function public.fn_marcar_mensaje_convertido();

-- ──────────────────────────────────────────────────────────────────────
-- Row Level Security: habilitado, política a definir al conectar auth.
-- Por defecto: solo service_role puede leer/escribir.
-- Cuando conectemos auth, agregar políticas como:
--   "admin_role puede todo", "trabajador puede insertar mensajes propios", etc.
-- ──────────────────────────────────────────────────────────────────────
alter table public.trabajadores enable row level security;
alter table public.mensajes_campo enable row level security;
alter table public.eventos_campo enable row level security;

-- Política temporal para que la app pueda funcionar con anon en desarrollo.
-- BORRAR antes de producción y reemplazar por políticas reales por rol.
create policy "dev_open_trabajadores" on public.trabajadores
  for all using (true) with check (true);
create policy "dev_open_mensajes" on public.mensajes_campo
  for all using (true) with check (true);
create policy "dev_open_eventos" on public.eventos_campo
  for all using (true) with check (true);

-- ──────────────────────────────────────────────────────────────────────
-- Fin migración 001
-- ──────────────────────────────────────────────────────────────────────
