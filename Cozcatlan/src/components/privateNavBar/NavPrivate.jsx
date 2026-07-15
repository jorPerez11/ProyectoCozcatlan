import React from 'react';
import '../PublicNavbar/NavProducts.css';
import logo from '../../assets/logo-cozcatlan.png';
import shoppingC from '../../assets/shoppingcart.png';
import Config from '../../assets/config.png';
import Swal from 'sweetalert2'; 

// Importamos ambos hooks de autenticación
import { useAuthAdmin } from "../../contexts/AuthContextAdmin";
import { useAuthEmployee } from "../../contexts/AuthContextEmployee";

const NavPrivate = () => {
    // Consumimos ambos contextos
    const adminAuth = useAuthAdmin();
    const employeeAuth = useAuthEmployee();

    // Detectamos dinámicamente cuál de los dos tiene una sesión activa
    const activeAuth = adminAuth?.user ? adminAuth : employeeAuth;
    const currentUser = activeAuth?.user;
    const logout = activeAuth?.logout;

    console.log("Usuario detectado en Navbar Unificado:", currentUser);

    const userRole = currentUser?.userType?.toLowerCase();
    const isAdmin = userRole === "admin";

    const handleLogoutClick = (e) => {
        e.preventDefault(); 

        Swal.fire({
            title: '¿Cerrar sesión?',
            text: "Estás seguro de que quieres cerrar sesión.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, salir',
            cancelButtonText: 'Cancelar',
            reverseButtons: true 
        }).then((result) => {
            if (result.isConfirmed) {
                // Ejecuta de forma segura el logout del contexto activo
                if (logout) {
                    logout();
                }
            }
        });
    };

    return (
        <nav className="navbar navbar-expand-lg custom-navbar px-4 fixed-top">
            <div className="container-fluid d-flex align-items-center">

                <a className="navbar-brand me-auto" href="/">
                    <img src={logo} alt="Cozcatlán" className="navbar-logo" />
                </a>

                <div className="d-flex align-items-center gap-3 ms-auto icons-container order-lg-last">

                    <a href="/settings" className="nav-icon" onClick={handleLogoutClick} title="Cerrar sesión">
                        <img src={Config} alt="Configuración" style={{ width: '30px', height: 'auto', cursor: 'pointer' }} />
                    </a>
                    
                    <button
                        className="navbar-toggler border-0 shadow-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav gap-lg-4 text-center py-3 py-lg-0">
                        <li className="nav-item">
                            <a className="nav-link-custom" href="/dashboardPrivate">Inicio</a>
                        </li>

                        {/* Si es empleado, este bloque se oculta automáticamente */}
                        {isAdmin && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link-custom" href="/admins">Administradores</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link-custom active" href="/employees">Empleados</a>
                                </li>
                            </>
                        )}

                        <li className="nav-item">
                            <a className="nav-link-custom" href="/suppliers">Proveedores</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link-custom" href="/productosprivados">Productos</a>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );
};

export default NavPrivate;