import Link from "next/link";
import ReportFoundDogForm from "@/components/ReportFoundDogForm";
import Icon from "@/components/Icon";

export default function ReportarPage() {
  return (
    <main className="app-main app-main--report flex-1">
      <h1 className="page-heading">Reportar un perrito encontrado</h1>
      <p className="page-intro">
        Ayuda a que un perrito vuelva a casa. Completa los datos del lugar donde lo encontraste y una descripción.
      </p>
      <ReportFoundDogForm />
      <Link href="/" className="back-link">
        <Icon name="back" /> Volver al inicio
      </Link>
    </main>
  );
}
