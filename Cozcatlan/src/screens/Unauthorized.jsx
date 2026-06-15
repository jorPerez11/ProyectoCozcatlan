import React from "react";
import { useNavigate } from "react-router";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center text-center bg-light">
      <div className="p-5 bg-white rounded shadow-sm border" style={{ maxWidth: "500px" }}>
        <i className="bi bi-shield-lock-fill text-danger" style={{ fontSize: "4rem" }}></i>
        <h1 className="text-dark fw-bold mt-3">Acceso Denegado</h1>
        <p className="text-muted fs-5 mt-2">
          Tu cuenta de colaborador no cuenta con los permisos necesarios para acceder a este módulo de administración central.
        </p>
        <hr />
        <button>
          className="btn btn-orange px-4 py-2 text-white fw-medium mt-2 shadow-sm"
          onClick={() => navigate("/dashboardPrivateEmployee")}
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;