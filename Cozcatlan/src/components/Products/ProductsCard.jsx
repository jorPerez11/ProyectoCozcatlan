import React from 'react';
import CartBtn from './ProductButton.jsx';
import './ProductsCard.css';


const ProductCard = ({ name, price, image }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="product-card shadow-sm border-0 h-100">
        <div className="product-image-placeholder d-flex align-items-center justify-content-center">
          {image ? <img src={image} alt={name} className="img-fluid" /> : <i className="bi bi-image text-muted fs-1"></i>}
        </div>
        <div className="product-info p-3">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="product-title mb-0 pb-4">{name}</h6>
            <span className="product-price fw-bold pb-4">${price}</span>
          </div>
          <CartBtn />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;