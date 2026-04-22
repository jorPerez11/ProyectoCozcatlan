import React from "react";
import ProductCard from '../components/Products/ProductsCard.jsx';
import CozcPromoBanner from '../assets/descuentosPromo.png';
import Navbar from '../components/PublicNavbar/Nav.jsx';
import Placeholder from '../assets/placeholder.png';
import CozcaFooter from "../components/Footer/CozcaFooter.jsx";
import './Products.css';

const Products = () => {

    const productos = [
    { id: 1, name: "Harina de Maíz Nixtamalizado", price: "10.50", image: Placeholder },
    { id: 2, name: "Frijol Rojo de Seda", price: "10.50", image: Placeholder},
    { id: 3, name: "Chocolate en Tablilla con Canela", price: "10.50",  image: Placeholder},
  ];

  return (
    <div className="store-wrapper ">
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
        <div className="col-md-6 mb-3 mb-md-0 ">
          <div className="search-bar">
            <i className="bi bi-search ms-3"></i>
            <input type="text" className="form-control rounded-circle" placeholder="Buscar producto..." />
          </div>
        </div>
        <div className="col-md-2  dropdown">
          <button className="btn btn-dark-green dropdown-toggle w-45" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" >
            <i className="bi bi-filter-left"></i> Categorias
          </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Ingredientes</a>
                <a class="dropdown-item" href="#">Utensilios</a>
                <a class="dropdown-item" href="#">Comida</a>
            </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {productos.map(p => (
            <ProductCard key={p.id} name={p.name} price={p.price} image={p.image} />
          ))}
        </div>
      </div>
      <CozcaFooter />
    </div>
  );
};


export default Products;