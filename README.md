# ielts-ORION

Preparación gratuita e inclusiva para IELTS, con pedagogía autogestionada
para adultos con TDAH. Sin cuentas: el progreso vive en tu dispositivo
(Ley 1581 de 2012, principio de minimización).

## Estado del MVP
- M1 · Examen de clasificación adaptativo (`/onboarding`) ✔
- M2 · Plan adaptativo por habilidad (`/dashboard`) ✔
- M3 · Práctica de 4 habilidades con fuentes abiertas (`/practica`) ✔
- M4 · Repaso espaciado (`/repaso`) + PWA básica ✔

## Stack
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · pnpm 9

## Instalación local
1. `pnpm install`
2. `pnpm dev` → http://localhost:3000
3. (Opcional) copia `.env.example` a `.env` para habilitar proveedor de IA en el futuro.

## Calidad y gobernanza
- CI "CI ORION" (lint + build) en cada PR.
- `main` protegida por ruleset `proteger-main`: PR + aprobación + CI verde,
  sin force-push ni borrados.
- Rama de integración: `develop`.
- Sistema de diseño ORION: tokens en `src/app/globals.css`.
- Auditoría e incidentes: `docs/auditoria-normativa-colombia.md` (INC-001 a INC-006).

## Fuentes abiertas
Catálogo con licencias en `src/data/open-sources.json`;
política en `docs/fuentes-abiertas.md`.

## Pedagogía
Fundamento andragógico y TDAH en `docs/pedagogia-tdah.md`.
