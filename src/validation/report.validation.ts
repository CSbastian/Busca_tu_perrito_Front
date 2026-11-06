import { validateImage } from "./image.validation.ts";

export type ReportField =
  "image" | "location" | "description" | "contactName" | "contactPhone";

export function validateReportIssue(
  data: FormData,
): { field: ReportField; message: string } | null {
  const imageError = validateImage(data.get("image"));
  if (imageError) return { field: "image", message: imageError };
  for (const [name, label, limit] of [
    ["location", "La ubicación", 200],
    ["description", "La descripción", 1000],
  ] as const) {
    const value = data.get(name);
    if (
      typeof value !== "string" ||
      !value.trim() ||
      value.trim().length > limit
    ) {
      return {
        field: name,
        message: `${label} es obligatoria y admite hasta ${limit} caracteres.`,
      };
    }
  }
  const contactName = data.get("contactName");
  if (
    contactName !== null &&
    (typeof contactName !== "string" || contactName.length > 100)
  ) {
    return {
      field: "contactName",
      message: "Tu nombre admite hasta 100 caracteres.",
    };
  }
  const phone = data.get("contactPhone");
  if (
    phone !== null &&
    (typeof phone !== "string" ||
      (phone.trim() && !/^\+56 \d \d{4} \d{4}$/.test(phone)))
  ) {
    return {
      field: "contactPhone",
      message: "Completa los 9 dígitos del teléfono o deja el campo vacío.",
    };
  }
  return null;
}

export function validateReport(data: FormData): string | null {
  return validateReportIssue(data)?.message ?? null;
}
