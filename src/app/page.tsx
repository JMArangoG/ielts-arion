// =====================================================================
// ORION · Home — v3 adherencia estricta
// Cambios: px-edge / py-stack-xl / mt-stack-* y text-ORION-muted.
// Servidor puro: 0 JS de shell, 0 íconos externos.
// =====================================================================
import PanelEtiquetas from "@/components/PanelEtiquetas";
// ========== IMPORTS DE NUEVOS COMPONENTES (disponibles para futuros cambios) ==========
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ProgressBar from '@/components/atoms/ProgressBar';
// =======================================================================================

export const metadata = {
  title: "ielts-ORION · M0 listo",
  description: "Preparación gratuita e inclusiva para IELTS",
};

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl px-edge py-stack-xl">
      {/* Un solo h1: jerarquía semántica correcta */}
      <h1 className="text-3xl font-bold tracking-tight">IELTS ORION</h1>
      <p className="mt-stack-md max-w-prose text-ORION-muted">
        Preparación gratuita e inclusiva para IELTS. Activa los módulos que quieras trabajar.
      </p>

      <div className="mt-stack-lg">
        <PanelEtiquetas />
      </div>
    </main>
  );
}