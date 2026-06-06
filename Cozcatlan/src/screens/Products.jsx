import React, { useState, useEffect } from "react";
import ProductCard from '../components/Products/ProductsCard.jsx';
import CozcPromoBanner from '../assets/descuentosPromo.png';
import Navbar from '../components/PublicNavbar/Nav.jsx';
import CozcaFooter from "../components/Footer/CozcaFooter.jsx";
import './Products.css';

const ITEMS_PER_PAGE = 6;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:4000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.log("error:", err));
  }, []);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.dropdown-wrapper')) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = products
    .filter(p => selectedCategory ? p.category === selectedCategory : true)
    .filter(p => searchQuery ? p.name?.toLowerCase().includes(searchQuery.toLowerCase()) : true);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="store-wrapper">
      <Navbar />
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner mb-4">
          <div className="carousel-item active">
            <img className="d-block w-100" src={CozcPromoBanner} alt="First slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={CozcPromoBanner} alt="Second slide" />
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src={CozcPromoBanner} alt="Third slide" />
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>

      <div className="row mb-5 align-items-center justify-content-center">
        <div className="col-md-6 mb-3 mb-md-0">
          <div className="search-bar">
            <i className="bi bi-search ms-3"></i>
            <input type="text" className="form-control rounded-circle" placeholder="Buscar producto..." value={searchQuery} onChange={handleSearch} />
          </div>
        </div>
        <div className="col-md-3 col-6 dropdown-wrapper">
          <div style={{ position: 'relative', width: '100%' }}>
            <button
              className="btn btn-dark-green dropdown-toggle w-100"
              type="button"
              onClick={() => setDropdownOpen(o => !o)}
            >
              <i className="bi bi-filter-left"></i> {selectedCategory || "Categorias"}
            </button>
            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                zIndex: 1000,
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                padding: '6px 0',
                marginTop: '4px'
              }}>
                <button className="dropdown-item" onClick={() => { handleCategorySelect(null); setDropdownOpen(false); }}>Todas</button>
                {categories.map(cat => (
                  <button key={cat} className="dropdown-item" onClick={() => { handleCategorySelect(cat); setDropdownOpen(false); }}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {paginated.map(product => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              image={product.images?.[0]?.image}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="d-flex justify-content-center align-items-center gap-3 my-5">
            <button
              className="btn btn-dark-green"
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`btn ${currentPage === page ? 'btn-dark-green' : 'btn-outline-secondary'}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="btn btn-dark-green"
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        )}
      </div>
      <CozcaFooter />
    </div>
  );
};

export default Products;