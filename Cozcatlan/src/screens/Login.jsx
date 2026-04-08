import React from "react";
import Nav from '../components/Login/Nav';
import CustomInput from '../components/SignUp/CustomInput';
import PrimaryButton from '../components/SignUp/ButtonSignUp';
import './Login.css';


const Login = () => {
  return (
    <div className="login-wrapper">
      <Nav />
      <div className="container-fluid p-0">
        <div className="row g-0 min-vh-100">
          
         
          <div className="col-lg-5 d-none d-lg-flex flex-column justify-content-center align-items-center left-panel p-5 text-white">
            <div className="overlay-content text-center">
              <div className="brand-images mb-4">
                 <img src="/path-to-your-combined-images.png" alt="Cozcatlan" className="img-fluid" />
              </div>
              <h2 className="display-5 fw-light">El sabor de tu hogar</h2>
              <p className="fs-5">Ingredientes 100% salvadoreños.</p>
            </div>
          </div>

         
          <div className="col-lg-7 d-flex align-items-center justify-content-center right-panel">
            <div className="login-card p-4 p-md-5">
              <h1 className="text-success fw-bold">Bienvenido</h1>
              <p className="text-muted mb-4">Inicia sesión en tu cuenta</p>
              <hr className="mb-4" />

              <form>
                <CustomInput 
                  label="Dirección de correo electrónico" 
                  placeholder="Ingresa tu correo electrónico" 
                />
                
                <div className="position-relative">
                    <CustomInput 
                      label="Contraseña" 
                      type="password" 
                      placeholder="Ingresa tu contraseña" 
                    />
                    <i className="bi bi-eye position-absolute end-0 top-50 me-3 mt-2 cursor-pointer"></i>
                </div>

                <div className="mt-5">
                  <PrimaryButton text="Iniciar Sesión" />
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};


export default Login;