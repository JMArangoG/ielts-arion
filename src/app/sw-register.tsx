// src/app/sw-register.tsx — registro del service worker (solo cliente y producción)
"use client";

import { useEffect } from "react";

export default function SwRegister() {
  useEffect(() => {
    // En dev el SW interfiere con HMR; solo producción
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // fallo de SW no rompe la app (progresivo)
      });
    }
  }, []);
  return null;
}