// src/lib/plan.ts — Generador de plan adaptativo (M2, motor heurístico)
// Sin backend: lee el perfil del dispositivo (minimización, Ley 1581).
// En M3+, si AI_PROVIDER está configurado, este módulo se sustituye por el adaptador de IA.

import type { Perfil } from "@/lib/placement";

export type Actividad = {
  skill: "listening" | "reading" | "writing" | "speaking";
  titulo: string;
  minutos: number; // micro-sesiones 5–15 min (pedagogía TDAH)
  enfoque: string;
};

export type Plan = {
  brecha: number; // bandaObjetivo - nivelInicial
  semanasEstimadas: number;
  actividades: Actividad[];
};

// Heurística seed: 1 banda ≈ 10 semanas de práctica autogestionada
export function generarPlan(perfil: Perfil): Plan {
  const brecha = Math.max(0, perfil.bandaObjetivo - perfil.nivelInicial);
  const semanasEstimadas = Math.ceil(brecha * 10);

  // Catálogo base: las 4 habilidades con fuentes abiertas (M3 las alimentará)
  const base: Actividad[] = [
    { skill: "listening", titulo: "Escucha activa con audio abierto", minutos: 10, enfoque: "Comprensión global y toma de notas" },
    { skill: "reading", titulo: "Lectura guiada con fuentes abiertas", minutos: 12, enfoque: "Skimming + scanning cronometrados" },
    { skill: "writing", titulo: "Micro-escritura Task 1", minutos: 15, enfoque: "Estructura y cohesión con rúbrica" },
    { skill: "speaking", titulo: "Sombra de habla (shadowing)", minutos: 8, enfoque: "Fluidez y pronunciación con audio CC0" },
  ];

  // Refuerzo adaptativo: nivel inicial bajo duplica habilidades receptivas esta semana
  const actividades =
    perfil.nivelInicial < 5.5 ? [...base, { ...base[0] }, { ...base[1] }] : base;

  return { brecha, semanasEstimadas, actividades };
}