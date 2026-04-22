import React from 'react';
import { BsArrowUpSquareFill } from "react-icons/bs";
import './ProductModal.css'; 

const FormProduct = ({ formData, setFormData, renderPhotoButtons, onSave }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    return (
        <div className="container-fluid px-0 mt-2">
            <div className="row g-4 form-product-row px-4 pb-4 align-items-stretch">
                <div className="col-md-5 d-flex flex-column"> 
                    <div className="photo-upload-container shadow-sm">
                        <BsArrowUpSquareFill className="upload-icon-large" />
                    </div>
                    {renderPhotoButtons}
                </div>
                <div className="col-md-7 d-flex flex-column">
                    <div className="row g-3">
                        <div className="col-md-7">
                            <label className="cozca-label mb-1">Nombre Producto:</label>
                            <input 
                                type="text" 
                                name="nombre"
                                className="form-control cozca-input shadow-sm" 
                                value={formData.nombre || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-5">
                            <label className="cozca-label mb-1">Categoría:</label>
                            <select 
                                name="categoria" 
                                className="form-select cozca-input shadow-sm"
                                value={formData.categoria || ""}
                                onChange={handleChange}
                            >
                                <option value="">...</option>
                                <option value="granos">Granos</option>
                                <option value="bebidas">Bebidas</option>
                            </select>
                        </div>

                        <div className="col-md-6">
                            <label className="cozca-label mb-1">Precio ($):</label>
                            <input 
                                type="text" 
                                name="precio"
                                className="form-control cozca-input shadow-sm" 
                                placeholder="0.00"
                                value={formData.precio || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="cozca-label mb-1">Stock:</label>
                            <select 
                                name="stock" 
                                className="form-select cozca-input shadow-sm"
                                value={formData.stock || ""}
                                onChange={handleChange}
                            >
                                <option value="">...</option>
                                <option value="disponible">Disponible</option>
                                <option value="agotado">Agotado</option>
                            </select>
                        </div>

                        <div className="col-md-12">
                            <label className="cozca-label mb-1">Descripción:</label>
                            <textarea 
                                name="descripcion" 
                                className="form-control cozca-input shadow-sm" 
                                rows="2"
                                value={formData.descripcion || ""}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="col-md-12">
                            <label className="cozca-label mb-1">Proveedor:</label>
                            <select 
                                name="proveedor" 
                                className="form-select cozca-input shadow-sm"
                                value={formData.proveedor || ""}
                                onChange={handleChange}
                            >
                                <option value="">...</option>
                                <option value="distribuidora_local">Distribuidora Local</option>
                            </select>
                        </div>
                    </div>
                    <div className="w-100 d-flex gap-3 justify-content-center mt-auto pt-4 pb-0"> 
                        <button type="button" className="btn btn-custom-pill btn-cancel" data-bs-dismiss="modal">
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-custom-pill btn-add" onClick={onSave}>
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormProduct;