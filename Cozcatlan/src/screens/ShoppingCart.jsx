import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import './ShoppingCart.css';
import trashIcon from '../assets/mdi_trash.png';
import Placeholder from '../assets/placeholder.png';
import Nav from '../components/PublicNavbar/Nav.jsx';
import FinishBtn from '../components/ShoppingCart/FinishBtn.jsx';
import CozcaFooter from "../components/Footer/CozcaFooter.jsx";

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);

    const loadCart = async () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            setCartItems([]);
            return;
        }
        try {
            const products = await Promise.all(
                cart.map(item =>
                    fetch(`http://localhost:4000/api/products/${item.id}`)
                        .then(res => res.json())
                        .then(product => ({ ...product, quantity: item.quantity }))
                )
            );
            setCartItems(products);
        } catch (error) {
            console.log("error:", error);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const updateLocalStorage = (updatedItems) => {
        const cart = updatedItems.map(item => ({ id: item._id, quantity: item.quantity }));
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const handleQuantityChange = (index, delta) => {
        const updated = [...cartItems];
        updated[index].quantity = Math.max(1, updated[index].quantity + delta);
        setCartItems(updated);
        updateLocalStorage(updated);
    };

    const handleRemoveItem = (index) => {
        const updated = cartItems.filter((_, i) => i !== index);
        setCartItems(updated);
        updateLocalStorage(updated);
    };

    const handleRemoveAll = async () => {
        const result = await Swal.fire({
            title: "¿Vaciar carrito?",
            text: "Se eliminarán todos los productos.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Vaciar",
            cancelButtonText: "Cancelar",
        });
        if (!result.isConfirmed) return;
        localStorage.removeItem('cart');
        setCartItems([]);
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-page-wrapper min-vh-100">
            <Nav />
            <div className="container py-5">
                <div className="d-flex justify-content-between align-items-end mb-3">
                    <h1 className="cart-title m-0">Mi Carrito</h1>
                    <button className="btn-delete-all border-0 bg-transparent d-flex" onClick={handleRemoveAll}>
                        <img src={trashIcon} alt="" /> Eliminar todos los productos
                    </button>
                </div>

                <hr className="line-separator mb-4" />

                {cartItems.length === 0 ? (
                    <p className="text-center text-muted mt-5">Tu carrito está vacío.</p>
                ) : (
                    <div className="row g-4">
                        <div className="col-lg-8">
                            <div className="cart-items-card p-1 pe-5 ps-5 shadow-lg">
                                {cartItems.map((item, index) => (
                                    <div key={item._id} className={`cart-item-row d-flex align-items-center py-3 ${index !== cartItems.length - 1 ? 'border-bottom' : ''}`}>
                                        <div className="item-img-placeholder me-3">
                                            <img src={item.images?.[0]?.image || Placeholder} alt={item.name} />
                                        </div>

                                        <div className="flex-grow-1">
                                            <h6 className="mb-0">{item.name}</h6>
                                            <small className="text-success d-block">
                                                {item.stock > 0 ? "En Stock" : "Agotado"}
                                            </small>
                                        </div>

                                        <div className="mx-4 text-dark-green fw-bold">${item.price}</div>

                                        <div className="quantity-selector d-flex align-items-center me-4">
                                            <button className="btn-qty" onClick={() => handleQuantityChange(index, -1)}>-</button>
                                            <span className="qty-value text-dark-green mx-3">{item.quantity}</span>
                                            <button className="btn-qty" onClick={() => handleQuantityChange(index, 1)}>+</button>
                                        </div>

                                        <div className="item-subtotal text-dark-green fw-bold me-3">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </div>

                                        <button
                                            className="border-0 bg-transparent"
                                            onClick={() => handleRemoveItem(index)}
                                            title="Eliminar"
                                        >
                                            <img src={trashIcon} alt="eliminar" style={{ width: '20px' }} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="summary-card p-4 shadow">
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">Subtotal</span>
                                    <span className="fw-bold text-dark-green">${subtotal.toFixed(2)}</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="fw-bold">Total</span>
                                    <span className="fw-bold fs-5 text-dark-green">${subtotal.toFixed(2)}</span>
                                </div>
                                <FinishBtn text={"Finalizar Compra"} />
                            </div>
                            <div className="text-center mt-3">
                                <a href="/products" className="continue-shopping">Continuar comprando</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <CozcaFooter />
        </div>
    );
};

export default ShoppingCart;
