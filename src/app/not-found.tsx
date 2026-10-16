import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 p-6 text-center">
      <p className="text-7xl font-bold text-blue-700 sm:text-8xl">404</p>
      <h1 className="text-3xl font-bold">No encontramos esta página</h1>
      <p className="max-w-md text-slate-600">
        Puede que el enlace haya cambiado o que la dirección esté mal escrita.
        Vuelve al inicio para buscar o reportar un perrito.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
      >
        Volver al inicio
      </Link>
    </main>
  );
}
