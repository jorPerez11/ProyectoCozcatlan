import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthAdmin } from "../../contexts/AuthContextAdmin"; 

export const ProtectedRouteAdmin = () => {
  const { user, loading } = useAuthAdmin();

  // 1. ¡CRUCIAL! Si está cargando o el usuario aún no se procesa, 
  // NO redirijas a ningún lado, pon un retorno seguro.
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  // 2. Si ya terminó de cargar y de verdad NO existe un usuario administrador logueado
  if (!user) {
    const hasEmployeeToken = localStorage.getItem("accessTokenEmployee") || sessionStorage.getItem("accessTokenEmployee");
    
    if (hasEmployeeToken) {
      return <Navigate to="/loginEmployee" replace />;
    }
    return <Navigate to="/loginAdmin" replace />;
  }

  // 3. Si hay usuario pero su rol transformado no es "admin", se va.
  if (user.userType?.toLowerCase() !== "admin") {
    return <Navigate to="/loginAdmin" replace />; 
  }

  // Si todo es correcto y es admin, entra sin problemas
  return <Outlet />;
};