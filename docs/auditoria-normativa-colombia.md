# Auditoría normativa — Colombia (preventiva)

Proyecto: ielts-ORION · Preparación gratuita IELTS
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
