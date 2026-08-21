// =====================================================================
// ORION Â· Root Layout v3 â€” optimizaciones de auditorÃ­a
// UbicaciÃ³n: src/app/layout.tsx
// Cambios vs v2:
// 1) lang="es-CO": audiencia colombiana (mejor SEO geo-local y TTS).
// 2) EliminaciÃ³n de title duplicado: page.tsx define el tÃ­tulo final.
// 3) viewport estable: evita FOUC con theme-color en modo oscuro/claro.
// 4) className en <html>: habilita selectores CSS para temas futuros.
// =====================================================================
import type { Metadata, Viewport } from "next";
import "./globals.css";
import SwRegister from "./sw-register";

export const metadata: Metadata = {
  // Sin title aquÃ­: cada pÃ¡gina define el suyo (jerarquÃ­a limpia).
  description: "PreparaciÃ³n gratuita e inclusiva para IELTS",
  manifest: "/manifest.webmanifest",
  // Meta para auditorÃ­a: evita indexaciÃ³n en desarrollo
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
