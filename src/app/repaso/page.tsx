// src/app/repaso/page.tsx — M4: sesión diaria de repaso espaciado
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // 👈 NUEVO: para navegación programática
import { PRACTICA } from "@/data/practica-bank";
import { cargarSRS, guardarSRS, repasar, vencidas, type TarjetaSRS } from "@/lib/srs";
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/atoms/ProgressBar';

export default function Repaso() {
  const router = useRouter(); // 👈 NUEVO

  const [srs, setSrs] = useState<TarjetaSRS[]>([]);
  const [cola, setCola] = useState<string[]>([]);

  useEffect(() => {
    const t = cargarSRS();
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

  // Calcular progreso de la sesión
  const totalPendientes = cola.length + (actual ? 1 : 0);
  const progresoSesion = actual ? Math.round(((totalPendientes - cola.length) / totalPendientes) * 100) : 100;

  return (
    <main className="min-h-screen px-edge py-stack-xl">
      <section className="mx-auto max-w-2xl">
        <Card className="p-stack-lg">
          <h1 className="text-2xl font-semibold text-ORION-text">Repaso espaciado</h1>
          
          {/* Barra de progreso de la sesión (TDAH-friendly) */}
          <div className="mt-stack-md">
            <ProgressBar
              progress={progresoSesion}
              label={`Progreso de la sesión: ${totalPendientes - cola.length} de ${totalPendientes} completados`}
              size="md"
            />
          </div>

          {actual ? (
            <>
              <p className="mt-stack-sm text-ORION-muted">Pendientes: {cola.length}</p>
              <h2 className="mt-stack-md text-xl font-semibold text-ORION-text">{actual.titulo}</h2>
              <p className="mt-stack-sm text-ORION-muted">{actual.instrucciones[0]}</p>

              <div className="mt-stack-md flex flex-wrap gap-gutter">
                <Button
                  variant="primary"
                  size="md"
                  onClick={() => responder(actual.id, true)}
                  className="bg-ORION-success hover:bg-ORION-success/90"
                >
                  ✅ La recordé
                </Button>
                <Button
                  variant="danger"
                  size="md"
                  onClick={() => responder(actual.id, false)}
                >
                  ❌ La olvidé
                </Button>
              </div>
            </>
          ) : (
            <p className="mt-stack-md text-ORION-muted">
              🎉 Sin repasos pendientes hoy. Vuelve mañana o practica nuevas actividades.
            </p>
          )}

          {/* Botones de navegación */}
          <div className="mt-stack-md flex flex-wrap gap-gutter">
            <Button
              variant="ghost"
              size="md"
              onClick={() => router.push('/practica')}
              className="border border-ORION-muted hover:border-ORION-primary"
            >
              Ir a práctica
            </Button>
            <Button
              variant="ghost"
              size="md"
              onClick={() => router.push('/dashboard')}
              className="border border-ORION-muted hover:border-ORION-primary"
            >
              Volver al dashboard
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
}