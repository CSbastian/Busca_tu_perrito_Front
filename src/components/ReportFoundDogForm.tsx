"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ChileanPhoneInput from "@/components/ChileanPhoneInput";
import Icon from "@/components/Icon";
import { useReportForm } from "@/hooks/useReportForm";
import { acceptedImageTypes } from "@/validation/image.validation";

const fieldClassName =
  "mt-2 w-full rounded-ui border border-input-border bg-surface px-3 py-3 text-base transition-colors duration-150 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export default function ReportFoundDogForm() {
  const [version, setVersion] = useState(0);
  return (
    <ReportForm
      key={version}
      focusFirstField={version > 0}
      onNewReport={() => setVersion((value) => value + 1)}
    />
  );
}

function ReportForm({
  onNewReport,
  focusFirstField,
}: {
  onNewReport: () => void;
  focusFirstField: boolean;
}) {
  const {
    fileName,
    previewUrl,
    imageReady,
    error,
    fieldError,
    clearFieldError,
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
  } = useReportForm();

  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (reportId !== null) successHeadingRef.current?.focus();
  }, [reportId]);

  if (reportId !== null) {
    return (
      <section
        className="report-success"
        aria-labelledby="report-success-heading"
      >
        <h2
          id="report-success-heading"
          ref={successHeadingRef}
          tabIndex={-1}
          className="rounded-ui text-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Reporte publicado
        </h2>
        <p className="mt-3 text-muted">
          La foto y los datos del hallazgo ya están disponibles en el reporte.
        </p>
        <div className="report-success-summary">
          <p className="text-sm text-muted">Lugar del hallazgo</p>
          <p className="mt-2 font-semibold">{location}</p>
        </div>
        <div className="report-success-actions">
          <Link
            className="button-primary"
            href={`/reportes/${encodeURIComponent(reportId)}`}
          >
            Ver reporte
          </Link>
          <button
            type="button"
            className="button-secondary"
            onClick={onNewReport}
          >
            Crear otro reporte
          </button>
        </div>
      </section>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      onChange={(event) => {
        handleFormChange();
        const name = event.target.getAttribute("name");
        if (name) clearFieldError(name);
      }}
      aria-busy={isSubmitting}
      aria-describedby={`report-help${error ? " report-error" : ""}`}
      className="btp-form"
    >
      <fieldset
        disabled={isSubmitting}
        className="report-fields disabled:opacity-60"
      >
        <legend className="sr-only">Datos del perrito encontrado</legend>
        <div className="report-location">
          <label htmlFor="report-location" className="block font-semibold">
            Dónde lo encontraste
          </label>
          <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-[minmax(0,1fr)_auto]">
            <input
              autoFocus={focusFirstField}
              id="report-location"
              name="location"
              data-report-field="location"
              aria-invalid={fieldError?.field === "location" || undefined}
              aria-describedby={`report-location-help${fieldError?.field === "location" ? " report-location-error" : ""}`}
              value={location}
              onChange={handleLocationChange}
              disabled={isLocating}
              required
              maxLength={200}
              placeholder="Comuna y calle o lugar de referencia"
              className={`${fieldClassName} min-w-0 flex-1 disabled:opacity-50`}
            />
            <button
              type="button"
              onClick={detectLocation}
              disabled={isLocating}
              className="mt-2 min-h-11 justify-self-start rounded-ui border border-input-border bg-soft px-4 py-3 text-sm font-semibold text-accent-hover transition-colors duration-150 hover:bg-soft-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:opacity-50"
            >
              {isLocating ? "Detectando…" : "Detectar"}
            </button>
          </div>
          {fieldError?.field === "location" ? (
            <p
              id="report-location-error"
              role="alert"
              className="mt-2 text-sm text-red-700"
            >
              {fieldError.message}
            </p>
          ) : null}
          <p
            id="report-location-help"
            role={locationError ? "alert" : "status"}
            className={`report-location-feedback text-sm ${locationError ? "text-red-700" : "text-muted"}`}
          >
            {locationMessage}
          </p>
        </div>
        <div className="report-photo">
          <p id="report-photo-label" className="font-semibold">
            Foto del perrito
          </p>
          <div
            role="group"
            aria-labelledby="report-photo-label"
            aria-describedby={`report-image-help${fieldError?.field === "image" ? " report-image-error" : ""}`}
            aria-invalid={fieldError?.field === "image" || undefined}
            className="report-photo-actions mt-2 grid grid-cols-2 gap-3"
          >
            <button
              type="button"
              onClick={openCamera}
              className="flex flex-col items-center justify-center gap-2 rounded-ui border border-dashed border-input-border bg-surface px-3 py-5 text-sm font-semibold text-accent transition-colors duration-150 hover:border-accent hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <Icon name="camera" className="h-6 w-6" />
              Abrir cámara
            </button>
            <button
              ref={uploadButtonRef}
              type="button"
              onClick={openFilePicker}
              className="flex flex-col items-center justify-center gap-2 rounded-ui border border-dashed border-input-border bg-surface px-3 py-5 text-sm font-semibold text-accent transition-colors duration-150 hover:border-accent hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <Icon name="upload" className="h-6 w-6" />
              Subir archivo
            </button>
          </div>
          <p id="report-image-help" className="mt-2 text-sm text-muted">
            JPG, PNG o WebP · Máx. 5 MB
          </p>
          <input
            ref={cameraRef}
            type="file"
            accept={acceptedImageTypes.join(",")}
            capture="environment"
            onChange={handleImageChange}
            aria-label="Tomar foto del perrito"
            className="hidden"
          />
          <input
            ref={uploadRef}
            type="file"
            accept={acceptedImageTypes.join(",")}
            onChange={handleImageChange}
            aria-label="Subir foto del perrito"
            className="hidden"
          />
          {fieldError?.field === "image" ? (
            <p
              id="report-image-error"
              role="alert"
              className="mt-2 text-sm text-red-700"
            >
              {fieldError.message}
            </p>
          ) : null}
          {fileName !== null && previewUrl ? (
            <figure className="mt-4">
              <img
                key={previewUrl}
                src={previewUrl}
                alt="Vista previa del perrito encontrado"
                onLoad={handleImageLoad}
                onError={handleImageError}
                className="h-52 w-full rounded-ui bg-soft object-contain"
              />
              <figcaption className="mt-2 break-all text-sm text-muted">
                {fileName}
              </figcaption>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="text-action mt-1"
              >
                Quitar foto
              </button>
            </figure>
          ) : null}
        </div>
        <div className="report-description">
          <label htmlFor="report-description" className="block font-semibold">
            Descripción
          </label>
          <textarea
            id="report-description"
            name="description"
            data-report-field="description"
            aria-invalid={fieldError?.field === "description" || undefined}
            aria-describedby={
              fieldError?.field === "description"
                ? "report-description-error"
                : undefined
            }
            required
            maxLength={1000}
            rows={4}
            placeholder="Color, tamaño, collar y otras características que ayuden a reconocerlo"
            className={fieldClassName}
          />
          {fieldError?.field === "description" ? (
            <p
              id="report-description-error"
              role="alert"
              className="mt-2 text-sm text-red-700"
            >
              {fieldError.message}
            </p>
          ) : null}
        </div>
        <fieldset className="report-contact">
          <legend className="font-semibold">Contacto (opcional)</legend>
          <p className="mt-2 text-sm text-muted">
            Si omites el teléfono, quienes vean el reporte no podrán llamarte
            desde aquí.
          </p>
          <div className="contact-fields">
            <div>
              <label
                htmlFor="report-contact-name"
                className="block font-semibold"
              >
                Tu nombre
              </label>
              <input
                id="report-contact-name"
                name="contactName"
                data-report-field="contactName"
                aria-invalid={fieldError?.field === "contactName" || undefined}
                aria-describedby={
                  fieldError?.field === "contactName"
                    ? "report-contact-name-error"
                    : undefined
                }
                autoComplete="name"
                maxLength={100}
                className={fieldClassName}
              />
              {fieldError?.field === "contactName" ? (
                <p
                  id="report-contact-name-error"
                  role="alert"
                  className="mt-2 text-sm text-red-700"
                >
                  {fieldError.message}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="report-contact-phone"
                className="block font-semibold"
              >
                Teléfono
              </label>
              <ChileanPhoneInput
                id="report-contact-phone"
                name="contactPhone"
                onValueChange={() => {
                  handleFormChange();
                  clearFieldError("contactPhone");
                }}
                error={
                  fieldError?.field === "contactPhone"
                    ? fieldError.message
                    : undefined
                }
              />
            </div>
          </div>
        </fieldset>
      </fieldset>
      {error ? (
        <p id="report-error" role="alert" className="mt-4 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      <div className="report-footer">
        <p id="report-help" className="text-sm text-muted">
          La foto y los datos que ingreses quedarán visibles en el reporte.
        </p>
        <button
          type="submit"
          disabled={!imageReady || isSubmitting || isLocating}
          className="button-primary report-submit"
        >
          {isSubmitting ? "Procesando…" : "Publicar reporte"}
        </button>
      </div>
      <p role="status" className="form-feedback">
        {isSubmitting ? "Publicando el reporte…" : null}
      </p>
    </form>
  );
}
