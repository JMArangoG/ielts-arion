// =====================================================================
// ORION · Capa de persistencia — localStorage con tipado seguro
// Por qué: centraliza keys, validación de esquema y manejo de errores
// (SSR, quota, privacidad) sin ensuciar componentes con try/catch.
// =====================================================================

// 1. ÚNICA fuente de verdad para las claves de almacenamiento
// ⚠️ No declares estas constantes en ningún otro sitio.
//    Si necesitas usarlas, impórtalas desde aquí.
export const STORAGE_KEY = "ORION:modulos-activos:v1";
export const CLAVE_PROGRESO = "ORION:progreso";
export const CLAVE_SRS = "ORION:srs:v1";

// 2. Funciones de utilidad centralizadas
export function cargarModulosActivos(): string[] {
  if (typeof window === "undefined") return []; // SSR seguro
  try {
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // Quota excedida o modo privacidad: no romper la UX
    console.warn("ORION: no se pudo persistir módulos activos");
  }
}

// (Opcional) Si necesitas exportar un objeto con todas las claves
// para evitar imports individuales:
// export const KEYS = { STORAGE_KEY, CLAVE_PROGRESO, CLAVE_SRS };