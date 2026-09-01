import AsyncStorage from "@react-native-async-storage/async-storage";

// En Expo, las variables con prefijo EXPO_PUBLIC_ se inyectan automáticamente
// desde el .env del proyecto. Debe apuntar a la IP LAN de la PC donde corre
// el backend (no "localhost", el teléfono no la puede resolver). Ver README.
const FALLBACK_URL = "http://192.168.1.100:4000/api";
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || FALLBACK_URL;

export const TOKEN_KEY = "cozcatlan_client_token";

export async function getToken() {
  return AsyncStorage.getItem(TOKEN_KEY);
}

async function request(path, { method = "GET", body, headers, auth = true } = {}) {
  const finalHeaders = { "Content-Type": "application/json", ...headers };

  if (auth) {
    const token = await getToken();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: finalHeaders,
      credentials: "include",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (err) {
    throw new ApiError(
      "No se pudo conectar con el servidor. Revisa tu conexión y la IP configurada en EXPO_PUBLIC_API_URL.",
      0,
      null,
    );
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    throw new ApiError(payload?.message || "Ocurrió un error inesperado.", response.status, payload);
  }

  return payload;
}

export class ApiError extends Error {
  constructor(message, status, payload) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

export const api = {
  get: (path, options) => request(path, { ...options, method: "GET" }),
  post: (path, body, options) => request(path, { ...options, method: "POST", body }),
  put: (path, body, options) => request(path, { ...options, method: "PUT", body }),
  delete: (path, options) => request(path, { ...options, method: "DELETE" }),
};
