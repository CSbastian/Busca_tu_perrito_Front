import Link from "next/link";

export default function NotFound() {
  return (
    <main className="app-main flex-1">
      <p className="mb-4 text-sm font-semibold text-accent-hover">Error 404</p>
      <h1 className="page-heading">No encontramos esta página</h1>
      <p className="page-intro">
        Puede que el enlace haya cambiado o que la dirección esté mal escrita.
        Vuelve al inicio para buscar o reportar un perrito.
      </p>
      <div className="report-success-actions">
        <Link href="/" className="button-primary">
          Volver al inicio
        </Link>
        <Link href="/buscar" className="button-secondary">
          Buscar mi perrito
        </Link>
      </div>
    </main>
  );
}
