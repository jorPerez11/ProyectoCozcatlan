import React from "react";
import './ShoppingCart.css';
import trashIcon from  '../assets/mdi_trash.png';
import Placeholder from '../assets/placeholder.png';
import Nav from '../components/PublicNavbar/Nav.jsx';
import FinishBtn from '../components/ShoppingCart/FinishBtn.jsx';

const ShoppingCart = () => {
    const cartItems = [1, 2, 3, 4, 5]; // Array de ejemplo para las filas

  return (
    <div className="cart-page-wrapper min-vh-100">
        <Nav/>
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-end mb-3">
          <h1 className="cart-title m-0">Mi Carrito</h1>
          <button className="btn-delete-all border-0 bg-transparent d-flex">
            <img src={trashIcon} alt="" />Eliminar todos los productos
          </button>
        </div>
        
        <hr className="line-separator mb-4" />

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="cart-items-card p-1 pe-5 ps-5 shadow-lg">
              {cartItems.map((item, index) => (
                <div key={index} className={`cart-item-row d-flex align-items-center py-3 ${index !== cartItems.length - 1 ? 'border-bottom' : ''}`}>
                  {/* Placeholder imagen */}
                  <div className="item-img-placeholder me-3">
                    <img src={Placeholder} alt="placeholder" />
                  </div>
                  
                  {/* Info Producto */}
                  <div className="flex-grow-1">
                    <h6 className=" mb-0">Queso Duro Viejo</h6>
                    <small className="text-success d-block">En Stock</small>
                  </div>

                  {/* Precio Unitario */}
                  <div className="mx-4 text-dark-green fw-bold">$15.25</div>

                  {/* Controles de Cantidad */}
                  <div className="quantity-selector d-flex align-items-center me-4">
                    <button className="btn-qty">-</button>
                    <span className="qty-value text-dark-green mx-3">2</span>
                    <button className="btn-qty">+</button>
                  </div>

                  {/* Subtotal por Item */}
                  <div className="item-subtotal text-dark-green fw-bold">$30.50</div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="summary-card p-4 shadow">
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Subtotal</span>
                <span className="fw-bold text-dark-green">$150.35</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Descuento</span>
                <span className="fw-bold text-dark-green">-$20.00</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold">Total</span>
                <span className="fw-bold fs-5 text-dark-green">$130.35</span>
              </div>
              
              <FinishBtn text={"Finalizar Compra"}/>
            </div>
            <div className="text-center mt-3">
                <a href="/products" className="continue-shopping">Continuar comprando</a>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;