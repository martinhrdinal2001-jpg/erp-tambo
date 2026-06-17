"use client";

import { Play, Pause, ImageIcon, Volume2 } from "lucide-react";
import { useState } from "react";

// Placeholders visuales para audio e imagen. Cuando integremos WhatsApp real,
// estos componentes recibirán URLs reales y se conectarán al storage de Supabase.

export function ChipAudio({ duracion }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700">
      <Volume2 size={11} />
      Audio {duracion ? `${duracion}s` : ""}
    </span>
  );
}

export function ChipImagen() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
      <ImageIcon size={11} />
      Imagen
    </span>
  );
}

export function ReproductorAudio({ duracion }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="flex items-center gap-3 rounded-lg border border-sky-200 bg-sky-50 p-3">
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-600 text-white shadow transition hover:bg-sky-700"
      >
        {playing ? <Pause size={18} /> : <Play size={18} />}
      </button>
      <div className="flex-1">
        <div className="text-xs font-medium text-sky-900">Audio recibido</div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-sky-200">
          <div
            className={`h-full bg-sky-500 transition-all ${
              playing ? "w-1/2" : "w-0"
            }`}
          />
        </div>
        <div className="mt-1 text-[10px] text-sky-700">
          {duracion ? `${duracion}s` : "—"} · Reproductor placeholder (sin storage aún)
        </div>
      </div>
    </div>
  );
}

export function VisorImagen({ nombre }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-indigo-300 bg-indigo-50 p-6 text-indigo-700">
      <ImageIcon size={40} />
      <p className="mt-2 text-xs font-medium">{nombre}</p>
      <p className="mt-0.5 text-[10px] text-indigo-500">
        Visor placeholder · sin storage conectado todavía
      </p>
    </div>
  );
}
