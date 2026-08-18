// src/app/dashboard/page.tsx — M2: plan adaptativo desde el perfil local
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CLAVE_PERFIL, type Perfil } from "@/lib/placement";
import { generarPlan } from "@/lib/plan";

export default function Dashboard() {
  // Lectura en useEffect: evita desajuste SSR/hidratación con localStorage
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [cargado, setCargado] = useState(false);

    useEffect(() => {
    const crudo = localStorage.getItem(CLAVE_PERFIL);
    if (crudo) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPerfil(JSON.parse(crudo) as Perfil);
      } catch {
         
        setPerfil(null); // dato corrupto → tratar como ausente (robustez)
      }
    }
     
    setCargado(true);
  }, []);

  if (!cargado) return null; // sin parpadeo de contenido erróneo (CLS)

  // Sin perfil → CTA a clasificación (flujo guiado, sin callejones)
  if (!perfil) {
    return (
      <main className="min-h-screen px-edge py-stack-xl">
        <section className="mx-auto max-w-2xl">
          <div className="glass-panel p-stack-lg">
            <h1 className="text-2xl font-semibold text-arion-text">Aún no tienes perfil</h1>
            <p className="mt-stack-sm text-arion-muted">
              Presenta el examen de clasificación para generar tu plan adaptativo.
            </p>
            <Link
              href="/onboarding"
              className="mt-stack-md inline-block rounded-panel bg-arion-primary px-stack-md py-stack-sm font-semibold text-arion-on-primary"
            >
              Ir a clasificación
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const plan = generarPlan(perfil);

  return (
    <main className="min-h-screen px-edge py-stack-xl">
      <section className="mx-auto flex max-w-3xl flex-col gap-stack-lg">
        <header className="glass-panel p-stack-lg">
          <h1 className="text-2xl font-semibold text-arion-text">Tu plan adaptativo</h1>
          <p className="mt-stack-sm text-arion-muted">
            Nivel inicial <strong className="text-arion-success">banda {perfil.nivelInicial}</strong> · Meta{" "}
            <strong className="text-arion-primary">banda {perfil.bandaObjetivo}</strong> · Brecha {plan.brecha}
          </p>
          <p className="mt-stack-sm text-arion-muted">
            Estimado: {plan.semanasEstimadas} semanas con micro-sesiones diarias (pedagogía TDAH).
          </p>
        </header>

        <div className="flex flex-col gap-gutter">
          {plan.actividades.map((a, i) => (
            <article key={i} className="glass-panel p-stack-md">
              <div className="flex flex-wrap items-baseline justify-between gap-gutter">
                <h2 className="text-lg font-semibold text-arion-text">{a.titulo}</h2>
                <span className="text-arion-warning">{a.minutos} min</span>
              </div>
              <p className="mt-stack-sm text-arion-muted">
                {a.skill} · {a.enfoque}
              </p>
            </article>
          ))}
        </div>

        <Link
          href="/"
          className="self-start rounded-panel border border-arion-muted px-stack-md py-stack-sm text-arion-text hover:border-arion-primary"
        >
          Volver al inicio
        </Link>
      </section>
    </main>
  );
}