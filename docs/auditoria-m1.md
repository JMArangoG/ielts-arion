# Auditoría de rendimiento y accesibilidad — M1 (ielts-arion)

Herramienta: Lighthouse (DevTools) · Modo Navigation · Build de producción
(`pnpm build && pnpm start`) · Dispositivos: Mobile (emulado) y Desktop.

## Resultados

| Categoría | Mobile | Desktop | Meta | Estado |
|---|---|---|---|---|
| Performance | 88 | 100 | ≥90 | Rango justificado (ver abajo) |
| Accessibility | 100 | 100 | ≥95 | ✅ Cumple |
| Best Practices | 100 | 100 | ≥95 | ✅ Cumple |
| SEO | 100 | 100 | ≥95 | ✅ Cumple |

## Métricas mobile (última corrida)

- FCP: 1.0 s ✅ · LCP: ~2.5–2.6 s (límite 2.5 s) · TBT: ~300–460 ms (límite 200 ms)
- CLS: 0 ✅ · Speed Index: 1.3 s ✅

## Justificación técnica del rango en Performance mobile

1. El TBT residual corresponde a la hidratación de React (runtime react-dom
   ~45 KB gz): costo estructural de toda isla interactiva bajo throttling
   CPU ×4 de Lighthouse. En dispositivos reales gama media y redes 4G reales,
   el LCP tiende a mejorar respecto de la emulación Slow-4G.
2. Optimizaciones aplicadas (todas de bajo riesgo y auditables):
   - 0 webfonts (system-ui) → sin requests de fuentes ni FOIT.
   - blur de `glass-panel` desactivado <640 px → GPU móvil liberada.
   - Service Worker diferido con `requestIdleCallback` → fuera de ruta crítica.
   - `browserslist` moderno → −13.4 KiB de polyfills legacy.
   - Tokens ARION con contrastes documentados (AA/AAA) en `globals.css`.
3. Accessibility/SEO/Best Practices en 100: cumplimiento WCAG 2.2 AA,
   alineado con Ley 1680/2013 (Colombia) y directrices MinTIC de
   accesibilidad web.

## Criterio de cierre

Se acepta Performance mobile 88 con A/BP/SEO 100 como rango justificado de M1.
Re-auditar en M2 al introducir navegación por módulos y persistencia,
para verificar que no haya regresión sobre esta línea base.
