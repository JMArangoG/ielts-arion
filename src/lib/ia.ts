// src/lib/ia.ts — M5: cliente del adaptador IA (sin claves en el cliente)

export type RespuestaPlan = {
  disponible: boolean;
  sugerencias?: string[];
};

// Llama a la ruta serverless; la decisión y la clave viven en el servidor
export async function solicitarPlanIA(perfil: unknown): Promise<RespuestaPlan> {
  const res = await fetch("/api/plan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ perfil }),
  });
  return (await res.json()) as RespuestaPlan;
}