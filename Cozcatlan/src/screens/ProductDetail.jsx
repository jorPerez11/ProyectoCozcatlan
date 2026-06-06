import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './ProductDetail.css';
import Nav from '../components/PublicNavbar/Nav.jsx';
import Placeholder from '../assets/placeholder.png';
import AddBtn from '../components/ShoppingCart/FinishBtn.jsx';
import CozcaFooter from "../components/Footer/CozcaFooter.jsx";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:4000/api/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.log("error:", err));
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ id, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    Swal.fire("Agregado", `${product.name} añadido al carrito.`, "success");
  };

  if (!product) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <>
      <Nav />
      <div className="product-detail-container d-flex container-fluid justify-content-center align-items-center">
        <div className="row align-items-center">

          <div className="col-md-5 d-flex justify-content-center">
            <div className="product-image-box shadow-sm">
              <img
                src={product.images?.[0]?.image || Placeholder}
                alt={product.name}
                className="w-90"
              />
            </div>
          </div>

          <div className="col-md-7 text-start">
            <h1 className="product-name-title">{product.name}</h1>
            <h2 className="product-price-tag">${product.price}</h2>

            <p className="product-description-text">{product.description}</p>

            <div className="d-flex align-items-center gap-3 my-4">
              <div className="qty-picker d-flex align-items-center">
                <button
                  className="btn-qty-action"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                >-</button>
                <span className="qty-number mx-3">{quantity}</span>
                <button
                  className="btn-qty-action"
                  onClick={() => setQuantity(q => q + 1)}
                >+</button>
              </div>
              <AddBtn text={"Añadir al carrito"} onClick={handleAddToCart} />
            </div>

            <div className="product-meta-info">
              <p><strong>Categoría:</strong> {product.category}</p>
              <p><strong>Stock:</strong> {product.stock} unidades</p>
            </div>
          </div>

        </div>
      </div>
      <CozcaFooter />
    </>
  );
};

export default ProductDetail;
