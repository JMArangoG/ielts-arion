# Auditoría normativa — Colombia (preventiva)

Proyecto: ielts-arion · Preparación gratuita IELTS
Alcance: dato personal, accesibilidad y seguridad de la información.

## Marco aplicable
- Ley 1581 de 2012 (habeas data) y Decreto 1377 de 2013.
- Ley 1618 de 2013 (inclusión de personas con discapacidad), en lo aplicable a entornos digitales.
- WCAG 2.2 nivel AA como referencia técnica de accesibilidad.

## Principios implementados
1. Minimización: la app funciona sin cuenta; el progreso vive en el dispositivo.
2. Consentimiento informado antes de enviar cualquier dato a servicios externos (IA).
3. Seguridad: secretos fuera del repo (.gitignore v2), secret scanning y push protection.
4. Trazabilidad: commits identificados y builds reproducibles (lockfile versionado).

## Incidentes y lecciones
### INC-001 · Publicación accidental de artefactos de build
- Qué pasó: `.next/` y `next-env.d.ts` se versionaron por patrones rotos en `.gitignore`
  (comentarios inline no soportados por gitignore).
- Impacto: exposición pública de artefactos de build sin secretos ni dato personal.
- Corrección: `.gitignore` v2 (comentarios en línea propia) + `git rm --cached` + push.
- Preventivo: tras cada cambio de `.gitignore`, verificar con `git status` y
  `git check-ignore -v` sobre rutas críticas (.env, .next, node_modules).

### INC-002 · PR con rutas anidadas y contenido truncado
- Qué pasó: archivos de Fase 3 creados desde subcarpetas en el editor web
  (rutas duplicadas) y contenido de una sola línea.
- Impacto: PR cerrado sin fusionar; `develop` restablecido a `origin/main`
  con `--force-with-lease` (excepción controlada, sin trabajo de terceros).
- Preventivo: crear archivos desde la raíz del repo; verificar líneas con
  `(Get-Content <archivo>).Count` antes de commitear.

## Pendientes
- [ ] Política de privacidad visible en la app (M2).
- [ ] Aviso de tratamiento de dato personal si alguna vez se persiste en servidor (no previsto).

### INC-003 · Issue no cerrado automáticamente al fusionar en develop
- Qué pasó: el PR de M1 usó "Closes #3" pero se fusionó contra `develop`;
  GitHub solo cierra issues automáticamente al fusionar contra la rama por defecto (`main`).
- Impacto: issue #3 quedó abierto hasta cierre manual.
- Preventivo: al integrar en `develop`, cerrar el issue manualmente con
  `gh issue close <n> --comment "..."`; el cierre automático operará cuando
  `develop` se fusione en `main` (release).
  ### INC-004 · Borrado de módulos existentes por agente no supervisado
- Qué pasó: agente de IA (Qwen Coder) eliminó `src/lib/placement.ts`,
  `src/app/onboarding/page.tsx` y `src/data/placement-bank.ts` durante refactor.
- Impacto: module-not-found y TS2307 en build; restauración manual de módulos.
- Corrección: restauración y recreación desde bloques auditados; incluido en PR de M2.
- Preventivo: el agente propone, el humano aprueba; `git status --short` antes y después
  de ejecutar el agente; `Test-Path` del módulo importado ante cualquier module-not-found.

### INC-005 · Commit en rama base por checkout -b fallido
- Qué pasó: `git checkout -b feat/M2-dashboard` falló (rama preexistente) y el commit
  de M2 cayó en `develop`.
- Impacto: PR sin diferencias ("No commits between…"); retrabajo.
- Corrección: mover el commit a la rama (merge) y reset de develop a origin/develop.
- Preventivo: `git branch --show-current` y `git branch --list` antes de crear ramas;
  leer el encabezado del commit `[rama hash]` tras cada commit.

### INC-006 · Duplicado de issues por reintento sin verificación
- Qué pasó: `gh issue create` ejecutado varias veces para M2 y M3 sin `gh issue list` previo.
- Impacto: issues duplicados cerrados como duplicate.
- Preventivo: `gh issue list` siempre antes de crear; los marcadores `<n>` se sustituyen
  por el número real sin signos angulares.
