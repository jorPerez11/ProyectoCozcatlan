import { useState, useEffect } from "react";
import { Modal } from "bootstrap";
import Swal from "sweetalert2";
import CardProducts from "../components/ProductsPrivate/CardProducts";
import './CardProductsPrivate.css';
import './3Screens.css';
import ProductCreateModal from "../components/ProductsPrivate/ProductCreateModal";
import photoProduct from '../assets/PhotoProduct.webp';
import SearchButton from "../components/ProductsPrivate/SearchButton";
import CozcaFooterPrivate from "../components/Footer/CozcaFooterPrivate";
import NavPrivate from "../components/privateNavBar/NavPrivate";

const API = "http://localhost:4000/api/products";

const ITEMS_PER_PAGE = 9;

const ProductsPrivate = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

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

    const fetchProducts = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            setProducts(data);
            setCurrentPage(1);
        } catch (error) {
            console.log("error:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory]);

    const openModal = () => {
        const modal = new Modal(document.getElementById("createProductModal"));
        modal.show();
    };

    const closeModal = () => {
        const modalEl = document.getElementById("createProductModal");
        const modal = Modal.getInstance(modalEl);
        if (modal) modal.hide();
    };

    const handleAddClick = () => {
        setIsEditing(false);
        setFormData({});
        setSelectedFiles([]);
        openModal();
    };

    const handleEditClick = (product) => {
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
        openModal();
    };

    const handleDeleteClick = async (id) => {
        const result = await Swal.fire({
            title: "¿Eliminar producto?",
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
                Swal.fire("Eliminado", "Producto eliminado correctamente.", "success");
                fetchProducts();
            }
        } catch (error) {
            console.log("error:", error);
        }
    };

    const handleSaveProduct = async () => {
        const data = new FormData();
        data.append("name", formData.name || "");
        data.append("category", formData.category || "");
        data.append("price", formData.price || "");
        data.append("stock", formData.stock || "");
        data.append("description", formData.description || "");
        data.append("supplier_id", formData.supplier_id || "");

        for (const file of selectedFiles) {
            data.append("images.image", file);
        }

        const method = isEditing ? "PUT" : "POST";
        const url = isEditing ? `${API}/${selectedId}` : API;

        try {
            const res = await fetch(url, { method, body: data });
            if (res.ok) {
                Swal.fire("Éxito", isEditing ? "Producto actualizado." : "Producto agregado.", "success");
                closeModal();
                fetchProducts();
            }
        } catch (error) {
            console.log("error:", error);
        }
    };

    return (
        <div className="container-Main-Product">
            <main className="cozca-screen-wrapper d-flex flex-column min-vh-100">
                <NavPrivate />
                <h1 className="text-success">Productos</h1>
                <hr className="break" />
                <div className="header-actions">
                    <SearchButton
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        selectedCategory={selectedCategory}
                        onCategoryChange={setSelectedCategory}
                        categories={categories}
                    />
                    <button className="btn-add-product" onClick={handleAddClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                        Agregar Producto
                    </button>
                </div>
                <div className="products-grid-flex">
                    {paginatedProducts.map(product => (
                        <CardProducts
                            key={product._id}
                            image1={product.images?.[0]?.image || photoProduct}
                            price={`$${product.price}`}
                            productInfo={product.name}
                            onEdit={() => handleEditClick(product)}
                            onDelete={() => handleDeleteClick(product._id)}
                        />
                    ))}
                    {!searchTerm && !selectedCategory && Array.from({ length: (3 - (paginatedProducts.length % 3)) % 3 }).map((_, i) => (
                        <div key={`ph-${i}`} className="admin-product-card-placeholder" />
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
                <ProductCreateModal
                    formData={formData}
                    setFormData={setFormData}
                    onSave={handleSaveProduct}
                    isEditing={isEditing}
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                />
                <CozcaFooterPrivate />
            </main>
        </div>
    );
};

export default ProductsPrivate;
