interface ApiRequestOptions extends RequestInit {
  acceptErrorResponse?: boolean;
}

const configuredApiUrl =
  import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_API_URL;

// Normalize base URL so it NEVER double-adds /api
const API_ORIGIN = (configuredApiUrl ?? "http://localhost:3001")
  .replace(/\/$/, "")
  .replace(/\/api$/, "");

if (import.meta.env.PROD && !configuredApiUrl) {
  console.error(
    "Missing VITE_API_BASE_URL. Production builds should not use localhost."
  );
}

// Always ensure /api prefix exists
const toApiPath = (path: string) => {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized.startsWith("/api/")
    ? normalized
    : `/api${normalized}`;
};

export const apiJson = async <T>(
  path: string,
  { acceptErrorResponse = false, headers, ...options }: ApiRequestOptions = {}
): Promise<T> => {
  const requestHeaders = new Headers(headers);

  if (options.body && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_ORIGIN}${toApiPath(path)}`, {
    ...options,
    headers: requestHeaders,
  });

  const data = (await response.json().catch(() => null)) as T | null;

  if (!response.ok && !acceptErrorResponse) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return data as T;
};