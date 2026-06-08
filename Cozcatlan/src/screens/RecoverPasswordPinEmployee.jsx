import React, { useState } from 'react';
import CustomInput from '../components/SignUp/CustomInput.jsx';
import './SignUp.css';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'sonner';

export const RecoverPasswordPinEmployee = () => {
    const navigate = useNavigate(); 
    const [pin, setPin] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Endpoint adaptado para la verificación de empleados
    const API_VERIFY_CODE = "http://localhost:4000/api/employee/recoveryPasswordEmployee/verifyCode";

    const handleNext = async (e) => {
        e.preventDefault(); 

        // Recuperamos el correo que guardamos en la primera pantalla de empleados
        const email = sessionStorage.getItem("recoveryEmailEmployee");
        if (!email) {
            toast.error("Sesión de recuperación inválida. Vuelve a empezar.");
            navigate('/recoveryPasswordEmployee');
            return;
        }

        if (!pin.trim()) {
            toast.error("Por favor, ingresa el pin de acceso");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(API_VERIFY_CODE, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ 
                    email: email,
                    verificationCodeRequest: pin.trim() 
                })
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data?.message || "Código PIN incorrecto o expirado");
            }

            // Guardamos el pin validado específicamente para el flujo del empleado
            sessionStorage.setItem("recoveryPinEmployee", pin.trim());
            toast.success("Código verificado correctamente");
            
            // Avanzamos al último paso de empleados
            navigate('/recoveryNewPasswordEmployee'); 
        } catch (error) {
            toast.error(error.message || "Error al verificar el pin");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup-wrapper">
            <main className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className="signup-card p-4 p-md-5 shadow-lg">
                    <h3 className="text-success fw-bold mb-0">Recuperación de contraseña</h3>
                    <p className="text-muted small mb-4">Portal de Personal. Ingresa el pin de acceso que se envió a tu correo electrónico institucional</p>

                    <form onSubmit={handleNext}>
                        <CustomInput 
                            label="Pin de Verificación" 
                            type="text" 
                            placeholder="Ingresa tu pin" 
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                        />

                        <div className='buttonsFlex'>
                            <button 
                                type="button" 
                                onClick={() => navigate('/recoveryPasswordEmployee')} 
                                className="btn btn-orange w-100 py-3 fw-bold text-white shadow"
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                className="btn btn-orange w-100 py-3 fw-bold text-white shadow"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Validando..." : "Siguiente"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default RecoverPasswordPinEmployee;