### INC-004 · Borrado de módulos existentes por agente no supervisado
- Qué pasó: agente de IA (Qwen Coder) eliminó `src/lib/placement.ts`,
  `src/app/onboarding/page.tsx` y `src/data/placement-bank.ts` durante refactor.
- Impacto: module-not-found y TS2307 en build; restauración manual de módulos.
- Corrección: restauración y recreación desde bloques auditados; incluido en PR de M2.
- Preventivo: el agente propone, el humano aprueba; `git status --short` antes y después
  de ejecutar el agente; `Test-Path` del módulo importado ante cualquier module-not-found.

### INC-005 · Commit en rama base por checkout -b fallido
- Qué pasó: `git checkout -b feat/M2-dashboard` falló (rama preexistente) y el commit
  de M2 cayó en `develop`.
- Impacto: PR sin diferencias ("No commits between…"); retrabajo.
- Corrección: mover el commit a la rama (merge) y reset de develop a origin/develop.
- Preventivo: `git branch --show-current` y `git branch --list` antes de crear ramas;
  leer el encabezado del commit `[rama hash]` tras cada commit.

### INC-006 · Duplicado de issues por reintento sin verificación
- Qué pasó: `gh issue create` ejecutado varias veces para M2 y M3 sin `gh issue list` previo.
- Impacto: issues duplicados cerrados como duplicate.
- Preventivo: `gh issue list` siempre antes de crear; los marcadores `<n>` se sustituyen
  por el número real sin signos angulares.
  ### INC-011 · Doble codificación UTF-8 tras el rebrand masivo
- Qué pasó: el reemplazo masivo usó Get-Content sin -Encoding en PowerShell 5.1
  (lee Windows-1252) y Set-Content UTF8 → acentos doble-codificados ("AÃºn").
- Impacto: textos públicos corruptos en producción (calidad y accesibilidad).
- Corrección: reversa (leer UTF-8 → bytes 1252 → decodificar UTF-8) sobre archivos
  con marcador; hotfix PR + release.
- Preventivo: toda escritura masiva usa ReadAllText/WriteAllText UTF8 sin BOM
  (INC-009) y verificación visual de acentos tras ediciones masivas.
  ### DEC-001 · Casing de tokens ORION en mayúsculas
- Decisión: mantener tokens y clases del sistema en mayúsculas
  (--color-ORION-*, text-ORION-*) por consistencia con producción tras el rebrand
  (el -replace de PowerShell es insensible a mayúsculas y unificó todo a ORION).
- Regla permanente: todo componente nuevo usa clases *-ORION-*;
  Tailwind v4 es case-sensitive.
- Lección: el agente Qwen Code acertó en este punto; la corrección previa a
  minúsculas fue errónea y se revierte con esta decisión.
  ### DEC-001 · Casing de tokens ORION en mayúsculas
- Decisión: mantener tokens y clases del sistema en mayúsculas
  (--color-ORION-*, text-ORION-*) por consistencia con producción tras el rebrand
  (el -replace de PowerShell es insensible a mayúsculas y unificó todo a ORION).
- Regla permanente: todo componente nuevo usa clases *-ORION-*;
  Tailwind v4 es case-sensitive.
### INC-013 · Transcodificación de acentos al pegar here-strings en PowerShell 5.1
- Qué pasó: el here-string con acentos se pegó vía consola PS 5.1 (codepage 1252)
  y el archivo quedó doble-codificado; la verificación con patrón literal 'AÃºn'
  también fue poco fiable por el mismo codepage.
- Impacto: mojibake servido en producción tras el release.
- Corrección: reversa con marcador numérico [char]0x00C3 sobre todo src.
- Preventivo: en PS 5.1, los patrones y reemplazos no-ASCII se expresan con
  códigos numéricos; los textos con acentos se editan en VS Code, no por consola.
### INC-007 · Duplicación de claves de persistencia en el cliente
- **Qué pasó:** `STORAGE_KEY` y `CLAVE_PROGRESO` estaban definidos inline en `PanelEtiquetas.tsx` y `practica/page.tsx`.
- **Impacto:** Riesgo de inconsistencia de datos y dificultad para migrar a esquemas encriptados o IndexedDB en el futuro.
- **Corrección:** Centralización de todas las claves en `src/lib/storage.ts` con exportación tipada.
- **Preventivo:** Regla de linting o revisión de PR que prohíba `localStorage.getItem` con strings hardcodeados fuera de `src/lib/`.

