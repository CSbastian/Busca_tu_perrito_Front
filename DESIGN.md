---
name: Busca tu perrito
description: Cálido — crema, ámbar y café, inspirado en el mockup aprobado.
colors:
  canvas: "#fffbf5"
  surface: "#fff8ee"
  soft: "#fff0da"
  soft-strong: "#f4e0d0"
  line: "#e8d5c0"
  input-border: "#a17f5b"
  ink: "#1c1208"
  muted: "#7a5c44"
  accent: "#b45309"
  accent-hover: "#92400e"
  mark: "#d97706"
  on-accent: "#ffffff"
  error: "oklch(50.5% 0.213 27.518)"
typography:
  display:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "clamp(1.875rem, 5vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.2
  headline:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: "2rem"
  body:
    fontFamily: "Nunito, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Nunito, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.625
rounded:
  ui: "7px"
spacing:
  small: "8px"
  medium: "16px"
  section: "24px"
  spacious: "32px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.ui}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.ui}"
    padding: "12px"
  action-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.ui}"
  action-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.ui}"
  navigation-active:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.accent}"
    rounded: "{rounded.ui}"
---

# Design System: Busca tu perrito

## Overview

Dirección **Cálido**, seleccionada por el usuario para Inicio, Buscar y Reportar. Reemplaza la dirección anterior azul/Arial. Se inspira en el mockup de `contexto-proyecto-btp/mockup-proyecto`: fondos crema, acento ámbar, texto café, títulos serif y cuerpo redondeado. La redondez de **7 px** conserva el ajuste elegido en la propuesta interactiva.

La interfaz busca cercanía y claridad para personas que buscan a un perro o reportan uno encontrado. `PRODUCT.md` conserva la autoridad sobre alcance y capacidades; las métricas, cobertura y afirmaciones ilustrativas del mockup no son hechos del producto.

## Colors

`src/app/globals.css` define los tokens semánticos compartidos mediante `@theme inline`. Usar `bg-canvas`, `bg-surface`, `text-ink`, `text-muted`, `bg-accent`, `border-line` y `border-input-border` en vez de introducir colores por pantalla.

- Crema (`canvas`) para el fondo y crema suave (`surface`) para superficies de entrada y paneles secundarios.
- Ámbar profundo (`accent`) para acciones con texto blanco, enlaces y foco; `accent-hover` para hover.
- Ámbar luminoso (`mark`) para la marca sobre fondo sólido, con dibujo café. No usarlo con texto blanco de tamaño normal.
- Café oscuro (`ink`) para títulos y etiquetas; café secundario (`muted`) para ayuda y descripciones.
- `line` separa regiones; `input-border` identifica campos y zonas de carga con contraste mínimo de 3:1 sobre la superficie (3.49:1 en la paleta actual).
- Rojo (`error`, Tailwind red-700) se reserva para errores con mensaje textual. Los estados nunca dependen solo del color.

## Typography

**DM Serif Display 400** para títulos de página, títulos de acciones y marca. **Nunito 400/600/700/800** para cuerpo, etiquetas, navegación y acciones. Las fuentes se sirven localmente con `next/font/local`; archivos y licencias OFL en `public/fonts/`.

Títulos de página: escala fluida entre 30 y 40 px, interlineado 1.2. Títulos de acciones y secciones: 24 px, peso 400. Cuerpo y campos editables: 16 px; ayuda: 14 px. Usar pesos 600 o 700 de Nunito para etiquetas y acciones, sin simular negrita en la serif. Mantener títulos equilibrados y texto secundario legible.

## Layout

Inicio y Buscar usan `.app-main`, con ancho máximo de lectura de 670 px incluyendo laterales de 24 px, centrado, espacio superior de 32 px en móvil y 40 px desde 640 px. Reportar conserva esa base hasta 959 px; desde 960 px usa `.app-main--report` con máximo de 960 px. La cabecera compartida tiene un máximo de 1024 px; marca y navegación se apilan en móvil y se distribuyen en fila desde 640 px.

Inicio usa introducción centrada y acciones apiladas, búsqueda primero. La explicación queda después de ambas acciones y el aviso de demostración: tres pasos en filas, nunca tres columnas estrechas. Desde 640 px cada fila alinea un título de hasta 190 px con su explicación; en móvil el texto queda debajo del título.

