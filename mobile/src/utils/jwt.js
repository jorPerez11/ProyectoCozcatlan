// Decodifica el payload de un JWT sin verificar la firma (solo lectura en cliente).
export function decodeJwtPayload(token) {
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const normalized = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    const json = atobPolyfill(normalized);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function atobPolyfill(base64) {
  if (typeof atob === "function") return atob(base64);
  return global.Buffer.from(base64, "base64").toString("binary");
}

export function isTokenExpired(decoded) {
  return Boolean(decoded?.exp && decoded.exp * 1000 <= Date.now());
}
