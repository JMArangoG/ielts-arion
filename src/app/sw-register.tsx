// =====================================================================
// src/app/sw-register.tsx — v2 registro diferido
// Por qué: registrar el SW en mount compite con la hidratación por el
// main-thread (TBT móvil). requestIdleCallback lo saca de la ruta
// crítica; fallback setTimeout si no existe. Ajusta "/sw.js" si difiere.
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
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(registrar, { timeout: 2000 });
    } else {
      window.setTimeout(registrar, 1000);
    }
  }, []);
  return null;
}