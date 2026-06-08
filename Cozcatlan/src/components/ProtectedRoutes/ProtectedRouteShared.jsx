import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthAdmin } from "../../contexts/AuthContextAdmin";
import { useAuthEmployee } from "../../contexts/AuthContextEmployee";

// Permite el paso si hay una sesión activa de Admin O de Empleado.
// Para rutas compartidas entre ambos roles (suppliers, productos privados, etc.)
export const ProtectedRouteShared = () => {
    const { user: adminUser, loading: adminLoading } = useAuthAdmin();
    const { user: employeeUser, loading: employeeLoading } = useAuthEmployee();

    const hasAdminToken = localStorage.getItem("accessTokenAdmin") || sessionStorage.getItem("accessTokenAdmin");
    const hasEmployeeToken = localStorage.getItem("accessTokenEmployee") || sessionStorage.getItem("accessTokenEmployee");

    if (hasAdminToken || hasEmployeeToken) {
        return <Outlet />;
    }

    if (adminLoading || employeeLoading) {
        return null;
    }

    if (!adminUser && !employeeUser) {
        return <Navigate to="/loginEmployee" replace />;
    }

    return <Outlet />;
};
