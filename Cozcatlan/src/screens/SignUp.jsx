import React from 'react';
import CustomInput from '../components/SignUp/CustomInput.jsx';
import Nav from '../components/SignUp/Nav.jsx';
import "@fontsource/montserrat"; 
import "@fontsource/montserrat/700.css";

import UseAdminData from "../hooks/Client/UseClientData.jsx"; 
import { useAuth } from "../hooks/UseAuthClient.js"; // Hook de Autenticación provisto por tu compañero
import './SignUp.css';

const SignUp = () => {
  // 1. Instanciamos el contexto de autenticación global por si se necesita leer propiedades 
  // (Como el estado global de carga o configuraciones directas)
  const auth = useAuth();

  // 2. Traemos la lógica operativa del CRUD
  const {
    firstName,
    setName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    loading: crudLoading, // Renombramos para evitar colisión de variables si auth tiene loading
    errorUser,
    handleaSubmit 
  } = UseAdminData();

  // Determinamos si cualquiera de los dos flujos está cargando procesos
  const isSubmitting = crudLoading || auth?.loading;

  const onFormSubmit = async (e) => {
    e.preventDefault();
    await handleaSubmit();
  };

  return (
    <div className="signup-wrapper">
      <Nav />
      
      <main className="container d-flex align-items-center justify-content-center min-vh-100">
        <div className="signup-card p-4 p-md-5 shadow-lg">
          <h3 className="text-success fw-bold mb-0">Crea tu cuenta</h3>
          <p className="text-muted small mb-4">Bienvenido. Empecemos con una nueva cuenta.</p>
          
          {/* Alerta de errores de validación del hook */}
          {errorUser && (
            <div className="alert alert-danger small py-2" role="alert">
              {errorUser}
            </div>
          )}

          <form onSubmit={onFormSubmit}>
            
            <CustomInput 
              label="Nombre" 
              placeholder="Ingresa tu nombre" 
              value={firstName}
              onChange={(e) => setName(e.target.value)}
            />

            <CustomInput 
              label="Apellido" 
              placeholder="Ingresa tu apellido" 
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <CustomInput 
              label="Dirección de correo electrónico" 
              type="email" 
              placeholder="Ingresa tu correo electrónico" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <CustomInput 
              label="Contraseña" 
              type="password" 
              placeholder="Ingresa tu contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="form-check mb-4 text-start mt-3">
              <input className="form-check-input" type="checkbox" id="terms" required />
              <label className="form-check-label small text-muted" htmlFor="terms">
                He leído y acepto los <span className="text-orange fw-bold cursor-pointer">Términos y Condiciones</span>
              </label>
            </div>

            <div className="position-relative">
              <button 
                type="submit" 
                className="btn btn-orange w-100 py-3 fw-bold text-white shadow"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registrando..." : "Registrarse"}
              </button>
            </div>
            
            <div className="text-center mt-3">
              <span className="small text-muted">¿Ya tienes cuenta? </span>
              <a href="/loginClient" className="small text-orange fw-bold text-decoration-none">Inicia sesión</a>
            </div>
            
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;