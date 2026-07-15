import React, { useContext } from 'react';
import './NavProducts.css';
import logo from '../../assets/logo-cozcatlan.png';
import shoppingC from '../../assets/shoppingcart.png';
import Config from '../../assets/config.png';
import Swal from 'sweetalert2'; 

// Importamos el contexto nativo del cliente
import { AuthContextClient } from "../../contexts/AuthContextClient"; 

const Navbar = () => {
  // Extraemos la función logout del contexto del cliente
  const { logout } = useContext(AuthContextClient);

  // Función para manejar la alerta y procesar el cierre de sesión del cliente
  const handleLogoutClick = (e) => {
    e.preventDefault(); // Evitamos redirección inmediata a /settings

    Swal.fire({
      title: '¿Cerrar sesión?',
      text: "Estás seguro de que quieres cerrar tu sesión de cliente.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
      reverseButtons: true 
    }).then((result) => {
      if (result.isConfirmed) {
        // Ejecuta el logout del backend del cliente y limpia todo el almacenamiento
        if (logout) {
          logout();
        }
      }
    });
  };

  return (
    <nav className="navbar navbar-expand-lg custom-navbar px-4">
      <div className="container-fluid d-flex align-items-center">

        <a className="navbar-brand me-auto" href="/">
          <img src={logo} alt="Cozcatlán" className="navbar-logo" />
        </a>

        <div className="d-flex align-items-center gap-3 ms-auto icons-container order-lg-last">
          <a href="/shoppingcart" className="nav-icon">
            <img src={shoppingC} alt="Carrito" style={{ width: '30px', height: 'auto' }} />
          </a>

          {/* Asignamos el evento onClick al engranaje de configuración */}
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
              <a className="nav-link-custom" href="/">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link-custom" href="/aboutUs">Sobre Nosotros</a>
            </li>
            <li className="nav-item">
              <a className="nav-link-custom active" href="/products">Productos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link-custom" href="/contact">Contacto</a>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;