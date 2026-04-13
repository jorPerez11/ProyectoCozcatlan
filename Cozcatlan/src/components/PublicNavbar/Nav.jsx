    import React from 'react';
    import './NavProducts.css';
    import logo from '../../assets/logo-cozcatlan.png'; 
    import shoppingC from '../../assets/shoppingcart.png';
    import Config from '../../assets/config.png';

    const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg custom-navbar px-4">
  <div className="container-fluid d-flex align-items-center">
    
    {/* LOGO */}
    <a className="navbar-brand me-auto" href="/">
      <img src={logo} alt="Cozcatlán" className="navbar-logo" />
    </a>

    {/* BOTÓN MÓVIL (puedes dejarlo pero asegúrate de que el div de abajo no se oculte) */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span className="navbar-toggler-icon"></span>
    </button>

    {/* ENLACES: Quitamos clases que colapsan para asegurar visibilidad */}
    <div className="navbar-links-center d-none d-lg-flex" id="navbarNav">
      <ul className="d-flex list-unstyled m-0 gap-4">
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

    {/* ICONOS */}
    <div className="d-flex align-items-center gap-3 ms-auto icons-container">
      <a href="/shoppingcart" className="nav-icon"><img src={shoppingC} alt="Carrito" style={{ width: '30px', height: 'auto' }} /></a>
      <a href="/settings" className="nav-icon"><img src={Config} alt="Configuración" style={{ width: '30px', height: 'auto' }} /></a>
    </div>
  </div>
</nav>
    );
    };

    export default Navbar;