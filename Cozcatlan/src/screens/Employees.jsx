import React, { useState } from "react";
import ClientRow from "../components/Admins-Supppliers-Employees/ClientRow";
import ButtonAdmin from '../components/Admins-Supppliers-Employees/ButtonAdmin';
import FormEmployee from "../components/Admins-Supppliers-Employees/FormEmployees.jsx";
import CozcaModal from "../components/Admins-Supppliers-Employees/CozcaModal.jsx";
import CozcaFooterPrivate from "../components/Footer/CozcaFooterPrivate.jsx";
import NavPrivate from "../components/privateNavBar/NavPrivate.jsx";
import './3Screens.css';

import UseEmployeeData from "../hooks/Employee/UseEmployeeData.jsx" // Hook para la logica del CRUD
const Employees = () => {
  const {
    users = [],
    loading,
    deleteUser,
    handleaSubmit: createEmployee,
    handleUpdateSubmit: updateEmployee,
  } = UseEmployeeData();

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  // Estados para el paginado
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  // 🔥 CLAVE 1: Usar este array filtrado para renderizar la tabla
  const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(users.length / recordsPerPage) || 1;

  const handleAddClick = () => {
    setIsEditing(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      birthday: "",
      phone: "",
      dui: "",
      address: "",
      isVerified: false
    });
    setSelectedId(null);
    setModalOpen(true);
  };

  const handleEditClick = (employeeData) => {
    setIsEditing(true);
    setSelectedId(employeeData.id || employeeData._id);

    setFormData({
      firstName: employeeData.firstName || "",
      lastName: employeeData.lastName || "",
      email: employeeData.email || "",
      password: "",
      dui: employeeData.dui || "",
      phone: employeeData.phone || "",
      address: employeeData.address || "",
      birthday: employeeData.birthday || "",
      isVerified: employeeData.isVerified || false,
    });

    setModalOpen(true);
  };

  const handleFormSubmit = async () => {
    let success = false;

    if (isEditing) {
      success = await updateEmployee(formData, selectedId);
    } else {
      success = await createEmployee(formData);
    }

    if (success) {
      setModalOpen(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
      await deleteUser(id);
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
            <h1 className="cozca-page-title mb-0">Empleados</h1>
            <div style={{ width: '180px' }}>
              <ButtonAdmin
                text={<span>Agregar +</span>}
                className="btn-cozca-add"
                onClick={handleAddClick}
              />
            </div>
          </div>
          <div className="title-underline-long"></div>
        </div>

        {/* LISTADO DE EMPLEADOS */}
        <div className="cozca-main-card mt-5">
          {/* Mapeamos currentRecords */}
          {currentRecords.map(employee => (
            <ClientRow
              key={employee.id || employee._id}
              title={`${employee.firstName} ${employee.lastName}`}
              subtitle={employee.email}
              onEdit={() => handleEditClick(employee)}
              onDelete={() => handleDelete(employee.id || employee._id)} 
            />
          ))}
          {currentRecords.length === 0 && (
            <div className="text-center py-4 text-muted">No hay empleados registrados.</div>
          )}
        </div>

        {/* CONTROLES DE PAGINACIÓN */}
        <div className="cozca-pagination-container mt-4">
          <button
            className="cozca-page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            <span>←</span>
          </button>
          <div className="cozca-page-number">{currentPage} de {totalPages}</div>
          <button
            className="cozca-page-btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          >
            <span>→</span>
          </button>
        </div>
      </div>

      {/* MODAL CORREGIDO */}
      <CozcaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? "Editar Empleado" : "Agregar Empleado"}
        onSubmitText={isEditing ? "Guardar Cambios" : "Agregar"}
        onSubmit={handleFormSubmit} 
      >
        <FormEmployee
          formData={formData}
          setFormData={setFormData}
          isEditing={isEditing}
        />
      </CozcaModal>

      <CozcaFooterPrivate />
    </div>
  );
};

export default Employees;