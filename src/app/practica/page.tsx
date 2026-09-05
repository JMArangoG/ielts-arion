// src/app/practica/PracticaClient.tsx — M3: práctica de 4 habilidades con fuentes abiertas (Client Component)
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // 👈 NUEVO: para navegación programática
import { PRACTICA } from "@/data/practica-bank";
import { CLAVE_PROGRESO } from "@/lib/storage";
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/atoms/ProgressBar';

const SKILLS = ["listening", "reading", "writing", "speaking"] as const;
type Skill = (typeof SKILLS)[number];

// Progreso solo en el dispositivo (minimización, Ley 1581 de 2012)
export default function PracticaClient() {
  const router = useRouter(); // 👈 NUEVO

  const [skill, setSkill] = useState<Skill>("listening");
  const [hechas, setHechas] = useState<string[]>([]);

  useEffect(() => {
    try {
      setHechas(JSON.parse(localStorage.getItem(CLAVE_PROGRESO) ?? "[]") as string[]);
    } catch {
      setHechas([]);
    }
  }, []);

  const marcar = (id: string) => {
    const nuevas = hechas.includes(id) ? hechas : [...hechas, id];
    setHechas(nuevas);
    localStorage.setItem(CLAVE_PROGRESO, JSON.stringify(nuevas));
  };

  const visibles = PRACTICA.filter((a) => a.skill === skill);

  // Calcular progreso general (opcional)
  const totalActividades = PRACTICA.length;
  const completadas = hechas.length;
  const progresoGeneral = Math.round((completadas / totalActividades) * 100);

  return (
    <main className="min-h-screen px-edge py-stack-xl">
      <section className="mx-auto flex max-w-3xl flex-col gap-stack-lg">
        {/* ===== HEADER CON CARD Y PROGRESSBAR ===== */}
        <Card>
          <h1 className="text-2xl font-semibold text-ORION-text">Práctica por habilidad</h1>
          <p className="mt-stack-sm text-ORION-muted">
            Micro-sesiones de 5–15 min con fuentes abiertas verificadas.
          </p>
          {/* Barra de progreso general (TDAH-friendly) */}
          <div className="mt-stack-md">
            <ProgressBar
              progress={progresoGeneral}
              label={`Progreso total: ${completadas} de ${totalActividades} actividades`}
              size="md"
            />
          </div>
        </Card>

        {/* ===== SELECTOR DE HABILIDAD ===== */}
        <div className="flex flex-wrap gap-gutter" role="group" aria-label="Selector de habilidad">
          {SKILLS.map((s) => (
            <Button
              key={s}
              variant={skill === s ? 'primary' : 'ghost'}
              size="md"
              onClick={() => setSkill(s)}
              aria-pressed={skill === s}
              className={skill !== s ? 'border border-ORION-muted' : ''}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Button>
          ))}
        </div>

        {/* ===== LISTA DE ACTIVIDADES ===== */}
        <div className="flex flex-col gap-gutter">
          {visibles.map((a) => (
            <Card key={a.id} className="p-stack-md">
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

              {/* ===== BOTÓN MARCAR COMPLETADA ===== */}
              <Button
                variant={hechas.includes(a.id) ? 'secondary' : 'ghost'}
                size="md"
                onClick={() => marcar(a.id)}
                className={`mt-stack-md ${
                  hechas.includes(a.id)
                    ? 'bg-ORION-success text-ORION-on-primary hover:bg-ORION-success/90'
                    : 'border border-ORION-muted hover:border-ORION-success'
                }`}
              >
                {hechas.includes(a.id) ? '✅ Completada ✓' : 'Marcar completada'}
              </Button>
            </Card>
          ))}
        </div>

        {/* ===== BOTÓN VOLVER AL DASHBOARD ===== */}
        <Button
          variant="ghost"
          size="md"
          onClick={() => router.push('/dashboard')}
          className="self-start border border-ORION-muted hover:border-ORION-primary"
        >
          Volver al dashboard
        </Button>
      </section>
    </main>
  );
}