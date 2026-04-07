import React from 'react';
import './SignUp.css';

const SignUp = () => {
  return (
    <div className="signup-container d-flex align-items-center justify-content-center">
      <div className="signup-card p-4 p-md-5">
        <h2 className="text-success fw-bold mb-1">Crea tu cuenta</h2>
        <p className="text-muted small mb-4">Bienvenido. Empecemos con una nueva cuenta.</p>
        
        <form>
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">Nombre completo</label>
            <input type="text" className="form-control custom-input" placeholder="Ingresa tu nombre completo" />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">Dirección de correo electrónico</label>
            <input type="email" className="form-control custom-input" placeholder="Ingresa tu correo electrónico" />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">Contraseña</label>
            <input type="password" className="form-control custom-input" placeholder="Ingresa tu contraseña" />
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">Número de teléfono</label>
            <div className="input-group">
              <span className="input-group-text bg-light">
                <img src="https://flagcdn.com/w20/sv.png" alt="El Salvador" className="me-2" /> +503
              </span>
              <input type="tel" className="form-control custom-input" />
            </div>
          </div>

          <div className="form-check mb-4">
            <input className="form-check-input" type="checkbox" id="terms" />
            <label className="form-check-label small text-muted" htmlFor="terms">
              He leído y acepto los <span className="text-orange">Términos y Condiciones</span>
            </label>
          </div>

          <button type="submit" className="btn btn-orange w-100 py-2 fw-bold text-white">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;