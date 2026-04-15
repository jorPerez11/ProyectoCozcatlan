import React from "react";

const FormSuppliers = ({ formData, setFormData, isEditing }) => {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container-fluid px-0 text-start"> {/* Forzamos alineación a la izquierda */}
      <div className="row g-3">
        {/* Fila 1: Nombre y Tipo */}
        <div className="col-md-7">
          <label className="cozca-label mb-1">Nombre Completo:</label>
          <input
            type="text"
            name="nombre"
            className="form-control cozca-input"
            value={formData.nombre || ""}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-5">
          <label className="cozca-label mb-1">Tipo:</label>
          <select 
            name="tipo" 
            className="form-select cozca-input"
            value={formData.tipo || ""}
            onChange={handleChange}
          >
            <option value="">Seleccionar...</option>
            <option value="Productor Agrícola">Productor Agrícola</option>
            <option value="Artesano Local">Artesano Local</option>
          </select>
        </div>

        {/* Fila 2: Teléfono, Email y Fecha */}
        <div className="col-md-4">
          <label className="cozca-label mb-1">Teléfono:</label>
          <input
            type="text"
            name="telefono"
            className="form-control cozca-input"
            placeholder="6875-5412"
            value={formData.telefono || ""}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="cozca-label mb-1">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control cozca-input"
            value={formData.email || ""}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="cozca-label mb-1">Fecha nacimiento:</label>
          <input
            type="date"
            name="fechaNacimiento"
            className="form-control cozca-input"
            /* El truco para que se abra el calendario al tocar cualquier parte del input */
            onClick={(e) => e.target.showPicker()} 
            value={formData.fechaNacimiento || ""}
            onChange={handleChange}
          />
        </div>

        {/* Fila 3: DUI, Dirección y Estado (Condicional) */}
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
        
        {/* Ajustamos el ancho de la dirección dependiendo de si hay campo Estado o no */}
        <div className={isEditing ? "col-md-5" : "col-md-8"}>
          <label className="cozca-label mb-1">Dirección:</label>
          <input
            type="text"
            name="direccion"
            className="form-control cozca-input"
            value={formData.direccion || ""}
            onChange={handleChange}
          />
        </div>


        {/* Campo de Estado: Solo aparece en modo Editar */}
        {isEditing && (
          <div className="col-md-3">
            <label className="cozca-label mb-1">Estado:</label>
            <select 
              name="estado"
              className="form-select cozca-input"
              value={formData.estado || "activo"}
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

export default FormSuppliers;