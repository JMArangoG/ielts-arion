// src/app/practica/page.tsx — M3: práctica de 4 habilidades con fuentes abiertas
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PRACTICA } from "@/data/practica-bank";
import { CLAVE_PROGRESO } from "@/lib/storage";

const SKILLS = ["listening", "reading", "writing", "speaking"] as const;
type Skill = (typeof SKILLS)[number];

// Progreso solo en el dispositivo (minimización, Ley 1581 de 2012)
export default function Practica() {
  const [skill, setSkill] = useState<Skill>("listening");
  const [hechas, setHechas] = useState<string[]>([]);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHechas(JSON.parse(localStorage.getItem(CLAVE_PROGRESO) ?? "[]") as string[]);
    } catch {
       
      setHechas([]); // dato corrupto → inicio limpio (robustez)
    }
  }, []);

  const marcar = (id: string) => {
    const nuevas = hechas.includes(id) ? hechas : [...hechas, id];
    setHechas(nuevas);
    localStorage.setItem(CLAVE_PROGRESO, JSON.stringify(nuevas));
  };

  const visibles = PRACTICA.filter((a) => a.skill === skill);

  return (
    <main className="min-h-screen px-edge py-stack-xl">
      <section className="mx-auto flex max-w-3xl flex-col gap-stack-lg">
        <header className="glass-panel p-stack-lg">
          <h1 className="text-2xl font-semibold text-ORION-text">Práctica por habilidad</h1>
          <p className="mt-stack-sm text-ORION-muted">
            Micro-sesiones de 5–15 min con fuentes abiertas verificadas.
          </p>
        </header>

        <div className="flex flex-wrap gap-gutter" role="group" aria-label="Selector de habilidad">
          {SKILLS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSkill(s)}
              aria-pressed={skill === s}
              className={
                skill === s
                  ? "rounded-panel bg-ORION-primary px-stack-md py-stack-sm font-semibold text-ORION-on-primary"
                  : "rounded-panel border border-ORION-muted px-stack-md py-stack-sm text-ORION-text hover:border-ORION-primary"
              }
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-gutter">
          {visibles.map((a) => (
            <article key={a.id} className="glass-panel p-stack-md">
              <div className="flex flex-wrap items-baseline justify-between gap-gutter">
                <h2 className="text-lg font-semibold text-ORION-text">{a.titulo}</h2>
                <span className="text-ORION-warning">{a.minutos} min</span>
              </div>
              <ol className="mt-stack-sm list-decimal pl-stack-lg text-ORION-muted">
                {a.instrucciones.map((paso) => (
                  <li key={paso}>{paso}</li>
                ))}
              </ol>
              {a.fuente && (
                <p className="mt-stack-sm text-ORION-muted">
                  Fuente:{" "}
                  <a
                    className="text-ORION-primary underline"
                    href={a.fuente.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {a.fuente.nombre}
                  </a>{" "}
                  ({a.fuente.licencia})
                </p>
              )}
              <button
                type="button"
                onClick={() => marcar(a.id)}
                className={
                  hechas.includes(a.id)
                    ? "mt-stack-md rounded-panel bg-ORION-success px-stack-md py-stack-sm font-semibold text-ORION-on-primary"
                    : "mt-stack-md rounded-panel border border-ORION-muted px-stack-md py-stack-sm text-ORION-text hover:border-ORION-success"
                }
              >
                {hechas.includes(a.id) ? "Completada ✓" : "Marcar completada"}
              </button>
            </article>
          ))}
        </div>

        <Link
          href="/dashboard"
          className="self-start rounded-panel border border-ORION-muted px-stack-md py-stack-sm text-ORION-text hover:border-ORION-primary"
        >
          Volver al dashboard
        </Link>
      </section>
    </main>
  );
}
