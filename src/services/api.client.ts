type ErrorResponse = {
  error?: { code?: string; message?: string; requestId?: string };
};

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code?: string,
    public readonly requestId?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function requestJson<T>(
  path: string,
  options?: RequestInit,
  expectedStatus = 200,
): Promise<T> {
  const response = await fetch(path, { ...options, redirect: "error" });
  const requestId = response.headers.get("X-Request-ID") ?? undefined;
  if (response.status !== expectedStatus) {
    const body: ErrorResponse | null = await response.json().catch(() => null);
    const error = body?.error;
    throw new ApiError(
      response.status,
      error?.message ??
        `La API respondió con un error HTTP ${response.status}.`,
      error?.code,
      error?.requestId ?? requestId,
    );
  }
  return response.json().catch(() => {
    throw new ApiError(
      response.status,
      "La API devolvió una respuesta inesperada.",
      undefined,
      requestId,
    );
  });
}
