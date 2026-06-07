import React, { useState } from "react";
import ClientRow from "../components/Admins-Supppliers-Employees/ClientRow";
import ButtonAdmin from '../components/Admins-Supppliers-Employees/ButtonAdmin';
import FormAdmin from '../components/Admins-Supppliers-Employees/FormAdmin.jsx';
import CozcaModal from "../components/Admins-Supppliers-Employees/CozcaModal.jsx";
import CozcaFooterPrivate from "../components/Footer/CozcaFooterPrivate.jsx";
import NavPrivate from "../components/privateNavBar/NavPrivate.jsx";
import './3Screens.css';
import UseAdminData from "../hooks/Admin/UseAdminData.jsx" // Hook para la logica del CRUD
import { useAuth } from "../hooks/UseAuthAdmin.js"  // Hook para la logica del CRUD

const Admins = () => {
  // 2. Extraemos todo lo necesario del Hook
  const {
    users = [],
    loading,
    deleteUser,
    handleaSubmit: createAdmin,
    handleUpdateSubmit: updateAdmin,
  } = UseAdminData();

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedId, setSelectedId] = useState(null); // Para saber a quién editar/eliminar

  // Estados para el paginado
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;


  // Elementos que se van a renderizar en la página actual
  const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);

  // Cantidad total de páginas
  const totalPages = Math.ceil(users.length / recordsPerPage) || 1;

  const handleAddClick = () => {
    setIsEditing(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      isVerified: false
    });
    setSelectedId(null);
    setModalOpen(true);
  };

  const handleEditClick = (adminData) => {
    setIsEditing(true);
    setSelectedId(adminData.id || adminData._id);

    setFormData({
      firstName: adminData.firstName || "",
      lastName: adminData.lastName || "",
      email: adminData.email || "",
      password: "",
      isVerified: adminData.isVerified || false,
    });

    setModalOpen(true);
  };

  const handleFormSubmit = async () => {
    let success = false;

    if (isEditing) {
      success = await updateAdmin(formData, selectedId);
    } else {
      success = await createAdmin(formData);
    }

    if (success) {
      setModalOpen(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este administrador?")) {
      await deleteUser(id);
      // Si eliminas el único elemento de una página alta, regresamos una página
      if (currentRecords.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  return (
    <div className="cozca-screen-wrapper d-flex flex-column min-vh-100">
      <div className="py-4 px-5 text-start bg-white/30 backdrop-blur-md mb-4 border-bottom border-white/20">
        <NavPrivate />
      </div>
      <div className="container py-5 flex-grow-1">
        <div className="header-container">
          <div className="d-flex justify-content-between align-items-center w-100 mb-2 px-2">
            <h1 className="cozca-page-title mb-0">Administradores</h1>
            <div style={{ width: '180px' }}>
              <ButtonAdmin
                text={loading ? "Cargando..." : <><span>Agregar</span> +</>}
                className="btn-cozca-add"
                onClick={handleAddClick}
                disabled={loading}
              />
            </div>
          </div>
          <div className="title-underline-long"></div>
        </div>

        {/* Lista de Administradores Paginada */}
        <div className="cozca-main-card mt-5">
          {loading && users.length === 0 ? (
            <p className="text-center p-4">Cargando administradores...</p>
          ) : currentRecords.length === 0 ? (
            <p className="text-center p-4">No se encontraron administradores con el formato requerido.</p>
          ) : (
            currentRecords.map(admin => (
              <ClientRow
                key={admin.id || admin._id}
                title={`${admin.firstName} ${admin.lastName}`}
                subtitle={admin.email}
                onEdit={() => handleEditClick(admin)}
                onDelete={() => handleDelete(admin.id || admin._id)}
              />
            ))
          )}
        </div>

        {/* Controles de la paginación  */}
        <div className="cozca-pagination-container mt-4">
          <button
            className="cozca-page-btn"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || loading}
          >
            <span>←</span>
          </button>

          <div className="cozca-page-number">
            {currentPage} / {totalPages}
          </div>

          <button
            className="cozca-page-btn"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || loading}
          >
            <span>→</span>
          </button>
        </div>
      </div>

      <CozcaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? "Editar Administrador" : "Agregar Administrador"}
        onSubmitText={loading ? "Procesando..." : (isEditing ? "Guardar Cambios" : "Agregar")}
        onSubmit={handleFormSubmit}
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