// src/lib/placement.ts â€” Motor de clasificaciÃ³n adaptativa (M1)
// Estrategia seed: inicio en dificultad 2; acierto sube, error baja.
// 4 Ã­tems por sesiÃ³n; M3 ampliarÃ¡ a las 4 habilidades con fuentes abiertas.

export type Item = {
  id: string;
  skill: "reading"; // seed M1; M3: listening/reading/writing/speaking
  diff: 1 | 2 | 3;
  q: string;
  options: string[];
  a: number; // Ã­ndice de la respuesta correcta
};

export type Perfil = {
  consentimiento: boolean;
  bandaObjetivo: number;
  nivelInicial: number; // estimaciÃ³n de banda 4.0â€“8.0
  fecha: string;
};

// Mapeo dificultad â†’ banda (seed pedagÃ³gico; se calibra en M3)
const BANDA: Record<1 | 2 | 3, number> = { 1: 4.5, 2: 6, 3: 7.5 };

export function siguienteItem(
  bank: Item[],
  usados: string[],
  diff: 1 | 2 | 3
): Item | undefined {
  return bank.find((i) => i.diff === diff && !usados.includes(i.id));
}

export function estimarBanda(diffs: (1 | 2 | 3)[]): number {
  if (diffs.length === 0) return 4.5;
  const media = diffs.reduce((s, d) => s + BANDA[d], 0) / diffs.length;
  return Math.round(media * 2) / 2; // redondeo a media banda
}

// localStorage: el dato vive solo en el dispositivo (minimizaciÃ³n, Ley 1581)
export const CLAVE_PERFIL = "ORION:perfil";
