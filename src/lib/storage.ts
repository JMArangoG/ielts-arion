// =====================================================================
// ORION · Capa de persistencia — localStorage con tipado seguro
// Por qué: centraliza keys, validación de esquema y manejo de errores
// (SSR, quota, privacidad) sin ensuciar componentes con try/catch.
// =====================================================================
export const CLAVE_MODULOS = "ORION:modulos-activos:v1";
// =====================================================================
// ORION · Capa de persistencia — localStorage con tipado seguro
// =====================================================================
export const STORAGE_KEY = "ORION:modulos-activos:v1";
export const CLAVE_PROGRESO = "ORION:progreso";
export const CLAVE_SRS = "ORION:srs:v1"; // Agregado para completitud

// ... (mantén el resto de las funciones cargarModulosActivos y guardarModulosActivos)
export function cargarModulosActivos(): string[] {
  if (typeof window === "undefined") return []; // SSR seguro
  try {
    const raw = localStorage.getItem(CLAVE_MODULOS);
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
    localStorage.setItem(CLAVE_MODULOS, JSON.stringify(ids));
  } catch {
    // Quota excedida o modo privacidad: no romper la UX
    console.warn("ORION: no se pudo persistir módulos activos");
  }
}

export const CLAVE_PROGRESO = "ORION:progreso";
export const CLAVE_SRS = "ORION:srs";