"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ETIQUETAS } from "@/config/etiquetas";

const STORAGE_KEY = "ORION:modulos-activos:v1";

export default function PanelEtiquetas() {
  const [activas, setActivas] = useState<string[]>([]);
  const [listo, setListo] = useState(false);

  // Cargar al montar (solo cliente)
  useEffect(() => {
    // Hidratación única desde localStorage tras el montaje (solo cliente).
    // Dependencias vacías []: una sola ejecución, sin bucles posibles.
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect -- hidratación única post-montaje, sin bucle
          setActivas(parsed);
        }
      }
    } catch {
      // Dato corrupto → estado por defecto (robustez); sin ruido en consola
    }
     
    setListo(true);
  }, []);

  // Guardar cada vez que cambien (sin logs en producción)
  useEffect(() => {
    if (!listo) return; // espera la hidratación antes de persistir
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activas));
    } catch {
      // Fallo silencioso: persistencia local es no-crítica (robustez)
    }
  }, [activas, listo]);

  const alternar = (id: string) => {
    setActivas((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  if (!listo) {
    return (
      <section aria-labelledby="titulo-modulos">
        <header className="flex items-baseline justify-between gap-gutter">
          <h2 id="titulo-modulos" className="text-lg font-semibold text-ORION-text">
            Módulos de preparación
          </h2>
          <p className="text-sm text-ORION-muted">Iniciando…</p>
        </header>
        {/* Skeleton accesible con altura controlada */}
        <div className="mt-stack-lg grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {ETIQUETAS.map((e) => (
            <div
              key={e.id}
              aria-hidden="true"
              className="glass-panel min-h-[160px] animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="titulo-modulos">
      <header className="flex items-baseline justify-between gap-gutter">
        <h2 id="titulo-modulos" className="text-lg font-semibold text-ORION-text">
          Módulos de preparación
        </h2>
        <p role="status" aria-live="polite" className="text-sm text-ORION-muted">
          {activas.length} de {ETIQUETAS.length} activas
        </p>
      </header>

      <ul className="mt-stack-lg grid list-none grid-cols-1 gap-gutter p-0 m-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {ETIQUETAS.map((e) => {
          const activa = activas.includes(e.id);
          return (
            <li key={e.id}>
              {/* Tarjeta: botón hace toggle; link FUERA del botón (WCAG) */}
              <div className="glass-panel flex min-h-[160px] flex-col justify-between gap-stack-sm p-stack-md">
                <button
                  type="button"
                  aria-pressed={activa}
                  aria-label={`Activar o desactivar módulo ${e.nombre}`}
                  onClick={() => alternar(e.id)}
                  className={`flex-1 text-left rounded-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ORION-primary motion-reduce:transition-none ${
                    activa ? "ring-2 ring-ORION-primary" : ""
                  }`}
                >
                  <span className="block font-semibold text-ORION-text">{e.nombre}</span>
                  <span className="mt-stack-sm block text-sm text-ORION-muted">{e.descripcion}</span>
                </button>

                <Link
                  href={`/modulos/${e.id}`}
                  aria-label={`Entrar al módulo ${e.nombre}`}
                  className="self-end text-sm text-ORION-primary underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ORION-primary"
                >
                  Entrar →
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

