import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../UseAuthClient.js";

const API_ORDERS = "http://localhost:4000/api/orders";

const UseClientOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = useCallback(async () => {
        if (!user?.id) {
            setOrders([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${API_ORDERS}/client/${user.id}`);
            const data = await response.json().catch(() => []);
            setOrders(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error al cargar el historial de pedidos:", error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return { orders, loading, refetch: fetchOrders };
};

export default UseClientOrders;
