import { validateImage } from "./image.validation.ts";

export function validateReport(data: FormData): string | null {
  const imageError = validateImage(data.get("image"));
  if (imageError) return imageError;
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
      return `${label} es obligatoria y admite hasta ${limit} caracteres.`;
    }
  }
  for (const [name, limit] of [
    ["contactName", 100],
    ["contactPhone", 40],
  ] as const) {
    const value = data.get(name);
    if (value !== null && (typeof value !== "string" || value.length > limit)) {
      return "Revisa los datos de contacto.";
    }
  }
  return null;
}
