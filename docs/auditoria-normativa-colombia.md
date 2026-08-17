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