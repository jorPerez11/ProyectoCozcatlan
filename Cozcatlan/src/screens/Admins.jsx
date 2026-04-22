import React, { useState } from "react";
import ClientRow from "../components/Admins-Supppliers-Employees/ClientRow";
import ButtonAdmin from '../components/Admins-Supppliers-Employees/ButtonAdmin';
import FormAdmin from '../components/Admins-Supppliers-Employees/FormAdmin.jsx';
import CozcaModal from "../components/Admins-Supppliers-Employees/CozcaModal.jsx";
import CozcaFooterPrivate from "../components/Footer/CozcaFooterPrivate.jsx"; 
import NavPrivate from "../components/privateNavBar/NavPrivate.jsx";
import './3Screens.css'; 

const Admins = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const administradores = [
    { id: 1, nombre: "Lourdes Carolina Estévez Rojas", email: "m_estevez@gmail.com" },
    { id: 2, nombre: "Carlos Andrés Méndez López", email: "c.mendez@cozcatlan.com" },
    { id: 3, nombre: "Roberto Isaac Peña", email: "r_pena@gmail.com" },
  ];

  const handleAddClick = () => {
    setIsEditing(false);
    setFormData({});
    setModalOpen(true);
  };

  const handleEditClick = (adminData) => {
    setIsEditing(true);
    setFormData(adminData);
    setModalOpen(true);
  };

  return (
    <div className="cozca-screen-wrapper d-flex flex-column min-vh-100"> 
      <div className="py-4 px-5 text-start bg-white/30 backdrop-blur-md mb-4 border-bottom border-white/20">
         <NavPrivate/>
      </div>
      <div className="container py-5 flex-grow-1">
        <div className="header-container">
          <div className="d-flex justify-content-between align-items-center w-100 mb-2 px-2">
            <h1 className="cozca-page-title mb-0">Administradores</h1>        
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
              onEdit={() => handleEditClick(admin)} 
            />
          ))}
        </div>

        <div className="cozca-pagination-container mt-4">
          <button className="cozca-page-btn" disabled><span>←</span></button>
          <div className="cozca-page-number">1</div>
          <button className="cozca-page-btn"><span>→</span></button>
        </div>
      </div>

      <CozcaModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)}
        title={isEditing ? "Editar Administrador" : "Agregar Administrador"}
        onSubmitText={isEditing ? "Guardar Cambios" : "Agregar"}
        onSubmit={() => {
          console.log("Guardando datos:", formData);
          setModalOpen(false);
        }}
      >
        <FormAdmin 
          formData={formData} 
          setFormData={setFormData} 
          isEditing={isEditing} 
        />
      </CozcaModal>
      <CozcaFooterPrivate />

    </div>
  );
};

export default Admins;