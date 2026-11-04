import ActionCard from "@/components/ActionCard";
import Icon from "@/components/Icon";

export default function HomePage() {
  return (
    <main className="app-main flex-1">
      <header className="text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-ui bg-mark text-ink"><Icon name="paw" className="h-8 w-8" /></div>
        <h1 className="page-heading">Busca tu perrito</h1>
        <p className="page-intro">Busca con una foto o ayuda reportando un perrito encontrado.</p>
      </header>
      <nav aria-label="Acciones principales" className="mt-6 grid gap-4 sm:mt-8">
        <ActionCard
          href="/buscar"
          title="Buscar mi perrito"
          description="Empieza con una foto clara de tu perrito."
          actionLabel="Empezar a buscar"
          primary
        />
        <ActionCard
          href="/reportar"
          title="Reportar un perrito encontrado"
          description="Comparte dónde lo encontraste y cómo es."
          actionLabel="Reportar un perrito"
        />
      </nav>
      <aside aria-label="Estado de la aplicación" className="mt-5 max-w-3xl text-sm leading-relaxed text-muted">
        <strong className="font-semibold text-ink">Estás en una demostración.</strong>{" "}
        Las búsquedas y los reportes son simulados. Tus fotos y datos no se envían ni se guardan.
      </aside>
      <section aria-labelledby="how-search-works" className="mt-10 border-t border-line pt-8 sm:mt-14 sm:pt-10">
        <h2 id="how-search-works" className="text-2xl">Así será la búsqueda</h2>
        <p className="mt-2 max-w-2xl leading-relaxed text-muted">Estamos preparando una búsqueda con modelos de IA preentrenados para comparar fotos con los reportes de la comunidad.</p>
        <ol className="how-steps">
          <li>
            <h3 className="font-semibold">Primero, una foto</h3>
            <p>Una imagen clara del perrito que buscas será el punto de partida.</p>
          </li>
          <li>
            <h3 className="font-semibold">Después, reportes cercanos</h3>
            <p>La búsqueda comparará su foto con perros reportados dentro de un radio cercano a tu ubicación.</p>
          </li>
          <li>
            <h3 className="font-semibold">Por último, posibles coincidencias</h3>
            <p>Podrás revisar los candidatos. Una similitud no confirmará que se trate de tu perrito.</p>
          </li>
        </ol>
      </section>
    </main>
  );
}