### INC-008 · Tokens de diseño ORION en minúsculas (Hallazgo B1)
- **Qué pasó:** Uso inicial de clases Tailwind en minúsculas (`text-orion-*`), violando la convención del sistema de diseño ARION/ORION.
- **Impacto:** Inconsistencia visual y fallos de compilación si el `tailwind.config` es case-sensitive.
- **Corrección:** Refactorización global a mayúsculas (`text-ORION-*`, `bg-ORION-*`).
- **Preventivo:** Configuración de `tailwind.config` para rechazar tokens no estandarizados y revisión visual en PR.

### INC-009 · Manifest de PWA sin íconos requeridos (Hallazgo M2)
- **Qué pasó:** El `manifest.json` carecía de las propiedades `icons` con resoluciones 192x192 y 512x512.
- **Impacto:** Imposibilidad de instalación nativa en dispositivos móviles y penalización en Lighthouse PWA audit.
- **Corrección:** Generación e inclusión de los assets PNG en `/public` y registro en el manifiesto.
- **Preventivo:** Incluir validación de manifiesto en el pipeline de CI con `lighthouse-ci`.

### INC-010 · Ausencia de auditoría de accesibilidad en CI (Hallazgo M3)
- **Qué pasó:** El workflow de CI no ejecutaba pruebas de accesibilidad automatizadas.
- **Impacto:** Riesgo de introducir regresiones que violen WCAG 2.2 nivel AA (Ley 1618 de 2013).
- **Corrección:** Integración pendiente de `axe-core` en el pipeline (requiere levantamiento de servidor headless).
- **Preventivo:** Ejecución local de `npm run test:a11y` antes de cada push a ramas de característica.

### INC-011 · Inconsistencia en nombrado de workflows CI (Hallazgo C1)
- **Qué pasó:** El archivo de workflow se denominaba `CI ARION` en lugar de `CI ORION`.
- **Impacto:** Confusión operativa y desalineación con la identidad del proyecto.
- **Corrección:** Renombrado del workflow a `CI ORION`.
- **Preventivo:** Validación de nombres de jobs en la revisión de PR de infraestructura.

### INC-012 · Comentarios obsoletos en Service Worker (Hallazgo C2)
- **Qué pasó:** El archivo `sw.js` contenía comentarios genéricos o no alineados con la normativa de trazabilidad.
- **Impacto:** Dificultad para auditorías de seguridad y mantenimiento.
- **Corrección:** Limpieza y estandarización de comentarios en `sw.js`.
- **Preventivo:** Plantilla de comentarios obligatoria para archivos de infraestructura de red.

### INC-013 · Falsa positiva en ofuscación de cadenas de UI (Hallazgo M1)
- **Qué pasó:** Se intentó aplicar el patrón de verificación `[char]0xNUM` a cadenas de texto de la interfaz de usuario (UI) en español.
- **Impacto:** **Crítico para accesibilidad.** Los lectores de pantalla (screen readers) no pueden interpretar estos patrones, violando WCAG 2.2 (Criterio 1.3.1 Info and Relationships). Además, afecta negativamente el SEO y la mantenibilidad.
- **Corrección:** Excluir explícitamente las cadenas de UI renderizadas de este patrón. La verificación `[char]0xNUM` se aplicará **exclusivamente** a patrones de logs, consola o validación interna de seguridad, nunca al DOM visible.
- **Preventivo:** Regla de ESLint personalizada que flaggee el uso de patrones de ofuscación en componentes de retorno JSX.

### DEC-001 · Decisión Arquitectónica: Capa de Persistencia Unificada
- **Decisión:** Toda la interacción con `localStorage` o `sessionStorage` debe pasar exclusivamente por los métodos exportados en `src/lib/storage.ts`.
- **Justificación:** Garantiza un único punto de verdad (Single Source of Truth), facilita la futura migración a IndexedDB o la implementación de encriptación de datos en reposo (Ley 1581, principio de seguridad), y permite un manejo centralizado de errores (ej. cuota excedida o modo incógnito) sin romper la UX de los componentes.

