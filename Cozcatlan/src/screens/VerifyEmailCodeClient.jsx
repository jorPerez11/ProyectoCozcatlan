import React, { useState } from 'react';
import CustomInput from '../components/SignUp/CustomInput.jsx';
import { useNavigate } from 'react-router'; 
import { toast } from "sonner"; 
import './SignUp.css';

export const VerifyEmailCode = () => {
    const navigate = useNavigate(); 
    
    // Endpoints apuntando correctamente al flujo del cliente
    const API_VERIFY = "http://localhost:4000/api/client/registerClient/verifyCodeEmail"; 
    const API_REGISTER = "http://localhost:4000/api/client/registerClient"; 

    const [otpCode, setOtpCode] = useState(""); 
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [isResending, setIsResending] = useState(false); 

    // Función para manejar la verificación del código
    const handleSubmit = async (event) => {
        event.preventDefault(); 

        if (otpCode.length !== 6) { 
            toast.error("Ingresa el código de verificación de 6 dígitos");
            return;
        }
        
        if (!/^[a-zA-Z0-9]{6}$/.test(otpCode)) {
            toast.error("El código de verificación debe tener 6 caracteres (letras y números)");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(API_VERIFY, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", 
                body: JSON.stringify({ verificationCodeRequest: otpCode }),
            });

            const payload = await response.json().catch(() => ({}));
            
            if (!response.ok) {
                throw new Error(payload?.message || "No se pudo verificar el código");
            }

            // Limpieza del estado de registro temporal
            sessionStorage.removeItem("pendingRegistration");
            toast.success(payload?.message || "Cuenta de cliente verificada correctamente");
            
            // Redirigir al Login del Cliente
            navigate("/loginClient"); 
        } catch (error) {
            toast.error(error.message || "Error verificando código OTP");
        } finally {
            setIsSubmitting(false); 
        }
    };

    // Función para manejar el reenvío del código OTP
    const handleResend = async () => {
        const rawPending = sessionStorage.getItem("pendingRegistration");
        if (!rawPending) {
            toast.error("No hay datos de registro para reenviar el código");
            return;
        }

        setIsResending(true); 

        try {
            const payload = JSON.parse(rawPending);
            const response = await fetch(API_REGISTER, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            const result = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(result?.message || "No se pudo reenviar el código");
            }

            toast.success(result?.message || "Código de verificación reenviado a tu correo");
        } catch (error) {
            toast.error(error.message || "No se pudo reenviar el código");
        } finally {
            setIsResending(false); 
        }
    };

    return (
        <div className="signup-wrapper">
            <main className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className="signup-card p-4 p-md-5 shadow-lg">
                    <h3 className="text-success fw-bold mb-0">Verificación de cuenta</h3>
                    <p className="text-muted small mb-4">Ingresa el código que enviamos a tu correo electrónico para activar tu cuenta de cliente.</p>

                    <form onSubmit={handleSubmit}>
                        <CustomInput
                            label="Código de Verificación"
                            type="text"
                            placeholder="Ej: a1b2c3"
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                        />

                        {/* Modificado para un espaciado más limpio en Bootstrap */}
                        <div className="d-flex gap-3 mt-4">
                            <button 
                                type="button" 
                                onClick={handleResend} 
                                disabled={isResending || isSubmitting} 
                                className="btn btn-outline-secondary w-100 py-3 fw-bold shadow-sm"
                            >
                                {isResending ? "Reenviando..." : "Reenviar"}
                            </button>

                            <button 
                                type="submit" 
                                disabled={isSubmitting || isResending} 
                                className="btn btn-orange w-100 py-3 fw-bold text-white shadow"
                            >
                                {isSubmitting ? "Verificando..." : "Verificar"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default VerifyEmailCode;