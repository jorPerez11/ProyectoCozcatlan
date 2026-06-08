import { useState, useEffect } from "react";

const API = "http://localhost:4000/api/products";

const ITEMS_PER_PAGE = 6;

const UseProductsData = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch(API);
            if (!res.ok) throw new Error("Error al obtener los productos");

            const data = await res.json();
            setProducts(data);
        } catch (err) {
            setError(err.message);
            console.log("error:", err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

    const filteredProducts = products
        .filter(p => selectedCategory ? p.category === selectedCategory : true)
        .filter(p => searchQuery ? p.name?.toLowerCase().includes(searchQuery.toLowerCase()) : true);

    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    return {
        products,
        loading,
        error,

        selectedCategory,
        searchQuery,
        currentPage,
        setCurrentPage,
        categories,
        filteredProducts,
        paginatedProducts,
        totalPages,

        fetchProducts,
        handleCategorySelect,
        handleSearch,
    };
};

export default UseProductsData;
