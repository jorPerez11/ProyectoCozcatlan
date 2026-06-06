import React from "react";

const FormSuppliers = ({ formData, setFormData, isEditing }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "street" || name === "neighborhood") {
      setFormData({ ...formData, address: { ...formData.address, [name]: value } });
    } else if (name === "status") {
      setFormData({ ...formData, status: value === "true" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="container-fluid px-0 text-start">
      <div className="row g-3">
        <div className="col-md-7">
          <label className="cozca-label mb-1">Nombre Completo:</label>
          <input
            type="text"
            name="suppliers_name"
            className="form-control cozca-input"
            value={formData.suppliers_name || ""}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-5">
          <label className="cozca-label mb-1">Tipo:</label>
          <select
            name="type_supplier"
            className="form-select cozca-input"
            value={formData.type_supplier || ""}
            onChange={handleChange}
          >
            <option value="">Seleccionar...</option>
            <option value="Productor Agrícola">Productor Agrícola</option>
            <option value="Artesano Local">Artesano Local</option>
          </select>
        </div>
        <div className="col-md-6">
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
        <div className="col-md-6">
          <label className="cozca-label mb-1">Email:</label>
          <input
            type="email"
            name="email"
            className="form-control cozca-input"
            value={formData.email || ""}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="cozca-label mb-1">Calle:</label>
          <input
            type="text"
            name="street"
            className="form-control cozca-input"
            value={formData.address?.street || ""}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="cozca-label mb-1">Colonia/Barrio:</label>
          <input
            type="text"
            name="neighborhood"
            className="form-control cozca-input"
            value={formData.address?.neighborhood || ""}
            onChange={handleChange}
          />
        </div>
        {isEditing && (
          <div className="col-md-4">
            <label className="cozca-label mb-1">Estado:</label>
            <select
              name="status"
              className="form-select cozca-input"
              value={formData.status === true ? "true" : "false"}
              onChange={handleChange}
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormSuppliers;