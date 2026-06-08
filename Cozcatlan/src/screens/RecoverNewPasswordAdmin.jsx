import React, { useState } from 'react';
import CustomInput from '../components/SignUp/CustomInput.jsx';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'sonner';

export const RecoverNewPasswordAdmin = () => {
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Endpoint adaptado para guardar la nueva contraseña del administrador
    const API_NEW_PASSWORD = "http://localhost:4000/api/admin/recoveryPasswordAdmin/newPassword";

    const handleNext = async (e) => {
        e.preventDefault();

        // Leemos los datos guardados en los pasos anteriores del administrador
        const email = sessionStorage.getItem("recoveryEmailAdmin");
        const verificationCode = sessionStorage.getItem("recoveryPinAdmin");

        if (!email || !verificationCode) {
            toast.error("Sesión de recuperación expirada. Vuelve a empezar.");
            navigate('/recoveryPasswordAdmin');
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
                    newPassword: trimmedPassword,
                    confirmPassword: trimmedConfirm
                })
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data?.message || "No se pudo actualizar la contraseña");
            }

            // Limpieza de datos temporales exclusivos del administrador
            sessionStorage.removeItem("recoveryEmailAdmin");
            sessionStorage.removeItem("recoveryPinAdmin");

            // Mostrar alerta de éxito adaptada al administrador
            await Swal.fire({
                title: '¡Éxito!',
                text: 'Tu contraseña de administrador ha sido cambiada correctamente.',
                icon: 'success',
                confirmButtonText: 'Ir al Login',
                confirmButtonColor: '#ff8c00',
            });

            // Redirección directa al login de administradores
            navigate('/loginAdmin');
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
                    <p className="text-muted small mb-4">Portal de Personal. Crea una nueva contraseña segura para tu acceso de administrador.</p>

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
                                onClick={() => navigate('/recoveryPasswordPinAdmin')}
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
                                {isSubmitting ? "Actualizando..." : "Confirmar"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default RecoverNewPasswordAdmin;