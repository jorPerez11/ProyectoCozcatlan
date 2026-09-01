import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi } from "../api/authApi";
import { TOKEN_KEY } from "../api/client";
import { decodeJwtPayload, isTokenExpired } from "../utils/jwt";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        const decoded = decodeJwtPayload(token);
        if (decoded && !isTokenExpired(decoded)) {
          setUser({ id: decoded.id, userType: decoded.userType || "Client" });
        } else if (token) {
          await AsyncStorage.removeItem(TOKEN_KEY);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (email, password) => {
    const payload = await authApi.login(email, password);
    const token = payload?.token;
    if (!token) throw new Error("El servidor no devolvió un token de sesión.");

    await AsyncStorage.setItem(TOKEN_KEY, token);
    const decoded = decodeJwtPayload(token);
    setUser({ id: decoded?.id, userType: decoded?.userType || "Client" });
    return true;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Si el backend no responde igual limpiamos la sesión local.
    }
    await AsyncStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
