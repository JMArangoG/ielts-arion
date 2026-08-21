# AuditorÃ­a normativa â€” Colombia (preventiva)

Proyecto: ielts-ORION Â· PreparaciÃ³n gratuita IELTS
Alcance: dato personal, accesibilidad y seguridad de la informaciÃ³n.

## Marco aplicable
- Ley 1581 de 2012 (habeas data) y Decreto 1377 de 2013.
- Ley 1618 de 2013 (inclusiÃ³n de personas con discapacidad), en lo aplicable a entornos digitales.
- WCAG 2.2 nivel AA como referencia tÃ©cnica de accesibilidad.

## Principios implementados
1. MinimizaciÃ³n: la app funciona sin cuenta; el progreso vive en el dispositivo.
2. Consentimiento informado antes de enviar cualquier dato a servicios externos (IA).
3. Seguridad: secretos fuera del repo (.gitignore v2), secret scanning y push protection.
4. Trazabilidad: commits identificados y builds reproducibles (lockfile versionado).

## Incidentes y lecciones
### INC-001 Â· PublicaciÃ³n accidental de artefactos de build
- QuÃ© pasÃ³: `.next/` y `next-env.d.ts` se versionaron por patrones rotos en `.gitignore`
  (comentarios inline no soportados por gitignore).
- Impacto: exposiciÃ³n pÃºblica de artefactos de build sin secretos ni dato personal.
- CorrecciÃ³n: `.gitignore` v2 (comentarios en lÃ­nea propia) + `git rm --cached` + push.
- Preventivo: tras cada cambio de `.gitignore`, verificar con `git status` y
  `git check-ignore -v` sobre rutas crÃ­ticas (.env, .next, node_modules).

### INC-002 Â· PR con rutas anidadas y contenido truncado
- QuÃ© pasÃ³: archivos de Fase 3 creados desde subcarpetas en el editor web
  (rutas duplicadas) y contenido de una sola lÃ­nea.
- Impacto: PR cerrado sin fusionar; `develop` restablecido a `origin/main`
  con `--force-with-lease` (excepciÃ³n controlada, sin trabajo de terceros).
- Preventivo: crear archivos desde la raÃ­z del repo; verificar lÃ­neas con
  `(Get-Content <archivo>).Count` antes de commitear.

## Pendientes
- [ ] PolÃ­tica de privacidad visible en la app (M2).
- [ ] Aviso de tratamiento de dato personal si alguna vez se persiste en servidor (no previsto).

### INC-003 Â· Issue no cerrado automÃ¡ticamente al fusionar en develop
- QuÃ© pasÃ³: el PR de M1 usÃ³ "Closes #3" pero se fusionÃ³ contra `develop`;
  GitHub solo cierra issues automÃ¡ticamente al fusionar contra la rama por defecto (`main`).
- Impacto: issue #3 quedÃ³ abierto hasta cierre manual.
- Preventivo: al integrar en `develop`, cerrar el issue manualmente con
  `gh issue close <n> --comment "..."`; el cierre automÃ¡tico operarÃ¡ cuando
  `develop` se fusione en `main` (release).
  ### INC-004 Â· Borrado de mÃ³dulos existentes por agente no supervisado
- QuÃ© pasÃ³: agente de IA (Qwen Coder) eliminÃ³ `src/lib/placement.ts`,
  `src/app/onboarding/page.tsx` y `src/data/placement-bank.ts` durante refactor.
- Impacto: module-not-found y TS2307 en build; restauraciÃ³n manual de mÃ³dulos.
- CorrecciÃ³n: restauraciÃ³n y recreaciÃ³n desde bloques auditados; incluido en PR de M2.
- Preventivo: el agente propone, el humano aprueba; `git status --short` antes y despuÃ©s
  de ejecutar el agente; `Test-Path` del mÃ³dulo importado ante cualquier module-not-found.

### INC-005 Â· Commit en rama base por checkout -b fallido
- QuÃ© pasÃ³: `git checkout -b feat/M2-dashboard` fallÃ³ (rama preexistente) y el commit
  de M2 cayÃ³ en `develop`.
- Impacto: PR sin diferencias ("No commits betweenâ€¦"); retrabajo.
- CorrecciÃ³n: mover el commit a la rama (merge) y reset de develop a origin/develop.
- Preventivo: `git branch --show-current` y `git branch --list` antes de crear ramas;
  leer el encabezado del commit `[rama hash]` tras cada commit.

### INC-006 Â· Duplicado de issues por reintento sin verificaciÃ³n
- QuÃ© pasÃ³: `gh issue create` ejecutado varias veces para M2 y M3 sin `gh issue list` previo.
- Impacto: issues duplicados cerrados como duplicate.
- Preventivo: `gh issue list` siempre antes de crear; los marcadores `<n>` se sustituyen
  por el nÃºmero real sin signos angulares.
