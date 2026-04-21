import React from 'react';
import FormProduct from "./FormProduct.jsx";
import './ProductModal.css'; 

const ProductCreateModal = ({ formData, setFormData, onSave }) => {
    return (
        <div className="modal fade" id="createProductModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-xl modal-dialog-centered">
                
                <div className="modal-content shadow-none custom-modal-content">
                    
                    <div className="modal-header border-0 d-flex justify-content-between align-items-center">
                        <h5 className="modal-title fw-bold text-success custom-modal-title">
                            Agregar Producto
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body border-0 p-0">
                        <FormProduct formData={formData} setFormData={setFormData} />
                    </div>

                    <div className="modal-footer border-0 d-flex justify-content-center gap-3 custom-modal-footer">
                        
                        <button 
                            type="button" 
                            className="btn px-5 text-white fw-bold shadow-sm btn-custom-pill btn-cancel" 
                            data-bs-dismiss="modal"
                        >
                            Cancelar
                        </button>
                        
                        <button 
                            type="button" 
                            className="btn px-5 text-white fw-bold shadow-sm btn-custom-pill btn-add" 
                            onClick={onSave}
                        >
                            Agregar
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCreateModal;