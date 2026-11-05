import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { searchReportsByImage } from "@/services/searches.api";
import type { ReportSearchMatch } from "@/services/searches.api";
import { describeApiError } from "@/services/api-errors";
import { validateImage } from "@/validation/image.validation";

export function useSearchForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isImageReady, setIsImageReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [matches, setMatches] = useState<ReportSearchMatch[] | null>(null);
  const searchInProgress = useRef(false);

  useEffect(() => {
    if (!previewUrl) return;
    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  function clearImage(resetInput = true) {
    setFile(null);
    setPreviewUrl(null);
    setIsImageReady(false);
    setMatches(null);
    if (resetInput && inputRef.current) inputRef.current.value = "";
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (!selected) return;

    clearImage(false);
    setError(null);

    const imageError = validateImage(selected);
    if (imageError) {
      event.target.value = "";
      setError(imageError);
      return;
    }

    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (searchInProgress.current) return;
    if (!file || !isImageReady) {
      setError("Selecciona una imagen válida antes de buscar.");
      return;
    }

    searchInProgress.current = true;
    setIsSearching(true);
    setError(null);
    setMatches(null);
    try {
      setMatches(await searchReportsByImage(file));
    } catch (error) {
      setError(
        describeApiError(
          error,
          "No pudimos realizar la búsqueda. Inténtalo de nuevo.",
        ),
      );
    } finally {
      searchInProgress.current = false;
      setIsSearching(false);
    }
  }

  function handleImageLoad() {
    setIsImageReady(true);
  }

  function handleImageError() {
    clearImage();
    setError("No pudimos leer esta imagen. Selecciona otro archivo.");
  }

  function handleRemoveImage() {
    clearImage();
    setError(null);
    inputRef.current?.focus();
  }

  return {
    inputRef,
    fileName: file?.name ?? null,
    previewUrl,
    isImageReady,
    error,
    isSearching,
    matches,
    handleSubmit,
    handleFileChange,
    handleImageLoad,
    handleImageError,
    handleRemoveImage,
  };
}
