// =====================================================================
// ARION · Home (M0 → M1)
// Ubicación: src/app/page.tsx
// Componente de servidor: HTML estático sin JS de shell.
// Sin librerías de íconos externas → 0 requests adicionales (mejor LCP).
// =====================================================================

import PanelEtiquetas from "@/components/PanelEtiquetas";

export const metadata = {
  title: "ielts-arion · M0 listo",
  description: "Preparación gratuita e inclusiva para IELTS",
};

export default function Home() {
  return (
    // max-w-6xl + mx-auto: lectura cómoda en desktop;
    // margin-edge: margen lateral seguro en móvil (sistema ARION)
    <main className="mx-auto w-full max-w-6xl px-[var(--margin-edge,1.25rem)] py-[var(--stack-5,3rem)]">
      {/* Un solo <h1> por documento: jerarquía semántica correcta */}
      <h1 className="text-3xl font-bold tracking-tight">IELTS ARION</h1>
      <p className="mt-[var(--stack-2,0.75rem)] max-w-prose opacity-90">
        Preparación gratuita e inclusiva para IELTS. Activa los módulos que quieras trabajar.
      </p>

      <div className="mt-[var(--stack-4,2rem)]">
        <PanelEtiquetas />
      </div>
    </main>
  );
}