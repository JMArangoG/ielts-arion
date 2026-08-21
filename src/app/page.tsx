// =====================================================================
// ORION Â· Home â€” v3 adherencia estricta
// Cambios: px-edge / py-stack-xl / mt-stack-* y text-ORION-muted.
// Servidor puro: 0 JS de shell, 0 Ã­conos externos.
// =====================================================================
import PanelEtiquetas from "@/components/PanelEtiquetas";

export const metadata = {
  title: "ielts-ORION Â· M0 listo",
  description: "PreparaciÃ³n gratuita e inclusiva para IELTS",
};

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-edge py-stack-xl">
      {/* Un solo h1: jerarquÃ­a semÃ¡ntica correcta */}
      <h1 className="text-3xl font-bold tracking-tight">IELTS ORION</h1>
      <p className="mt-stack-md max-w-prose text-ORION-muted">
        PreparaciÃ³n gratuita e inclusiva para IELTS. Activa los mÃ³dulos que quieras trabajar.
      </p>

      <div className="mt-stack-lg">
        <PanelEtiquetas />
      </div>
    </main>
  );
}
