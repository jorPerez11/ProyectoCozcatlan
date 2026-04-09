import React from 'react';
import CustomInput from '../components/SignUp/CustomInput.jsx';
import Nav from '../components/SignUp/Nav.jsx';
import "@fontsource/montserrat"; 
import "@fontsource/montserrat/700.css";
import './SignUp.css';

const SignUp = () => {
  return (
    <div className="signup-wrapper">
      <Nav />
      
      <main className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="signup-card p-4 p-md-5 shadow-lg">
          <h3 className="text-success fw-bold mb-0">Crea tu cuenta</h3>
          <p className="text-muted small mb-4">Bienvenido. Empecemos con una nueva cuenta.</p>
          
          <form>
            <CustomInput label="Nombre completo" placeholder="Ingresa tu nombre completo" />
            <CustomInput label="Dirección de correo electrónico" type="email" placeholder="Ingresa tu correo electrónico" />
            <CustomInput label="Contraseña" type="password" placeholder="Ingresa tu contraseña" />
            
            {/* Input de Teléfono especial */}
            <div className="mb-3 text-start">
              <label className="form-label small fw-bold text-secondary mb-1">Número de teléfono</label>
              <div className="input-group">
                <span className="input-group-text bg-light custom-input-left">
                  <img src="https://flagcdn.com/w20/sv.png" alt="SV" className="me-2" /> +503
                </span>
                <input type="tel" className="form-control custom-input-right" />
              </div>
            </div>

            <div className="form-check mb-4 text-start">
              <input className="form-check-input" type="checkbox" id="terms" />
              <label className="form-check-label small text-muted" htmlFor="terms">
                He leído y acepto los <span className="text-orange fw-bold cursor-pointer">Términos y Condiciones</span>
              </label>
            </div>

            <button type="submit" className="btn btn-orange w-100 py-3 fw-bold text-white shadow">
              Registrarse
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;