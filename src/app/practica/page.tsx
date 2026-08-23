// src/app/practica/page.tsx — M3: Server Component for metadata
import { Metadata } from 'next';
import Practica from './practica-client';

export const metadata: Metadata = {
  title: 'Práctica - ielts-ORION',
  description: 'Practica las 4 habilidades del IELTS: listening, reading, writing y speaking',
};

export default function Page() {
  return <Practica />;
}