Buscar mantiene la foto antes de los filtros; radio y raza comparten una fila desde 640 px y se apilan en móvil. Reportar mantiene el orden ubicación → foto → descripción → contacto → envío. Desde 960 px, foto y descripción comparten fila; ubicación y contacto abarcan todo el formulario. Nombre y teléfono comparten fila desde 640 px. No usar CSS `order` ni duplicar controles para reorganizar el contenido.

El formulario comienza a 28 px de su introducción; no se encierra en una tarjeta adicional. Los roles de layout se definen en `:root` mediante `--layout-width-reading`, `--layout-width-report`, `--layout-gap-inline` (8 px), `--layout-gap-fields` (24 px) y `--layout-gap-sections` (32 px). Las vistas previas y mensajes largos crecen dentro de su grupo y desplazan naturalmente lo que sigue.

## Elevation & Depth

La implementación utiliza superficies planas: sin sombras ni gradientes. Los fondos cálidos, bordes de 1 px y contraste de acciones establecen la jerarquía. El foco es un contorno ámbar de 2 px con separación de 4 px; no ocultarlo ni sustituirlo por una sombra tenue.

## Shapes

Paneles, formularios, botones, navegación y vistas previas usan `rounded-ui` de **7 px**. Las figuras de iconos permanecen geométricas y consistentes, con trazo de 1.75 y tamaño habitual de 20–32 px. Los bordes discontinuos se reservan para carga de imágenes y selección de cámara/archivo.

## Components

- **Cabecera:** marca serif con huella; navegación activa con crema suave, ámbar, subrayado y `aria-current`.
- **Acciones del inicio:** enlaces completos, título serif, descripción y flecha. Búsqueda en ámbar profundo con texto blanco; reporte en crema suave. Hover y foco subrayan la etiqueta sin mover el contenido.
- **Carga de búsqueda:** zona amplia de 176 px mínimo con icono, texto y selector de archivo nativo accesible. Muestra foco al entrar por teclado; conserva vista previa, validaciones, eliminación y bloqueo durante búsqueda.
- **Radio:** grupo nativo de opciones 2, 5, 10 y 20 km; selección ámbar y blanco, contorno visible al navegar con teclado. Valor inicial 5 km.
- **Campos:** fondo crema suave, borde café, radio de 7 px y texto de 16 px. Etiquetas siempre visibles y consistentes en Nunito 600; ayuda y errores próximos al campo. En móvil, el campo de ubicación ocupa toda la fila y «Detectar» queda debajo; desde 640 px se presentan juntos.
- **Fotos del reporte:** dos controles con iconos y texto, para cámara y archivo. Conservan sus funciones y limitaciones del navegador.
- **Botones:** `.button-primary` unifica las acciones de Buscar y Reportar: mínimo 48 px, Nunito 700, ámbar profundo y blanco; hover más oscuro; deshabilitado con semántica nativa, opacidad 0.5 y cursor de indisponibilidad. `.text-action` ofrece acciones de quitar foto con área mínima de 44 px.
- **Movimiento:** transiciones discretas de color de 150 ms en acciones, sin animaciones de entrada; `prefers-reduced-motion` reduce transiciones y animaciones.
- **Feedback:** `.form-feedback` unifica el espaciado y oculta el espacio del estado cuando está vacío. Conservar estados de carga, errores y avisos accesibles existentes. Al quitar una foto del reporte, devolver el foco a «Subir archivo». No presentar búsquedas ni envíos simulados como operaciones reales.

## Do's and Don'ts

- **Do** reutilizar los tokens, fuentes locales y radio de 7 px en las tres pantallas.
- **Do** mantener controles de al menos 44 px cuando corresponda, foco visible y campos editables de 16 px.
- **Do** mantener prioridad de búsqueda, reporte accesible y avisos de demostración.
- **Don't** mezclar la antigua familia azul/pizarra con la nueva dirección en estas pantallas.
- **Don't** copiar estadísticas, porcentajes de IA, cobertura, promesas de privacidad o reencuentros sin evidencia del producto.
- **Don't** añadir efectos, fotos decorativas o tarjetas anidadas para sustituir la jerarquía de los formularios.
