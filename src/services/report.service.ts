const imageTypes = ["image/jpeg", "image/png", "image/webp"];

export function validateReport(data: FormData): string | null {
  const image = data.get("image");
  if (!(image instanceof File) || !imageTypes.includes(image.type)) {
    return "Selecciona una foto JPG, PNG o WebP.";
  }
  if (image.size === 0 || image.size > 5 * 1024 * 1024) {
    return "La foto debe tener contenido y pesar como máximo 5 MB.";
  }
  for (const [name, label, limit] of [
    ["location", "La ubicación", 200],
    ["description", "La descripción", 1000],
  ] as const) {
    const value = data.get(name);
    if (typeof value !== "string" || !value.trim() || value.trim().length > limit) {
      return `${label} es obligatoria y admite hasta ${limit} caracteres.`;
    }
  }
  for (const [name, limit] of [["contactName", 100], ["contactPhone", 40]] as const) {
    const value = data.get(name);
    if (value !== null && (typeof value !== "string" || value.length > limit)) {
      return "Revisa los datos de contacto.";
    }
  }
  return null;
}

export async function reportFoundDog(data: FormData): Promise<void> {
  const error = validateReport(data);
  if (error) throw new Error(error);

  // shortcut: local simulation without persistence, replace when the reports API is available.
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
