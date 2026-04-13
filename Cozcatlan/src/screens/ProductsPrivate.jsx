import React from "react";
import CardProducts from "../components/ProductsPrivate/CardProducts";
// Para importar los archivos css
import './CardProductsPrivate.css'; // CSS de la pantalla Dashboard


// Para importar las fotosº 
import photoProduct from '../assets/PhotoProduct.webp'
import SearchButton from "../components/ProductsPrivate/SearchButton";
const ProductsPrivate = () => {
    return (
        <div className="container-Main-Product">

            <main>
                <h1>Productos</h1>
                <hr className="break" />
                <div className="Buttons"
                > <SearchButton
                    />

                </div>

                <CardProducts

                    image1={photoProduct}
                    price="$2.99"
                    stock="100 Unidades"
                    productInfo="Frijol Rojo de Seda"

                />



            </main>



        </div>



    );

};

export default ProductsPrivate;