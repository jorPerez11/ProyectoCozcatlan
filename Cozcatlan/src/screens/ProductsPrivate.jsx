import React from "react";
import CardProducts from "../components/ProductsPrivate/CardProducts";
// Para importar los archivos css
import './CardProductsPrivate.css'; // CSS de la pantalla Dashboard


// Para importar las fotosº 
import photoProduct from '../assets/PhotoProduct.webp'
import SearchButton from "../components/ProductsPrivate/SearchButton";
import BottonAdd from "../components/ProductsPrivate/BottonAdd";
import ProductDetail from "./ProductDetail";
import ProductDetailPrivate from "../components/ProductsPrivate/ProductDetailPrivate";
import CozcaFooterPrivate from "../components/Footer/CozcaFooterPrivate";
import Navbar from "../components/PublicNavbar/Nav";
import NavPrivate from "../components/privateNavBar/NavPrivate";
const ProductsPrivate = () => {
    return (
        <div className="container-Main-Product">
            <main className="p-4">
                <NavPrivate/>
                <h1 className="text-success">Productos</h1>
                <hr className="break" />

              
                <div className="header-actions">
                    <SearchButton />
                    <BottonAdd />  {/* Este es el boton para agregar productos*/}
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
                
                  <CozcaFooterPrivate/>
            </main>
        </div>



    );

};

export default ProductsPrivate;