import { requestJson } from "./api.client";
import { isReportSummary } from "./reports.api";
import type { ReportSummary } from "./reports.api";

export type ReportSearchMatch = ReportSummary & {
  similarity: number;
};

export async function searchReportsByImage(
  file: File,
): Promise<ReportSearchMatch[]> {
  const body = new FormData();
  body.set("image", file);
  const response = await requestJson<{ matches?: unknown } | null>(
    "/api/v1/searches",
    {
      method: "POST",
      body,
    },
  );
  const matches = response?.matches;
  if (!Array.isArray(matches) || !matches.every(isSearchMatch)) {
    throw new Error("Respuesta de búsqueda inesperada.");
  }
  return matches;
}

function isSearchMatch(value: unknown): value is ReportSearchMatch {
  return (
    isReportSummary(value) &&
    "similarity" in value &&
    typeof value.similarity === "number" &&
    Number.isFinite(value.similarity)
  );
}
