import Link from "next/link";
import ReportFoundDogForm from "@/components/ReportFoundDogForm";

export default function ReportarPage() {
  return (
    <main className="mx-auto w-full max-w-3xl p-6  flex-1">
      <h1 className="text-3xl font-bold">Reportar un perrito encontrado</h1>
      <p className="mt-3 text-slate-600">
        Ayuda a que un perrito vuelva a casa. Completa los datos del lugar donde lo encontraste y una descripción.
      </p>
      <ReportFoundDogForm />
      <Link href="/" className="mt-6 inline-block font-semibold text-blue-700 underline underline-offset-4">
         Volver al inicio
      </Link>
    </main>
  );
}
