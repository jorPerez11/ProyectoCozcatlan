import React, { useState } from "react";

const FormAdmin = ({ formData, setFormData, isEditing }) => {
  const [showPassword] = useState(false); // Mantén tu lógica del ojo de contraseña si la usas

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Manejo especial si es un select de verificación
    if (name === "isVerified") {
      setFormData({ ...formData, [name]: value === "true" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="container-fluid px-0">
      <div className="row g-3">
        
        {/* NOMBRE - Conectado a firstName */}
        <div className="col-md-6">
          <label className="cozca-label mb-1">Nombre:</label>
          <input 
            type="text" 
            name="firstName" // <-- Cambiado a firstName para tu hook
            className="form-control cozca-input" 
            value={formData.firstName || ""}
            onChange={handleChange}
          />
        </div>

        {/* APELLIDO - Conectado a lastName */}
        <div className="col-md-6">
          <label className="cozca-label mb-1">Apellido:</label>
          <input 
            type="text" 
            name="lastName" // <-- Agregado para que funcione el map de tu tabla
            className="form-control cozca-input" 
            value={formData.lastName || ""}
            onChange={handleChange}
          />
        </div>

        {/* CORREO - Conectado a email */}
        <div className="col-md-6">
          <label className="cozca-label mb-1">Correo electrónico:</label>
          <input 
            type="email" 
            name="email"
            className="form-control cozca-input" 
            value={formData.email || ""}
            onChange={handleChange}
          />
        </div>

        {/* CONTRASEÑA - ¡YA CONECTADA! */}
        <div className="col-md-6">
          <label className="cozca-label mb-1">Contraseña:</label>
          <div className="position-relative">
            <input 
              type={showPassword ? "text" : "password"} 
              name="password" // <-- IMPORTANTE
              className="form-control cozca-input" 
              placeholder={isEditing ? "Dejar en blanco para no cambiar" : "**********"}
              value={formData.password || ""} // <-- IMPORTANTE
              onChange={handleChange} // <-- IMPORTANTE
              disabled={isEditing} // Tradicionalmente en los PUT no mandas la contraseña por esta vía
            />
          </div>
        </div>

        

      

        
      </div>
    </div>
  );
};

export default FormAdmin;