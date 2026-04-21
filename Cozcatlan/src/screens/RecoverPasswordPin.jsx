import React from 'react';

import CustomInput from '../components/SignUp/CustomInput.jsx';
import './SignUp.css';
import { useNavigate } from 'react-router-dom'; // 1. Importamos el hook


export const RecoverPasswordPin = () => {

     const navigate = useNavigate(); // 2. Inicializamos la función de navegación
        const handleNext = (e) => {
            e.preventDefault(); // Evita que la página se recargue
            // Aquí podrías poner lógica extra, como guardar el email en un estado
            navigate('/recoveryNewPassword'); // 3. Ordenamos la navegación
        };
    return (
        <div className="signup-wrapper">
            <main className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className="signup-card p-4 p-md-5 shadow-lg">
                    <h3 className="text-success fw-bold mb-0">Recuperación de contraseña</h3>
                    <p className="text-muted small mb-4">Ingresa el pin de acceso que se envio a tu correo electrónico</p>

                    <form onSubmit={handleNext}>
                        <CustomInput label="Dirección de correo electrónico" type="email" placeholder="Ingresa tu pin" />

                      

                    <div className='buttonsFlex'>
                         <button type="button" onClick={() => navigate('/recoveryPassword')} className="btn btn-orange w-100 py-3 fw-bold text-white shadow">
                            Cancelar
                        </button>
                         <button type="submit" className="btn btn-orange w-100 py-3 fw-bold text-white shadow">
                            Siguiente
                        </button>

                    </div>
                       
                    </form>
                </div>
            </main>


        </div>

    );
};

export default RecoverPasswordPin;