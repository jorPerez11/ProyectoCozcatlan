import React, { useState, useEffect, useRef } from 'react';
import { BsArrowUpSquareFill } from "react-icons/bs";
import './ProductModal.css';

const FormProduct = ({ formData, setFormData, onSave, isEditing, selectedFiles, setSelectedFiles }) => {
    const [suppliers, setSuppliers] = useState([]);
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetch("http://localhost:4000/api/suppliers")
            .then(res => res.json())
            .then(data => setSuppliers(data))
            .catch(err => console.log("error:", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
    };

    return (
        <div className="container-fluid px-0 mt-2">
            <div className="row g-4 form-product-row px-4 pb-4 align-items-stretch">
                <div className="col-md-5 d-flex flex-column">
                    <div
                        className="photo-upload-container shadow-sm"
                        onClick={() => fileInputRef.current.click()}
                        style={{ cursor: 'pointer' }}
                    >
                        {selectedFiles.length > 0 ? (
                            <div className="d-flex flex-wrap gap-2 p-2 justify-content-center align-items-center h-100">
                                {selectedFiles.map((file, i) => (
                                    <img
                                        key={i}
                                        src={URL.createObjectURL(file)}
                                        alt="preview"
                                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                                    />
                                ))}
                            </div>
                        ) : (
                            <BsArrowUpSquareFill className="upload-icon-large" />
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        multiple
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>

                <div className="col-md-7 d-flex flex-column">
                    <div className="row g-3">
                        <div className="col-md-7">
                            <label className="cozca-label mb-1">Nombre Producto:</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control cozca-input shadow-sm"
                                value={formData.name || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-5">
                            <label className="cozca-label mb-1">Categoría:</label>
                            <select
                                name="category"
                                className="form-select cozca-input shadow-sm"
                                value={formData.category || ""}
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
                                type="number"
                                name="price"
                                className="form-control cozca-input shadow-sm"
                                placeholder="0.00"
                                value={formData.price || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="cozca-label mb-1">Stock:</label>
                            <input
                                type="number"
                                name="stock"
                                className="form-control cozca-input shadow-sm"
                                placeholder="0"
                                value={formData.stock || ""}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-12">
                            <label className="cozca-label mb-1">Descripción:</label>
                            <textarea
                                name="description"
                                className="form-control cozca-input shadow-sm"
                                rows="2"
                                value={formData.description || ""}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <div className="col-md-12">
                            <label className="cozca-label mb-1">Proveedor:</label>
                            <select
                                name="supplier_id"
                                className="form-select cozca-input shadow-sm"
                                value={formData.supplier_id || ""}
                                onChange={handleChange}
                            >
                                <option value="">Seleccionar...</option>
                                {suppliers.map(s => (
                                    <option key={s._id} value={s._id}>{s.suppliers_name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="w-100 d-flex gap-3 justify-content-center mt-auto pt-4 pb-0">
                        <button type="button" className="btn btn-custom-pill btn-cancel" data-bs-dismiss="modal">
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-custom-pill btn-add" onClick={onSave}>
                            {isEditing ? "Guardar Cambios" : "Agregar"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormProduct;
