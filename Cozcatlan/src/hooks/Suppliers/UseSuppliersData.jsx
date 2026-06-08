import { useState, useEffect } from "react";
import { toast } from "sonner";

const API = "http://localhost:4000/api/suppliers";

const UseSuppliersData = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchSuppliers = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(API);
            if (!res.ok) throw new Error("Error al obtener los proveedores");

            const data = await res.json();
            setSuppliers(data);
        } catch (err) {
            setError(err.message);
            toast.error(err.message || "Error al obtener los proveedores");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const cleanForm = () => {
        setFormData({});
        setIsEditing(false);
        setSelectedId(null);
    };

    const startCreate = () => {
        setIsEditing(false);
        setFormData({});
        setSelectedId(null);
    };

    const startEdit = (supplier) => {
        setIsEditing(true);
        setSelectedId(supplier._id);
        setFormData(supplier);
    };

    const saveSupplier = async (data = null) => {
        const payload = data || formData;
        const method = isEditing ? "PUT" : "POST";
        const url = isEditing ? `${API}/${selectedId}` : API;

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error(isEditing ? "Error al actualizar el proveedor" : "Error al agregar el proveedor");
            }

            toast.success(isEditing ? "Proveedor actualizado." : "Proveedor agregado.");
            cleanForm();
            await fetchSuppliers();
            return true;
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deleteSupplier = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API}/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Error al eliminar el proveedor");

            toast.success("Proveedor eliminado correctamente.");
            await fetchSuppliers();
            return true;
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        suppliers,
        formData,
        setFormData,
        isEditing,
        selectedId,
        loading,
        error,
        fetchSuppliers,
        startCreate,
        startEdit,
        saveSupplier,
        deleteSupplier,
        cleanForm,
    };
};

export default UseSuppliersData;