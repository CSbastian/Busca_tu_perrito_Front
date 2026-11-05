import Link from "next/link";
import Icon from "@/components/Icon";
import ReportDetail from "@/components/ReportDetail";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="app-main app-main--report flex-1">
      <Link href="/buscar" className="back-link back-link--leading">
        <Icon name="back" className="h-4 w-4" />
        Volver a buscar
      </Link>
      <header className="mb-6">
        <p className="mb-2 flex items-center gap-2 text-sm font-bold text-accent">
          <Icon name="paw" className="h-4 w-4" />
          Perrito encontrado
        </p>
        <h1 className="page-heading">Detalle del reporte</h1>
      </header>
      <ReportDetail key={id} id={id} />
    </main>
  );
}
