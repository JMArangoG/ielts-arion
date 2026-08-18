// src/app/onboarding/page.tsx — M1: consentimiento + meta + clasificación adaptativa
"use client";

import { useState } from "react";
import Link from "next/link";
import { BANK } from "@/data/placement-bank";
import {
  CLAVE_PERFIL,
  estimarBanda,
  siguienteItem,
  type Item,
  type Perfil,
} from "@/lib/placement";

type Paso = "consentimiento" | "meta" | "examen" | "resultado";

export default function Onboarding() {
  const [paso, setPaso] = useState<Paso>("consentimiento");
  const [bandaObjetivo, setBandaObjetivo] = useState(7);
  const [usados, setUsados] = useState<string[]>([]);
  const [historial, setHistorial] = useState<(1 | 2 | 3)[]>([]);
  const [item, setItem] = useState<Item | undefined>(() => siguienteItem(BANK, [], 2));
  const [perfil, setPerfil] = useState<Perfil | null>(null);

  // Regla adaptativa: acierto sube dificultad, error la baja (seed M1)
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
      // Dato solo en dispositivo (Ley 1581 de 2012: minimización)
      localStorage.setItem(CLAVE_PERFIL, JSON.stringify(p));
      setPerfil(p);
      setPaso("resultado");
      return;
    }
    // Respaldo si la dificultad objetivo se agota: cualquier ítem libre
    setItem(siguienteItem(BANK, nuevosUsados, nuevaDiff) ?? BANK.find((i) => !nuevosUsados.includes(i.id)));
  };

  if (paso === "consentimiento") {
    return (
      <main className="min-h-screen px-edge py-stack-xl">
        <section className="mx-auto flex max-w-2xl flex-col gap-stack-lg">
          <header className="glass-panel p-stack-lg">
            <h1 className="text-2xl font-semibold text-arion-text">Bienvenido/a a ielts-arion</h1>
            <p className="mt-stack-sm text-arion-muted">
              Preparación gratuita para IELTS con pedagogía autogestionada para adultos con TDAH.
            </p>
          </header>
          <div className="glass-panel p-stack-lg">
            <h2 className="text-lg font-semibold text-arion-text">Consentimiento informado</h2>
            <p className="mt-stack-sm text-arion-muted">
              Tu progreso se guarda solo en este dispositivo (Ley 1581 de 2012, principio de
              minimización). No creamos cuentas ni enviamos datos personales a servidores.
            </p>
            <button
              type="button"
              onClick={() => setPaso("meta")}
              className="mt-stack-md rounded-panel bg-arion-primary px-stack-md py-stack-sm font-semibold text-arion-on-primary"
            >
              Acepto y continúo
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (paso === "meta") {
    return (
      <main className="min-h-screen px-edge py-stack-xl">
        <section className="mx-auto max-w-2xl">
          <div className="glass-panel p-stack-lg">
            <label htmlFor="banda" className="text-lg font-semibold text-arion-text">
              ¿Qué banda overall necesitas?
            </label>
            <select
              id="banda"
              value={bandaObjetivo}
              onChange={(e) => setBandaObjetivo(Number(e.target.value))}
              className="mt-stack-md block w-full rounded-panel border border-arion-muted bg-arion-surface-2 px-stack-md py-stack-sm text-arion-text"
            >
              {[5, 5.5, 6, 6.5, 7, 7.5, 8].map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setPaso("examen")}
              className="mt-stack-md rounded-panel bg-arion-primary px-stack-md py-stack-sm font-semibold text-arion-on-primary"
            >
              Iniciar examen de clasificación
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (paso === "examen" && item) {
    return (
      <main className="min-h-screen px-edge py-stack-xl">
        <section className="mx-auto max-w-2xl">
          <div className="glass-panel p-stack-lg">
            <p className="text-arion-muted">Ítem {historial.length + 1} de 4 · habilidad: reading</p>
            <h1 className="mt-stack-sm text-xl font-semibold text-arion-text">{item.q}</h1>
            <div className="mt-stack-md flex flex-col gap-stack-sm" role="group" aria-label="Opciones de respuesta">
              {item.options.map((op, i) => (
                <button
                  key={op}
                  type="button"
                  onClick={() => responder(i)}
                  className="rounded-panel border border-arion-muted bg-arion-surface-2 px-stack-md py-stack-sm text-left text-arion-text hover:border-arion-primary"
                >
                  {op}
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Paso resultado: nivel inicial + meta (refuerzo positivo, sin rachas punitivas)
  return (
    <main className="min-h-screen px-edge py-stack-xl">
      <section className="mx-auto max-w-2xl">
        <div className="glass-panel p-stack-lg">
          <h1 className="text-2xl font-semibold text-arion-text">Clasificación completada</h1>
          <p className="mt-stack-md text-arion-text">
            Nivel inicial estimado: <strong className="text-arion-success">banda {perfil?.nivelInicial}</strong>
          </p>
          <p className="mt-stack-sm text-arion-muted">
            Meta: banda {perfil?.bandaObjetivo}. En M2 verás tu plan adaptativo.
          </p>
                    <Link
            href="/"
            className="mt-stack-md inline-block rounded-panel bg-arion-primary px-stack-md py-stack-sm font-semibold text-arion-on-primary"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}