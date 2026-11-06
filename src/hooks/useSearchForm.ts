import { useRef, useState, useSyncExternalStore } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { searchReportsByImage } from "@/services/searches.api";
import type { ReportSearchMatch } from "@/services/searches.api";
import { describeApiError, isImageApiError } from "@/services/api-errors";
import { validateImage } from "@/validation/image.validation";

type SearchSnapshot = {
  file: File | null;
  previewUrl: string | null;
  matches: ReportSearchMatch[] | null;
};

const emptySearch: SearchSnapshot = {
  file: null,
  previewUrl: null,
  matches: null,
};
let search = emptySearch;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function updateSearch(next: SearchSnapshot) {
  if (search.previewUrl && search.previewUrl !== next.previewUrl) {
    URL.revokeObjectURL(search.previewUrl);
  }
  search = next;
  listeners.forEach((listener) => listener());
}

export function useSearchForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { file, previewUrl, matches } = useSyncExternalStore(
    subscribe,
    () => search,
    () => emptySearch,
  );
  const [readyPreview, setReadyPreview] = useState<string | null>(null);
  const isImageReady = previewUrl !== null && readyPreview === previewUrl;
  const [imageError, setImageError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const searchInProgress = useRef(false);

  function clearImage() {
    updateSearch(emptySearch);
    if (inputRef.current) inputRef.current.value = "";
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (!selected) return;

    setError(null);
    setImageError(null);

    const imageError = validateImage(selected);
    if (imageError) {
      clearImage();
      setImageError(imageError);
      return;
    }

    updateSearch({
      file: selected,
      previewUrl: URL.createObjectURL(selected),
      matches: null,
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (searchInProgress.current) return;
    if (!file || !isImageReady) {
      setImageError("Selecciona una imagen válida antes de buscar.");
      return;
    }

    searchInProgress.current = true;
    setIsSearching(true);
    setError(null);
    const pendingSearch = { file, previewUrl, matches: null };
    updateSearch(pendingSearch);
    try {
      const results = await searchReportsByImage(file);
      if (search === pendingSearch) {
        updateSearch({ ...pendingSearch, matches: results });
      }
    } catch (error) {
      if (isImageApiError(error)) {
        setImageError(describeApiError(error, "Selecciona otra foto."));
        return;
      }
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
    setReadyPreview(previewUrl);
  }

  function handleImageError() {
    clearImage();
    setImageError("No pudimos leer esta imagen. Selecciona otro archivo.");
  }

  function handleRemoveImage() {
    clearImage();
    setImageError(null);
    setError(null);
    inputRef.current?.focus();
  }

  return {
    inputRef,
    fileName: file?.name ?? null,
    previewUrl,
    isImageReady,
    error,
    imageError,
    isSearching,
    matches,
    handleSubmit,
    handleFileChange,
    handleImageLoad,
    handleImageError,
    handleRemoveImage,
  };
}
