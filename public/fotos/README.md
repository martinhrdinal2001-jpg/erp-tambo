# Fotos reales del Fundo el Raulí

Las imágenes que viven acá se usan como fondos visuales en la app.
Mientras un archivo no exista, el componente cae automáticamente al
fondo SVG ilustrado (no rompe nada).

## Archivos esperados

| Archivo | Dónde se usa | Foto recomendada |
|---|---|---|
| `fundo-rauli.jpg` | Fondo del Login (pantalla completa, con velo verde encima) | Paisaje horizontal — pradera con rauliés y luz del sol filtrando |
| `fundo-caseta.jpg` _(opcional)_ | Banner del Dashboard (futuro) | La de la caseta en el potrero, **rotada al derecho** (la versión original viene de costado) |

## Cómo guardar las fotos

1. Bajá la imagen a tu PC
2. Si la sacaste con iPhone y está en `.HEIC`, convertila a `.jpg`
   (cualquier visor de fotos te deja "Guardar como JPG")
3. Si la foto está rotada, **rotala antes de guardarla** (clic derecho
   → Rotar en Windows Photos)
4. Renombrala según la tabla de arriba
5. Pegala en esta carpeta:
   `C:\Users\mhrdina.practica\Documents\proyectos\erp-tambo\public\fotos\`
6. Refrescá `localhost:3000/login` — ya debería verse

## Importante

Las fotos pesan algunos MB cada una. Antes de pushear al repo,
si llegan a ser muy pesadas (> 2 MB), reducí la resolución a 1920×1080
con cualquier compresor online. Vercel sirve la imagen a todos los
visitantes y queremos que cargue rápido.
