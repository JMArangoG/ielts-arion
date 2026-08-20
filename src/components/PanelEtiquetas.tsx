// =====================================================================
// ARION · Panel interactivo de labels
// Ubicación: src/components/PanelEtiquetas.tsx
// "use client": SOLO esta isla se hidrata; el resto queda como HTML de
// servidor → mejor TTI y LCP (rendimiento).
// =====================================================================
"use client";

import { useState } from "react";
import { ETIQUETAS } from "@/config/etiquetas";

export default function PanelEtiquetas() {
  // Estado local: ids de las labels activadas
  const [activas, setActivas] = useState<string[]>([]);

  // Alterna el id en el array sin mutar el estado (patrón inmutable)
  const alternar = (id: string) =>
    setActivas(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  return (
    <section aria-labelledby="titulo-modulos">
      {/* Contador vivo: role="status" anuncia cambios sin robar el foco */}
      <header className="flex items-baseline justify-between gap-[var(--gutter,1.5rem)]">
        <h2 id="titulo-modulos" className="text-lg font-semibold">
          Módulos de preparación
        </h2>
        <p role="status" aria-live="polite" className="text-sm opacity-80">
          {activas.length} de {ETIQUETAS.length} activas
        </p>
      </header>

      {/* Grilla 1→2→3→5 columnas: "gutter" controla el espaciado interno;
          "margin-edge" se aplica en el layout padre (evita overflow móvil).
          Los fallback (1.5rem, etc.) protegen el layout si el token falta. */}
      <ul className="mt-[var(--stack-3,1.25rem)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-[var(--gutter,1.5rem)] list-none p-0 m-0">
        {ETIQUETAS.map((e) => {
          const activa = activas.includes(e.id);
          return (
            <li key={e.id}>
              {/* <button> real: operable por teclado (Enter/Espacio).
                  aria-pressed comunica on/off a lectores de pantalla.
                  min-h 44px cumple WCAG 2.2 (2.5.8 tamaño de objetivo).
                  cursor-pointer: Tailwind v4 no lo aplica por defecto. */}
              <button
                type="button"
                aria-pressed={activa}
                onClick={() => alternar(e.id)}
                className={`
                  glass-panel block w-full h-full min-h-[44px] cursor-pointer
                  p-[var(--stack-3,1.25rem)] text-left
                  transition-transform duration-150 hover:-translate-y-0.5
                  focus-visible:outline-2 focus-visible:outline-offset-2
                  ${activa ? "ring-2 ring-current" : ""}
                `}
              >
                <span className="block font-semibold">{e.nombre}</span>
                <span className="mt-1 block text-sm opacity-80">{e.descripcion}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}