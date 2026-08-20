// =====================================================================
// ARION · Panel interactivo — v3 adherencia estricta al sistema
// Cambios: utilidades nativas (gap-gutter, p-stack-md, mt-stack-lg)
// generadas por Tailwind v4 desde --spacing-* → heredan clamp();
// text-arion-muted (6.7:1 AA) y ring-arion-primary en estado activo.
// =====================================================================
"use client";

import { useState } from "react";
import { ETIQUETAS } from "@/config/etiquetas";

export default function PanelEtiquetas() {
  const [activas, setActivas] = useState<string[]>([]);

  const alternar = (id: string) =>
    setActivas(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  return (
    <section aria-labelledby="titulo-modulos">
      <header className="flex items-baseline justify-between gap-gutter">
        <h2 id="titulo-modulos" className="text-lg font-semibold">Módulos de preparación</h2>
        {/* Contador vivo sin robo de foco */}
        <p role="status" aria-live="polite" className="text-sm text-arion-muted">
          {activas.length} de {ETIQUETAS.length} activas
        </p>
      </header>

      {/* Grilla 1→2→3→5 con gutter ARION */}
      <ul className="mt-stack-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-gutter list-none p-0 m-0">
        {ETIQUETAS.map((e) => {
          const activa = activas.includes(e.id);
          return (
            <li key={e.id}>
              {/* aria-pressed + min-h 44px (WCAG 2.5.8) + cursor-pointer */}
              <button
                type="button"
                aria-pressed={activa}
                onClick={() => alternar(e.id)}
                className={`
                  glass-panel block w-full h-full min-h-[44px] cursor-pointer
                  p-stack-md text-left
                  transition-transform duration-150 hover:-translate-y-0.5
                  motion-reduce:transition-none motion-reduce:hover:translate-y-0
                  focus-visible:outline-2 focus-visible:outline-offset-2
                  ${activa ? "ring-2 ring-arion-primary" : ""}
                `}
              >
                <span className="block font-semibold">{e.nombre}</span>
                {/* muted 6.7:1 AA sobre surface */}
                <span className="mt-stack-sm block text-sm text-arion-muted">{e.descripcion}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}