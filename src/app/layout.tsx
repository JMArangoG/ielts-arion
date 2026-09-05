"use client";

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Button from '@/components/ui/Button';
import { useFocusMode } from '@/hooks/useFocusMode';
import SwRegister from "@/components/SwRegister"; // Asegúrate de que la ruta sea correcta

// Nota: "use client" hace que este layout sea cliente.
// Las metadata se ignoran en cliente pero se manejan en servidor.
// Si necesitas metadata dinámica, puedes separarlas en un Server Component.

export const metadata: Metadata = {
  description: "Preparación gratuita e inclusiva para IELTS",
  manifest: "/manifest.webmanifest",
  ...(process.env.NODE_ENV !== "production" && { robots: "noindex,nofollow" }),
};

export const viewport: Viewport = {
  themeColor: "#26282B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // ==================== NUEVO: HOOK DE MODO ENFOQUE ====================
  const { isFocusMode, toggleFocusMode } = useFocusMode();
  // ====================================================================

  return (
    <html lang="es-CO" suppressHydrationWarning>
      <body className="antialiased">
        {/* ==================== HEADER CON BOTÓN DE MODO ENFOQUE ==================== */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            {/* Logo o título */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                IELTS ORION
              </span>
            </div>

            {/* Botones de la derecha */}
            <div className="flex items-center gap-3">
              {/* ==================== NUEVO BOTÓN DE MODO ENFOQUE ==================== */}
              <Button
                variant={isFocusMode ? 'primary' : 'ghost'}
                size="sm"
                onClick={toggleFocusMode}
                className="transition-all duration-200"
                aria-label={isFocusMode ? 'Desactivar modo enfoque' : 'Activar modo enfoque'}
              >
                {isFocusMode ? '🔒 Enfoque Activado' : '🧘 Modo Enfoque'}
              </Button>
              {/* ==================================================================== */}

              {/* Aquí puedes añadir otros botones (perfil, notificaciones, etc.) */}
            </div>
          </div>
        </header>

        {/* ==================== CONTENIDO PRINCIPAL ==================== */}
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>

        {/* ==================== REGISTRO DEL SERVICE WORKER ==================== */}
        <SwRegister />
      </body>
    </html>
  );
}