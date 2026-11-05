"use client";

import { useEffect, useState } from "react";
import { ApiError } from "@/services/api.client";
import { describeApiError } from "@/services/api-errors";
import { getReport } from "@/services/reports.api";
import type { ReportResponse } from "@/services/reports.api";

export default function ReportDetail({ id }: { id: string }) {
  const [report, setReport] = useState<ReportResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    getReport(id, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setReport(data);
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          const fallback =
            error instanceof ApiError && error.status === 404
              ? "El reporte no existe."
              : "No pudimos cargar el reporte.";
          setError(describeApiError(error, fallback));
        }
      });

    return () => controller.abort();
  }, [id]);

  if (error)
    return (
      <p role="alert" className="mt-4 text-red-700">
        {error}
      </p>
    );
  if (!report) return <p role="status">Cargando reporte…</p>;

  return (
    <article className="mt-6 grid gap-4">
      <img
        src={report.imageUrl}
        alt="Foto del perrito reportado"
        className="h-56 w-full rounded-ui bg-soft object-contain"
      />
      <dl className="grid gap-3">
        <div>
          <dt className="font-semibold">Ubicación</dt>
          <dd>{report.location}</dd>
        </div>
        <div>
          <dt className="font-semibold">Descripción</dt>
          <dd className="whitespace-pre-line">{report.description}</dd>
        </div>
        <div>
          <dt className="font-semibold">Fecha de publicación</dt>
          <dd>
            <time dateTime={report.createdAt}>
              {new Date(report.createdAt).toLocaleString("es-CL")}
            </time>
          </dd>
        </div>
        {report.contactName || report.contactPhone ? (
          <div>
            <dt className="font-semibold">Contacto</dt>
            {report.contactName ? <dd>{report.contactName}</dd> : null}
            {report.contactPhone ? <dd>{report.contactPhone}</dd> : null}
          </div>
        ) : null}
      </dl>
    </article>
  );
}
