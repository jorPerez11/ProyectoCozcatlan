import { useState } from "react";
import Swal from "sweetalert2";

const API_URL = "http://localhost:4000/api/orders";

const useOrders = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Función para registrar la orden en la Base de Datos
    const createOrder = async (clientId) => {
        // Obtener los productos actuales del localStorage
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Validar que el carrito no esté vacío antes de enviar
        if (cart.length === 0) {
            Swal.fire("Carrito vacío", "No tienes productos para procesar.", "warning");
            return false;
        }

        // Validar que haya un cliente activo (simulado o desde auth)
        if (!clientId) {
            Swal.fire("Error de sesión", "Debes iniciar sesión para comprar.", "error");
            return false;
        }

        try {
            setLoading(true);
            setError("");

            // Mapear el formato del localStorage al formato que espera el Backend
            // LocalStorage usa: { id, quantity } 
            // el Controller espera: { product_id, amount }
            const payloadProducts = cart.map((item) => ({
                product_id: item.id,
                amount: item.quantity,
            }));

            const payload = {
                client_id: clientId,
                products: payloadProducts,
            };

            // Hacer la petición POST al servidor 
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error("No se pudo registrar la orden en el servidor.");
            }

            const data = await response.json();

            // Limpiamos el localStorage desde el hook
            localStorage.removeItem("cart");

            Swal.fire({
                title: "Orden Creada",
                text: "Tu orden ha sido registrada. Continua con el pago.",
                icon: "success",
                confirmButtonColor: "#4A7844" // El color verde lindo de Cozcatlán
            });
            return data;
            return true; // Indica a la vista que todo salió perfecto

        } catch (err) {
            console.error("Error al crear la orden:", err);
            setError(err.message || "Error al procesar la compra");
            Swal.fire("Error", err.message || "No se pudo completar la compra", "error");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        createOrder,
        loading,
        error,
    };
};

export default useOrders;