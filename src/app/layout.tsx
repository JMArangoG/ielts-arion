import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

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
  return (
    <html lang="es-CO" suppressHydrationWarning>
      <body className="antialiased">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}