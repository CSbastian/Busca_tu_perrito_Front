import ActionCard from "@/components/ActionCard";

export default function HomePage() {
  return (
    <main className="app-main flex-1">
      <header>
        <h1 className="page-heading">¿Qué necesitas hacer?</h1>
        <p className="page-intro">
          Busca con una foto o reporta un perrito encontrado.
        </p>
      </header>
      <nav aria-label="Acciones principales" className="mt-8 grid gap-3">
        <ActionCard href="/buscar" title="Buscar mi perrito" primary />
        <ActionCard href="/reportar" title="Reportar un perrito encontrado" />
      </nav>
      <details className="mt-7 text-sm text-muted">
        <summary className="min-h-11 cursor-pointer content-center rounded-ui font-semibold text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          ¿Cómo funciona la búsqueda?
        </summary>
        <p className="mt-2 max-w-prose leading-relaxed">
          Comparamos tu foto con los reportes de la comunidad y mostramos
          candidatos para que los revises. El parecido no confirma la identidad.
        </p>
      </details>
    </main>
  );
}
