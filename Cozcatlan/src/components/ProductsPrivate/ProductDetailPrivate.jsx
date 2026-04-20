import React from "react";

const ProductDetailPrivate = ({photoProduct,productTitle,price,description,category,providers}) => {
    return (
        <div className="detail-container">
            <div className="detail-card">
                {/* Lado Izquierdo: Imagen */}
                <div className="detail-image-section">
                    <img src={photoProduct} alt="Producto" className="img-fluid rounded-4" />
                </div>

                {/* Lado Derecho: Información */}
                <div className="detail-info-section">
                    <div className="d-flex align-items-center gap-3">
                        <h1 className="product-title">{productTitle}</h1>
                    </div>
                    
                    <div className="price-container d-flex align-items-center gap-2">
                        <h2 className="product-price">{price}</h2>
                        <span className="edit-icon">✎</span> {/* Aquí puedes usar un icono de FontAwesome o Bootstrap */}
                    </div>

                    <p className="product-description">
                        {description}
                    </p>

                    {/* Selector de cantidad */}
                    <div className="quantity-selector">
                        <button className="btn-qty">-</button>
                        <span className="qty-value">2</span>
                        <button className="btn-qty">+</button>
                    </div>

                    <div className="product-meta">
                        <p><strong>Categoria:</strong> {category}</p>
                        <p><strong>Proveedor:</strong> {providers}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPrivate;