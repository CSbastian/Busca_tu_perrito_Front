import { ApiError } from "./api.client";

export function describeApiError(error: unknown, fallback: string) {
  if (!(error instanceof ApiError)) return fallback;

  switch (error.code) {
    case "validation_error":
      return "Revisa los datos e inténtalo de nuevo.";
    case "invalid_image":
    case "animated_image_not_supported":
    case "unsupported_image_format":
      return "No pudimos leer esa foto. Elige otra en formato JPG, PNG o WebP.";
    case "image_too_large":
    case "request_too_large":
      return "Prueba con una foto más pequeña.";
    case "report_not_found":
      return "No encontramos ese reporte.";
    case "ai_busy":
    case "ai_unavailable":
    case "backend_unavailable":
    case "dependencies_unavailable":
    case "ai_timeout":
      return "No pudimos completar la solicitud. Inténtalo más tarde.";
    default:
      return fallback;
  }
}
