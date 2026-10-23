import Link from "next/link";
import SearchByImageForm from "@/components/SearchByImageForm";

export default function BuscarPage() {
  return (
    <main className="mx-auto w-full max-w-3xl p-6 flex-1">
      <h1 className="text-3xl font-bold">Buscar mi perrito</h1>
      <p className="mt-3 text-slate-600">
        Selecciona una foto clara de tu perrito para iniciar una búsqueda por imagen.
      </p>
      <SearchByImageForm />
      <Link href="/" className="mt-6 inline-block font-semibold text-blue-700 underline underline-offset-4">
         Volver al inicio
      </Link>
    </main>
  );
}
