import { getApiUrl, requestJson } from "./api.client";

const reportsPath = "/api/v1/reports";

export type ReportResponse = {
  id: string;
  location: string;
  description: string;
  contactName: string | null;
  contactPhone: string | null;
  imageUrl: string;
  createdAt: string;
};

export function createReport(data: FormData): Promise<ReportResponse> {
  return requestJson<ReportResponse>(reportsPath, {
    method: "POST",
    body: data,
  });
}

export function getReport(id: string): Promise<ReportResponse> {
  return requestJson<ReportResponse>(
    `${reportsPath}/${encodeURIComponent(id)}`,
  );
}

export function getReportImageUrl(id: string): string {
  return getApiUrl(`${reportsPath}/${encodeURIComponent(id)}/image`);
}
