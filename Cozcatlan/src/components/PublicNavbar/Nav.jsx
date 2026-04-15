import React from 'react';
import './NavProducts.css';
import logo from '../../assets/logo-cozcatlan.png'; 
import shoppingC from '../../assets/shoppingcart.png';
import Config from '../../assets/config.png';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar px-4 fixed-top">
      <div className="container-fluid d-flex align-items-center">
        
        {/* 1. LOGO (Izquierda) */}
        <a className="navbar-brand me-auto" href="/">
          <img src={logo} alt="Cozcatlán" className="navbar-logo" />
        </a>

        {/* 2. ICONOS (Ahora están antes del botón en el código para que en móvil queden a la izquierda del toggle) */}
        <div className="d-flex align-items-center gap-3 ms-auto icons-container order-lg-last">
          <a href="/shoppingcart" className="nav-icon">
            <img src={shoppingC} alt="Carrito" style={{ width: '30px', height: 'auto' }} />
          </a>
          <a href="/settings" className="nav-icon">
            <img src={Config} alt="Configuración" style={{ width: '30px', height: 'auto' }} />
          </a>
          
          {/* 3. BOTÓN HAMBURGUESA (Al final de los iconos en móvil) */}
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

        {/* 4. ENLACES COLAPSABLES */}
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