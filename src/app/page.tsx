// src/app/page.tsx — Verificación M0: tokens ARION en uso real
export default function Home() {
  return (
    // px-edge / py-stack-xl: márgenes fluidos responsivos sin media queries
    <main className="min-h-screen px-edge py-stack-xl">
      <section className="mx-auto flex max-w-3xl flex-col gap-stack-lg">
        {/* glass-panel con padding tokenizado */}
        <header className="glass-panel p-stack-lg">
          <h1 className="text-3xl font-semibold text-arion-text">
            ielts-arion · M0 listo
          </h1>
          <p className="mt-stack-sm text-arion-muted">
            Tokens ARION activos: contraste AA/AAA, espaciado fluido y
            glass-panel con fallback de transparencia reducida.
          </p>
        </header>

        {/* Muestra de estados para verificación visual de contraste */}
        <div className="glass-panel flex flex-wrap gap-gutter p-stack-md">
          <span className="text-arion-primary">primary 6.1:1</span>
          <span className="text-arion-success">success 8.2:1</span>
          <span className="text-arion-warning">warning 9.0:1</span>
          <span className="text-arion-danger">danger 6.3:1</span>
        </div>
      </section>
    </main>
  );
}