// =====================================================================
// ORION · Página de módulo — placeholder M2
// Ubicación: src/app/modulos/[id]/page.tsx
// Por qué: routing dinámico de Next.js; [id] = listening, reading, etc.
// =====================================================================
import { notFound } from "next/navigation";
import { ETIQUETAS } from "@/config/etiquetas";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const modulo = ETIQUETAS.find((e) => e.id === id);
  if (!modulo) return { title: "Módulo no encontrado" };
  return {
    title: `ielts-ORION · ${modulo.nombre}`,
    description: modulo.descripcion,
  };
}

export default async function ModuloPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const modulo = ETIQUETAS.find((e) => e.id === id);

  if (!modulo) notFound();

  return (
    <main className="mx-auto w-full max-w-6xl px-edge py-stack-xl">
      {/* Breadcrumb accesible: jerarquía clara */}
      <nav aria-label="Breadcrumb" className="mb-stack-lg">
        <ol className="flex gap-gutter text-sm text-ORION-muted">
          <li><Link href="/" className="hover:underline">Inicio</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ORION-text">{modulo.nombre}</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight">{modulo.nombre}</h1>
      <p className="mt-stack-md max-w-prose text-ORION-muted">{modulo.descripcion}</p>

      {/* Placeholder M2: aquí irán ejercicios, audio, etc. */}
      <div className="mt-stack-xl glass-panel p-stack-lg">
        <h2 className="text-xl font-semibold">Contenido en desarrollo</h2>
        <p className="mt-stack-md text-ORION-muted">
          Este módulo estará disponible en el siguiente hito. Mientras tanto,
          puedes activarlo/desactivarlo desde el panel principal.
        </p>
        <Link
          href="/"
          className="mt-stack-lg inline-block glass-panel px-stack-md py-stack-sm
                     hover:-translate-y-0.5 transition-transform duration-150
                     motion-reduce:transition-none"
        >
          ← Volver al panel
        </Link>
      </div>
    </main>
  );
}
