-- ──────────────────────────────────────────────────────────────────────
-- Seed 001 — Monitor Campo
--
-- Pobla las tablas con los mismos datos que la app usa hoy como mock,
-- para que al conectar Supabase el dashboard se vea idéntico al actual.
--
-- Correr DESPUÉS de 001_monitor_campo.sql.
-- ──────────────────────────────────────────────────────────────────────

-- Trabajadores (los que aparecen en mensajes/eventos)
insert into public.trabajadores
  (legacy_id, nombre_completo, rol_campo, telefono, activo)
values
  (2,  'María Soledad Sanhueza Vidal', 'Jefe de Ordeñe',  '+56 9 7456 8910', true),
  (3,  'Pedro Antillanca Millao',      'Ordeñador',       '+56 9 5678 1234', true),
  (4,  'Juan Carlos Burgos Hernández', 'Ordeñador',       '+56 9 4321 8765', true),
  (5,  'Sergio Müller González',       'Tractorista',     '+56 9 9876 5432', true),
  (6,  'Roberto Painén Carrasco',      'Ordeñador',       '+56 9 6543 2109', true),
  (7,  'José Manuel Aravena Soto',     'Tractorista',     '+56 9 3210 9876', true),
  (8,  'Andrés Schmidt Lefián',        'Veterinario',     '+56 9 8765 4321', true),
  (9,  'Carolina Beltrán Ñancupil',    'Criancero',       '+56 9 2109 8765', true),
  (13, 'Manuel Huenupán Reyes',        'Casero',          '+56 9 8901 2345', true),
  (18, 'Diego Ávila Morán',            'Ordeñador',       '+56 9 3456 7890', true),
  (21, 'Camila Andrade Huilipán',      'Ordeñador',       '+56 9 4123 0876', true)
on conflict (legacy_id) do nothing;

-- ──────────────────────────────────────────────────────────────────────
-- Mensajes pendientes
-- (las horas son relativas: usar interval para que queden "frescas"
--  cuando corras el seed en producción)
-- ──────────────────────────────────────────────────────────────────────
insert into public.mensajes_campo (
  canal_origen, whatsapp_message_id, from_phone, from_name, trabajador_id,
  mensaje_texto, audio_url, audio_duracion, imagen_url, ubicacion_texto,
  recibido_at, procesado, prioridad_sugerida, tipo_evento_sugerido,
  caravana_sugerida, confianza_ia, estado
)
select
  'WHATSAPP', 'wamid.seed_001', '+56 9 5678 1234', 'Pedro',
  (select id from public.trabajadores where legacy_id = 3),
  'Urgente, la vaca 0428 salió con mastitis en el cuarto delantero derecho. Tiene la ubre caliente y dura.',
  'audio_msg_001.ogg', 14, null, 'Sala de ordeñe',
  now() - interval '8 minutes', true, 'ROJO', 'MASTITIS', '0428', 0.92, 'PENDIENTE'
where not exists (select 1 from public.mensajes_campo where whatsapp_message_id = 'wamid.seed_001');

insert into public.mensajes_campo (
  canal_origen, whatsapp_message_id, from_phone, from_name, trabajador_id,
  mensaje_texto, imagen_url, ubicacion_texto, recibido_at,
  procesado, prioridad_sugerida, tipo_evento_sugerido,
  caravana_sugerida, confianza_ia, estado
)
select
  'WHATSAPP', 'wamid.seed_002', '+56 9 2109 8765', 'Carolina',
  (select id from public.trabajadores where legacy_id = 9),
  'La ternera 0032 no tomó leche esta mañana. Está decaída y no quiere pararse.',
  'ternera_0032.jpg', 'Crianza de terneros', now() - interval '42 minutes',
  true, 'AMARILLO', 'TERNERA_ENFERMA', '0032', 0.88, 'PENDIENTE'
where not exists (select 1 from public.mensajes_campo where whatsapp_message_id = 'wamid.seed_002');

insert into public.mensajes_campo (
  canal_origen, whatsapp_message_id, from_phone, from_name, trabajador_id,
  mensaje_texto, imagen_url, ubicacion_texto, recibido_at,
  procesado, prioridad_sugerida, tipo_evento_sugerido, confianza_ia, estado
)
select
  'WHATSAPP', 'wamid.seed_003', '+56 9 9876 5432', 'Sergio',
  (select id from public.trabajadores where legacy_id = 5),
  'La bomba del sector agua no parte. Probé los fusibles, están bien.',
  'bomba_agua.jpg', 'Sector pozo', now() - interval '67 minutes',
  true, 'ROJO', 'PROBLEMA_AGUA', 0.90, 'PENDIENTE'
where not exists (select 1 from public.mensajes_campo where whatsapp_message_id = 'wamid.seed_003');

-- (Resto de mensajes omitidos por brevedad — agregar análogos a estos 3 ejemplos)

-- ──────────────────────────────────────────────────────────────────────
-- Eventos oficiales confirmados (ejemplo)
-- ──────────────────────────────────────────────────────────────────────
insert into public.eventos_campo (
  tipo_evento, prioridad, caravana_vaca, descripcion,
  creado_por_trabajador_id, validado_por, validado_at, fecha_hora_evento
)
select
  'MASTITIS', 'ROJO', '0823',
  'Mastitis clínica cuarto trasero derecho. Tratamiento antibiótico iniciado día 3 de 5.',
  (select id from public.trabajadores where legacy_id = 8),
  'Hernán Catrileo (capataz)', now() - interval '1 hour', now() - interval '75 minutes'
where not exists (
  select 1 from public.eventos_campo where caravana_vaca = '0823' and tipo_evento = 'MASTITIS'
);

insert into public.eventos_campo (
  tipo_evento, prioridad, caravana_vaca, descripcion,
  creado_por_trabajador_id, validado_por, validado_at, fecha_hora_evento
)
select
  'PARTO', 'VERDE', '0612',
  'Parto normal, cría macho, peso aprox. 38 kg. Calostro suministrado.',
  (select id from public.trabajadores where legacy_id = 9),
  'Hernán Catrileo (capataz)', now() - interval '2 hours 30 minutes',
  now() - interval '175 minutes'
where not exists (
  select 1 from public.eventos_campo where caravana_vaca = '0612' and tipo_evento = 'PARTO'
);

-- Fin seed 001
