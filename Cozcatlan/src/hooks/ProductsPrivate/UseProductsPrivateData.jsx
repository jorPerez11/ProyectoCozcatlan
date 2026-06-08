import { useState, useEffect } from "react";
import { toast } from "sonner";

const API = "http://localhost:4000/api/products";

const ITEMS_PER_PAGE = 9;

const UseProductsPrivateData = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(API);
            if (!res.ok) throw new Error("Error al obtener los productos");

            const data = await res.json();
            setProducts(data);
            setCurrentPage(1);
        } catch (err) {
            setError(err.message);
            toast.error(err.message || "Error al obtener los productos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory]);

    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

    const filteredProducts = products.filter(p => {
        const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !selectedCategory || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const cleanForm = () => {
        setFormData({});
        setIsEditing(false);
        setSelectedId(null);
        setSelectedFiles([]);
    };

    const startCreate = () => {
        setIsEditing(false);
        setFormData({});
        setSelectedId(null);
        setSelectedFiles([]);
    };

    const startEdit = (product) => {
        setIsEditing(true);
        setSelectedId(product._id);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price,
            stock: product.stock,
            description: product.description,
            supplier_id: product.supplier_id,
        });
        setSelectedFiles([]);
    };

    const saveProduct = async (data = null) => {
        const payloadData = data || formData;
        const body = new FormData();
        body.append("name", payloadData.name || "");
        body.append("category", payloadData.category || "");
        body.append("price", payloadData.price || "");
        body.append("stock", payloadData.stock || "");
        body.append("description", payloadData.description || "");
        body.append("supplier_id", payloadData.supplier_id || "");

        for (const file of selectedFiles) {
            body.append("images.image", file);
        }

        const method = isEditing ? "PUT" : "POST";
        const url = isEditing ? `${API}/${selectedId}` : API;

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(url, { method, body });
            if (!res.ok) {
                throw new Error(isEditing ? "Error al actualizar el producto" : "Error al agregar el producto");
            }

            toast.success(isEditing ? "Producto actualizado." : "Producto agregado.");
            cleanForm();
            await fetchProducts();
            return true;
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${API}/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Error al eliminar el producto");

            toast.success("Producto eliminado correctamente.");
            await fetchProducts();
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
        products,
        formData,
        setFormData,
        isEditing,
        selectedId,
        selectedFiles,
        setSelectedFiles,
        loading,
        error,

        currentPage,
        setCurrentPage,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        categories,
        filteredProducts,
        paginatedProducts,
        totalPages,

        fetchProducts,
        startCreate,
        startEdit,
        saveProduct,
        deleteProduct,
        cleanForm,
    };
};

export default UseProductsPrivateData;