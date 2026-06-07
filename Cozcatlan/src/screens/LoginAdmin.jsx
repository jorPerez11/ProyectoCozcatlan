import React from "react";
import Nav from '../components/Login/Nav';
import CustomInput from '../components/SignUp/CustomInput';
import PrimaryButton from '../components/SignUp/ButtonSignUp';
import logoCozcatlan from '../assets/Cozcatlan_Logo 3.png';
import './Login.css';
import { Link, useNavigate } from "react-router"; // Importación de hooks y componentes necesarios para la funcionalidad de inicio de sesión y navegación
import { useState } from "react"; // Importación de useState para manejar el estado local del formulario de inicio de sesión
import { useAuth } from "../hooks/UseAuthAdmin.js"; // Importación de hook personalizado para manejar la autenticación del cliente
import { toast, Toaster } from "sonner";




const LoginAdmin = () => {

  const navigate = useNavigate(); // Hook para manejar la navegación programática
  const { login, loading } = useAuth(); // Hook personalizado para manejar la autenticación del cliente
  const [email, setEmail] = useState(""); // Estado local para almacenar el correo electrónico ingresado por el usuario
  const [password, setPassword] = useState(""); // Estado local para almacenar la contraseña ingresada por el usuario

  // Función para manejar el envío del formulario de inicio de sesión
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
       // Validación básica para asegurarse de que el correo electrónico y la contraseña no estén vacíos
      return;
    }
  
    const ok = await login(email.trim(), password); // Llamada a la función de inicio de sesión del hook personalizado
    if (!ok) {
      return;
    }
   
    navigate("/dashboardPrivate"); // Navegación al dashboard si el inicio de sesión es exitoso
  };

  return (
    <div className="login-wrapper">
      <Nav />
      <div className="container-fluid p-0">
        <div className="row g-0 min-vh-100">


          <div className="col-lg-4 d-none d-lg-flex flex-column justify-content-center align-items-center left-panel text-white">

            <div className="top-visual-container">
              <img
                src={logoCozcatlan}
                alt="Cozcatlán - El sabor de tu hogar"
                className="img-fluid top-full-img"
              />
            </div>


            <div className="bottom-text-content text-center mt-auto mb-5">
              <h2 className="display-6 fw-light">El sabor de tu hogar</h2>
              <p className="fs-5">Ingredientes 100% salvadoreños.</p>
            </div>
          </div>


          <div className="col-lg-8 d-flex align-items-center justify-content-center right-panel">
            <div className="login-card p-4 p-md-5">
              <h1 className="text-success fw-bold">Bienvenido</h1>
              <p className="text-muted mb-4">Inicia sesión en tu cuenta</p>
              <hr className="mb-4" />

              <form onSubmit={handleSubmit}>
                <CustomInput
                  label="Dirección de correo electrónico"
                  placeholder="Ingresa tu correo electrónico"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />

                <div className="position-relative">
                  <CustomInput
                    label="Contraseña"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <i className="bi bi-eye position-absolute end-0 top-50 me-3 mt-2 cursor-pointer"></i>
                </div>

                <div className="mt-5 position-relative">
                  <PrimaryButton text= {loading ? "Ingresando..." : "Iniciar sesión"}
                    disabled={loading}



                  />
                </div>
               

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};


export default LoginAdmin;