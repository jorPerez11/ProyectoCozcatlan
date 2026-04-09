import React from "react";


const Nav = () => {
    return(
        
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent  w-100 top-0 p-1">
            <div className="container-fluid justify-content-end">
                <div className="d-flex gap-2">
                {/* Botón Registrarse (Naranja) */}
                <button className="btn btn-orange px-4 py-2 text-white fw-medium shadow-sm">
                    Registrarse
                </button>
                
                {/* Botón Iniciar Sesión (Blanco con borde verde) */}
                <button className="btn btnLogin btn-outline-success bg-white px-4 py-2 fw-medium shadow-sm">
                    Iniciar sesión
                </button>
                </div>
            </div>
            </nav>
    )
}

export default Nav;