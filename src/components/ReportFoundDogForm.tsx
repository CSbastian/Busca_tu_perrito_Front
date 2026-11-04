"use client";

import Icon from "@/components/Icon";
import { useReportForm } from "@/hooks/useReportForm";
import { acceptedImageTypes } from "@/validation/image.validation";

const fieldClassName = "mt-2 w-full rounded-ui border border-input-border bg-surface px-3 py-3 text-base transition-colors duration-150 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export default function ReportFoundDogForm() {
  const {
    fileName,
    previewUrl,
    imageReady,
    error,
    isSubmitting,
    submitted,
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

  return (
    <form onSubmit={handleSubmit} onChange={handleFormChange} aria-busy={isSubmitting} aria-describedby={`report-demo${error ? " report-error" : ""}`} className="btp-form">
      <p id="report-demo" className="mb-6 max-w-prose text-sm text-muted">La ubicación, la foto y la descripción son obligatorias. Modo demostración: los datos y la foto no se envían ni se guardan. No se publicará un reporte real.</p>
      <fieldset disabled={isSubmitting} className="report-fields disabled:opacity-60">
        <legend className="sr-only">Datos del perrito encontrado</legend>
        <div className="report-location">
          <label htmlFor="report-location" className="block font-semibold">Dónde lo encontraste</label>
          <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-[minmax(0,1fr)_auto]">
            <input id="report-location" name="location" value={location} onChange={handleLocationChange} disabled={isLocating} required maxLength={200} placeholder="Comuna y calle o lugar de referencia" aria-describedby="report-location-help" className={`${fieldClassName} min-w-0 flex-1 disabled:opacity-50`} />
            <button type="button" onClick={detectLocation} disabled={isLocating} className="mt-2 min-h-11 justify-self-start rounded-ui bg-soft px-4 py-3 text-sm font-semibold text-accent transition-colors duration-150 hover:bg-soft-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:opacity-50">
              {isLocating ? "Detectando…" : "Detectar"}
            </button>
          </div>
          <p id="report-location-help" role={locationError ? "alert" : "status"} className={`mt-2 text-sm ${locationError ? "text-red-700" : "text-muted"}`}>
            {locationMessage || "Escribe el lugar o detecta tus coordenadas actuales. Revisa que corresponda al lugar del hallazgo."}
          </p>
        </div>
        <div className="report-photo">
          <p id="report-photo-label" className="font-semibold">Foto del perrito</p>
          <p id="report-image-help" className="mt-2 text-sm text-muted">Una imagen JPG, PNG o WebP. Máximo 5 MB.</p>
          <div role="group" aria-labelledby="report-photo-label" aria-describedby="report-image-help report-camera-help" className="mt-3 grid grid-cols-2 gap-3">
            <button type="button" onClick={openCamera} className="flex flex-col items-center justify-center gap-2 rounded-ui border border-dashed border-input-border bg-surface px-3 py-5 text-sm font-semibold text-accent transition-colors duration-150 hover:border-accent hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"><Icon name="camera" className="h-6 w-6" />Abrir cámara</button>
            <button ref={uploadButtonRef} type="button" onClick={openFilePicker} className="flex flex-col items-center justify-center gap-2 rounded-ui border border-dashed border-input-border bg-surface px-3 py-5 text-sm font-semibold text-accent transition-colors duration-150 hover:border-accent hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"><Icon name="upload" className="h-6 w-6" />Subir archivo</button>
          </div>
          <input ref={cameraRef} type="file" accept={acceptedImageTypes.join(",")} capture="environment" onChange={handleImageChange} aria-label="Tomar foto del perrito" className="hidden" />
          <input ref={uploadRef} type="file" accept={acceptedImageTypes.join(",")} onChange={handleImageChange} aria-label="Subir foto del perrito" className="hidden" />
          <p id="report-camera-help" className="mt-2 text-sm text-muted">La cámara se abrirá en dispositivos compatibles; en otros aparecerá el selector de archivos.</p>
          {fileName !== null && previewUrl ? (
            <figure className="mt-4">
              <img key={previewUrl} src={previewUrl} alt="Vista previa del perrito encontrado" onLoad={handleImageLoad} onError={handleImageError} className="h-52 w-full rounded-ui bg-soft object-contain" />
              <figcaption className="mt-2 break-all text-sm text-muted">{fileName}</figcaption>
              <button type="button" onClick={handleRemoveImage} className="text-action mt-1">Quitar foto</button>
            </figure>
          ) : null}
        </div>
        <div className="report-description">
          <label htmlFor="report-description" className="block font-semibold">Descripción</label>
          <textarea id="report-description" name="description" required maxLength={1000} rows={4} placeholder="Color, tamaño, collar y otras características que ayuden a reconocerlo" className={fieldClassName} />
        </div>
        <fieldset className="report-contact">
          <legend className="font-semibold">Contacto (opcional)</legend>
          <div className="contact-fields">
            <div>
              <label htmlFor="report-contact-name" className="block font-semibold">Tu nombre</label>
              <input id="report-contact-name" name="contactName" autoComplete="name" maxLength={100} className={fieldClassName} />
            </div>
            <div>
              <label htmlFor="report-contact-phone" className="block font-semibold">Teléfono</label>
              <input id="report-contact-phone" name="contactPhone" type="tel" autoComplete="tel" maxLength={40} placeholder="+56 9 1234 5678" className={fieldClassName} />
            </div>
          </div>
        </fieldset>
      </fieldset>
      {error ? <p id="report-error" role="alert" className="mt-4 text-sm text-red-700">{error}</p> : null}
      <button type="submit" disabled={!imageReady || isSubmitting || isLocating} className="button-primary mt-6">
        {isSubmitting ? "Procesando…" : "Simular envío de reporte"}
      </button>
      <p role="status" className="form-feedback">
        {isSubmitting ? "Procesando el reporte de demostración…" : submitted ? "Simulación completada. No se ha guardado ni publicado ningún reporte." : null}
      </p>
    </form>
  );
}
