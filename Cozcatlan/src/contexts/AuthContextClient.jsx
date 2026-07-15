import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { translateLoginError } from "../utils/authErrorMessages.js";

const AuthContextClient = createContext(null);
export { AuthContextClient };

export const useAuthClient = () => {
    const context = useContext(AuthContextClient);
    if (!context) {
        throw new Error("useAuthClient debe ser usado dentro de un AuthProviderClient");
    }
    return context;
};

const API_URL = "http://localhost:4000/api/client"; // Ajusta según tus rutas de cliente
const STORAGE_KEY = "accessTokenClient";
const REMEMBER_KEY = "rememberDeviceClient";

const decodeJwtPayload = (token) => {
    if (!token) return null;
    try {
        const tokenParts = token.split(".");
        if (tokenParts.length !== 3) return null;
        const base64Url = tokenParts[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const normalized = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
        return JSON.parse(atob(normalized));
    } catch { return null; }
};

const extractAuthData = (payload) => {
    if (!payload || typeof payload !== "object") return { accessToken: null, user: null };
    const data = payload.data && typeof payload.data === "object" ? payload.data : payload;
    return {
        accessToken: data.accessToken || data.token || null,
        user: data.user || null,
    };
};

export const AuthProviderClient = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authCookie, setAuthCookie] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getStoredToken = useCallback(
        () => localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY),
        [],
    );

    const persistToken = useCallback((token, rememberMe) => {
        if (!token) return;
        if (rememberMe) {
            localStorage.setItem(STORAGE_KEY, token);
            sessionStorage.removeItem(STORAGE_KEY);
            localStorage.setItem(REMEMBER_KEY, "1");
            return;
        }
        sessionStorage.setItem(STORAGE_KEY, token);
        localStorage.removeItem(STORAGE_KEY);
        localStorage.setItem(REMEMBER_KEY, "0");
    }, []);

    const clearSession = useCallback((everything = true) => {
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(REMEMBER_KEY);

        if (everything) {
            const keysToClear = [
                "accessTokenAdmin", "rememberDeviceAdmin",
                "accessTokenEmployee", "rememberDeviceEmployee"
            ];
            keysToClear.forEach(key => {
                localStorage.removeItem(key);
                sessionStorage.removeItem(key);
            });
        }
        setUser(null);
        setAuthCookie(null);
    }, []);

    const logout = useCallback(async (options = {}) => {
        const reason = options?.reason || "manual";
        const callApi = options?.callApi ?? true;
        try {
            if (callApi) {
                await fetch(`http://localhost:4000/api/logout`, {
                    method: "POST",
                    credentials: "include",
                });
            }
        } catch (error) {
            // Silencioso
        } finally {
            clearSession(true);
            navigate("/");
            if (reason === "expired") {
                toast.error("Tu sesión expiró. Inicia sesión nuevamente");
            } else {
                toast.success("Sesión cerrada correctamente");
            }
        }
    }, [clearSession, navigate]);

    const login = async (email, password, rememberMe = false) => {
        try {
            const response = await fetch(`${API_URL}/loginClient`, { // Ajusta tu endpoint exacto
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const payload = await response.json().catch(() => ({}));
            if (!response.ok) {
                toast.error(translateLoginError(payload.message));
                return false;
            }

            const { accessToken, user: userFromApi } = extractAuthData(payload);
            if (accessToken) {
                persistToken(accessToken, rememberMe);
                setAuthCookie(accessToken);
            }

            if (userFromApi) {
                setUser(userFromApi);
            } else {
                const decodedToken = decodeJwtPayload(accessToken);
                setUser(decodedToken ? { id: decodedToken.id, userType: decodedToken.userType || "client" } : null);
            }

            toast.success("Inicio de sesión exitoso");
            navigate("/"); // O la ruta principal de tus clientes
            return true;
        } catch (error) {
            toast.error("Error de conexión con el servidor");
            return false;
        }
    };

    useEffect(() => {
        let isMounted = true;
        const checkAuth = async () => {
            const token = getStoredToken();
            if (!token) {
                if (isMounted) {
                    setUser(null);
                    setLoading(false);
                }
                return;
            }

            try {
                const decodedToken = decodeJwtPayload(token);
                const isTokenExpired = decodedToken?.exp && decodedToken.exp * 1000 <= Date.now();

                if (!decodedToken || isTokenExpired) {
                    clearSession(false);
                    return;
                }

                const response = await fetch(`${API_URL}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    clearSession(false);
                    return;
                }

                if (!isMounted) return;

                const payload = await response.json().catch(() => ({}));
                const { accessToken } = extractAuthData(payload);
                const effectiveToken = accessToken || token;
                const rememberMe = localStorage.getItem(REMEMBER_KEY) === "1";

                if (effectiveToken) {
                    persistToken(effectiveToken, rememberMe);
                    setAuthCookie(effectiveToken);
                }

                const decoded = decodeJwtPayload(effectiveToken);
                if (decoded) {
                    setUser({ id: decoded.id, userType: decoded.userType || "client" });
                }
            } catch (error) {
                clearSession(false);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        checkAuth();
        return () => { isMounted = false; };
    }, [clearSession, getStoredToken, persistToken]);

    return (
        <AuthContextClient.Provider value={{ user, setUser, authCookie, logout, login, loading, API: API_URL }}>
            {children}
        </AuthContextClient.Provider>
    );
};