import ActionCard from "@/components/ActionCard";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 p-6">
      <header className="text-center">
        <h1 className="text-3xl font-bold">Busca tu perrito</h1>
        <p className="mt-3 text-slate-600">¿Cómo podemos ayudarte?</p>
      </header>
      <nav aria-label="Acciones principales" className="grid w-full max-w-3xl gap-6 md:grid-cols-2">
        <ActionCard
          href="/buscar"
          title="Buscar mi perrito"
          description="Busca a tu perrito por imagen."
          actionLabel="Ir a buscar"
        />
        <ActionCard
          href="/reportar"
          title="Reportar un perrito encontrado"
          description="Ayuda a que un perrito vuelva a casa."
          actionLabel="Ir a reportar"
        />
      </nav>
    </main>
  );
}
