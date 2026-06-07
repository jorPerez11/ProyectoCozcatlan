import React from 'react';

import CustomInput from '../components/SignUp/CustomInput.jsx';
import './SignUp.css';
import { Link, useNavigate } from 'react-router'; // 1. Importamos el hook
import { useState } from "react"; // Importación de useState para manejar el estado local del formulario de verificación OTP
import { toast } from "sonner"; // Importación de la biblioteca de notificaciones para mostrar mensajes de éxito o error al usuario


export const VerifyEmailCode = () => {

    const navigate = useNavigate(); // Inicializamos la función de navegación
    const API_VERIFY = "http://localhost:4000/api/admin/registerAdmin/verifyCodeEmail"; // URL del endpoint para verificar el código OTP
    const API_REGISTER = "http://localhost:4000/api/admin/registerAdmin"; // URL del endpoint para registrar un nuevo usuario (utilizado para reenviar el código OTP)
    const [otpCode, setOtpCode] = useState(""); // Estado local para almacenar el código OTP ingresado por el usuario
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado local para manejar el estado de envío del formulario de verificación OTP
    const [isResending, setIsResending] = useState(false); // Estado local para manejar el estado de reenvío del código OTP




    // Función para manejar el envío del formulario de verificación OTP
    const handleSubmit = async (event) => {
        event.preventDefault(); // Previene el comportamiento predeterminado del formulario para evitar recargas de página

        if (otpCode.length !== 6) { // Validación básica para asegurarse de que el código OTP tenga exactamente 6 dígitos
            toast.error("Ingresa el código de verificación de 6 dígitos");
            return;
        }
        // Validación adicional para asegurarse de que el código OTP sea alfanumérico (letras y números) de 6 caracteres
        if (!/^[a-zA-Z0-9]{6}$/.test(otpCode)) {
            toast.error("El código de verificación debe tener 6 caracteres y solo contener letras y números");
            return;
        }

        // Si las validaciones pasan, se procede a enviar el código OTP al backend para su verificación
        setIsSubmitting(true);

        try {
            const response = await fetch(API_VERIFY, {
                method: "POST", // Método POST para enviar el código OTP al backend
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Incluye las cookies en la solicitud para que el backend pueda acceder al token de registro almacenado en la cookie
                body: JSON.stringify({ verificationCodeRequest: otpCode }),
            });

            // Se intenta parsear la respuesta del backend como JSON 
            const payload = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(payload?.message || "No se pudo verificar el código");
            }

            // Si la verificación es exitosa, se elimina el token de registro de la cookie y se muestra un mensaje de éxito
            sessionStorage.removeItem("pendingRegistration");
            toast.success(payload?.message || "Cuenta verificada correctamente");
            navigate("/loginAdmin");
        } catch (error) {
            toast.error(error.message || "Error verificando código OTP");
        } finally {
            setIsSubmitting(false); // Se restablece el estado de envío del formulario independientemente del resultado de la verificación
        }
    };



    // Función para manejar el reenvío del código OTP al usuario
    const handleResend = async () => {
        const rawPending = sessionStorage.getItem("pendingRegistration");
        if (!rawPending) {
            toast.error("No hay datos de registro para reenviar el código");
            return;
        }

        setIsResending(true); // Se establece el estado de reenvío para deshabilitar el botón mientras se procesa la solicitud de reenvío

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

            toast.success(result?.message || "Código reenviado");
        } catch (error) {
            toast.error(error.message || "No se pudo reenviar el código");
        } finally {
            setIsResending(false); // Se restablece el estado de reenvío independientemente del resultado de la solicitud
        }
    };
    return (
        <div className="signup-wrapper">
            <main className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className="signup-card p-4 p-md-5 shadow-lg">
                    <h3 className="text-success fw-bold mb-0">Verifiación de cuenta</h3>
                    <p className="text-muted small mb-4">Bienvenido. Empecemos con la Verifiación de su cuenta</p>

                    <form onSubmit={handleSubmit}>
                        <CustomInput
                            label="Ingrese el código de verificación"
                            type="text"
                            placeholder="Ingresa el código"
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                        />



                        <div className='buttonsFlex'>
                            <button type="button" onClick={handleResend} disabled={isResending} className="btn btn-orange w-100 py-3 fw-bold text-white shadow">
                                {isResending ? "Reenviando..." : "Reenviar código"}
                            </button>

                            <button type="submit" disabled={isSubmitting} className="btn btn-orange w-100 py-3 fw-bold text-white shadow">
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