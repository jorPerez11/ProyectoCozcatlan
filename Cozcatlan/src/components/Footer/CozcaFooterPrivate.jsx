import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import logoCozcatlan from '../../assets/logo-cozcatlan.png';
import './CozcaFooter.css';

const CozcaFooterPrivate = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="cozca-footer py-5 mt-auto">
      <div className="container-fluid px-md-5">
        <div className="row align-items-center">
          <div className="col-12 col-md-4 text-center text-md-start mb-4 mb-md-0">
            <div className="footer-logo-container mb-3">
              <img src={logoCozcatlan} alt="Logo Cozcatlán" className="img-fluid footer-logo" />
            </div>
            <div className="footer-social-icons d-flex justify-content-center justify-content-md-start gap-3">
              {[FaInstagram, FaFacebookF, FaTwitter, FaYoutube].map((Icon, index) => (
                <div key={index} className="social-icon-circle">
                  <Icon />
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-4 text-center mb-4 mb-md-0">
            <nav className="footer-nav d-flex flex-wrap justify-content-center gap-4">
              <a href="/dashboardPrivate" className="footer-link">Inicio</a>
              <a href="/admins" className="footer-link">Administradores</a>
              <a href="/employees" className="footer-link">Empleados</a>
              <a href="/suppliers" className="footer-link">Proveedores</a>
              <a href="/productosprivados" className="footer-link">Productos</a>
            </nav>
            <div className="mt-4 copyright-text">
               ©{currentYear} Cozcatlan
            </div>
          </div>
          <div className="col-12 col-md-4 text-center text-md-end footer-contact-info">
            <div className="d-flex align-items-center justify-content-center justify-content-md-end gap-3 mb-3">
              <span className="contact-text">+503 7831-4183</span>
              <FaWhatsapp className="contact-icon-main" />
            </div>
            <div className="d-flex align-items-center justify-content-center justify-content-md-end gap-3 mb-3">
              <a href="mailto:contacto@cozcatlan.com" className="contact-text email-link">
                contacto@cozcatlan.com
              </a>
              <FaEnvelope className="contact-icon-main" />
            </div>
            <p className="mb-0 fs-7 footer-terms"><a href="/terms-and-conditions" className="contact-text terms-link">Términos y Condiciones</a></p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default CozcaFooterPrivate;