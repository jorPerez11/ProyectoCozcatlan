import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ClientRow from "../components/Admins-Supppliers-Employees/ClientRow";
import ButtonAdmin from '../components/Admins-Supppliers-Employees/ButtonAdmin';
import FormSuppliers from "../components/Admins-Supppliers-Employees/FormSuppliers.jsx";
import CozcaModal from "../components/Admins-Supppliers-Employees/CozcaModal.jsx";
import CozcaFooterPrivate from "../components/Footer/CozcaFooterPrivate.jsx";
import NavPrivate from "../components/privateNavBar/NavPrivate.jsx";
import './3Screens.css';

const API = "http://localhost:4000/api/suppliers";

const ITEMS_PER_PAGE = 8;

const Suppliers = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [suppliers, setSuppliers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(suppliers.length / ITEMS_PER_PAGE);
  const paginatedSuppliers = suppliers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const fetchSuppliers = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setSuppliers(data);
      setCurrentPage(1);
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleAddClick = () => {
    setIsEditing(false);
    setFormData({});
    setModalOpen(true);
  };

  const handleEditClick = (supplier) => {
    setIsEditing(true);
    setSelectedId(supplier._id);
    setFormData(supplier);
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

    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (res.ok) {
        Swal.fire("Eliminado", "Proveedor eliminado correctamente.", "success");
        fetchSuppliers();
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  const handleSubmit = async () => {
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API}/${selectedId}` : API;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Swal.fire("Éxito", isEditing ? "Proveedor actualizado." : "Proveedor agregado.", "success");
        setModalOpen(false);
        fetchSuppliers();
      }
    } catch (error) {
      console.log("error:", error);
    }
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
        onSubmit={handleSubmit}
      >
        <FormSuppliers
          formData={formData}
          setFormData={setFormData}
          isEditing={isEditing}
        />
      </CozcaModal>

      <CozcaFooterPrivate />
    </div>
  );
};

export default Suppliers;