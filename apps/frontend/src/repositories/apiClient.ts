interface ApiRequestOptions extends RequestInit {
  acceptErrorResponse?: boolean;
}

const configuredApiUrl = import.meta.env.VITE_API_BASE_URL ?? import.meta.env.VITE_API_URL;
const API_BASE_URL = (configuredApiUrl ?? "http://localhost:3001/api").replace(/\/$/, "");

if (import.meta.env.PROD && !configuredApiUrl) {
  console.error("Missing VITE_API_BASE_URL. Production builds should not use the localhost API fallback.");
}

export const apiJson = async <T>(
  path: string,
  { acceptErrorResponse = false, headers, ...options }: ApiRequestOptions = {}
): Promise<T> => {
  const requestHeaders = new Headers(headers);

  if (options.body && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: requestHeaders,
  });
  const data = (await response.json().catch(() => null)) as T | null;

  if (!response.ok && !acceptErrorResponse) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return data as T;
};
