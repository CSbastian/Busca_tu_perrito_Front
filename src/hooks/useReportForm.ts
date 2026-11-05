import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { createReport } from "@/services/reports.api";
import { ApiError } from "@/services/api.client";
import { describeApiError } from "@/services/api-errors";
import { validateReport } from "@/validation/report.validation";
import { validateImage } from "@/validation/image.validation";

export function useReportForm() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageReady, setImageReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);
  const submitInProgress = useRef(false);
  const [location, setLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");
  const [locationError, setLocationError] = useState(false);
  const cameraRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const uploadButtonRef = useRef<HTMLButtonElement>(null);
  const locationRequest = useRef(0);

  useEffect(
    () => () => {
      locationRequest.current += 1;
    },
    [],
  );

  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  function openCamera() {
    cameraRef.current?.click();
  }

  function openFilePicker() {
    uploadRef.current?.click();
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (!selected) return;
    event.target.value = "";
    setFile(null);
    setPreviewUrl(null);
    setImageReady(false);
    setError(null);

    const imageError = validateImage(selected);
    if (imageError) {
      setError(imageError);
      return;
    }
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  }

  function detectLocation() {
    if (isLocating || isSubmitting) return;
    setReportId(null);
    setLocationError(false);
    if (!window.isSecureContext || !navigator.geolocation) {
      setLocationError(true);
      setLocationMessage(
        "La ubicación no está disponible. Usa HTTPS o localhost, o escribe el lugar manualmente.",
      );
      return;
    }

    setIsLocating(true);
    setLocationMessage("Detectando tu ubicación…");
    const request = ++locationRequest.current;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (request !== locationRequest.current) return;
        setLocation(
          `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`,
        );
        setLocationMessage(
          `Ubicación actual detectada (precisión aproximada: ${Math.round(coords.accuracy)} m). Puedes editarla si encontraste al perrito en otro lugar.`,
        );
        setIsLocating(false);
      },
      ({ code }) => {
        if (request !== locationRequest.current) return;
        setLocationError(true);
        setLocationMessage(
          code === 1
            ? "No se autorizó el acceso a la ubicación. Puedes habilitarlo en el navegador o escribir el lugar manualmente."
            : code === 3
              ? "La detección tardó demasiado. Reintenta o escribe el lugar manualmente."
              : "No pudimos detectar tu ubicación. Reintenta o escribe el lugar manualmente.",
        );
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitInProgress.current || isLocating || reportId !== null) return;
    const data = new FormData(event.currentTarget);
    if (file) data.set("image", file);
    const validationError = validateReport(data);
    if (validationError || !imageReady) {
      setError(
        validationError ?? "No pudimos leer la foto. Selecciona otra imagen.",
      );
      return;
    }

    setError(null);
    for (const field of ["contactName", "contactPhone"]) {
      const value = data.get(field);
      if (typeof value === "string" && !value.trim()) data.delete(field);
    }

    submitInProgress.current = true;
    setIsSubmitting(true);
    try {
      const report = await createReport(data);
      setReportId(report.id);
    } catch (error) {
      const mayHaveSaved =
        !(error instanceof ApiError) ||
        error.status === 201 ||
        error.status === 500 ||
        error.code === "backend_unavailable" ||
        (!error.code && error.status >= 500);
      const message = describeApiError(
        error,
        "No pudimos confirmar el envío del reporte.",
      );
      setError(
        mayHaveSaved
          ? `${message} El reporte pudo haberse guardado. Antes de volver a enviarlo, comprueba si aparece en la búsqueda.`
          : message,
      );
    } finally {
      submitInProgress.current = false;
      setIsSubmitting(false);
    }
  }

  function handleFormChange() {
    setReportId(null);
  }

  function handleLocationChange(event: ChangeEvent<HTMLInputElement>) {
    setLocation(event.target.value);
    setLocationMessage("");
    setLocationError(false);
  }

  function handleImageLoad() {
    setImageReady(true);
  }

  function handleImageError() {
    setImageReady(false);
    setFile(null);
    setPreviewUrl(null);
    setError("No pudimos leer la foto. Selecciona otra imagen.");
  }

  function handleRemoveImage() {
    setFile(null);
    setPreviewUrl(null);
    setImageReady(false);
    setError(null);
    setReportId(null);
    uploadButtonRef.current?.focus();
  }

  return {
    fileName: file?.name ?? null,
    previewUrl,
    imageReady,
    error,
    isSubmitting,
    reportId,
    location,
    isLocating,
    locationMessage,
    locationError,
    cameraRef,
    uploadRef,
    uploadButtonRef,
    openCamera,
    openFilePicker,
    handleSubmit,
    handleFormChange,
    handleLocationChange,
    detectLocation,
    handleImageChange,
    handleImageLoad,
    handleImageError,
    handleRemoveImage,
  };
}
