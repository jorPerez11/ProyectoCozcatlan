import React from 'react';
import FormProduct from "./FormProduct.jsx";
import './ProductModal.css'; 

const ProductCreateModal = ({ formData, setFormData, onSave, onUploadPhoto, onDeletePhoto }) => {
    return (
        <div className="modal fade" id="createProductModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content shadow-none custom-modal-content">
                    <div className="modal-header border-0 d-flex justify-content-between align-items-center">
                        <h5 className="modal-title fw-bold text-success custom-modal-title">
                            Agregar Producto
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body border-0 p-0">
                        <FormProduct 
                            formData={formData} 
                            setFormData={setFormData} 
                            onSave={onSave}
                            renderPhotoButtons={(
                                <div className="w-100 d-flex gap-3 justify-content-center mt-auto pt-4 pb-0">
                                    <button 
                                        type="button" 
                                        className="btn btn-custom-pill btn-cancel" 
                                        onClick={onDeletePhoto}
                                    >
                                        Eliminar Foto
                                    </button>
                                    <button 
                                        type="button" 
                                        className="btn btn-custom-pill btn-add" 
                                        onClick={onUploadPhoto}
                                    >
                                        Agregar Foto
                                    </button>
                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCreateModal;