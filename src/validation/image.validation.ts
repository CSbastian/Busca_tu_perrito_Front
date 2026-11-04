export const acceptedImageTypes: readonly string[] = ["image/jpeg", "image/png", "image/webp"];
const maxImageSize = 5 * 1024 * 1024;

export function validateImage(value: FormDataEntryValue | null): string | null {
  if (!(value instanceof File) || !acceptedImageTypes.includes(value.type)) {
    return "Selecciona una foto JPG, PNG o WebP.";
  }
  if (value.size === 0 || value.size > maxImageSize) {
    return "La foto debe tener contenido y pesar como máximo 5 MB.";
  }
  return null;
}
