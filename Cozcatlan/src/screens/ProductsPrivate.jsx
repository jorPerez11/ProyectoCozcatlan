import { useState } from "react";
import CardProducts from "../components/ProductsPrivate/CardProducts";
import './CardProductsPrivate.css'; 
import ProductCreateModal from "../components/ProductsPrivate/ProductCreateModal";
import photoProduct from '../assets/PhotoProduct.webp'
import SearchButton from "../components/ProductsPrivate/SearchButton";
import BottonAdd from "../components/ProductsPrivate/BottonAdd";
import ProductDetail from "./ProductDetail";
import ProductDetailPrivate from "../components/ProductsPrivate/ProductDetailPrivate";
import CozcaFooterPrivate from "../components/Footer/CozcaFooterPrivate";
import Navbar from "../components/PublicNavbar/Nav";
import NavPrivate from "../components/privateNavBar/NavPrivate";
const ProductsPrivate = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        categoria: '',
        precio: '',
        stock: '',
        descripcion: ''
    });
    const handleSaveProduct = () => {
        console.log("Guardando producto:", formData);
        setFormData({ nombre: '', categoria: '', precio: '', stock: '', descripcion: '' });
    };

    return (
        <div className="container-Main-Product">
            <main className="cozca-screen-wrapper d-flex flex-column min-vh-100"> 
                <NavPrivate/>
                <h1 className="text-success">Productos</h1>
                <hr className="break" />

              
                <div className="header-actions">
                    <SearchButton />
                    <button 
                        className="btn btn-success" 
                        data-bs-toggle="modal" 
                        data-bs-target="#createProductModal"
                    >
                        Agregar Producto
                    </button>
                </div>

             
                <div className="products-grid-flex">
                    <CardProducts
                        image1={photoProduct}
                        price="$10.50"
                        stock="100 Unidades"
                        productInfo="Harina de Maíz Nixtamalizado"
                    />
                    <CardProducts
                        image1={photoProduct}
                        price="$10.50"
                        stock="100 Unidades"
                        productInfo="Frijol Rojo de Seda"
                    />
                    <CardProducts
                        image1={photoProduct}
                        price="$10.50"
                        stock="100 Unidades"
                        productInfo="Chocolate en Tablilla"
                    />

                      <CardProducts
                        image1={photoProduct}
                        price="$10.50"
                        stock="100 Unidades"
                        productInfo="Chocolate en Tablilla"
                    />

                      <CardProducts
                        image1={photoProduct}
                        price="$10.50"
                        stock="100 Unidades"
                        productInfo="Chocolate en Tablilla"
                    />   
                </div>
                <ProductCreateModal 
                    formData={formData} 
                    setFormData={setFormData} 
                    onSave={handleSaveProduct} 
                />
                  <CozcaFooterPrivate/>
            </main>
        </div>
    );

};

export default ProductsPrivate;