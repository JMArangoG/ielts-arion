// src/app/layout.tsx — raíz con metadatos PWA y registro de SW
import type { Metadata } from "next";
import "./globals.css";
import SwRegister from "./sw-register";

export const metadata: Metadata = {
  title: "ielts-arion",
  description: "Preparación gratuita e inclusiva para IELTS",
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  themeColor: "#26282B",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
        <SwRegister />
      </body>
    </html>
  );
}