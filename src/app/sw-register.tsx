// =====================================================================
// src/app/sw-register.tsx — v2.1 registro diferido (fix TS2339)
// Por qué: "requestIdleCallback" in window estrechaba `window` a
// `never` en el else (la propiedad siempre existe en lib.dom).
// Se usa typeof sobre el global directo: no estrecha `window`.
// Efecto: el SW se registra fuera de la ruta crítica → menos TBT móvil.
// =====================================================================
"use client";

import { useEffect } from "react";

export default function SwRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const registrar = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* El SW es mejora progresiva: su fallo nunca rompe la app */
      });
    };

    // Diferir tras la hidratación (requestIdleCallback con fallback)
    if (typeof requestIdleCallback === "function") {
      requestIdleCallback(registrar, { timeout: 2000 });
    } else {
      setTimeout(registrar, 1000);
    }
  }, []);

  return null;
}