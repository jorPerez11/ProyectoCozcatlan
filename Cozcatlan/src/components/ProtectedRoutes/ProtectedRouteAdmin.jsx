import React from "react";
import { Navigate, Outlet } from "react-router";

import { useAuthAdmin } from "../../contexts/AuthContextAdmin"; // Verifica que la ruta relativa sea la correcta

export const ProtectedRouteAdmin = () => {
  // Consumimos el hook que ya tiene la lógica de useContext integrada
  const { user, loading } = useAuthAdmin();

  if (loading) {
    return null;
  }

  if (!user) {
    // Si quien intenta entrar es un empleado autenticado (sin permisos de admin),
    // lo mandamos a su propio login en vez del de administradores
    const hasEmployeeToken = localStorage.getItem("accessTokenEmployee") || sessionStorage.getItem("accessTokenEmployee");
    if (hasEmployeeToken) {
      return <Navigate to="/loginEmployee" replace />;
    }

    return <Navigate to="/loginAdmin" replace />;
  }

  return <Outlet />;
};