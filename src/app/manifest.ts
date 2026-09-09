import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ielts-ORION · Preparación gratuita IELTS',
    short_name: 'ielts-ORION',
    description: 'Plataforma de preparación IELTS. Cumple con normativas de accesibilidad (WCAG 2.2 AA) y privacidad de datos (Ley 1581 de 2012).',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/icon-192x192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
        purpose: 'maskable'
      },
      {
        src: '/icon-512x512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
        purpose: 'maskable'
      }
    ]
  }
}
