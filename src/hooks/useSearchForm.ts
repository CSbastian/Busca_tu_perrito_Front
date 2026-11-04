import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { searchByImage } from "@/services/search.service";
import type { SearchMatch } from "@/services/search.service";
import { validateImage } from "@/validation/image.validation";

export function useSearchForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isImageReady, setIsImageReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [matches, setMatches] = useState<SearchMatch[] | null>(null);
  const [radiusKm, setRadiusKm] = useState(5);
  const [breed, setBreed] = useState("");

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
    if (isSearching) return;
    if (!file || !isImageReady) {
      setError("Selecciona una imagen válida antes de buscar.");
      return;
    }

    setIsSearching(true);
    setError(null);
    setMatches(null);
    try {
      setMatches(await searchByImage(file, { radiusKm, breed: breed || null }));
    } catch {
      setError("No pudimos realizar la búsqueda. Inténtalo de nuevo.");
    } finally {
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

  function handleRadiusChange(radius: number) {
    setRadiusKm(radius);
    setMatches(null);
  }

  function handleBreedChange(event: ChangeEvent<HTMLSelectElement>) {
    setBreed(event.target.value);
    setMatches(null);
  }

  return {
    inputRef,
    fileName: file?.name ?? null,
    previewUrl,
    isImageReady,
    error,
    isSearching,
    matches,
    radiusKm,
    breed,
    handleSubmit,
    handleFileChange,
    handleImageLoad,
    handleImageError,
    handleRemoveImage,
    handleRadiusChange,
    handleBreedChange,
  };
}
