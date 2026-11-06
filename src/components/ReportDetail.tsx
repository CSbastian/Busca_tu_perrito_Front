"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { ApiError } from "@/services/api.client";
import { describeApiError } from "@/services/api-errors";
import { getReport } from "@/services/reports.api";
import type { ReportResponse } from "@/services/reports.api";

export default function ReportDetail({ id }: { id: string }) {
  const [attempt, setAttempt] = useState(0);
  const [report, setReport] = useState<ReportResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageUnavailable, setImageUnavailable] = useState(false);

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
              ? "No encontramos ese reporte."
              : "No pudimos cargar el reporte.";
          setError(describeApiError(error, fallback));
        }
      });

    return () => controller.abort();
  }, [id, attempt]);

  if (error) {
    return (
      <section
        className="report-detail-state"
        aria-label="Error al cargar el reporte"
      >
        <h2 className="text-2xl">No pudimos mostrar el reporte</h2>
        <p role="alert" className="mt-3 text-red-700">
          {error}
        </p>
        <button
          type="button"
          className="button-secondary mt-5"
          onClick={() => {
            setError(null);
            setAttempt((value) => value + 1);
          }}
        >
          Volver a cargar el reporte
        </button>
      </section>
    );
  }
  if (!report) {
    return (
      <p
        role="status"
        className="rounded-ui border border-line bg-surface p-5 text-muted"
      >
        Cargando reporte…
      </p>
    );
  }

  return (
    <article className="grid gap-6 min-[960px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="relative grid aspect-[4/3] w-full place-items-center self-start overflow-hidden rounded-ui border border-line bg-surface">
        {imageUnavailable ? (
          <p
            role="status"
            className="grid justify-items-center gap-2 p-4 text-center text-muted"
          >
            <Icon name="camera" className="h-6 w-6" />
            Foto no disponible
          </p>
        ) : (
          <Image
            src={report.imageUrl}
            alt="Foto del perrito encontrado"
            fill
            unoptimized
            loading="eager"
            onError={() => setImageUnavailable(true)}
            className="object-contain"
          />
        )}
      </div>

      <div className="grid min-w-0 content-start gap-4 [overflow-wrap:anywhere]">
        <section className="rounded-ui border border-line bg-surface p-5 sm:p-6">
          <p className="mb-2 text-sm font-bold text-muted">
            Lugar del hallazgo
          </p>
          <h2 className="text-2xl leading-tight text-ink">{report.location}</h2>
          <p className="mt-3 text-sm text-muted">
            Publicado el{" "}
            <time dateTime={report.createdAt}>
              {new Date(report.createdAt).toLocaleDateString("es-CL", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </p>
          <div className="mt-5 border-t border-line pt-5">
            <h3 className="font-bold text-ink">Descripción</h3>
            <p className="mt-2 whitespace-pre-line">{report.description}</p>
          </div>
        </section>

        <section className="rounded-ui border border-line bg-canvas p-5 sm:p-6">
          <h2 className="text-xl text-ink">Contacto del reporte</h2>
          {report.contactName || report.contactPhone ? (
            <dl className="mt-3 grid gap-3">
              {report.contactName ? (
                <div>
                  <dt className="text-sm font-bold text-muted">Nombre</dt>
                  <dd>{report.contactName}</dd>
                </div>
              ) : null}
              {report.contactPhone ? (
                <div>
                  <dt className="text-sm font-bold text-muted">Teléfono</dt>
                  <dd>{report.contactPhone}</dd>
                </div>
              ) : null}
            </dl>
          ) : (
            <p className="mt-2 text-muted">
              Este reporte no incluye datos de contacto.
            </p>
          )}
        </section>
      </div>
    </article>
  );
}
