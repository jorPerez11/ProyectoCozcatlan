import React, { useState } from "react";
const FormEmployee = ({ formData, setFormData, isEditing }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container-fluid px-0">
      <div className="row g-3">
        {/* NOMBRE */}
        <div className="col-md-6">
          <label className="cozca-label mb-1">Nombre:</label>
          <input
            type="text"
            name="firstName" 
            className="form-control cozca-input"
            value={formData.firstName || ""}
            onChange={handleChange}
          />
        </div>

        {/* APELLIDO */}
        <div className="col-md-6">
          <label className="cozca-label mb-1">Apellido:</label>
          <input
            type="text"
            name="lastName" 
            className="form-control cozca-input"
            value={formData.lastName || ""}
            onChange={handleChange}
          />
        </div>

        {/* CORREO */}
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

        {/* CONTRASEÑA */}
        <div className="col-md-6">
          <label className="cozca-label mb-1">Contraseña:</label>
          <div className="position-relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password" // ⚙️ Agregado
              className="form-control cozca-input"
              value={formData.password || ""}
              onChange={handleChange} 
              placeholder={isEditing ? "Dejar en blanco para no cambiar" : "**********"}
            />
            <button
              type="button"
              className="position-absolute end-0 top-50 translate-middle-y me-2 btn border-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️‍🗨️" : "👁️"}
            </button>
          </div>
        </div>

        {/* FECHA DE NACIMIENTO */}
        <div className="col-md-4">
          <label className="cozca-label mb-1">Fecha nacimiento:</label>
          <input
            type="date"
            name="birthday" 
            className="form-control cozca-input cozca-calendar-input"
            value={formData.birthday || ""}
            onChange={handleChange} 
          />
        </div>

        {/* DUI */}
        <div className="col-md-4">
          <label className="cozca-label mb-1">DUI:</label>
          <input
            type="text"
            name="dui" 
            className="form-control cozca-input"
            placeholder="12345678-9"
            value={formData.dui || ""}
            onChange={handleChange} 
          />
        </div>

        {/* TELÉFONO */}
        <div className="col-md-4">
          <label className="cozca-label mb-1">Teléfono:</label>
          <input
            type="text"
            name="phone" 
            className="form-control cozca-input"
            placeholder="6875-5412"
            value={formData.phone || ""}
            onChange={handleChange} 
          />
        </div>

        {/* DIRECCIÓN */}
        <div className={isEditing ? "col-md-8" : "col-md-12"}> {/* Ajustado el col para mejor simetría con el estado */}
          <label className="cozca-label mb-1">Dirección:</label>
          <input
            type="text"
            name="address" 
            className="form-control cozca-input"
            value={formData.address || ""}
            onChange={handleChange}
          />
        </div>

        {/* ESTADO (SOLO EN EDICIÓN) */}
        {isEditing && (
          <div className="col-md-4">
            <label className="cozca-label mb-1">Estado:</label>
            <select
              name="status" 
              className="form-select cozca-input"
              value={formData.status || "activo"}
              onChange={handleChange} 
            >
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormEmployee;