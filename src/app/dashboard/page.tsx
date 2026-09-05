// src/app/dashboard/page.tsx — M2: plan adaptativo desde el perfil local
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // 👈 NUEVO: para navegación programática
import { CLAVE_PERFIL, type Perfil } from "@/lib/placement";
import { generarPlan } from "@/lib/plan";
import PanelIA from "@/components/PanelIA";
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/atoms/ProgressBar';

export default function Dashboard() {
  const router = useRouter(); // 👈 NUEVO: para redirigir con los botones

  const [perfil, setPerfil] = useState<Perfil | null>(null);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    const crudo = localStorage.getItem(CLAVE_PERFIL);
    if (crudo) {
      try {
        setPerfil(JSON.parse(crudo) as Perfil);
      } catch {
        setPerfil(null);
      }
    }
    setCargado(true);
  }, []);

  if (!cargado) return null;

  // ============================================================
  //  ESTADO SIN PERFIL
  // ============================================================
  if (!perfil) {
    return (
      <main className="min-h-screen px-edge py-stack-xl">
        <section className="mx-auto max-w-2xl">
          <Card className="p-stack-lg"> {/* 👈 Reemplazado glass-panel por Card */}
            <h1 className="text-2xl font-semibold text-ORION-text">
              Aún no tienes perfil
            </h1>
            <p className="mt-stack-sm text-ORION-muted">
              Presenta el examen de clasificación para generar tu plan adaptativo.
            </p>
            <Button
              variant="primary"
              size="md"
              className="mt-stack-md"
              onClick={() => router.push('/onboarding')} // 👈 Navegación con Button
            >
              Ir a clasificación
            </Button>
          </Card>
        </section>
      </main>
    );
  }

  const plan = generarPlan(perfil);

  // ============================================================
  //  ESTADO CON PERFIL
  // ============================================================
  return (
    <main className="min-h-screen px-edge py-stack-xl">
      <section className="mx-auto flex max-w-3xl flex-col gap-stack-lg">

        {/* ===== HEADER ===== */}
        <Card className="p-stack-lg"> {/* 👈 Reemplazado glass-panel por Card */}
          <h1 className="text-2xl font-semibold text-ORION-text">
            Tu plan adaptativo
          </h1>
          <p className="mt-stack-sm text-ORION-muted">
            Nivel inicial <strong className="text-ORION-success">banda {perfil.nivelInicial}</strong> · Meta{' '}
            <strong className="text-ORION-primary">banda {perfil.bandaObjetivo}</strong> · Brecha {plan.brecha}
          </p>
          <p className="mt-stack-sm text-ORION-muted">
            Estimado: {plan.semanasEstimadas} semanas con micro-sesiones diarias (pedagogía TDAH).
          </p>

          {/* ===== BARRA DE PROGRESO (ejemplo de uso) ===== */}
          <div className="mt-stack-md">
            <ProgressBar
              progress={Math.min(100, (perfil.nivelInicial / perfil.bandaObjetivo) * 100)}
              label="Progreso hacia tu meta"
              size="md"
            />
          </div>
        </Card>

        {/* ===== BOTÓN IR A PRÁCTICA ===== */}
        <Button
          variant="primary"
          size="lg"
          className="self-start"
          onClick={() => router.push('/practica')} // 👈 Navegación con Button
        >
          Ir a práctica
        </Button>

        {/* ===== LISTA DE ACTIVIDADES ===== */}
        <div className="flex flex-col gap-gutter">
          {plan.actividades.map((a, i) => (
            <Card key={i} className="p-stack-md"> {/* 👈 Reemplazado glass-panel por Card */}
              <div className="flex flex-wrap items-baseline justify-between gap-gutter">
                <h2 className="text-lg font-semibold text-ORION-text">{a.titulo}</h2>
                <span className="text-ORION-warning">{a.minutos} min</span>
              </div>
              <p className="mt-stack-sm text-ORION-muted">
                {a.skill} · {a.enfoque}
              </p>
            </Card>
          ))}
        </div>

        {/* ===== BOTÓN VOLVER AL INICIO ===== */}
        <Button
          variant="ghost"
          size="md"
          className="self-start"
          onClick={() => router.push('/')} // 👈 Navegación con Button
        >
          Volver al inicio
        </Button>

        {/* ===== PANEL IA ===== */}
        <PanelIA />
      </section>
    </main>
  );
}