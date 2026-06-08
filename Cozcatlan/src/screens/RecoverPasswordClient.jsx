import React, { useState } from 'react';
import CustomInput from '../components/SignUp/CustomInput.jsx';
import './SignUp.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const RecoverPasswordClient = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const API_REQUEST_CODE = "http://localhost:4000/api/client/recoveryPasswordClient/requestCode";

    const handleNext = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Por favor, ingresa tu correo electrónico");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(API_REQUEST_CODE, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email: email.trim() })
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data?.message || "No se pudo enviar el código");
            }

            // Guardamos el correo para usarlo en los siguientes pasos del flujo
            sessionStorage.setItem("recoveryEmailClient", email.trim());
            toast.success(data?.message || "Código de recuperación enviado a tu correo");

            // Avanzamos a la pantalla del PIN del cliente
            navigate('/recoveryPasswordPinClient');
        } catch (error) {
            toast.error(error.message || "Error al solicitar el código");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="signup-wrapper">
            <main className="container d-flex align-items-center justify-content-center min-vh-100">
                <div className="signup-card p-4 p-md-5 shadow-lg">
                    <h3 className="text-success fw-bold mb-0">Recuperación de contraseña</h3>
                    <p className="text-muted small mb-4">Bienvenido. Empecemos con la recuperación de su contraseña de cliente.</p>

                    <form onSubmit={handleNext}>
                        <CustomInput
                            label="Dirección de correo electrónico"
                            type="email"
                            placeholder="Ingresa tu correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <div className='buttonsFlex'>
                            <button
                                type="button"
                                onClick={() => navigate('/loginClient')}
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
                                {isSubmitting ? "Enviando..." : "Siguiente"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default RecoverPasswordClient;