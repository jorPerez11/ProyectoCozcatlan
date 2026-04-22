import React, { useEffect } from "react"; 
import '../Admins-Supppliers-Employees/CozcaModal.css'; 

const CozcaModal = ({ isOpen, onClose, title, children, onSubmitText, onSubmit }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) { 
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh'; 
  } else {
    document.body.style.overflow = 'unset';
    document.body.style.height = 'auto';
  }
  return () => {
    document.body.style.overflow = 'unset';
    document.body.style.height = 'auto';
  };
    
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cozca-modal-overlay" onClick={onClose}>
      <div className="cozca-modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="cozca-modal-title mb-4">{title}</h2>
        
        <div className="cozca-modal-body">
          {children}
        </div>

        <div className="cozca-modal-actions mt-5 d-flex justify-content-center gap-3">
          <button className="btn-cozca-cancel" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn-cozca-submit" onClick={onSubmit}>
            {onSubmitText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CozcaModal;