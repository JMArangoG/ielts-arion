// src/data/practica-bank.ts — M3: micro-actividades por habilidad con fuentes abiertas
// Cada fuente enlaza su licencia abierta; sin material protegido.

export type ActividadPractica = {
  id: string;
  skill: "listening" | "reading" | "writing" | "speaking";
  titulo: string;
  minutos: number;
  instrucciones: string[];
  fuente?: { nombre: string; url: string; licencia: string };
};

export const PRACTICA: ActividadPractica[] = [
  {
    id: "l1", skill: "listening", titulo: "Escucha global con Common Voice", minutos: 10,
    instrucciones: [
      "Reproduce 3 clips en inglés del dataset.",
      "Anota la idea principal de cada clip en una frase.",
      "Repite solo los clips que no entendiste.",
    ],
    fuente: { nombre: "Mozilla Common Voice", url: "https://commonvoice.mozilla.org/es/datasets", licencia: "CC0-1.0" },
  },
  {
    id: "l2", skill: "listening", titulo: "Dictado con frases Tatoeba", minutos: 8,
    instrucciones: [
      "Elige 5 frases en inglés con audio.",
      "Escríbelas al dictado sin ver el texto.",
      "Compara y corrige ortografía.",
    ],
    fuente: { nombre: "Tatoeba", url: "https://tatoeba.org/es/downloads", licencia: "CC-BY-2.0" },
  },
  {
    id: "r1", skill: "reading", titulo: "Skimming cronometrado", minutos: 12,
    instrucciones: [
      "Lee un texto corto en inglés (2 minutos).",
      "Subraya la idea central de cada párrafo.",
      "Resume el texto en 3 frases sin releer.",
    ],
  },
  {
    id: "r2", skill: "reading", titulo: "Scanning de datos", minutos: 10,
    instrucciones: [
      "Elige una tabla o listado en inglés.",
      "En 60 segundos localiza 5 datos específicos.",
      "Verifica aciertos y repite con otro bloque.",
    ],
  },
  {
    id: "w1", skill: "writing", titulo: "Micro-ensayo Task 2", minutos: 15,
    instrucciones: [
      "Escribe un párrafo de opinión (80–100 palabras).",
      "Usa conectores: however, therefore, moreover.",
      "Autoevalúa con rúbrica: tarea, cohesión, léxico, gramática.",
    ],
  },
  {
    id: "s1", skill: "speaking", titulo: "Shadowing con audio CC0", minutos: 8,
    instrucciones: [
      "Reproduce un clip y repítelo en voz alta casi a la par.",
      "Graba tu voz en el dispositivo (no se sube a servidores).",
      "Compara ritmo y pronunciación; repite 2 veces.",
    ],
    fuente: { nombre: "Mozilla Common Voice", url: "https://commonvoice.mozilla.org/es/datasets", licencia: "CC0-1.0" },
  },
];