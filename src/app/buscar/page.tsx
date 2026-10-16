import Link from "next/link";

export default function BuscarPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
      <h1 className="text-3xl font-bold">Buscar mi perrito</h1>
      <p className="max-w-md text-slate-600">
        Aquí podrás buscar a tu perrito por imagen. Pronto estará disponible el formulario de búsqueda.
      </p>
      <Link href="/" className="rounded font-semibold text-blue-700 underline underline-offset-4 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600">
        Volver al inicio
      </Link>
    </main>
  );
}
