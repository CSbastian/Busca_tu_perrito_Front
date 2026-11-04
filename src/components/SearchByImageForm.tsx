"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { searchByImage } from "@/services/search.service";
import type { SearchMatch } from "@/services/search.service";
import Icon from "@/components/Icon";

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
const maxFileSize = 5 * 1024 * 1024;
const radiusOptions = [2, 5, 10, 20];
const breedOptions = ["Golden Retriever", "Labrador", "Beagle", "Poodle", "Mestizo / Cruce", "Otra"];

export default function SearchByImageForm() {
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
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

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

    if (!allowedTypes.includes(selected.type)) {
      event.target.value = "";
      setError("Selecciona una imagen JPG, PNG o WebP.");
      return;
    }
    if (selected.size === 0 || selected.size > maxFileSize) {
      event.target.value = "";
      setError("La imagen debe tener contenido y pesar como máximo 5 MB.");
      return;
    }

    setFile(selected);
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

  return (
    <form onSubmit={handleSubmit} aria-busy={isSearching} className="btp-form">
      <label htmlFor="search-image" className="block font-semibold">Foto de tu perrito</label>
      <p id="image-help" className="mt-2 text-sm text-muted">Una imagen JPG, PNG o WebP. Máximo 5 MB.</p>
      <div className="upload-area mt-4">
        <div aria-hidden="true" className="pointer-events-none flex flex-col items-center gap-2">
          <Icon name="upload" className="mb-2 h-8 w-8 text-accent" />
          <span className="font-bold">{file ? "Cambiar foto" : "Seleccionar una foto"}</span>
          <span className="text-sm text-muted">Una foto clara, sin filtros ni recortes excesivos.</span>
        </div>
        <input
          ref={inputRef}
          id="search-image"
          name="image"
          type="file"
          accept={allowedTypes.join(",")}
          onChange={handleFileChange}
          disabled={isSearching}
          aria-describedby={`image-help${error ? " search-error" : ""}`}
          aria-invalid={error ? true : undefined}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        />
      </div>

      {file && previewUrl ? (
        <figure className="mt-6">
          <img
            key={previewUrl}
            src={previewUrl}
            alt="Vista previa de la foto seleccionada para buscar"
            onLoad={() => setIsImageReady(true)}
            onError={() => {
              clearImage();
              setError("No pudimos leer esta imagen. Selecciona otro archivo.");
            }}
            className="h-56 w-full rounded-ui bg-soft object-contain"
          />
          <figcaption className="mt-2 break-all text-sm text-muted">{file.name}</figcaption>
          <button type="button" disabled={isSearching} onClick={() => { clearImage(); setError(null); inputRef.current?.focus(); }} className="text-action mt-1">
            Quitar imagen
          </button>
        </figure>
      ) : null}

      {error ? <p id="search-error" role="alert" className="mt-4 text-sm text-red-700">{error}</p> : null}

      <div className="search-filters">
        <fieldset disabled={isSearching} aria-describedby="radius-help">
          <legend className="font-semibold">Radio de búsqueda</legend>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {radiusOptions.map((radius) => (
              <label key={radius} className={isSearching ? "cursor-not-allowed" : "cursor-pointer"}>
                <input type="radio" name="radiusKm" value={radius} checked={radiusKm === radius}
                  onChange={() => { setRadiusKm(radius); setMatches(null); }} className="peer sr-only" />
                <span className="flex min-h-11 items-center justify-center rounded-ui border border-input-border bg-surface px-2 py-2 font-semibold text-muted transition-colors duration-150 hover:border-accent peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-accent peer-disabled:opacity-50">{radius} km</span>
              </label>
            ))}
          </div>
          <p id="radius-help" className="mt-2 text-sm text-muted">En esta demostración no se aplica una ubicación real.</p>
        </fieldset>
        <div>
          <label htmlFor="search-breed" className="block font-semibold">Raza (opcional)</label>
          <select
            id="search-breed"
            name="breed"
            value={breed}
            onChange={(event) => { setBreed(event.target.value); setMatches(null); }}
            disabled={isSearching}
            className="mt-2 w-full rounded-ui border border-input-border bg-surface px-3 py-3 text-base focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:opacity-50"
          >
            <option value="">Cualquier raza</option>
            {breedOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">Modo demostración: la búsqueda es simulada y tu imagen no se envía a ningún servidor.</p>
      <button type="submit" disabled={!file || !isImageReady || isSearching} className="button-primary mt-4">
        <Icon name="search" /> {isSearching ? "Buscando…" : "Buscar"}
      </button>
      <div role="status" aria-live="polite" className="form-feedback">
        {isSearching ? "Procesando la búsqueda de demostración…" : null}
        {matches !== null ? (
          matches.length === 0
            ? "Simulación completada: sin coincidencias de ejemplo. Esto no indica si tu perrito está reportado. Puedes probar con otra imagen."
            : `Coincidencias de demostración: ${matches.length}.`
        ) : null}
      </div>
    </form>
  );
}
