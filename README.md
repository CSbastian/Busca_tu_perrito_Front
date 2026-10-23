# Busca tu perrito — Frontend

Interfaz web para buscar perros por imagen y reportar perros encontrados.
Este repositorio contiene solo el frontend; la búsqueda y los reportes se
conectarán a un backend externo mediante una API.

Base: React, Next.js (App Router), TypeScript y Tailwind CSS.
Incluye inicio, búsqueda por imagen de demostración y una pantalla de reporte
pendiente de implementar. La búsqueda es simulada: no sube imágenes ni consulta
reportes reales.
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
    page.tsx             Inicio (/)
    buscar/page.tsx      Búsqueda y resultados (/buscar)
    reportar/page.tsx    Pantalla de reporte (/reportar)
  components/            Componentes de interfaz
  services/
    search.service.ts    Búsqueda simulada; futura integración con la API
```

Las nuevas rutas y carpetas se crearán cuando sean necesarias. Las operaciones
de búsqueda y reportes vivirán en `services/`. Al integrar el backend se podrá
añadir un cliente HTTP compartido en `lib/`.
