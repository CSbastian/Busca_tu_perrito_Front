import { requestJson } from "./api.client";

const reportsPath = "/api/v1/reports";

export type ReportSummary = {
  id: string;
  location: string;
  imageUrl: string;
};

export type ReportResponse = ReportSummary & {
  description: string;
  contactName: string | null;
  contactPhone: string | null;
  createdAt: string;
};

export function isReportSummary(value: unknown): value is ReportSummary {
  if (typeof value !== "object" || value === null) return false;
  const report = value as Partial<ReportSummary>;
  return (
    typeof report.id === "string" &&
    /^[a-zA-Z0-9-]+$/.test(report.id) &&
    typeof report.location === "string" &&
    report.imageUrl === `${reportsPath}/${report.id}/image`
  );
}

function readReport(value: unknown): ReportResponse {
  if (isReportSummary(value)) {
    const report = value as Partial<ReportResponse>;
    if (
      typeof report.description === "string" &&
      typeof report.createdAt === "string" &&
      (report.contactName === null || typeof report.contactName === "string") &&
      (report.contactPhone === null || typeof report.contactPhone === "string")
    )
      return report as ReportResponse;
  }
  throw new Error("Respuesta de reporte inesperada.");
}

export async function createReport(data: FormData): Promise<ReportResponse> {
  const report = await requestJson<unknown>(
    reportsPath,
    { method: "POST", body: data },
    201,
  );
  return readReport(report);
}

export async function getReport(
  id: string,
  signal?: AbortSignal,
): Promise<ReportResponse> {
  const report = await requestJson<unknown>(
    `${reportsPath}/${encodeURIComponent(id)}`,
    { signal },
  );
  return readReport(report);
}
