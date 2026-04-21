import React from 'react';
import { BsArrowUpSquareFill } from "react-icons/bs";
import './ProductModal.css'; // Asegúrate de que esté importado

const FormProduct = ({ formData, setFormData }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="container-fluid px-0 mt-2">
            <div className="row g-4">
                
                <div className="col-md-5 d-flex flex-column align-items-center pt-0"> 
                    {/* Contenedor de la imagen */}
                    <div className="photo-upload-container shadow-sm">
                        <BsArrowUpSquareFill className="upload-icon-large" />
                    </div>
                        <div className="w-100 mt-4 photo-buttons-container px-1">
                            <button type="button" className="btn text-white fw-bold shadow-sm btn-custom-pill btn-cancel btn-photo-action">
                                Eliminar Foto
                            </button>
                            <button type="button" className="btn text-white fw-bold shadow-sm btn-custom-pill btn-add btn-photo-action">
                                Agregar Foto
                            </button>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="row g-3">
                        <div className="col-md-8">
                            <label className="cozca-label mb-1">Nombre Producto:</label>
                            <input 
                                type="text" 
                                name="nombre"
                                className="form-control cozca-input shadow-sm" 
                                value={formData.nombre || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4">
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
                </div>
            </div>
        </div>
    );
};

export default FormProduct;