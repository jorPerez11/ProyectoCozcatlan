import React from 'react';

import CustomInput from '../components/SignUp/CustomInput.jsx';
import './SignUp.css';
import { useNavigate } from 'react-router-dom'; // 1. Importamos el hook
import Swal from 'sweetalert2'; // Importamos la librería

export const RecoverNewPassword = () => {

    const navigate = useNavigate(); // 2. Inicializamos la función de navegación
    const handleNext = async (e) => {
        e.preventDefault(); // Evita que la página se recargue
        // Aquí podrías poner lógica extra, como guardar el email en un estado

        // 1. Mostrar la alerta bonita
        await Swal.fire({
            title: '¡Éxito!',
            text: 'Tu contraseña ha sido cambiada correctamente.',
            icon: 'success',
            confirmButtonText: 'Ir al Login',
            confirmButtonColor: '#ff8c00', // El color naranja de tu botón
        });
        navigate('/login'); // 3. Ordenamos la navegación

    };
    return (
        <div className="signup-wrapper">
            <main className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className="signup-card p-4 p-md-5 shadow-lg">
                    <h3 className="text-success fw-bold mb-0">Restablecer contraseña</h3>
                    <p className="text-muted small mb-4">Bienvenido. Empecemos con una nueva contraseña.</p>

                    <form onSubmit={handleNext}>
                        <CustomInput label="Ingrese su nueva contraseña" type="password" placeholder="Nueva contraseña" />
                        <CustomInput label="Confirme su contraseña" type="password" placeholder="Confirme contraseña" />




                        <div className='buttonsFlex'>
                            <button type="button" onClick={() => navigate('/recoveryPasswordPin')} className="btn btn-orange w-100 py-3 fw-bold text-white shadow">
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

export default RecoverNewPassword;