// =====================================================================
// ORION Â· Fuente Ãºnica de verdad de la interfaz
// UbicaciÃ³n: src/config/etiquetas.ts
// Por quÃ©: editar textos aquÃ­ no toca componentes (auditorÃ­a sencilla,
// cero riesgo de regresiÃ³n). El alias @/* resuelve a ./src/*.
// =====================================================================

export type Etiqueta = {
  id: string;          // Identificador estable (keys, aria)
  nombre: string;      // Texto visible de la label
  descripcion: string; // Apoyo descriptivo para el usuario
};

export const ETIQUETAS: Etiqueta[] = [
  { id: "listening",     nombre: "Listening",         descripcion: "ComprensiÃ³n auditiva con audio y transcripciÃ³n accesible." },
  { id: "reading",       nombre: "Reading",           descripcion: "Lectura acadÃ©mica y general con tipografÃ­a ajustable." },
  { id: "writing",       nombre: "Writing",           descripcion: "PrÃ¡ctica de Task 1 y Task 2 con retroalimentaciÃ³n." },
  { id: "speaking",      nombre: "Speaking",          descripcion: "Simulador de entrevista con las 3 partes del examen." },
  { id: "vocabulario",   nombre: "Vocabulario",       descripcion: "Listas acadÃ©micas con repeticiÃ³n espaciada." },
  { id: "gramatica",     nombre: "GramÃ¡tica",         descripcion: "Micro-lecciones aplicadas al examen." },
  { id: "simulacros",    nombre: "Simulacros",        descripcion: "ExÃ¡menes completos con tiempo real." },
  { id: "metas",         nombre: "Metas diarias",     descripcion: "Objetivos configurables para sostener el hÃ¡bito." },
  { id: "progreso",      nombre: "Progreso",          descripcion: "Avance por competencia, alineado a MCER." },
  { id: "feedback",      nombre: "RetroalimentaciÃ³n", descripcion: "Comentarios accionables en cada entrega." },
  { id: "calendario",    nombre: "Calendario",        descripcion: "Plan de estudio y fecha de examen." },
  { id: "recursos",      nombre: "Recursos",          descripcion: "Material descargable con accesibilidad." },
  { id: "comunidad",     nombre: "Comunidad",         descripcion: "Pares de estudio y prÃ¡ctica moderada." },
  { id: "accesibilidad", nombre: "Accesibilidad",     descripcion: "Preferencias de contraste, fuentes y lector." },
  { id: "perfil",        nombre: "Perfil",            descripcion: "Datos y preferencias de notificaciÃ³n." },
];
