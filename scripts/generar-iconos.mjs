// scripts/generar-iconos.mjs — Genera íconos PWA desde assets/icon.svg
// Open source: sharp (Apache-2.0). Sin servicios externos ni literales no-ASCII.
import sharp from "sharp";

const tamanos = [192, 512];

for (const t of tamanos) {
  await sharp("assets/icon.svg")
    .resize(t, t)
    .png()
    .toFile(`public/icon-${t}x${t}.png`);
  console.log(`OK public/icon-${t}x${t}.png`);
}