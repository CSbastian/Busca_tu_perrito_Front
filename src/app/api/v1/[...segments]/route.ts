const maxBodySize = 6 * 1024 * 1024;

type RouteContext = { params: Promise<{ segments: string[] }> };

function apiError(status: number, code: string, message: string) {
  const requestId = crypto.randomUUID();
  return Response.json(
    { error: { code, message, requestId } },
    { status, headers: { "X-Request-ID": requestId } },
  );
}

async function readBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return undefined;

  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > maxBodySize) {
        void reader.cancel().catch(() => {});
        return null;
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
}

async function forward(
  request: Request,
  path: string,
  body?: Uint8Array<ArrayBuffer>,
) {
  const baseUrl = process.env.API_BASE_URL?.trim();
  if (!baseUrl) {
    return apiError(
      503,
      "backend_unavailable",
      "El servicio no está disponible.",
    );
  }

  const headers = new Headers();
  for (const name of ["Content-Type", "X-Request-ID"]) {
    const value = request.headers.get(name);
    if (value !== null) headers.set(name, value);
  }

  try {
    const url = new URL(path, baseUrl);
    url.search = new URL(request.url).search;
    const upstream = await fetch(url, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
      redirect: "manual",
      signal: request.signal,
    });
    const responseHeaders = new Headers({ "Cache-Control": "no-store" });
    for (const name of ["Content-Type", "Location", "X-Request-ID"]) {
      const value = upstream.headers.get(name);
      if (value !== null) responseHeaders.set(name, value);
    }
    return new Response(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch {
    return apiError(
      503,
      "backend_unavailable",
      "El servicio no está disponible.",
    );
  }
}

export async function POST(request: Request, { params }: RouteContext) {
  const { segments } = await params;
  const [resource] = segments;
  if (
    segments.length !== 1 ||
    (resource !== "reports" && resource !== "searches")
  ) {
    return apiError(404, "not_found", "La ruta solicitada no existe.");
  }

  const body = await readBody(request).catch(() => undefined);
  if (body === null) {
    return apiError(413, "request_too_large", "La solicitud supera los 6 MiB.");
  }
  if (!body) {
    return apiError(400, "invalid_multipart", "No se pudo leer la solicitud.");
  }
  return forward(request, `/api/v1/${resource}`, body);
}

export async function GET(request: Request, { params }: RouteContext) {
  const { segments } = await params;
  const [resource, id, subresource] = segments;
  if (
    resource !== "reports" ||
    !id ||
    !(
      segments.length === 2 ||
      (segments.length === 3 && subresource === "image")
    )
  ) {
    return apiError(404, "not_found", "La ruta solicitada no existe.");
  }
  if (!/^[a-zA-Z0-9-]+$/.test(id)) {
    return apiError(
      422,
      "validation_error",
      "El identificador del reporte no es válido.",
    );
  }
  return forward(
    request,
    `/api/v1/reports/${id}${subresource ? "/image" : ""}`,
  );
}
