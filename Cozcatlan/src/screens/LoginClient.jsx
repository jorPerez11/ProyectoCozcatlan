import React from "react";
import Nav from '../components/Login/Nav';
import CustomInput from '../components/SignUp/CustomInput';
import PrimaryButton from '../components/SignUp/ButtonSignUp';
import logoCozcatlan from '../assets/Cozcatlan_Logo 3.png';
import './Login.css';
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../hooks/UseAuthClient.js";
import { toast, Toaster } from "sonner";

const LoginClient = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      return;
    }

    const ok = await login(email.trim(), password);
    if (!ok) {
      return;
    }

    navigate("/");
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

                <div className="position-relative mb-2">
                  <CustomInput
                    label="Contraseña"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <i className="bi bi-eye position-absolute end-0 top-50 me-3 mt-2 cursor-pointer"></i>
                </div>

                {/* Olvidaste tu contraseña */}
                <div className="text-end mb-4">
                  <Link to="/recoveryPasswordClient" className="small text-orange fw-bold text-decoration-none">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>

                <div className="mt-4 position-relative">
                  <PrimaryButton text={loading ? "Ingresando..." : "Iniciar sesión"} disabled={loading} />
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginClient;