import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/UseAuthClient';

export const PrivateRouteClient = () => {
    const { user, loading } = useAuth();

    // Mientras el useEffect de AuthProvider verifica el token en el backend
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl font-semibold">Cargando sesión...</p>
            </div>
        );
    }

    // Si hay usuario, renderiza las rutas hijas; si no, redirige al login del cliente
    return user ? <Outlet /> : <Navigate to="/loginClient" replace />;
};