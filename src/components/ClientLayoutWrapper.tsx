"use client";

import { ReactNode } from 'react';
import Button from '@/components/ui/Button';
import { useFocusMode } from '@/hooks/useFocusMode';

interface ClientLayoutWrapperProps {
  children: ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const { isFocusMode, toggleFocusMode } = useFocusMode();

  return (
    <>
      {/* ===== HEADER CON BOTÓN DE MODO ENFOQUE ===== */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200 dark:bg-gray-900/80 dark:border-gray-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
              IELTS ORION
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={isFocusMode ? 'primary' : 'ghost'}
              size="sm"
              onClick={toggleFocusMode}
              className="transition-all duration-200"
              aria-label={isFocusMode ? 'Desactivar modo enfoque' : 'Activar modo enfoque'}
            >
              {isFocusMode ? '🔒 Enfoque Activado' : '🧘 Modo Enfoque'}
            </Button>
            {/* Aquí puedes añadir otros botones (perfil, etc.) */}
          </div>
        </div>
      </header>

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </>
  );
}