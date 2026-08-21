# ielts-ORION

PreparaciÃ³n gratuita e inclusiva para IELTS, con pedagogÃ­a autogestionada
para adultos con TDAH. Sin cuentas: el progreso vive en tu dispositivo
(Ley 1581 de 2012, principio de minimizaciÃ³n).

## Estado del MVP
- M1 Â· Examen de clasificaciÃ³n adaptativo (`/onboarding`) âœ”
- M2 Â· Plan adaptativo por habilidad (`/dashboard`) âœ”
- M3 Â· PrÃ¡ctica de 4 habilidades con fuentes abiertas (`/practica`) âœ”
- M4 Â· Repaso espaciado (`/repaso`) + PWA bÃ¡sica âœ”

## Stack
Next.js 16 (App Router) Â· React 19 Â· TypeScript Â· Tailwind CSS v4 Â· pnpm 9

## InstalaciÃ³n local
1. `pnpm install`
2. `pnpm dev` â†’ http://localhost:3000
3. (Opcional) copia `.env.example` a `.env` para habilitar proveedor de IA en el futuro.

## Calidad y gobernanza
- CI "CI ORION" (lint + build) en cada PR.
- `main` protegida por ruleset `proteger-main`: PR + aprobaciÃ³n + CI verde,
  sin force-push ni borrados.
- Rama de integraciÃ³n: `develop`.
- Sistema de diseÃ±o ORION: tokens en `src/app/globals.css`.
- AuditorÃ­a e incidentes: `docs/auditoria-normativa-colombia.md` (INC-001 a INC-006).

## Fuentes abiertas
CatÃ¡logo con licencias en `src/data/open-sources.json`;
polÃ­tica en `docs/fuentes-abiertas.md`.

## PedagogÃ­a
Fundamento andragÃ³gico y TDAH en `docs/pedagogia-tdah.md`.
