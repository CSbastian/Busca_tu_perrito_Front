import { ApiError } from "./api.client";

export function describeApiError(error: unknown, fallback: string) {
  if (!(error instanceof ApiError)) return fallback;

  let message = fallback;
  switch (error.code) {
    case "validation_error":
      message = "Revisa los datos ingresados e inténtalo de nuevo.";
      break;
    case "invalid_image":
    case "animated_image_not_supported":
    case "unsupported_image_format":
      message = "Selecciona otra foto JPG, PNG o WebP válida y sin animación.";
      break;
    case "image_too_large":
    case "request_too_large":
      message = "Selecciona una foto más pequeña y de hasta 5 MB.";
      break;
    case "report_not_found":
      message = "El reporte no existe.";
      break;
    case "ai_busy":
      message =
        "El análisis de fotos está ocupado. Espera un momento e inténtalo de nuevo.";
      break;
    case "ai_unavailable":
    case "backend_unavailable":
    case "dependencies_unavailable":
      message =
        "El servicio no está disponible en este momento. Inténtalo más tarde.";
      break;
    case "ai_timeout":
      message = "El análisis de la foto tardó demasiado. Inténtalo más tarde.";
      break;
  }

  return error.requestId
    ? `${message} ID de solicitud: ${error.requestId}.`
    : message;
}
