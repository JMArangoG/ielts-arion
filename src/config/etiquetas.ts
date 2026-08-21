// =====================================================================
// ARION · Fuente única de verdad de la interfaz
// Ubicación: src/config/etiquetas.ts
// Por qué: editar textos aquí no toca componentes (auditoría sencilla,
// cero riesgo de regresión). El alias @/* resuelve a ./src/*.
// =====================================================================

export type Etiqueta = {
  id: string;          // Identificador estable (keys, aria)
  nombre: string;      // Texto visible de la label
  descripcion: string; // Apoyo descriptivo para el usuario
};

export const ETIQUETAS: Etiqueta[] = [
  { id: "listening",     nombre: "Listening",         descripcion: "Comprensión auditiva con audio y transcripción accesible." },
  { id: "reading",       nombre: "Reading",           descripcion: "Lectura académica y general con tipografía ajustable." },
  { id: "writing",       nombre: "Writing",           descripcion: "Práctica de Task 1 y Task 2 con retroalimentación." },
  { id: "speaking",      nombre: "Speaking",          descripcion: "Simulador de entrevista con las 3 partes del examen." },
  { id: "vocabulario",   nombre: "Vocabulario",       descripcion: "Listas académicas con repetición espaciada." },
  { id: "gramatica",     nombre: "Gramática",         descripcion: "Micro-lecciones aplicadas al examen." },
  { id: "simulacros",    nombre: "Simulacros",        descripcion: "Exámenes completos con tiempo real." },
  { id: "metas",         nombre: "Metas diarias",     descripcion: "Objetivos configurables para sostener el hábito." },
  { id: "progreso",      nombre: "Progreso",          descripcion: "Avance por competencia, alineado a MCER." },
  { id: "feedback",      nombre: "Retroalimentación", descripcion: "Comentarios accionables en cada entrega." },
  { id: "calendario",    nombre: "Calendario",        descripcion: "Plan de estudio y fecha de examen." },
  { id: "recursos",      nombre: "Recursos",          descripcion: "Material descargable con accesibilidad." },
  { id: "comunidad",     nombre: "Comunidad",         descripcion: "Pares de estudio y práctica moderada." },
  { id: "accesibilidad", nombre: "Accesibilidad",     descripcion: "Preferencias de contraste, fuentes y lector." },
  { id: "perfil",        nombre: "Perfil",            descripcion: "Datos y preferencias de notificación." },
];