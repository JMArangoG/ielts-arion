// =====================================================================
// ARION · Panel interactivo — v4 (persistencia + navegación)
// Cambios:
// 1) Carga inicial desde localStorage (hidratación SSR-safe).
// 2) Cada tarjeta navega a /modulos/[id] con <Link> envuelto en <button>
//    (accesibilidad: un solo foco, navegación por teclado intacta).
// 3) Persistencia en cada alternancia (debounce no necesario: 15 items).
// =====================================================================
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ETIQUETAS } from "@/config/etiquetas";
import { cargarModulosActivos, guardarModulosActivos } from "@/lib/storage";

export default function PanelEtiquetas() {
  // Estado inicial vacío; se hidrata en useEffect (SSR-safe)
  const [activas, setActivas] = useState<string[]>([]);
  const [hidratado, setHidratado] = useState(false);

  // Carga desde localStorage (solo cliente)
  useEffect(() => {
    const cargadas = cargarModulosActivos();
    setActivas(cargadas);
    setHidratado(true);
  }, []);

  // Persistencia en cada cambio
  useEffect(() => {
    if (!hidratado) return;
    guardarModulosActivos(activas);
  }, [activas, hidratado]);

  const alternar = (id: string) =>
    setActivas(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));

  if (!hidratado) {
    // Skeleton accesible: evita layout shift (CLS)
    return (
      <section aria-labelledby="titulo-modulos">
        <header className="flex items-baseline justify-between gap-gutter">
          <h2 id="titulo-modulos" className="text-lg font-semibold">Módulos de preparación</h2>
          <p className="text-sm text-arion-muted">Cargando…</p>
        </header>
        <div className="mt-stack-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-gutter">
          {ETIQUETAS.map((e) => (
            <div key={e.id} className="glass-panel h-[120px] animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="titulo-modulos">
      <header className="flex items-baseline justify-between gap-gutter">
        <h2 id="titulo-modulos" className="text-lg font-semibold">Módulos de preparación</h2>
        <p role="status" aria-live="polite" className="text-sm text-arion-muted">
          {activas.length} de {ETIQUETAS.length} activas
        </p>
      </header>

      <ul className="mt-stack-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-gutter list-none p-0 m-0">
        {ETIQUETAS.map((e) => {
          const activa = activas.includes(e.id);
          return (
            <li key={e.id}>
              {/* Wrapper de navegación: <Link> con <button> interno.
                  Accesibilidad: el botón es el target de foco; Link
                  provee navegación semántica sin duplicar focos. */}
              <Link href={`/modulos/${e.id}`} className="block">
                <button
                  type="button"
                  aria-pressed={activa}
                  onClick={(ev) => {
                    // Evitar navegación si solo se quiere alternar
                    ev.stopPropagation();
                    alternar(e.id);
                  }}
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
                  <span className="mt-stack-sm block text-sm text-arion-muted">{e.descripcion}</span>
                </button>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}