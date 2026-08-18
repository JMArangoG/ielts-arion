// src/app/page.tsx — Home M0 + CTA a onboarding (M1)
import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen px-edge py-stack-xl">
      <section className="mx-auto flex max-w-3xl flex-col gap-stack-lg">
        <header className="glass-panel p-stack-lg">
          <h1 className="text-3xl font-semibold text-arion-text">ielts-arion</h1>
          <p className="mt-stack-sm text-arion-muted">
            Preparación gratuita e inclusiva para IELTS con IA adaptativa y pedagogía para adultos con TDAH.
          </p>
                    <Link
            href="/onboarding"
            className="mt-stack-md inline-block rounded-panel bg-arion-primary px-stack-md py-stack-sm font-semibold text-arion-on-primary"
          >
            Comenzar clasificación
          </Link>
        </header>
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