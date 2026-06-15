import React from "react";

// Pasamos la prop 'showButton' y le asignamos true por defecto
const Nav = ({ showButton = true }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent position-absolute w-100 top-0 p-4">
            <div className="container-fluid justify-content-end">
                <div className="d-flex gap-2">
                    
                    {/* si showButton es true, se muestra el botón */}
                    {showButton && (
                        <a href='/signup'>
                            <button className="btn btn-orange px-4 py-2 text-white fw-medium shadow-sm">
                                Registrarse
                            </button>
                        </a>
                    )}
                    
                </div>
            </div>
        </nav>
    );
}

export default Nav;