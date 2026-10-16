# Busca tu perrito — Frontend

Interfaz web para buscar perros por imagen y reportar perros encontrados.
Este repositorio contiene solo el frontend; la búsqueda y los reportes se
conectarán a un backend externo mediante una API.

Base: React, Next.js (App Router), TypeScript y Tailwind CSS.
En esta etapa solo se incluye una pantalla inicial y la estructura de carpetas.
Los comandos usan Webpack por compatibilidad con el entorno Windows verificado.

## Ejecutar

Requisito: Node.js 22 LTS y npm.

```sh
npm ci
npm run dev
```

Abrir http://localhost:3000. La pantalla inicial funciona sin backend.

Para preparar la conexión futura, copiar `.env.example` a `.env.local` y
completar `NEXT_PUBLIC_API_BASE_URL`. Esta variable es pública: no incluir secretos.

```sh
npm run typecheck
npm run build
npm start
```

`npm start` ejecuta la compilación de producción después de `npm run build`.

## Estructura

```text
public/                  Recursos estáticos
src/
  app/                   Rutas, layout y estilos globales
  features/
    search/              Componentes y hooks de búsqueda; futura API y tipos
    reports/             Componentes y hooks de reportes; futura API y tipos
  components/
    ui/                  Elementos visuales compartidos
    layout/              Estructura visual compartida
  lib/                   Futuro cliente HTTP y configuración de entorno
  mocks/                 Futuros datos simulados
```

Las carpetas vacías se conservan con `.gitkeep`. Las rutas de búsqueda,
resultados y reportes están reservadas, pero aún no tienen pantallas.
Los archivos de API, tipos y hooks se añadirán al implementar cada flujo.
