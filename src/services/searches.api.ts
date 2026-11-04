import { requestJson } from "./api.client";

export type ReportSearchMatch = {
  id: string;
  location: string;
  imageUrl: string;
  similarity: number;
};

export async function searchReportsByImage(
  file: File,
): Promise<ReportSearchMatch[]> {
  const body = new FormData();
  body.set("image", file);
  const { matches } = await requestJson<{ matches: ReportSearchMatch[] }>(
    "/api/v1/searches",
    {
      method: "POST",
      body,
    },
  );
  return matches;
}
