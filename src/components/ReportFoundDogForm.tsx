"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { reportFoundDog, validateReport } from "@/services/report.service";
import Icon from "@/components/Icon";

const fieldClassName = "mt-2 w-full rounded-ui border border-input-border bg-surface px-3 py-3 text-base transition-colors duration-150 hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export default function ReportFoundDogForm() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageReady, setImageReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [location, setLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");
  const [locationError, setLocationError] = useState(false);
  const cameraRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const uploadButtonRef = useRef<HTMLButtonElement>(null);
  const locationRequest = useRef(0);

  useEffect(() => () => { locationRequest.current += 1; }, []);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (!selected) return;
    event.target.value = "";
    setFile(null);
    setPreviewUrl(null);
    setImageReady(false);
    setError(null);

    if (!["image/jpeg", "image/png", "image/webp"].includes(selected.type) || selected.size === 0 || selected.size > 5 * 1024 * 1024) {
      setError("Selecciona una foto JPG, PNG o WebP con contenido y de hasta 5 MB.");
      return;
    }
    setFile(selected);
  }

  function detectLocation() {
    if (isLocating || isSubmitting) return;
    setSubmitted(false);
    setLocationError(false);
    if (!window.isSecureContext || !navigator.geolocation) {
      setLocationError(true);
      setLocationMessage("La ubicación no está disponible. Usa HTTPS o localhost, o escribe el lugar manualmente.");
      return;
    }

    setIsLocating(true);
    setLocationMessage("Detectando tu ubicación…");
    const request = ++locationRequest.current;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        if (request !== locationRequest.current) return;
        setLocation(`${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`);
        setLocationMessage(`Ubicación actual detectada (precisión aproximada: ${Math.round(coords.accuracy)} m). Puedes editarla si encontraste al perrito en otro lugar.`);
        setIsLocating(false);
      },
      ({ code }) => {
        if (request !== locationRequest.current) return;
        setLocationError(true);
        setLocationMessage(code === 1
          ? "No se autorizó el acceso a la ubicación. Puedes habilitarlo en el navegador o escribir el lugar manualmente."
          : code === 3
            ? "La detección tardó demasiado. Reintenta o escribe el lugar manualmente."
            : "No pudimos detectar tu ubicación. Reintenta o escribe el lugar manualmente.");
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting || isLocating) return;
    setSubmitted(false);
    const data = new FormData(event.currentTarget);
    if (file) data.set("image", file);
    const validationError = validateReport(data);
    if (validationError || !imageReady) {
      setError(validationError ?? "No pudimos leer la foto. Selecciona otra imagen.");
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await reportFoundDog(data);
      setSubmitted(true);
    } catch {
      setError("No pudimos procesar el reporte. Conservamos los datos para que puedas reintentar.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} onChange={() => setSubmitted(false)} aria-busy={isSubmitting} aria-describedby={`report-demo${error ? " report-error" : ""}`} className="btp-form">
      <p id="report-demo" className="mb-6 max-w-prose text-sm text-muted">La ubicación, la foto y la descripción son obligatorias. Modo demostración: los datos y la foto no se envían ni se guardan. No se publicará un reporte real.</p>
      <fieldset disabled={isSubmitting} className="report-fields disabled:opacity-60">
        <legend className="sr-only">Datos del perrito encontrado</legend>
        <div className="report-location">
          <label htmlFor="report-location" className="block font-semibold">Dónde lo encontraste</label>
          <div className="grid grid-cols-1 gap-x-2 sm:grid-cols-[minmax(0,1fr)_auto]">
            <input id="report-location" name="location" value={location} onChange={(event) => { setLocation(event.target.value); setLocationMessage(""); setLocationError(false); }} disabled={isLocating} required maxLength={200} placeholder="Comuna y calle o lugar de referencia" aria-describedby="report-location-help" className={`${fieldClassName} min-w-0 flex-1 disabled:opacity-50`} />
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
            <button type="button" onClick={() => cameraRef.current?.click()} className="flex flex-col items-center justify-center gap-2 rounded-ui border border-dashed border-input-border bg-surface px-3 py-5 text-sm font-semibold text-accent transition-colors duration-150 hover:border-accent hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"><Icon name="camera" className="h-6 w-6" />Abrir cámara</button>
            <button ref={uploadButtonRef} type="button" onClick={() => uploadRef.current?.click()} className="flex flex-col items-center justify-center gap-2 rounded-ui border border-dashed border-input-border bg-surface px-3 py-5 text-sm font-semibold text-accent transition-colors duration-150 hover:border-accent hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"><Icon name="upload" className="h-6 w-6" />Subir archivo</button>
          </div>
          <input ref={cameraRef} type="file" accept="image/jpeg,image/png,image/webp" capture="environment" onChange={handleImageChange} aria-label="Tomar foto del perrito" className="hidden" />
          <input ref={uploadRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} aria-label="Subir foto del perrito" className="hidden" />
          <p id="report-camera-help" className="mt-2 text-sm text-muted">La cámara se abrirá en dispositivos compatibles; en otros aparecerá el selector de archivos.</p>
          {file && previewUrl ? (
            <figure className="mt-4">
              <img key={previewUrl} src={previewUrl} alt="Vista previa del perrito encontrado" onLoad={() => setImageReady(true)} onError={() => { setImageReady(false); setFile(null); setError("No pudimos leer la foto. Selecciona otra imagen."); }} className="h-52 w-full rounded-ui bg-soft object-contain" />
              <figcaption className="mt-2 break-all text-sm text-muted">{file.name}</figcaption>
              <button type="button" onClick={() => { setFile(null); setPreviewUrl(null); setImageReady(false); setError(null); setSubmitted(false); uploadButtonRef.current?.focus(); }} className="text-action mt-1">Quitar foto</button>
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
