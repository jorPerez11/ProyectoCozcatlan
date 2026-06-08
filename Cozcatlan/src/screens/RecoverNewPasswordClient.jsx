import React, { useState } from 'react';
import CustomInput from '../components/SignUp/CustomInput.jsx';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'sonner';

export const RecoverNewPasswordClient = () => {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const API_NEW_PASSWORD = "http://localhost:4000/api/client/recoveryPasswordClient/newPassword";

    const handleNext = async (e) => {
        e.preventDefault();

        const email = sessionStorage.getItem("recoveryEmailClient");
        const verificationCode = sessionStorage.getItem("recoveryPinClient");

        if (!email || !verificationCode) {
            toast.error("Sesión de recuperación expirada. Vuelve a empezar.");
            navigate('/recoveryPasswordClient');
            return;
        }

        // Limpiamos espacios en blanco invisibles desde el principio
        const trimmedPassword = newPassword.trim();
        const trimmedConfirm = confirmPassword.trim();

        if (!trimmedPassword || !trimmedConfirm) {
            toast.error("Todos los campos son obligatorios");
            return;
        }

        // Comparamos las versiones limpias sin espacios ocultos
        if (trimmedPassword !== trimmedConfirm) {
            toast.error("Las contraseñas no coinciden");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(API_NEW_PASSWORD, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    // MANDAMOS AMBAS tal como las espera el req.body del backend
                    newPassword: trimmedPassword,
                    confirmPassword: trimmedConfirm
                })
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data?.message || "No se pudo actualizar la contraseña");
            }

            // Limpieza de datos temporales
            sessionStorage.removeItem("recoveryEmailClient");
            sessionStorage.removeItem("recoveryPinClient");

            // Mostrar alerta de éxito
            await Swal.fire({
                title: '¡Éxito!',
                text: 'Tu contraseña de cliente ha sido cambiada correctamente.',
                icon: 'success',
                confirmButtonText: 'Ir al Login',
                confirmButtonColor: '#ff8c00',
            });

            navigate('/loginClient');
        } catch (error) {
            toast.error(error.message || "Error al cambiar la contraseña");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup-wrapper">
            <main className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className="signup-card p-4 p-md-5 shadow-lg">
                    <h3 className="text-success fw-bold mb-0">Restablecer contraseña</h3>
                    <p className="text-muted small mb-4">Bienvenido. Empecemos con una nueva contraseña para tu cuenta.</p>

                    <form onSubmit={handleNext}>
                        <CustomInput
                            label="Ingrese su nueva contraseña"
                            type="password"
                            placeholder="Nueva contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <CustomInput
                            label="Confirme su contraseña"
                            type="password"
                            placeholder="Confirme contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                        <div className='buttonsFlex'>
                            <button
                                type="button"
                                onClick={() => navigate('/recoveryPasswordPinClient')}
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
                                {isSubmitting ? "Actualizando..." : "Siguiente"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default RecoverNewPasswordClient;