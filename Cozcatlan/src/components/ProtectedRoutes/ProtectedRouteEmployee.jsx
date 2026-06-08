import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthEmployee } from "../../contexts/AuthContextEmployee";

export const ProtectedRouteEmployee = () => {
    const { user, loading } = useAuthEmployee();

    // 1. Miramos síncronamente si hay un token guardado en el navegador
    const hasToken = localStorage.getItem("accessTokenEmployee") || sessionStorage.getItem("accessTokenEmployee");

    // 2. Si ya tenemos el token, lo dejamos pasar al Dashboard de inmediato sin trabar la UI
    if (hasToken) {
        return <Outlet />;
    }

    // 3. Si no hay token y el contexto sigue buscando, esperamos
    if (loading) {
        return null;
    }

    // 4. Si no está cargando y no hay usuario... Al login.
    if (!user) {
        return <Navigate to="/loginEmployee" replace />;
    }

    return <Outlet />;
};