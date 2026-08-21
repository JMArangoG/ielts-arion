// src/lib/srs.ts — M4: repaso espaciado (SM-2 lite) con almacenamiento local
// Sin backend: el progreso vive solo en el dispositivo (Ley 1581 de 2012).

export type TarjetaSRS = {
  id: string;
  intervalo: number; // días hasta el próximo repaso
  vence: string; // fecha ISO
};

export const CLAVE_SRS = "ORION:srs";

const MS_DIA = 86_400_000;

export function cargarSRS(): TarjetaSRS[] {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_SRS) ?? "[]") as TarjetaSRS[];
  } catch {
    return []; // dato corrupto → inicio limpio (robustez)
  }
}

export function guardarSRS(t: TarjetaSRS[]) {
  localStorage.setItem(CLAVE_SRS, JSON.stringify(t));
}

// Regla pedagógica: recordada → intervalo x2; olvidada → vuelve a 1 día
export function repasar(t: TarjetaSRS[], id: string, recordada: boolean): TarjetaSRS[] {
  const existe = t.find((x) => x.id === id);
  const intervalo = existe
    ? recordada ? Math.max(1, existe.intervalo * 2) : 1
    : recordada ? 2 : 1;
  const vence = new Date(Date.now() + intervalo * MS_DIA).toISOString();
  return [...t.filter((x) => x.id !== id), { id, intervalo, vence }];
}

// Tarjetas vencidas + nuevas (máximo 6 por sesión: carga cognitiva TDAH)
export function vencidas(t: TarjetaSRS[], ids: string[]): string[] {
  const hoy = Date.now();
  const enSistema = new Set(t.map((x) => x.id));
  const nuevas = ids.filter((id) => !enSistema.has(id));
  const porVencer = t.filter((x) => new Date(x.vence).getTime() <= hoy).map((x) => x.id);
  return [...porVencer, ...nuevas];
}
