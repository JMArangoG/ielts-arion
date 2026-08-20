// =====================================================================
// ARION · Root Layout v3 — optimizaciones de auditoría
// Ubicación: src/app/layout.tsx
// Cambios vs v2:
// 1) lang="es-CO": audiencia colombiana (mejor SEO geo-local y TTS).
// 2) Eliminación de title duplicado: page.tsx define el título final.
// 3) viewport estable: evita FOUC con theme-color en modo oscuro/claro.
// 4) className en <html>: habilita selectores CSS para temas futuros.
// =====================================================================
import type { Metadata, Viewport } from "next";
import "./globals.css";
import SwRegister from "./sw-register";

export const metadata: Metadata = {
  // Sin title aquí: cada página define el suyo (jerarquía limpia).
  description: "Preparación gratuita e inclusiva para IELTS",
  manifest: "/manifest.webmanifest",
  // Meta para auditoría: evita indexación en desarrollo
  ...(process.env.NODE_ENV !== "production" && { robots: "noindex,nofollow" }),
};

export const viewport: Viewport = {
  themeColor: "#26282B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // lang="es-CO": audiencia colombiana (lectores de pantalla + SEO).
    // suppressHydrationWarning: evita warnings por extensiones del navegador.
    <html lang="es-CO" suppressHydrationWarning>
      {/* antialiased: suavizado nativo del navegador sin costo de runtime */}
      <body className="antialiased">
        {children}
        <SwRegister />
      </body>
    </html>
  );
}