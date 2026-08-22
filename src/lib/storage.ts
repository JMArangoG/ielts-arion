// =====================================================================
// ORION · Capa de persistencia — localStorage con tipado seguro
// Por qué: centraliza keys, validación de esquema y manejo de errores
// (SSR, quota, privacidad) sin ensuciar componentes con try/catch.
// =====================================================================

// 1. ÚNICA fuente de verdad para las claves de almacenamiento
export const STORAGE_KEY = "ORION:modulos-activos:v1";
export const CLAVE_PROGRESO = "ORION:progreso";
export const CLAVE_SRS = "ORION:srs:v1";

// 2. Funciones de utilidad centralizadas
export function cargarModulosActivos(): string[] {
  if (typeof window === "undefined") return []; // SSR seguro
  try {
    // Unificado a STORAGE_KEY para consistencia total
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // Validación de esquema: debe ser string[]
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x) => typeof x === "string");
  } catch {
    // Cuota excedida, datos corruptos o privacidad: fallo silencioso
    return [];
  }
}

export function guardarModulosActivos(ids: string[]): void {
  if (typeof window === "undefined") return; // SSR seguro
  try {
    // Unificado a STORAGE_KEY para consistencia total
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Quota excedida o modo privacidad: no romper la UX
    console.warn("ORION: no se pudo persistir módulos activos");
  }
}