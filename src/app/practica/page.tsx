import type { Metadata } from "next";
import PracticaClient from './PracticaClient';

export const metadata: Metadata = {
  title: "Práctica | IELTS ORION",
  description: "Practica tus habilidades para el IELTS en micro-sesiones de 5-15 minutos.",
};

export default function PracticaPage() {
  return <PracticaClient />;
}