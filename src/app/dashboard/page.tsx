// src/app/dashboard/page.tsx â€” M2: plan adaptativo desde el perfil local
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CLAVE_PERFIL, type Perfil } from "@/lib/placement";
import { generarPlan } from "@/lib/plan";

export default function Dashboard() {
  // Lectura en useEffect: evita desajuste SSR/hidrataciÃ³n con localStorage
  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    const crudo = localStorage.getItem(CLAVE_PERFIL);
    if (crudo) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPerfil(JSON.parse(crudo) as Perfil);
      } catch {
        setPerfil(null); // dato corrupto â†’ tratar como ausente (robustez)
      }
    }

    setCargado(true);
  }, []);

  if (!cargado) return null; // sin parpadeo de contenido errÃ³neo (CLS)

  // Sin perfil â†’ CTA a clasificaciÃ³n (flujo guiado, sin callejones)
  if (!perfil) {
    return (
      <main className="min-h-screen px-edge py-stack-xl">
        <section className="mx-auto max-w-2xl">
          <div className="glass-panel p-stack-lg">
            <h1 className="text-2xl font-semibold text-ORION-text">AÃºn no tienes perfil</h1>
            <p className="mt-stack-sm text-ORION-muted">
              Presenta el examen de clasificaciÃ³n para generar tu plan adaptativo.
            </p>
            <Link
              href="/onboarding"
              className="mt-stack-md inline-block rounded-panel bg-ORION-primary px-stack-md py-stack-sm font-semibold text-ORION-on-primary"
            >
              Ir a clasificaciÃ³n
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
            Nivel inicial <strong className="text-ORION-success">banda {perfil.nivelInicial}</strong> Â· Meta{" "}
            <strong className="text-ORION-primary">banda {perfil.bandaObjetivo}</strong> Â· Brecha {plan.brecha}
          </p>
          <p className="mt-stack-sm text-ORION-muted">
            Estimado: {plan.semanasEstimadas} semanas con micro-sesiones diarias (pedagogÃ­a TDAH).
          </p>
        </header>

        <Link
          href="/practica"
          className="self-start rounded-panel bg-ORION-success px-stack-md py-stack-sm font-semibold text-ORION-on-primary"
        >
          Ir a prÃ¡ctica
        </Link>

        <div className="flex flex-col gap-gutter">
          {plan.actividades.map((a, i) => (
            <article key={i} className="glass-panel p-stack-md">
              <div className="flex flex-wrap items-baseline justify-between gap-gutter">
                <h2 className="text-lg font-semibold text-ORION-text">{a.titulo}</h2>
                <span className="text-ORION-warning">{a.minutos} min</span>
              </div>
              <p className="mt-stack-sm text-ORION-muted">
                {a.skill} Â· {a.enfoque}
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
      </section>
    </main>
  );
}

