import ActionCard from "@/components/ActionCard";
import Icon from "@/components/Icon";

export default function HomePage() {
  return (
    <main className="app-main flex-1">
      <header className="text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-ui bg-mark text-ink">
          <Icon name="paw" className="h-8 w-8" />
        </div>
        <h1 className="page-heading">Busca tu perrito</h1>
        <p className="page-intro mx-auto">
          Busca con una foto o ayuda reportando un perrito encontrado.
        </p>
      </header>
      <nav aria-label="Acciones principales" className="mt-8 grid gap-3">
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
      <section
        aria-labelledby="how-search-works"
        className="mt-10 border-t border-line pt-8 sm:mt-14 sm:pt-10"
      >
        <h2 id="how-search-works" className="text-2xl">
          Así funciona la búsqueda
        </h2>
        <p className="mt-2 max-w-2xl leading-relaxed text-muted">
          La búsqueda compara tu foto con los reportes de la comunidad.
        </p>
        <ol className="how-steps">
          <li>
            <h3 className="font-semibold">Primero, una foto</h3>
            <p>
              Una imagen clara del perrito que buscas será el punto de partida.
            </p>
          </li>
          <li>
            <h3 className="font-semibold">Después, comparamos las fotos</h3>
            <p>El sistema ordena los candidatos por similitud visual.</p>
          </li>
          <li>
            <h3 className="font-semibold">
              Por último, posibles coincidencias
            </h3>
            <p>
              Podrás revisar los candidatos. Una similitud no confirmará que se
              trate de tu perrito.
            </p>
          </li>
        </ol>
      </section>
    </main>
  );
}
