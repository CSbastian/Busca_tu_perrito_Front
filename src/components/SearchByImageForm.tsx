"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import { useSearchForm } from "@/hooks/useSearchForm";
import { acceptedImageTypes } from "@/validation/image.validation";

const radiusOptions = [2, 5, 10, 20];
const breedOptions = [
  "Golden Retriever",
  "Labrador",
  "Beagle",
  "Poodle",
  "Mestizo / Cruce",
  "Otra",
];

export default function SearchByImageForm() {
  const {
    inputRef,
    fileName,
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
  } = useSearchForm();

  return (
    <form onSubmit={handleSubmit} aria-busy={isSearching} className="btp-form">
      <label htmlFor="search-image" className="block font-semibold">
        Foto de tu perrito
      </label>
      <p id="image-help" className="mt-2 text-sm text-muted">
        Una imagen JPG, PNG o WebP. Máximo 5 MB.
      </p>
      <div className="upload-area mt-4">
        <div
          aria-hidden="true"
          className="pointer-events-none flex flex-col items-center gap-2"
        >
          <Icon name="upload" className="mb-2 h-8 w-8 text-accent" />
          <span className="font-bold">
            {fileName !== null ? "Cambiar foto" : "Seleccionar una foto"}
          </span>
          <span className="text-sm text-muted">
            Una foto clara, sin filtros ni recortes excesivos.
          </span>
        </div>
        <input
          ref={inputRef}
          id="search-image"
          name="image"
          type="file"
          accept={acceptedImageTypes.join(",")}
          onChange={handleFileChange}
          disabled={isSearching}
          aria-describedby={`image-help${error ? " search-error" : ""}`}
          aria-invalid={error ? true : undefined}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        />
      </div>

      {fileName !== null && previewUrl ? (
        <figure className="mt-6">
          <img
            key={previewUrl}
            src={previewUrl}
            alt="Vista previa de la foto seleccionada para buscar"
            onLoad={handleImageLoad}
            onError={handleImageError}
            className="h-56 w-full rounded-ui bg-soft object-contain"
          />
          <figcaption className="mt-2 break-all text-sm text-muted">
            {fileName}
          </figcaption>
          <button
            type="button"
            disabled={isSearching}
            onClick={handleRemoveImage}
            className="text-action mt-1"
          >
            Quitar imagen
          </button>
        </figure>
      ) : null}

      {error ? (
        <p id="search-error" role="alert" className="mt-4 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <fieldset
        disabled
        aria-describedby="search-filters-help"
        className="mt-6"
      >
        <legend className="font-semibold">Filtros de búsqueda</legend>
        <p id="search-filters-help" className="mt-2 text-sm text-muted">
          Los filtros de radio y raza aún no están disponibles.
        </p>
        <div className="search-filters">
          <fieldset>
            <legend className="font-semibold">Radio de búsqueda</legend>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {radiusOptions.map((radius) => (
                <label key={radius} className="cursor-not-allowed">
                  <input
                    type="radio"
                    name="radiusKm"
                    value={radius}
                    className="sr-only"
                  />
                  <span className="flex min-h-11 items-center justify-center rounded-ui border border-input-border bg-surface px-2 py-2 font-semibold text-muted opacity-50">
                    {radius} km
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label htmlFor="search-breed" className="block font-semibold">
              Raza (opcional)
            </label>
            <select
              id="search-breed"
              name="breed"
              className="mt-2 w-full cursor-not-allowed rounded-ui border border-input-border bg-surface px-3 py-3 text-base opacity-50"
            >
              <option value="">Cualquier raza</option>
              {breedOptions.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <p className="mt-6 text-sm text-muted">
        La foto se envía para compararla con los reportes.
      </p>
      <button
        type="submit"
        disabled={fileName === null || !isImageReady || isSearching}
        className="button-primary mt-4"
      >
        <Icon name="search" /> {isSearching ? "Buscando…" : "Buscar"}
      </button>
      <div role="status" aria-live="polite" className="form-feedback">
        {isSearching ? "Comparando la foto con los reportes…" : null}
        {matches?.length === 0
          ? "No encontramos candidatos para esta búsqueda."
          : null}
        {matches && matches.length > 0
          ? `Posibles coincidencias: ${matches.length}.`
          : null}
      </div>
      {matches && matches.length > 0 ? (
        <ol className="mt-4 grid gap-4" aria-label="Posibles coincidencias">
          {matches.map((match) => (
            <li
              key={match.id}
              className="grid items-center gap-4 rounded-ui border border-line p-4 sm:grid-cols-[9rem_minmax(0,1fr)]"
            >
              <img
                src={match.imageUrl}
                alt="Foto del perrito reportado"
                className="h-40 w-full rounded-ui bg-surface object-contain sm:h-28"
              />
              <div className="min-w-0 [overflow-wrap:anywhere]">
                <p className="font-semibold">{match.location}</p>
                <p className="mt-1 text-sm text-muted">
                  Similitud visual: {match.similarity.toFixed(2)}
                </p>
                <Link
                  className="text-action"
                  href={`/reportes/${encodeURIComponent(match.id)}`}
                >
                  Ver reporte
                </Link>
              </div>
            </li>
          ))}
        </ol>
      ) : null}
    </form>
  );
}
