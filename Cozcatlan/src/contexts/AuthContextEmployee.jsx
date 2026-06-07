import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const AuthContext = createContext(null);
export { AuthContext };
const API_EMPLOYEE = "http://localhost:4000/api/employee";
const API_ADMIN = "http://localhost:4000/api/admin";

const TOKEN_EMPLOYEE = "accessTokenEmployee";
const TOKEN_ADMIN = "accessTokenAdmin";
const REMEMBER_KEY = "rememberDeviceEmployee";

const decodeJwtPayload = (token) => {
    if (!token) return null;
    try {
        const tokenParts = token.split(".");
        if (tokenParts.length !== 3) return null;
        const base64Url = tokenParts[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const normalized = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
        return JSON.parse(atob(normalized));
    } catch {
        return null;
    }
};

const extractAuthData = (payload) => {
    if (!payload || typeof payload !== "object") {
        return { accessToken: null, user: null };
    }
    const data = payload.data && typeof payload.data === "object" ? payload.data : payload;
    return {
        accessToken: data.accessToken || data.token || null,
        user: data.user || null,
    };
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authCookie, setAuthCookie] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Busca cualquier token válido que exista en el navegador
    const getStoredToken = useCallback(() => {
        return localStorage.getItem(TOKEN_ADMIN) ||
            sessionStorage.getItem(TOKEN_ADMIN) ||
            localStorage.getItem(TOKEN_EMPLOYEE) ||
            sessionStorage.getItem(TOKEN_EMPLOYEE);
    }, []);

    const getApiUrl = useCallback((userTypeInput = null) => {
        const currentRole = userTypeInput || user?.userType;
        return currentRole === "admin" ? API_ADMIN : API_EMPLOYEE;
    }, [user]);

    const persistToken = useCallback((token, rememberMe, role = "employee") => {
        if (!token) return;
        const key = role === "admin" ? TOKEN_ADMIN : TOKEN_EMPLOYEE;

        if (rememberMe) {
            localStorage.setItem(key, token);
            sessionStorage.removeItem(key);
            localStorage.setItem(REMEMBER_KEY, "1");
        } else {
            sessionStorage.setItem(key, token);
            localStorage.removeItem(key);
            localStorage.setItem(REMEMBER_KEY, "0");
        }
    }, []);

    const clearSession = useCallback(() => {
        localStorage.removeItem(TOKEN_EMPLOYEE);
        sessionStorage.removeItem(TOKEN_EMPLOYEE);
        localStorage.removeItem(TOKEN_ADMIN);
        sessionStorage.removeItem(TOKEN_ADMIN);
        localStorage.removeItem(REMEMBER_KEY);
        setUser(null);
        setAuthCookie(null);
    }, []);

    const logout = useCallback(async (options = {}) => {
        const reason = options?.reason || "manual";
        const callApi = options?.callApi ?? true;

        try {
            if (callApi) {
                const targetUrl = getApiUrl();
                await fetch(`${targetUrl}/logout`, {
                    method: "POST",
                    credentials: "include",
                });
            }
        } catch (error) {
            // Error silencioso
        } finally {
            clearSession();
            navigate("/");
            if (reason === "expired") {
                toast.error("Tu sesión expiró. Inicia sesión nuevamente");
            } else {
                toast.success("Sesión cerrada correctamente");
            }
        }
    }, [clearSession, navigate, getApiUrl]);

    // detecta si la petición debe ir a admin o employee
    const login = async (email, password, rememberMe = false, isAdminLogin = false) => {
        try {
            const targetUrl = isAdminLogin ? `${API_ADMIN}/loginAdmin` : `${API_EMPLOYEE}/loginEmployee`;

            const response = await fetch(targetUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const payload = await response.json().catch(() => ({}));

            if (!response.ok) {
                toast.error("Error al iniciar sesión. Verifica tus credenciales.");
                return false;
            }

            const { accessToken, user: userFromApi } = extractAuthData(payload);
            const decodedToken = decodeJwtPayload(accessToken);
            const userRole = decodedToken?.userType || (isAdminLogin ? "admin" : "employee");

            if (accessToken) {
                persistToken(accessToken, rememberMe, userRole);
                setAuthCookie(accessToken);
            }

            setUser(userFromApi || (decodedToken ? { id: decodedToken.id, userType: userRole } : null));
            toast.success("Inicio de sesión exitoso");
            navigate("/dashboard");
            return true;
        } catch (error) {
            toast.error("Error de conexión con el servidor");
            return false;
        }
    };

    useEffect(() => {
        let isMounted = true;

        const checkAuth = async () => {
            try {
                const token = getStoredToken();

                if (!token) {
                    clearSession();
                    return;
                }

                const decodedToken = decodeJwtPayload(token);
                const isTokenExpired = decodedToken?.exp && decodedToken.exp * 1000 <= Date.now();
                const userRole = decodedToken?.userType || "employee";

                if (!decodedToken || isTokenExpired) {
                    clearSession();
                    navigate("/");
                    return;
                }

                if (userRole === "admin") {
                    if (isMounted) {
                        setAuthCookie(token);
                        setUser({ id: decodedToken.id, userType: "admin" });
                    }
                    return;
                }

                // Flujo nativo original solo para Empleados
                const response = await fetch(`${API_EMPLOYEE}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    clearSession();
                    navigate("/");
                    return;
                }

                if (!isMounted) return;

                const payload = await response.json().catch(() => ({}));
                const { accessToken } = extractAuthData(payload);
                const effectiveToken = accessToken || token;
                const rememberMe = localStorage.getItem(REMEMBER_KEY) === "1";

                if (effectiveToken) {
                    persistToken(effectiveToken, rememberMe, "employee");
                    setAuthCookie(effectiveToken);
                }

                const decoded = decodeJwtPayload(effectiveToken);
                if (decoded) {
                    setUser({ id: decoded.id, userType: "employee" });
                }
            } catch (error) {
                clearSession();
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        checkAuth();

        return () => {
            isMounted = false;
        };
    }, [clearSession, getStoredToken, navigate, persistToken]);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                authCookie,
                logout,
                login,
                loading,
                API: getApiUrl(),
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};