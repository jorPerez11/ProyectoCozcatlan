import React, { useState } from "react";
import "./ShoppingCart.css";
import Nav from "../components/PublicNavbar/Nav.jsx";
import FinishBtn from "../components/ShoppingCart/FinishBtn.jsx";
import CozcaFooter from "../components/Footer/CozcaFooter.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    direccion: "",
    titular: "",
    numeroTarjeta: "",
    vencimiento: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Aplicar máscaras según el campo
    if (name === "numeroTarjeta") {
      formattedValue = formatCardNumber(value);
    } else if (name === "vencimiento") {
      formattedValue = formatExpiryDate(value);
    } else if (name === "cvv") {
      formattedValue = formatCVV(value);
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  //funcion handleSubmit convertida en async para el fetch de API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // prepara el objeto con los datos que el controller espera recibir
      const saleData = {
        delivery_address: formData.direccion,
        payment_method: "Tarjeta de Crédito/Débito",
      };

      // petición HTTP POST a backend
      const response = await fetch("http://localhost:4000/api/sales", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(saleData),
      });

      const data = await response.json();

      // validacion de resultado
      if (response.ok) {
        Swal.fire({
          title: "¡Éxito!",
          text: "Su compra ha sido procesada exitosamente.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#70c15c",
        }).then((result) => {
          // si el usuario presionó el botón OK (o confirmo la alerta)
          if (result.isConfirmed) {
            navigate("/products"); // redirige a la ruta de productos
          }
        });

        // Limpiar formulario
        setFormData({
          direccion: "",
          titular: "",
          numeroTarjeta: "",
          vencimiento: "",
          cvv: ""
        });
      } else {
        // Si el servidor responde con un error estructurado (ej. 400 o 500)
        throw new Error(data.message || "Error en el servidor");
      }

    } catch (error) {
      console.error("Error al conectar con el backend:", error);

      // 6. Si algo falla (Error de servidor, problemas de red, etc.), disparamos alerta de error
      Swal.fire({
        title: "Error",
        text: error.message || "No se pudo procesar la compra.",
        icon: "error",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#d33",
      });
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join("-");
    } else {
      return v;
    }
  };

  // Formatea la fecha agregando el "/" automáticamente (MM/YYYY)
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 6)}`;
    }
    return v;
  };

  // Permite solo números en el CVV
  const formatCVV = (value) => {
    return value.replace(/[^0-9]/g, "");
  };

  return (
    <div className="cart-page-wrapper min-vh-100 ">
      <Nav />

      <div className="container text-start py-4">
        <div className="cart-items-card p-4 m-5 rounded-4 shadow-sm">
          <div className="container ">
            <div className="d-flex justify-content-between text-start align-items-end mb-3">
              <h1 className="cart-title m-0">Detalles del pago</h1>
            </div>
          </div>
          <hr className="line-separator mb-4" />

          <form onSubmit={handleSubmit}>
            {/* Sección de Dirección */}
            <div className="mb-4">
              <label className="form-label fw-semibold text-dark-green mb-1">
                Dirección
              </label>
              <input
                type="text"
                className="form-control custom-input"
                name="direccion"
                placeholder="Calle, Colonia, Número de casa..."
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </div>

            {/* Titular de la tarjeta */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark-green fw-medium mb-1">
                Titular de la tarjeta
              </label>
              <input
                type="text"
                className="form-control custom-input"
                name="titular"
                placeholder="Nombre completo"
                value={formData.titular}
                onChange={handleChange}
                required
              />
            </div>

            {/* Número de tarjeta */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark-green mb-1">
                Número de tarjeta
              </label>
              <input
                type="text"
                className="form-control custom-input"
                name="numeroTarjeta"
                placeholder="0000-0000-0000-0000"
                maxLength="19" // Cambiado a 19 para permitir los 3 guiones intermedios
                value={formData.numeroTarjeta}
                onChange={handleChange}
                required
              />
            </div>

            {/* Fecha de vencimiento */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark-green mb-1">
                Fecha de vencimiento (mm/yyyy)
              </label>
              <input
                type="text"
                className="form-control custom-input"
                name="vencimiento"
                placeholder="00/0000"
                maxLength="7" // Se mantiene en 7 (2 para mes, 1 para "/", 4 para año)
                value={formData.vencimiento}
                onChange={handleChange}
                required
              />
            </div>

            {/* Código de seguridad CVV */}
            <div className="mb-4">
              <label className="form-label fw-semibold text-dark-green mb-1">
                Código de seguridad CVV
              </label>
              <input
                type="text" // Cambiado a text para que la máscara de "solo números" no choque
                className="form-control custom-input"
                style={{ WebkitTextSecurity: "disc" }} // Truco CSS para ocultar el texto como password si lo deseas
                name="cvv"
                placeholder="123"
                maxLength="3" // 3 o 4 dígitos (por si es Amex)
                value={formData.cvv}
                onChange={handleChange}
                required
              />
            </div>

            {/* Botón Finalizar Compra */}
            <div className="d-flex justify-content-end">
              <FinishBtn text={"Finalizar Compra"} type="submit" />
            </div>
          </form>
        </div>
      </div>
      <CozcaFooter />
    </div>
  );
};

export default PaymentForm;
