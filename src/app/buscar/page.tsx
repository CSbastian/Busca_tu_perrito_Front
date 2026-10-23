import Link from "next/link";
import SearchByImageForm from "@/components/SearchByImageForm";
import Icon from "@/components/Icon";

export default function BuscarPage() {
  return (
    <main className="app-main flex-1">
      <h1 className="page-heading">Buscar mi perrito</h1>
      <p className="page-intro">
        Selecciona una foto clara de tu perrito para iniciar una búsqueda por imagen.
      </p>
      <SearchByImageForm />
      <Link href="/" className="back-link">
        <Icon name="back" /> Volver al inicio
      </Link>
    </main>
  );
}
