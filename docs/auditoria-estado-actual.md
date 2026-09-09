# Auditoría del Estado Actual: IELTS ORION
## Preparación para Refactorización TDAH-Friendly y WCAG AAA

## Resumen Ejecutivo
El proyecto IELTS ORION presenta una base sólida (estructura modular, sistema de progreso básico), pero tiene brechas críticas para usuarios con TDAH: efectos visuales distractores (glassmorphism), falta de descomposición en pasos, ausencia de tiempos específicos, retroalimentación genérica, y contraste insuficiente para WCAG AAA. La refactorización debe priorizar: (1) simplificación visual, (2) descomposición de tareas, (3) gamificación, (4) accesibilidad WCAG AAA.

## Análisis de Estructura del Proyecto
La estructura actual se organiza en `src/app` (páginas), `src/components` (componentes), `src/lib` (utilidades), `src/data` (datos estáticos). No hay separación clara entre componentes de UI reutilizables y componentes de página. Se propone crear `src/components/ui/`, `src/components/atoms/`, `src/components/molecules/` para organizar mejor los componentes base, y `src/hooks/` para hooks personalizados.

## Auditoría de Componentes Existentes
Se han identificado componentes de UI básicos (botones, tarjetas, inputs) que están dispersos en varias páginas, sin una biblioteca centralizada. Muchos estilos están definidos directamente en los archivos de página, lo que dificulta la consistencia y la accesibilidad. Se recomienda extraerlos a componentes reutilizables con props para variantes y tamaños.

## Estado de los 10 Principios TDAH
| Principio | Estado Actual | Evidencia | Recomendación |
|-----------|---------------|-----------|---------------|
| 1. Acción Inmediata | Parcial | Página de inicio con módulos, sin CTA clara | Añadir botón "Empezar Lección Rápida" |
| 2. Pasos Numerados | No cumple | Lecciones monolíticas | Descomponer en pasos numerados |
| 3. Máximo 5 Ítems | Cumple | 4 módulos visibles | Mantener límite, ocultar extras |
| 4. Tiempos Específicos | No cumple | Sin estimaciones claras | Añadir temporizadores y duraciones |
| 5. Retroalimentación Objetiva | No cumple | Mensajes genéricos | Usar lenguaje directo (correcto/incorrecto) |
| 6. Sin Distracciones | Parcial | Glassmorphism y animaciones | Simplificar a fondos sólidos |
| 7. Progreso Visible | Parcial | Insignias básicas | Añadir streaks y barra de progreso |
| 8. Recordatorios de Estado | No cumple | Sin indicadores de paso | Añadir "Paso X de Y" |
| 9. Agrupación Contexto | Cumple | Módulos por habilidad | Mantener |
| 10. Atajos de Teclado | No cumple | Solo ratón | Implementar atajos (L, R, etc.) |

## Deuda Técnica Identificada
- Faltan componentes reutilizables: Button, Card, ProgressBar, StepIndicator, Feedback.
- Falta hook: useFocusMode.
- Faltan estilos para modo enfoque en globals.css.

## Plan de Acción Priorizado
### Fase 1 - Correcciones Críticas (Semana 1-2) 🔴
1. Crear estructura de carpetas: ui/, atoms/, molecules/, hooks/, lib/.
2. Crear componentes: Button, Card, ProgressBar, StepIndicator, Feedback.
3. Crear hook useFocusMode.
4. Añadir estilos de modo enfoque en globals.css.
5. Ajustar contrastes a WCAG AAA.

### Fase 2 - Refactorización de Módulos (Semana 3-4) 🟡
1. Refactorizar Home, Dashboard, Onboarding, Listening, Reading, Writing, Speaking.
2. Integrar Modo Enfoque en todas las rutas.
3. Aplicar "Pasos Numerados" en ejercicios.

### Fase 3 - Gamificación y Pulido (Semana 5-6) 🟢
1. Implementar streaks diarios.
2. Añadir logros por habilidad.
3. Notificaciones toast.
4. Documentar componentes.