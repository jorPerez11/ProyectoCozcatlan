import React from 'react';
import './ProductDetail.css';
import Nav from '../components/PublicNavbar/Nav.jsx';
import Placeholder from '../assets/placeholder.png';
import AddBtn from '../components/ShoppingCart/FinishBtn.jsx';
import CozcaFooter from "../components/Footer/CozcaFooter.jsx";

const ProductDetail = ({ product }) => {
  return (
    <>
    <Nav/>
    
    <div className="product-detail-container d-flex container-fluid justify-content-center align-items-center">
      <div className="row align-items-center">
        
        {/* COLUMNA IZQUIERDA: IMAGEN */}
        <div className="col-md-5 d-flex justify-content-center">
          <div className="product-image-box shadow-sm">
             <img src={Placeholder} alt='placeholder' className='w-90'/>
             
          </div>
        </div>

        {/* COLUMNA DERECHA: INFORMACIÓN */}
        <div className="col-md-7  text-start">
          <h1 className="product-name-title">Queso Duro Viejo</h1>
          <h2 className="product-price-tag">$14.20</h2>
          
          <p className="product-description-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacinia 
            dolor a ipsum lacinia, quis molestie tellus sodales. Nunc id bibendum 
            nisi. Aliquam ut ante dui. Ut quis augue ut lacus bibendum venenatis 
            sed ac elit.
          </p>

          <div className="d-flex align-items-center gap-3 my-4">
            {/* Selector de cantidad */}
            <div className="qty-picker d-flex align-items-center">
              <button className="btn-qty-action">-</button>
              <span className="qty-number mx-3">2</span>
              <button className="btn-qty-action">+</button>
            </div>

            {/* Botón Añadir */}
            <AddBtn text={"Añadir al carrito"}/>
          </div>

          {/* Metadata */}
          <div className="product-meta-info">
            <p><strong>Categoría:</strong> Ingredientes</p>
            <p><strong>Proveedor:</strong> Lácteos Niña Marta</p>
          </div>
        </div>
      </div>
    </div>
    <CozcaFooter />
    </>
  );
};

export default ProductDetail;