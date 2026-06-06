import './CardProducts.css';

const CardProducts = ({ image1, price, productInfo, onEdit, onDelete }) => {
    return (
        <div className="admin-product-card">
            <div className="admin-product-image">
                {image1
                    ? <img src={image1} alt={productInfo} />
                    : <i className="bi bi-image text-muted fs-1"></i>
                }
            </div>
            <div className="admin-product-info">
                <div className="admin-product-info-top">
                    <span className="admin-product-name">{productInfo}</span>
                    <span className="admin-product-price">{price}</span>
                </div>
                <div className="admin-product-actions">
                    <button className="admin-btn-edit" onClick={onEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        Editar
                    </button>
                    <button className="admin-btn-delete" onClick={onDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                            <path d="M10 11v6M14 11v6"/>
                            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                        </svg>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardProducts;
