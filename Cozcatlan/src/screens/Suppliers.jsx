import React, { useState } from "react";
import ClientRow from "../components/Admins-Supppliers-Employees/ClientRow";
import ButtonAdmin from '../components/Admins-Supppliers-Employees/ButtonAdmin';
import FormSuppliers from "../components/Admins-Supppliers-Employees/FormSuppliers.jsx";
import CozcaModal from "../components/Admins-Supppliers-Employees/CozcaModal.jsx";
import './3Screens.css'; 

const Suppliers = () => {
// Estado para controlar el modal
  const [modalOpen, setModalOpen] = useState(false);
  // Estado para saber si estamos agregando o editando
  const [isEditing, setIsEditing] = useState(false);
  // Estado para los datos del formulario
  const [formData, setFormData] = useState({});

  // 2. Datos de ejemplo (ESTO ES LO QUE TE FALTA)
  const administradores = [
    { id: 1, nombre: "Lourdes Carolina Estévez Rojas", email: "m_estevez@gmail.com" },
    { id: 2, nombre: "Lourdes Carolina Estévez Rojas", email: "m_estevez@gmail.com" },
    { id: 3, nombre: "Lourdes Carolina Estévez Rojas", email: "m_estevez@gmail.com" },
  ];

  // Función para abrir modal en modo "Añadir"
  const handleAddClick = () => {
    setIsEditing(false);
    setFormData({}); // Limpiamos el formulario
    setModalOpen(true);
  };

  // Función para abrir modal en modo "Editar" (esta la pasarías a GenericRow)
  const handleEditClick = (adminData) => {
    setIsEditing(true);
    setFormData(adminData); // Cargamos los datos del admin
    setModalOpen(true);
  };

  return (
    <div className="cozca-screen-wrapper"> 
      {/* Placeholder para el NAV */}
      <div className="py-4 px-5 text-start bg-white/30 backdrop-blur-md mb-4 border-bottom border-white/20">
        <span className="text-success fw-bold">Cozcatlán Dashboard / Panel Admins</span>
      </div>
      <div className="container py-5">
        <div className="header-container">
          <div className="d-flex justify-content-between align-items-center w-100 mb-2 px-2">
            <h1 className="cozca-page-title mb-0">Proveedores</h1>        
            <div style={{ width: '180px' }}>
                <ButtonAdmin 
                  text={<><span>Agregar</span> +</>} 
                  className="btn-cozca-add" 
                  onClick={handleAddClick}
                />
            </div>
          </div>
          <div className="title-underline-long"></div>
        </div>
        <div className="cozca-main-card mt-5">
          {administradores.map(admin => (
            <ClientRow 
              key={admin.id} 
              title={admin.nombre} 
              subtitle={admin.email} 
              // Pasamos la función de editar y los datos de este admin específico
              onEdit={() => handleEditClick(admin)} 
            />
          ))}
        </div>
        <div className="cozca-pagination-container">
          <button className="cozca-page-btn" disabled>
            <span>←</span>
          </button>
          <div className="cozca-page-number">1</div>
          <button className="cozca-page-btn">
            <span>→</span>
          </button>
        </div>
      </div>

      <CozcaModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        title={isEditing ? "Editar Proveedor" : "Agregar Proveedor"}
        onSubmitText={isEditing ? "Guardar Cambios" : "Agregar"}
        onSubmit={() => console.log("Guardando datos:", formData)}
      >
        {/* AQUÍ INYECTAMOS EL FORMULARIO ESPECÍFICO */}
        <FormSuppliers 
          formData={formData} 
          setFormData={setFormData} 
          isEditing={isEditing} 
        />
      </CozcaModal>

    </div>
  );
};

export default Suppliers;