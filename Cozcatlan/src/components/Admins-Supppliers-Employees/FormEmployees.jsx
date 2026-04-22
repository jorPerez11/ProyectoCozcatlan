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
        <div className="col-md-6">
          <label className="cozca-label mb-1">Nombre Completo:</label>
          <input 
            type="text" 
            name="nombre"
            className="form-control cozca-input" 
            value={formData.nombre || ""}
            onChange={handleChange}
          />
        </div>
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
        <div className="col-md-4">
        <label className="cozca-label mb-1">Contraseña:</label>
        <div className="position-relative">
            <input 
            type={showPassword ? "text" : "password"} 
            className="form-control cozca-input" 
            placeholder="**********"
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
        <div className="col-md-4">
            <label className="cozca-label mb-1">Fecha nacimiento:</label>
            <input 
                type="date" 
                className="form-control cozca-input cozca-calendar-input"/>
            </div>
        <div className="col-md-4">
          <label className="cozca-label mb-1">DUI:</label>
          <input type="text" className="form-control cozca-input" placeholder="12345678-9" />
        </div>
        <div className={isEditing ? "col-md-4" : "col-md-4"}>
          <label className="cozca-label mb-1">Teléfono:</label>
          <input type="text" className="form-control cozca-input" placeholder="6875-5412" />
        </div>
        
        <div className={isEditing ? "col-md-4" : "col-md-8"}>
          <label className="cozca-label mb-1">Dirección:</label>
          <input type="text" className="form-control cozca-input" />
        </div>
        {isEditing && (
          <div className="col-md-4">
            <label className="cozca-label mb-1">Estado:</label>
            <select className="form-select cozca-input">
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