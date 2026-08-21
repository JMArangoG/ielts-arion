// src/components/PanelIA.tsx — M5: sugerencias IA con consentimiento reforzado
"use client";

import { useState } from "react";
import { CLAVE_PERFIL, type Perfil } from "@/lib/placement";
import { solicitarPlanIA } from "@/lib/ia";

type Estado = "idle" | "cargando" | "ok" | "noconfig" | "error";

export default function PanelIA() {
  const [consiente, setConsiente] = useState(false);
  const [estado, setEstado] = useState<Estado>("idle");
  const [sugerencias, setSugerencias] = useState<string[]>([]);

  const pedir = async () => {
    setEstado("cargando");
    try {
      const perfil = JSON.parse(localStorage.getItem(CLAVE_PERFIL) ?? "null") as Perfil | null;
      const data = await solicitarPlanIA(perfil);
      if (!data.disponible) {
        setEstado("noconfig"); // sin proveedor → sigue el plan heurístico
        return;
      }
      setSugerencias(data.sugerencias ?? []);
      setEstado("ok");
    } catch {
      setEstado("error");
    }
  };

  return (
    <div className="glass-panel p-stack-lg">
      <h2 className="text-lg font-semibold text-arion-text">Sugerencias con IA (opcional)</h2>
      <p className="mt-stack-sm text-arion-muted">
        Si lo autorizas, enviaremos solo tu nivel estimado y tu meta al proveedor de IA para
        esta solicitud. No se almacena nada en servidores (Ley 1581 de 2012, minimización).
      </p>

      <label className="mt-stack-md flex items-start gap-stack-sm text-sm text-arion-text">
        <input
          type="checkbox"
          checked={consiente}
          onChange={(e) => setConsiente(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-arion-primary"
        />
        Autorizo el tratamiento puntual de mi nivel y meta con el proveedor de IA.
      </label>

      <button
        type="button"
        disabled={!consiente || estado === "cargando"}
        onClick={pedir}
        className="mt-stack-md rounded-panel bg-arion-primary px-stack-md py-stack-sm font-semibold text-arion-on-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {estado === "cargando" ? "Generando…" : "Pedir sugerencias a la IA"}
      </button>

      {estado === "noconfig" && (
        <p className="mt-stack-md text-sm text-arion-muted" role="status">
          IA no configurada en este entorno. Tu plan heurístico sigue activo sin cambios.
        </p>
      )}
      {estado === "error" && (
        <p className="mt-stack-md text-sm text-arion-danger" role="alert">
          El proveedor no respondió. Inténtalo más tarde; tu plan heurístico permanece.
        </p>
      )}
      {estado === "ok" && (
        <ul className="mt-stack-md list-disc pl-stack-lg text-arion-text">
          {sugerencias.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
}