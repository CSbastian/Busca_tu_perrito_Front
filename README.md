# Busca tu perrito — Frontend

Interfaz web para buscar perros por imagen y reportar perros encontrados.
Next.js actúa como pasarela entre el navegador y la API de FastAPI.

Base: React, Next.js (App Router), TypeScript y Tailwind CSS.
Incluye inicio, búsqueda por imagen, publicación de reportes y detalle de cada
reporte.
Los comandos usan Webpack por compatibilidad con el entorno Windows verificado.

## Ejecutar

Requisitos: Node.js 22 LTS y Corepack. El proyecto fija Yarn 1.22.22.

```sh
corepack enable
yarn install --frozen-lockfile
yarn dev
```

Abrir http://localhost:3000. La pantalla inicial funciona sin backend.

Para conectar la API, copiar `.env.example` a `.env.local` y configurar
`API_BASE_URL` con el origen de FastAPI (localmente, `http://127.0.0.1:8000`).
Reiniciar Next.js tras cambiar el archivo. La pasarela usa rutas del mismo origen
que el frontend. Para publicar y buscar deben estar disponibles FastAPI,
PostgreSQL y el servicio de IA.

```sh
yarn lint
yarn format:check
yarn typecheck
yarn build
yarn start
```

Para aplicar el formato de Prettier al código y las pruebas, ejecuta `yarn format`.

`yarn start` sirve la compilación de producción generada por `yarn build`.

## Estructura

```text
public/                  Recursos estáticos
src/
  app/                   Rutas, layout y estilos globales
    page.tsx             Inicio (/)
    buscar/page.tsx      Búsqueda y resultados (/buscar)
    reportar/page.tsx    Pantalla de reporte (/reportar)
    reportes/[id]/       Detalle de un reporte
    api/v1/              Pasarela hacia FastAPI
  components/            Componentes de interfaz
  hooks/                 Estado y acciones de los formularios
  services/              Cliente HTTP y operaciones de la API
  validation/            Validación local de fotos y reportes
```
