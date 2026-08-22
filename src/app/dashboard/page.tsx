// src/app/dashboard/page.tsx — M2: plan adaptativo desde el perfil local
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CLAVE_PERFIL, type Perfil } from "@/lib/placement";
import { generarPlan } from "@/lib/plan";
import PanelIA from "@/components/PanelIA";

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
            <h1 className="text-2xl font-semibold text-ORION-text">Aún no tienes perfil</h1>
            <p className="mt-stack-sm text-ORION-muted">
              Presenta el examen de clasificación para generar tu plan adaptativo.
            </p>
            <Link
              href="/onboarding"
              className="mt-stack-md inline-block rounded-panel bg-ORION-primary px-stack-md py-stack-sm font-semibold text-ORION-on-primary"
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
          <h1 className="text-2xl font-semibold text-ORION-text">Tu plan adaptativo</h1>
          <p className="mt-stack-sm text-ORION-muted">
            Nivel inicial <strong className="text-ORION-success">banda {perfil.nivelInicial}</strong> · Meta{" "}
            <strong className="text-ORION-primary">banda {perfil.bandaObjetivo}</strong> · Brecha {plan.brecha}
          </p>
          <p className="mt-stack-sm text-ORION-muted">
            Estimado: {plan.semanasEstimadas} semanas con micro-sesiones diarias (pedagogía TDAH).
          </p>
        </header>

        <Link
          href="/practica"
          className="self-start rounded-panel bg-ORION-success px-stack-md py-stack-sm font-semibold text-ORION-on-primary"
        >
          Ir a práctica
        </Link>

        <div className="flex flex-col gap-gutter">
          {plan.actividades.map((a, i) => (
            <article key={i} className="glass-panel p-stack-md">
              <div className="flex flex-wrap items-baseline justify-between gap-gutter">
                <h2 className="text-lg font-semibold text-ORION-text">{a.titulo}</h2>
                <span className="text-ORION-warning">{a.minutos} min</span>
              </div>
              <p className="mt-stack-sm text-ORION-muted">
                {a.skill} · {a.enfoque}
              </p>
            </article>
          ))}
        </div>

        <Link
          href="/"
          className="self-start rounded-panel border border-ORION-muted px-stack-md py-stack-sm text-ORION-text hover:border-ORION-primary"
        >
          Volver al inicio
        </Link>

        <PanelIA />
      </section>
    </main>
  );
}