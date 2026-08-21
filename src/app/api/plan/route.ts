// src/app/api/plan/route.ts — M5: adaptador IA serverless
// La clave NUNCA viaja al cliente; vive solo en el entorno (Vercel/.env local)
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const proveedor = process.env.AI_PROVIDER ?? "";
  const clave = process.env.OPENAI_API_KEY ?? "";

  // Sin proveedor configurado → degradación elegante al plan heurístico
  if (!proveedor || !clave) {
    return NextResponse.json({ disponible: false }, { status: 200 });
  }

  try {
    const { perfil } = (await req.json()) as { perfil?: { nivelInicial?: number; bandaObjetivo?: number } };
    const prompt =
      `Eres tutor de IELTS para adultos con TDAH. Nivel inicial: banda ${perfil?.nivelInicial ?? 6}; ` +
      `meta: banda ${perfil?.bandaObjetivo ?? 7}. ` +
      `Devuelve SOLO un JSON válido: {"sugerencias": [3 cadenas cortas en español, tono claro y accionable]}.`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${clave}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.4,
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ disponible: true, sugerencias: [] }, { status: 502 });
    }

    const data = await res.json();
    const texto: string = data?.choices?.[0]?.message?.content ?? "";
    const limpio = texto.replace(/```json|```/g, "").trim();
    const json = JSON.parse(limpio) as { sugerencias?: string[] };
    return NextResponse.json({ disponible: true, sugerencias: json.sugerencias ?? [] });
  } catch {
    // Proveedor caído o respuesta inválida → 502 controlado, sin fuga de detalles
    return NextResponse.json({ disponible: true, sugerencias: [] }, { status: 502 });
  }
}