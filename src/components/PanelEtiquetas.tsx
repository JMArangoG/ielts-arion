"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ETIQUETAS } from "@/config/etiquetas";
import { STORAGE_KEY } from "@/lib/storage";
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function PanelEtiquetas() {
  const [activas, setActivas] = useState<string[]>([]);
  const [listo, setListo] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setActivas(parsed);
        }
      }
    } catch {
      // Dato corrupto → estado por defecto
    }
    setListo(true);
  }, []);

  useEffect(() => {
    if (!listo) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activas));
    } catch {
      // Fallo silencioso
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
        <div className="mt-stack-lg grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {ETIQUETAS.map((e) => (
            <Card
              key={e.id}
              className="min-h-[160px] animate-pulse"
              aria-hidden="true"
            >
              <div className="invisible">Cargando...</div> {/* 👈 FIX: children requerido */}
            </Card>
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
              <Card className="flex min-h-[160px] flex-col justify-between gap-stack-sm p-stack-md">
                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => alternar(e.id)}
                  aria-pressed={activa}
                  aria-label={`Activar o desactivar módulo ${e.nombre}`}
                  className={`flex-1 text-left justify-start w-full ${
                    activa ? "ring-2 ring-ORION-primary" : ""
                  }`}
                >
                  <span className="block font-semibold text-ORION-text">{e.nombre}</span>
                  <span className="mt-stack-sm block text-sm text-ORION-muted">
                    {e.descripcion}
                  </span>
                </Button>

                <Link
                  href={`/modulos/${e.id}`}
                  aria-label={`Entrar al módulo ${e.nombre}`}
                  className="self-end text-sm text-ORION-primary underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ORION-primary"
                >
                  Entrar →
                </Link>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
}