// src/app/layout.tsx — Raíz con metadatos y atributos accesibles
import type { Metadata } from "next";
import "./globals.css";

// Metadatos coherentes con el producto (SEO y lectores de pantalla).
export const metadata: Metadata = {
  title: "ielts-arion · Preparación gratuita IELTS",
  description:
    "Preparación gratuita para IELTS con IA adaptativa y pedagogía autogestionada para adultos con TDAH. Sistema de diseño ARION.",
};

// lang="es": obligatorio WCAG 3.1.1 (idioma de página para lectores de pantalla).
// Sin next/font: tipografía de sistema = 0 requests extra (rendimiento LCP).
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="antialiased">{children}</body>
    </html>
  );
}