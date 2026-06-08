import { Modal } from "bootstrap";
import Swal from "sweetalert2";
import UseProductsPrivateData from "../hooks/ProductsPrivate/UseProductsPrivateData.jsx";
import CardProducts from "../components/ProductsPrivate/CardProducts";
import './CardProductsPrivate.css';
import './3Screens.css';
import ProductCreateModal from "../components/ProductsPrivate/ProductCreateModal";
import photoProduct from '../assets/PhotoProduct.webp';
import SearchButton from "../components/ProductsPrivate/SearchButton";
import CozcaFooterPrivate from "../components/Footer/CozcaFooterPrivate";
import NavPrivate from "../components/privateNavBar/NavPrivate";

const ProductsPrivate = () => {
    const {
        formData,
        isEditing,
        selectedFiles,
        setSelectedFiles,
        currentPage,
        setCurrentPage,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        categories,
        paginatedProducts,
        totalPages,
        startCreate,
        startEdit,
        saveProduct,
        deleteProduct,
    } = UseProductsPrivateData();

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
        startCreate();
        openModal();
    };

    const handleEditClick = (product) => {
        startEdit(product);
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

        await deleteProduct(id);
    };

    const handleValidSubmit = async (data) => {
        const success = await saveProduct(data);
        if (success) closeModal();
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
                    isEditing={isEditing}
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                    onValidSubmit={handleValidSubmit}
                />
                <CozcaFooterPrivate />
            </main>
        </div>
    );
};

export default ProductsPrivate;
