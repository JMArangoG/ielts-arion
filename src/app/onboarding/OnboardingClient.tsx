// src/app/onboarding/OnboardingClient.tsx — M1: consentimiento + meta + clasificación adaptativa
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BANK } from "@/data/placement-bank";
import {
  CLAVE_PERFIL,
  estimarBanda,
  siguienteItem,
  type Item,
  type Perfil,
} from "@/lib/placement";
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import StepIndicator from '@/components/atoms/StepIndicator';
import ProgressBar from '@/components/atoms/ProgressBar';

type Paso = "consentimiento" | "meta" | "examen" | "resultado";

export default function OnboardingClient() {
  const router = useRouter();

  const [paso, setPaso] = useState<Paso>("consentimiento");
  const [bandaObjetivo, setBandaObjetivo] = useState(7);
  const [usados, setUsados] = useState<string[]>([]);
  const [historial, setHistorial] = useState<(1 | 2 | 3)[]>([]);
  const [item, setItem] = useState<Item | undefined>(() => siguienteItem(BANK, [], 2));
  const [perfil, setPerfil] = useState<Perfil | null>(null);

  const responder = (opcion: number) => {
    if (!item) return;
    const acierto = opcion === item.a;
    const nuevaDiff = (acierto ? Math.min(3, item.diff + 1) : Math.max(1, item.diff - 1)) as 1 | 2 | 3;
    const nuevosUsados = [...usados, item.id];
    const nuevoHistorial = [...historial, item.diff];
    setUsados(nuevosUsados);
    setHistorial(nuevoHistorial);

    if (nuevoHistorial.length >= 4) {
      const p: Perfil = {
        consentimiento: true,
        bandaObjetivo,
        nivelInicial: estimarBanda(nuevoHistorial),
        fecha: new Date().toISOString(),
      };
      localStorage.setItem(CLAVE_PERFIL, JSON.stringify(p));
      setPerfil(p);
      setPaso("resultado");
      return;
    }
    setItem(siguienteItem(BANK, nuevosUsados, nuevaDiff) ?? BANK.find((i) => !nuevosUsados.includes(i.id)));
  };

  // ============================================================
  //  PASO 1: CONSENTIMIENTO
  // ============================================================
  if (paso === "consentimiento") {
    return (
      <main className="min-h-screen px-edge py-stack-xl">
        <section className="mx-auto flex max-w-2xl flex-col gap-stack-lg">
          <Card>
            <h1 className="text-2xl font-semibold text-ORION-text">Bienvenido/a a ielts-ORION</h1>
            <p className="mt-stack-sm text-ORION-muted">
              Preparación gratuita para IELTS con pedagogía autogestionada para adultos con TDAH.
            </p>
          </Card>
          <Card>
            <h2 className="text-lg font-semibold text-ORION-text">Consentimiento informado</h2>
            <p className="mt-stack-sm text-ORION-muted">
              Tu progreso se guarda solo en este dispositivo (Ley 1581 de 2012, principio de
              minimización). No creamos cuentas ni enviamos datos personales a servidores.
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={() => setPaso("meta")}
              className="mt-stack-md"
            >
              Acepto y continúo
            </Button>
          </Card>
        </section>
      </main>
    );
  }

  // ============================================================
  //  PASO 2: META (SELECCIÓN DE BANDA)
  // ============================================================
  if (paso === "meta") {
    return (
      <main className="min-h-screen px-edge py-stack-xl">
        <section className="mx-auto max-w-2xl">
          <Card>
            <label htmlFor="banda" className="text-lg font-semibold text-ORION-text">
              ¿Qué banda overall necesitas?
            </label>
            <select
              id="banda"
              value={bandaObjetivo}
              onChange={(e) => setBandaObjetivo(Number(e.target.value))}
              className="mt-stack-md block w-full rounded-panel border border-ORION-muted bg-ORION-surface-2 px-stack-md py-stack-sm text-ORION-text"
            >
              {[5, 5.5, 6, 6.5, 7, 7.5, 8].map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <Button
              variant="primary"
              size="md"
              onClick={() => setPaso("examen")}
              className="mt-stack-md"
            >
              Iniciar examen de clasificación
            </Button>
          </Card>
        </section>
      </main>
    );
  }

  // ============================================================
  //  PASO 3: EXAMEN (PREGUNTAS)
  // ============================================================
  if (paso === "examen" && item) {
    const progress = (historial.length / 4) * 100;

    return (
      <main className="min-h-screen px-edge py-stack-xl">
        <section className="mx-auto max-w-2xl">
          <Card>
            <div className="mb-4">
              <StepIndicator currentStep={historial.length + 1} totalSteps={4} />
              <ProgressBar progress={progress} label="Progreso del examen" size="sm" className="mt-2" />
            </div>
            <p className="text-ORION-muted">Ítem {historial.length + 1} de 4 · habilidad: reading</p>
            <h1 className="mt-stack-sm text-xl font-semibold text-ORION-text">{item.q}</h1>
            <div className="mt-stack-md flex flex-col gap-stack-sm" role="group" aria-label="Opciones de respuesta">
              {item.options.map((op, i) => (
                <Button
                  key={op}
                  variant="ghost"
                  size="md"
                  onClick={() => responder(i)}
                  className="justify-start text-left w-full border border-ORION-muted hover:border-ORION-primary"
                >
                  {op}
                </Button>
              ))}
            </div>
          </Card>
        </section>
      </main>
    );
  }

  // ============================================================
  //  PASO 4: RESULTADO
  // ============================================================
  return (
    <main className="min-h-screen px-edge py-stack-xl">
      <section className="mx-auto max-w-2xl">
        <Card>
          <h1 className="text-2xl font-semibold text-ORION-text">Clasificación completada</h1>
          <p className="mt-stack-md text-ORION-text">
            Nivel inicial estimado: <strong className="text-ORION-success">banda {perfil?.nivelInicial}</strong>
          </p>
          <p className="mt-stack-sm text-ORION-muted">
            Meta: banda {perfil?.bandaObjetivo}. En M2 verás tu plan adaptativo.
          </p>
          <Button
            variant="primary"
            size="md"
            onClick={() => router.push('/')}
            className="mt-stack-md"
          >
            Volver al inicio
          </Button>
        </Card>
      </section>
    </main>
  );
}