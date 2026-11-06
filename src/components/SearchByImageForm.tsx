"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";
import { useSearchForm } from "@/hooks/useSearchForm";
import { acceptedImageTypes } from "@/validation/image.validation";

export default function SearchByImageForm() {
  const [showFilters, setShowFilters] = useState(false);
  const {
    inputRef,
    fileName,
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
  } = useSearchForm();

  return (
    <form onSubmit={handleSubmit} aria-busy={isSearching} className="btp-form">
      <label htmlFor="search-image" className="block font-semibold">
        Foto de tu perrito
      </label>
      <div className="upload-area search-upload-area mt-3">
        <div
          aria-hidden="true"
          className="pointer-events-none flex flex-col items-center gap-2"
        >
          {previewUrl ? (
            <img
              key={previewUrl}
              src={previewUrl}
              alt=""
              onLoad={handleImageLoad}
              onError={handleImageError}
              className="h-44 w-full rounded-ui object-contain"
            />
          ) : (
            <Icon name="upload" className="mb-2 h-8 w-8 text-accent" />
          )}
          <span className="inline-flex min-h-11 items-center rounded-ui border border-line bg-surface px-4 py-2 font-bold text-accent">
            {fileName !== null ? "Cambiar foto" : "Seleccionar foto"}
          </span>
          {fileName !== null ? (
            <span className="max-w-full break-all text-sm text-muted">
              {fileName}
            </span>
          ) : null}
        </div>
        <input
          ref={inputRef}
          id="search-image"
          name="image"
          type="file"
          accept={acceptedImageTypes.join(",")}
          onChange={handleFileChange}
          disabled={isSearching}
          aria-describedby={`image-help${imageError ? " search-image-error" : ""}`}
          aria-invalid={imageError ? true : undefined}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
        />
      </div>

      <p id="image-help" className="mt-2 text-sm text-muted">
        JPG, PNG o WebP · Máx. 5 MB
      </p>
      {fileName !== null && previewUrl ? (
        <button
          type="button"
          disabled={isSearching}
          onClick={handleRemoveImage}
          className="text-action mt-1"
        >
          Quitar foto
        </button>
      ) : null}

      {imageError ? (
        <p
          id="search-image-error"
          role="alert"
          className="mt-4 text-sm text-red-700"
        >
          {imageError}
        </p>
      ) : null}

      <div className="mt-4">
        <button
          type="button"
          aria-expanded={showFilters}
          aria-controls="search-filters-preview"
          onClick={() => setShowFilters((shown) => !shown)}
          className="inline-flex min-h-11 items-center gap-2 rounded-ui text-sm text-muted transition-colors duration-150 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Icon
            name="arrow"
            className={`h-4 w-4 ${showFilters ? "-rotate-90" : "rotate-90"}`}
          />
          <span className="underline underline-offset-4">Filtros</span>
          <span>· Próximamente</span>
        </button>
        <div
          id="search-filters-preview"
          hidden={!showFilters}
          className="mt-2 border-t border-line pt-4"
        >
          <p id="search-filters-preview-help" className="text-sm text-muted">
            Vista previa. Estos filtros aún no están disponibles y no se aplican
            a la búsqueda.
          </p>
          <fieldset
            disabled
            aria-describedby="search-filters-preview-help"
            className="mt-4 grid gap-5 sm:grid-cols-2"
          >
            <legend className="sr-only">Filtros previstos</legend>
            <fieldset>
              <legend className="text-sm font-semibold text-muted">
                Radio de búsqueda
              </legend>
              <div className="mt-2 grid grid-cols-4 gap-2 opacity-60">
                {[2, 5, 10, 20].map((radius) => (
                  <label
                    key={radius}
                    className="flex min-h-11 cursor-not-allowed items-center justify-center rounded-ui border border-input-border bg-surface px-2 text-sm text-muted"
                  >
                    <input
                      type="radio"
                      name="previewRadius"
                      value={radius}
                      className="sr-only"
                    />
                    {radius} km
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <label
                htmlFor="search-breed-preview"
                className="block text-sm font-semibold text-muted"
              >
                Raza
              </label>
              <select
                id="search-breed-preview"
                className="mt-2 min-h-11 w-full cursor-not-allowed rounded-ui border border-input-border bg-surface px-3 py-2 text-base text-muted opacity-60"
              >
                <option>Cualquier raza</option>
              </select>
            </div>
          </fieldset>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        La foto se enviará para compararla con los reportes.
      </p>
      <button
        type="submit"
        disabled={fileName === null || !isImageReady || isSearching}
        className="button-primary mt-4"
      >
        <Icon name="search" /> {isSearching ? "Buscando…" : "Buscar"}
      </button>
      {error ? (
        <p role="alert" className="mt-4 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      <div role="status" aria-live="polite" className="form-feedback">
        {isSearching ? "Comparando la foto con los reportes…" : null}
        {matches?.length === 0
          ? "No encontramos candidatos para esta búsqueda. Prueba con otra foto clara de tu perrito."
          : null}
        {matches && matches.length > 0
          ? `Posibles coincidencias: ${matches.length}.`
          : null}
      </div>
      {matches?.length === 0 ? (
        <button
          type="button"
          className="text-action mt-2"
          onClick={() => inputRef.current?.click()}
        >
          Elegir otra foto
        </button>
      ) : null}
      {matches && matches.length > 0 ? (
        <p className="mt-4 text-sm text-muted">
          Los candidatos están ordenados por parecido con tu foto. Revisa sus
          características y el lugar del hallazgo. Una coincidencia no confirma
          que sea tu perrito.
        </p>
      ) : null}
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
