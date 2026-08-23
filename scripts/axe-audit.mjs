// scripts/axe-audit.mjs
// Auditoría de accesibilidad WCAG 2.2 AA con axe-core + Playwright
// Por qué: garantiza cumplimiento de Ley 1618 de 2013 y detecta regresiones en CI

import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

const RUTAS_CRITICAS = ['/', '/practica', '/onboarding'];
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function auditarRuta(page, ruta) {
  console.log(\n🔍 Auditando: );
  
  await page.goto(${BASE_URL}, { waitUntil: 'networkidle' });
  
  const resultados = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']) // WCAG 2.2 AA
    .analyze();
  
  const violaciones = resultados.violations.filter(
    v => v.impact === 'serious' || v.impact === 'critical'
  );
  
  if (violaciones.length > 0) {
    console.error(\n❌  violaciones WCAG 2.2 AA en :);
    violaciones.forEach((v, i) => {
      console.error(\n  .  ());
      console.error(     );
      console.error(     Ayuda: );
      console.error(     Elementos afectados: );
    });
    return false;
  }
  
  console.log(✅ : Sin violaciones críticas);
  return true;
}

async function main() {
  console.log('🚀 Iniciando auditoría de accesibilidad WCAG 2.2 AA');
  console.log(Base URL: \n);
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  let todasOk = true;
  
  for (const ruta of RUTAS_CRITICAS) {
    const ok = await auditarRuta(page, ruta);
    if (!ok) todasOk = false;
  }
  
  await browser.close();
  
  if (!todasOk) {
    console.error('\n🚨 Auditoría falló: hay violaciones WCAG 2.2 AA');
    process.exit(1);
  }
  
  console.log('\n✅ Auditoría completada: todas las rutas cumplen WCAG 2.2 AA');
}

main().catch(err => {
  console.error('Error en auditoría:', err);
  process.exit(1);
});
