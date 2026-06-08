import { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { BsArrowUpSquareFill } from "react-icons/bs";
import './ProductModal.css';

const FormProduct = ({ formData, isEditing, selectedFiles, setSelectedFiles, onValidSubmit }) => {
    const [suppliers, setSuppliers] = useState([]);
    const fileInputRef = useRef(null);

    const {
        register,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({ defaultValues: formData });

    useEffect(() => {
        reset(formData);
    }, [formData, reset]);

    const submitWithImageCheck = handleSubmit((data) => {
        if (!isEditing && selectedFiles.length === 0) {
            setError("images", { type: "manual", message: "Debes agregar al menos una imagen" });
            return;
        }
        clearErrors("images");
        onValidSubmit(data);
    });

    useEffect(() => {
        fetch("http://localhost:4000/api/suppliers")
            .then(res => res.json())
            .then(data => setSuppliers(data))
            .catch(err => console.log("error:", err));
    }, []);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
        if (files.length > 0) clearErrors("images");
    };

    return (
        <form id="productForm" className="container-fluid px-0 mt-2" onSubmit={submitWithImageCheck} noValidate>
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
                    {errors.images && <span className="cozca-error-text text-center">{errors.images.message}</span>}
                </div>

                <div className="col-md-7 d-flex flex-column">
                    <div className="row g-3">
                        <div className="col-md-7">
                            <label className="cozca-label mb-1">Nombre Producto:</label>
                            <input
                                type="text"
                                className="form-control cozca-input shadow-sm"
                                {...register("name", { required: "El nombre es obligatorio" })}
                            />
                            {errors.name && <span className="cozca-error-text">{errors.name.message}</span>}
                        </div>
                        <div className="col-md-5">
                            <label className="cozca-label mb-1">Categoría:</label>
                            <select
                                className="form-select cozca-input shadow-sm"
                                {...register("category", { required: "Selecciona una categoría" })}
                            >
                                <option value="">...</option>
                                <option value="granos">Granos</option>
                                <option value="bebidas">Bebidas</option>
                            </select>
                            {errors.category && <span className="cozca-error-text">{errors.category.message}</span>}
                        </div>
                        <div className="col-md-6">
                            <label className="cozca-label mb-1">Precio ($):</label>
                            <input
                                type="number"
                                step="0.01"
                                className="form-control cozca-input shadow-sm"
                                placeholder="0.00"
                                {...register("price", {
                                    required: "El precio es obligatorio",
                                    min: { value: 0.01, message: "El precio debe ser mayor a 0" },
                                })}
                            />
                            {errors.price && <span className="cozca-error-text">{errors.price.message}</span>}
                        </div>
                        <div className="col-md-6">
                            <label className="cozca-label mb-1">Stock:</label>
                            <input
                                type="number"
                                className="form-control cozca-input shadow-sm"
                                placeholder="0"
                                {...register("stock", {
                                    required: "El stock es obligatorio",
                                    min: { value: 0, message: "El stock no puede ser negativo" },
                                })}
                            />
                            {errors.stock && <span className="cozca-error-text">{errors.stock.message}</span>}
                        </div>
                        <div className="col-md-12">
                            <label className="cozca-label mb-1">Descripción:</label>
                            <textarea
                                className="form-control cozca-input shadow-sm"
                                rows="2"
                                {...register("description", { required: "La descripción es obligatoria" })}
                            ></textarea>
                            {errors.description && <span className="cozca-error-text">{errors.description.message}</span>}
                        </div>
                        <div className="col-md-12">
                            <label className="cozca-label mb-1">Proveedor:</label>
                            <select
                                className="form-select cozca-input shadow-sm"
                                {...register("supplier_id", { required: "Selecciona un proveedor" })}
                            >
                                <option value="">Seleccionar...</option>
                                {suppliers.map(s => (
                                    <option key={s._id} value={s._id}>{s.suppliers_name}</option>
                                ))}
                            </select>
                            {errors.supplier_id && <span className="cozca-error-text">{errors.supplier_id.message}</span>}
                        </div>
                    </div>
                    <div className="w-100 d-flex gap-3 justify-content-center mt-auto pt-4 pb-0">
                        <button type="button" className="btn btn-custom-pill btn-cancel" data-bs-dismiss="modal">
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-custom-pill btn-add">
                            {isEditing ? "Guardar Cambios" : "Agregar"}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default FormProduct;
