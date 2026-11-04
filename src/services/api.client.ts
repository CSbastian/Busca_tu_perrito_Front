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

export function getApiUrl(path: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim().replace(/\/+$/, "") ?? "";
  return `${baseUrl}${path}`;
}

export async function requestJson<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(getApiUrl(path), options);
  if (!response.ok) {
    const body: ErrorResponse | null = await response.json().catch(() => null);
    const error = body?.error;
    throw new ApiError(
      response.status,
      error?.message ?? `La API respondió con un error HTTP ${response.status}.`,
      error?.code,
      error?.requestId,
    );
  }
  return response.json();
}
