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
    fontFamily: "Nunito, Arial, sans-serif"
    fontSize: "clamp(1.875rem, 5vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.2
  headline:
    fontFamily: "Nunito, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: "2rem"
  body:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.625
  help:
    fontFamily: "DM Sans, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
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
  text-action:
    textColor: "{colors.accent}"
    rounded: "{rounded.ui}"
  navigation-active:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.accent}"
    rounded: "{rounded.ui}"
---

# Design System: Busca tu perrito

## Overview

Dirección **Cálido**, seleccionada por el usuario para Inicio, Buscar y Reportar. Reemplaza la dirección anterior azul/Arial. Se inspira en el mockup de `contexto-proyecto-btp/mockup-proyecto`: fondos crema, acento ámbar, texto café, títulos redondeados en Nunito y cuerpo en DM Sans. La redondez de **7 px** conserva el ajuste elegido en la propuesta interactiva.

La interfaz busca cercanía y claridad para personas que buscan a un perro o reportan uno encontrado. `PRODUCT.md` conserva la autoridad sobre alcance y capacidades; las métricas, cobertura y afirmaciones ilustrativas del mockup no son hechos del producto.

La refinación «Claridad cálida» conserva la paleta y los selectores de imagen con iconos. Refuerza la navegación activa, diferencia el peso de títulos y secciones y presenta una confirmación independiente después de publicar.

## Colors

`src/app/globals.css` define los tokens semánticos compartidos mediante `@theme inline`. Usar `bg-canvas`, `bg-surface`, `text-ink`, `text-muted`, `bg-accent`, `border-line` y `border-input-border` en vez de introducir colores por pantalla.

- Crema (`canvas`) para el fondo y crema suave (`surface`) para superficies de entrada y paneles secundarios.
- Ámbar profundo (`accent`) para acciones con texto blanco, enlaces y foco; `accent-hover` para hover.
- Ámbar luminoso (`mark`) para la marca sobre fondo sólido, con dibujo café. No usarlo con texto blanco de tamaño normal.
- Café oscuro (`ink`) para títulos y etiquetas; café secundario (`muted`) para ayuda y descripciones.
- `line` separa regiones; `input-border` identifica campos y zonas de carga con contraste mínimo de 3:1 sobre la superficie (3.49:1 en la paleta actual).
- Rojo (`error`, Tailwind red-700) se reserva para errores con mensaje textual. Los estados nunca dependen solo del color.

## Typography

**Nunito 700/800** para títulos y marca, con peso 800 como referencia principal. **DM Sans variable** para cuerpo, etiquetas, navegación y acciones, usando pesos 400/600/700. Las fuentes se sirven localmente con `next/font/local`; archivos y licencias OFL en `public/fonts/`. La combinación «Cercano» fue seleccionada por el usuario.

Títulos de página: escala fluida entre 30 y 40 px, interlineado 1.2. Títulos de acciones y secciones: 24 px, peso 700. Cuerpo y campos editables: 16 px; ayuda: 14 px. Usar pesos 600 o 700 de DM Sans para etiquetas y acciones. Mantener títulos equilibrados y texto secundario legible.

## Layout

Inicio y Buscar usan `.app-main`, con ancho máximo de lectura de 670 px incluyendo laterales de 24 px, centrado, espacio superior de 32 px en móvil y 40 px desde 640 px. Reportar conserva esa base hasta 959 px; desde 960 px usa `.app-main--report` con máximo de 960 px. La cabecera compartida tiene un máximo de 1024 px; marca y navegación se apilan en móvil y se distribuyen en fila desde 640 px.

Inicio aplica «Dos caminos»: título «¿Qué necesitas hacer?» alineado a la izquierda, una frase de orientación y dos acciones apiladas, búsqueda primero. Cada enlace reúne una etiqueta en DM Sans 700 y una flecha, con altura mínima de 88 px y padding de 20 px en móvil y 24 px desde 640 px. La explicación breve queda después de las acciones dentro de un desplegable nativo, cerrado inicialmente y accesible por teclado.

Buscar aplica «Búsqueda directa»: título sin introducción repetida, zona de foto y botón principal dentro de la columna centrada, con resultados debajo. Reportar mantiene el orden ubicación → foto → descripción → contacto → envío. Desde 960 px se aplica la disposición «Foto y datos»: foto en una columna izquierda de 300 px y ubicación, descripción y contacto en la columna derecha flexible, con separación de 40 px. La foto abarca las tres filas de datos. La variante «Directo y completo» conserva todos los campos visibles y reúne cámara y archivo en una zona de carga de 240 px de alto mínimo. El pie alinea el aviso de publicación con la acción principal. El envío se alinea a la derecha con un ancho mínimo de 200 px. Nombre y teléfono comparten fila desde 640 px. La disposición móvil conserva su secuencia ubicación → foto → descripción → contacto. No usar CSS `order` ni duplicar controles para reorganizar el contenido.

El formulario comienza a 32 px de su introducción; no se encierra en una tarjeta adicional. Los roles de layout se definen en `:root` mediante `--layout-width-reading`, `--layout-width-report`, `--layout-gap-inline` (8 px), `--layout-gap-fields` (24 px) y `--layout-gap-sections` (32 px). Las vistas previas y mensajes largos crecen dentro de su grupo y desplazan naturalmente lo que sigue.

El detalle del reporte utiliza el ancho de Reportar y dos columnas desde 960 px: foto de proporción 4:3 en una columna de 300 px y contenido flexible, separados por 40 px. Un único borde vertical continuo delimita el contenido, con 32 px de padding interior. En tamaños menores apila foto y datos sin el separador vertical.

