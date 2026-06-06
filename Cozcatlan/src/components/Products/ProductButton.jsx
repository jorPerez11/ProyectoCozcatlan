import React from 'react';
import './ProductButton.css';

const AddToCartButton = ({ onClick, className = "", id }) => {
  return (
    <a href={`/productdetail/${id}`} className='btnLink'>
    <button
      className={`btn btn-add-to-cart d-flex align-items-center justify-content-center gap-2 ${className}`}
      onClick={onClick}
    >
      <i className="bi bi-cart-fill"></i>
      <span>Ver detalles →</span>
    </button>
    </a>
  );
};

export default AddToCartButton;