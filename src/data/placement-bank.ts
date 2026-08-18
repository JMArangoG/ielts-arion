// src/data/placement-bank.ts — Seed M1 de ítems de clasificación (reading)
// Autoría original del proyecto: sin material protegido por derechos de autor.
import type { Item } from "@/lib/placement";

export const BANK: Item[] = [
  { id: "r1", skill: "reading", diff: 1, q: "Choose the synonym of 'happy'.", options: ["sad", "glad", "angry", "tired"], a: 1 },
  { id: "r2", skill: "reading", diff: 1, q: "Complete: 'She ___ to work every day.'", options: ["goes", "go", "going", "gone"], a: 0 },
  { id: "r3", skill: "reading", diff: 2, q: "Choose the synonym of 'essential'.", options: ["optional", "crucial", "rare", "simple"], a: 1 },
  { id: "r4", skill: "reading", diff: 2, q: "Complete: 'By 2030, they ___ the new hospital.'", options: ["will build", "will have built", "built", "build"], a: 1 },
  { id: "r5", skill: "reading", diff: 3, q: "In 'Smartphones are ubiquitous', 'ubiquitous' means…", options: ["scarce", "omnipresent", "outdated", "bulky"], a: 1 },
  { id: "r6", skill: "reading", diff: 3, q: "Select the grammatically correct sentence.", options: ["Hardly he had arrived when it started.", "He had hardly arrived when it started.", "Hardly had he arrived when it started.", "He hardly had arrived when it started."], a: 2 },
];