## Elevation & Depth

La implementación utiliza superficies planas: sin sombras ni gradientes. Los fondos cálidos, bordes de 1 px y contraste de acciones establecen la jerarquía. El foco es un contorno ámbar de 2 px con separación de 4 px; no ocultarlo ni sustituirlo por una sombra tenue.

## Shapes

Paneles, formularios, botones, navegación y vistas previas usan `rounded-ui` de **7 px**. Las figuras de iconos permanecen geométricas y consistentes, con trazo de 1.75 y tamaño habitual de 20–32 px. Los bordes discontinuos se reservan para carga de imágenes y selección de cámara/archivo.

## Components

- **Cabecera:** marca Nunito 800 con huella; navegación activa con crema suave, ámbar, subrayado y `aria-current`. El texto activo usa `accent-hover` sobre `soft` para asegurar contraste.
- **Acciones del inicio:** enlaces completos con una sola etiqueta en DM Sans 700 de 18 px y flecha. Búsqueda en ámbar profundo con texto blanco; reporte en crema suave. Hover y foco subrayan la etiqueta sin mover el contenido. «¿Cómo funciona la búsqueda?» despliega la explicación de comparación con reportes y la advertencia de identidad, conservando el indicador nativo de apertura.
- **Carga de búsqueda:** zona de 240 px mínimo con selector de archivo nativo accesible. La vista previa se integra en la misma zona, con acciones de cambiar y quitar foto. Formatos y límite aparecen en una línea debajo. El aviso de envío queda junto a Buscar; la búsqueda vacía ofrece «Elegir otra foto». Conserva foco, validación y bloqueo durante la petición.
- **Filtros de búsqueda:** botón textual sutil «Filtros · Próximamente», cerrado inicialmente. Al abrir muestra una vista previa de radio y raza dentro de un fieldset deshabilitado y aclara que no se aplican a la búsqueda. La apertura se comunica con `aria-expanded` y `aria-controls`.
- **Campos:** fondo crema suave, borde café, radio de 7 px y texto de 16 px. Etiquetas siempre visibles y consistentes en DM Sans 600; ayuda y errores próximos al campo. En móvil, el campo de ubicación ocupa toda la fila y «Detectar» queda debajo; desde 640 px se presentan juntos.
- **Fotos del reporte:** dos controles con iconos y texto, para cámara y archivo. La zona de carga comienza 8 px después de su etiqueta, alineada con el campo de ubicación en escritorio. La ayuda de formatos y tamaño máximo aparece 8 px debajo de la zona de carga y conserva su asociación accesible. Los errores de imagen aparecen después de la ayuda.
- **Botones:** `.button-primary` unifica las acciones de Buscar y Reportar: mínimo 48 px, DM Sans 700, ámbar profundo y blanco; hover más oscuro; deshabilitado con semántica nativa, opacidad 0.5 y cursor de indisponibilidad. `.text-action` ofrece acciones de quitar foto con área mínima de 44 px.
- **Movimiento:** transiciones discretas de color de 150 ms en acciones, sin animaciones de entrada; `prefers-reduced-motion` reduce transiciones y animaciones.
- **Textos del reporte:** título sin introducción repetida ni encabezado «Datos del hallazgo». La ayuda de ubicación aparece al detectar o ante un error. El aviso de visibilidad de foto y datos permanece junto al envío. Estos textos breves se aplican también en móvil, manteniendo su disposición de campos.
- **Feedback:** `.form-feedback` unifica el espaciado y oculta el espacio del estado cuando está vacío. Distinguir carga, búsqueda sin candidatos, error y publicación confirmada. Al quitar una foto del reporte, devolver el foco a «Subir archivo».

- **Resultados y detalle:** candidatos en lista con foto, ubicación y enlace al reporte. Conservan el orden de parecido y explican que una coincidencia requiere revisión, sin mostrar un puntaje numérico. El detalle separa ubicación, descripción y contacto con espaciado y divisores horizontales, sin tarjetas anidadas. El teléfono se presenta con una acción destacada «Llamar al contacto». La ausencia de teléfono se explica incluso cuando existe un nombre. La carga reserva la proporción de la foto y anuncia su estado; el error ofrece una acción secundaria de reintento. Se conserva la alternativa de foto no disponible.
- **Página 404:** utiliza la paleta cálida, el título Nunito y acciones para volver al inicio o buscar.

La confirmación de publicación muestra el lugar y las acciones «Ver reporte» y «Crear otro reporte». Esta última inicia un formulario nuevo. El foco se mueve al encabezado de confirmación y regresa al primer campo al crear otro reporte. El detalle ofrece un enlace de llamada cuando existe teléfono. En escritorio, un único separador vertical continuo y 32 px de padding separan los campos de la columna de foto. El separador abarca toda la altura del grupo, incluidos sus espacios. Contacto no lleva borde superior que atraviese su leyenda. Los selectores de cámara y archivo conservan su diseño e iconos actuales.

## Do's and Don'ts

- **Do** reutilizar los tokens, fuentes locales y radio de 7 px en las tres pantallas.
- **Do** mantener controles de al menos 44 px cuando corresponda, foco visible y campos editables de 16 px.
- **Do** mantener la prioridad de búsqueda y el reporte accesible. Priorizar las funciones disponibles en Buscar.
- **Don't** mezclar la antigua familia azul/pizarra con la nueva dirección en estas pantallas.
- **Don't** copiar estadísticas, porcentajes de IA, cobertura, promesas de privacidad o reencuentros sin evidencia del producto.
- **Don't** añadir efectos, fotos decorativas o tarjetas anidadas para sustituir la jerarquía de los formularios.
