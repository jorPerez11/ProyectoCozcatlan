import React from "react";
import Nav from "../components/PublicNavbar/Nav.jsx";
import CozcaFooter from "../components/Footer/CozcaFooter.jsx";
import Placeholder from "../assets/placeholder.png";
import UseClientOrders from "../hooks/Client/UseClientOrders.jsx";
import "./ShoppingCart.css";
import "./OrderHistoryClient.css";

const STATUS_STYLES = {
    Pendiente: "status-pill status-pendiente",
    Preparando: "status-pill status-preparando",
    "En camino": "status-pill status-encamino",
    Entregado: "status-pill status-entregado",
};

const formatDate = (value) => {
    if (!value) return "";
    return new Date(value).toLocaleDateString("es-SV", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const OrderHistoryClient = () => {
    const { orders, loading } = UseClientOrders();

    return (
        <main className="cart-page-wrapper d-flex flex-column min-vh-100">
            <Nav />
            <div className="container py-5 flex-grow-1">
                <h1 className="cart-title m-0">Mis pedidos</h1>
                <hr className="line-separator mb-4" />

                {loading ? (
                    <p className="text-center text-muted mt-5">Cargando tus pedidos...</p>
                ) : orders.length === 0 ? (
                    <p className="text-center text-muted mt-5">Todavía no has realizado ningún pedido.</p>
                ) : (
                    <div className="d-flex flex-column gap-4">
                        {orders.map((order) => (
                            <div key={order._id} className="cart-items-card p-4 shadow-lg">
                                <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
                                    <div>
                                        <h6 className="mb-1">Pedido #{order._id.slice(-6).toUpperCase()}</h6>
                                        <small className="text-muted">{formatDate(order.createdAt)}</small>
                                    </div>
                                    <span className={STATUS_STYLES[order.delivery_status] || "status-pill status-pendiente"}>
                                        {order.delivery_status}
                                    </span>
                                </div>

                                {(order.products || []).map((item) => (
                                    <div key={item._id} className="d-flex align-items-center py-2 border-bottom">
                                        <div className="me-3">
                                            <img
                                                className="order-history-item-img"
                                                src={item.product_id?.images?.[0]?.image || Placeholder}
                                                alt={item.product_id?.name || "Producto"}
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="mb-0">{item.product_id?.name || "Producto eliminado"}</h6>
                                            <small className="text-muted">Cantidad: {item.amount}</small>
                                        </div>
                                        <div className="text-dark-green fw-bold">${(item.sub_total || 0).toFixed(2)}</div>
                                    </div>
                                ))}

                                <div className="d-flex justify-content-between align-items-center pt-3 flex-wrap gap-2">
                                    <small className="text-muted">
                                        {order.delivery_address ? `Entrega en: ${order.delivery_address}` : "Sin dirección de entrega registrada"}
                                    </small>
                                    <div className="fw-bold fs-5 text-dark-green">Total: ${(order.total || 0).toFixed(2)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <CozcaFooter />
        </main>
    );
};

export default OrderHistoryClient;
