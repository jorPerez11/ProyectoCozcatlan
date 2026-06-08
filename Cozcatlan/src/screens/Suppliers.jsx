import { useState } from "react";
import Swal from "sweetalert2";
import UseSuppliersData from "../hooks/Suppliers/UseSuppliersData.jsx";
import ClientRow from "../components/Admins-Supppliers-Employees/ClientRow";
import ButtonAdmin from '../components/Admins-Supppliers-Employees/ButtonAdmin';
import FormSuppliers from "../components/Admins-Supppliers-Employees/FormSuppliers.jsx";
import CozcaModal from "../components/Admins-Supppliers-Employees/CozcaModal.jsx";
import CozcaFooterPrivate from "../components/Footer/CozcaFooterPrivate.jsx";
import NavPrivate from "../components/privateNavBar/NavPrivate.jsx";
import './3Screens.css';

const ITEMS_PER_PAGE = 8;

const Suppliers = () => {
  const {
    suppliers,
    formData,
    isEditing,
    startCreate,
    startEdit,
    saveSupplier,
    deleteSupplier,
  } = UseSuppliersData();

  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(suppliers.length / ITEMS_PER_PAGE);
  const paginatedSuppliers = suppliers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleAddClick = () => {
    startCreate();
    setModalOpen(true);
  };

  const handleEditClick = (supplier) => {
    startEdit(supplier);
    setModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar proveedor?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    await deleteSupplier(id);
  };

  const handleValidSubmit = async (data) => {
    const success = await saveSupplier(data);
    if (success) setModalOpen(false);
  };

  return (
    <div className="cozca-screen-wrapper d-flex flex-column min-vh-100">
      <div className="py-4 px-5 text-start bg-white/30 backdrop-blur-md mb-4 border-bottom border-white/20">
         <NavPrivate/>
      </div>
      <div className="container py-5 flex-grow-1">
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
          {paginatedSuppliers.map(supplier => (
            <ClientRow
              key={supplier._id}
              title={supplier.suppliers_name}
              subtitle={supplier.email}
              onEdit={() => handleEditClick(supplier)}
              onDelete={() => handleDeleteClick(supplier._id)}
            />
          ))}
        </div>
        <div className="cozca-pagination-container mt-4">
          <button
            className="cozca-page-btn"
            onClick={() => setCurrentPage(p => p - 1)}
            disabled={currentPage === 1}
          >
            <span>←</span>
          </button>
          <div className="cozca-page-number">{currentPage}</div>
          <button
            className="cozca-page-btn"
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <span>→</span>
          </button>
        </div>
      </div>

      <CozcaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={isEditing ? "Editar Proveedor" : "Agregar Proveedor"}
        onSubmitText={isEditing ? "Guardar Cambios" : "Agregar"}
        formId="supplierForm"
      >
        <FormSuppliers
          formData={formData}
          isEditing={isEditing}
          onValidSubmit={handleValidSubmit}
        />
      </CozcaModal>

      <CozcaFooterPrivate />
    </div>
  );
};

export default Suppliers;
