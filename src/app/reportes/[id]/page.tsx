import Link from "next/link";
import ReportDetail from "@/components/ReportDetail";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="app-main flex-1">
      <h1 className="page-heading">Detalle del reporte</h1>
      <ReportDetail key={id} id={id} />
      <Link href="/buscar" className="back-link">
        Volver a buscar
      </Link>
    </main>
  );
}
