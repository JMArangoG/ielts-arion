// src/app/repaso/page.tsx — M4: sesión diaria de repaso espaciado
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PRACTICA } from "@/data/practica-bank";
import { cargarSRS, guardarSRS, repasar, vencidas, type TarjetaSRS } from "@/lib/srs";

export default function Repaso() {
  const [srs, setSrs] = useState<TarjetaSRS[]>([]);
  const [cola, setCola] = useState<string[]>([]);

  useEffect(() => {
    const t = cargarSRS();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSrs(t);
     
    setCola(vencidas(t, PRACTICA.map((p) => p.id)).slice(0, 6)); // sesión máx. 6
  }, []);

  const responder = (id: string, recordada: boolean) => {
    const nuevo = repasar(srs, id, recordada);
    setSrs(nuevo);
    guardarSRS(nuevo);
    setCola((c) => c.filter((x) => x !== id));
  };

  const actual = cola[0] ? PRACTICA.find((p) => p.id === cola[0]) : undefined;

  return (
    <main className="min-h-screen px-edge py-stack-xl">
      <section className="mx-auto max-w-2xl">
        <div className="glass-panel p-stack-lg">
          <h1 className="text-2xl font-semibold text-ORION-text">Repaso espaciado</h1>
          {actual ? (
            <>
              <p className="mt-stack-sm text-ORION-muted">Pendientes: {cola.length}</p>
              <h2 className="mt-stack-md text-xl font-semibold text-ORION-text">{actual.titulo}</h2>
              <p className="mt-stack-sm text-ORION-muted">{actual.instrucciones[0]}</p>
              <div className="mt-stack-md flex flex-wrap gap-gutter">
                <button
                  type="button"
                  onClick={() => responder(actual.id, true)}
                  className="rounded-panel bg-ORION-success px-stack-md py-stack-sm font-semibold text-ORION-on-primary"
                >
                  La recordé
                </button>
                <button
                  type="button"
                  onClick={() => responder(actual.id, false)}
                  className="rounded-panel bg-ORION-danger px-stack-md py-stack-sm font-semibold text-ORION-on-primary"
                >
                  La olvidé
                </button>
              </div>
            </>
          ) : (
            <p className="mt-stack-md text-ORION-muted">
              Sin repasos pendientes hoy. Vuelve mañana o practica nuevas actividades.
            </p>
          )}
          <div className="mt-stack-md flex flex-wrap gap-gutter">
            <Link
              href="/practica"
              className="rounded-panel border border-ORION-muted px-stack-md py-stack-sm text-ORION-text hover:border-ORION-primary"
            >
              Ir a práctica
            </Link>
            <Link
              href="/dashboard"
              className="rounded-panel border border-ORION-muted px-stack-md py-stack-sm text-ORION-text hover:border-ORION-primary"
            >
              Volver al dashboard
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
