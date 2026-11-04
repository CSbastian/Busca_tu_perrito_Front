import { validateReport } from "../validation/report.validation.ts";

export async function reportFoundDog(data: FormData): Promise<void> {
  const error = validateReport(data);
  if (error) throw new Error(error);

  // shortcut: local simulation without persistence, replace when the reports API is available.
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
