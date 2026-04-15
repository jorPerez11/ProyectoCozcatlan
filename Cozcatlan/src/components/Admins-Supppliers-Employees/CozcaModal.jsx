import React, { useEffect } from "react"; // <--- No olvides importar useEffect
import '../Admins-Supppliers-Employees/CozcaModal.css'; 

const CozcaModal = ({ isOpen, onClose, title, children, onSubmitText, onSubmit }) => {
  
  // Efecto para detectar la tecla Escape
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) { // 27 es el código de la tecla Esc
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      // Bloqueamos el scroll del body
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh'; 
  } else {
    // Liberamos el scroll cuando el modal se cierra
    document.body.style.overflow = 'unset';
    document.body.style.height = 'auto';
  }

  // Cleanup por si el componente se desmonta inesperadamente
  return () => {
    document.body.style.overflow = 'unset';
    document.body.style.height = 'auto';
  };
    
  }, [isOpen, onClose]); // Solo se ejecuta cuando el modal se abre o cierra

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