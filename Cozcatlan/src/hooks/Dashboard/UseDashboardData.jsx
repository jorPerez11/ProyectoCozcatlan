import { useEffect, useState } from "react";
import { useAuthAdmin } from "../../contexts/AuthContextAdmin";
import { useAuthEmployee } from "../../contexts/AuthContextEmployee";

const API_CLIENTS = "http://localhost:4000/api/client";
const API_ORDERS = "http://localhost:4000/api/orders";
const API_SALES = "http://localhost:4000/api/sales";
const API_ADMINS = "http://localhost:4000/api/admin";
const API_EMPLOYEES = "http://localhost:4000/api/employee";

export const MONTH_LABELS = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const safeJson = async (response) => {
    if (!response.ok) return null;
    return response.json().catch(() => null);
};

const UseDashboardData = () => {
    const adminAuth = useAuthAdmin();
    const employeeAuth = useAuthEmployee();
    const activeAuth = adminAuth?.user ? adminAuth : employeeAuth;
    const currentUser = activeAuth?.user;
    const isAdmin = currentUser?.userType?.toLowerCase() === "admin";

    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState("");
    const [totalClients, setTotalClients] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [monthlySales, setMonthlySales] = useState(Array(12).fill(0));
    const [pendingOrders, setPendingOrders] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchDashboardData = async () => {
            setLoading(true);

            try {
                const usersUrl = isAdmin ? API_ADMINS : API_EMPLOYEES;

                const [clientsPayload, ordersPayload, salesPayload, usersPayload] = await Promise.all([
                    fetch(API_CLIENTS).then(safeJson).catch(() => null),
                    fetch(API_ORDERS).then(safeJson).catch(() => null),
                    fetch(API_SALES).then(safeJson).catch(() => null),
                    currentUser?.id ? fetch(usersUrl).then(safeJson).catch(() => null) : Promise.resolve(null),
                ]);

                if (!isMounted) return;

                const clients = Array.isArray(clientsPayload?.client) ? clientsPayload.client : [];
                setTotalClients(clients.length);

                const orders = Array.isArray(ordersPayload) ? ordersPayload : [];
                setTotalOrders(orders.length);
                const salesSum = orders.reduce((sum, order) => sum + (order.total || 0), 0);
                setTotalSales(Math.round(salesSum * 100) / 100);

                const currentYear = new Date().getFullYear();
                const monthly = Array(12).fill(0);
                orders.forEach((order) => {
                    const date = new Date(order.createdAt);
                    if (!Number.isNaN(date.getTime()) && date.getFullYear() === currentYear) {
                        monthly[date.getMonth()] += order.total || 0;
                    }
                });
                setMonthlySales(monthly.map((value) => Math.round(value * 100) / 100));

                const sales = Array.isArray(salesPayload) ? salesPayload : [];
                const pending = sales
                    .filter((sale) => (sale.delivery_status || "Pendiente") === "Pendiente")
                    .slice(0, 4)
                    .map((sale) => {
                        const order = sale.order_id;
                        const client = order?.client_id;
                        const firstName = client?.firstName || client?.first_name || "";
                        const lastName = client?.lastName || client?.last_name || "";
                        const fullName = client ? `${firstName} ${lastName}`.trim() : "";
                        const shortId = String(order?._id || sale._id || "").slice(-5).toUpperCase();
                        const rawDate = sale.purchase_date || sale.createdAt || "";

                        return {
                            id: sale._id,
                            numberOrder: shortId ? `#${shortId}` : "#-----",
                            orderDate: rawDate ? String(rawDate).slice(0, 10) : "Sin fecha",
                            namePerson: fullName || "Cliente sin registrar",
                            address: sale.delivery_address || "Sin dirección registrada",
                        };
                    });
                setPendingOrders(pending);

                const usersKey = isAdmin ? "admin" : "employees";
                const usersList = Array.isArray(usersPayload?.[usersKey]) ? usersPayload[usersKey] : [];
                const me = usersList.find((u) => u._id === currentUser?.id);
                if (me?.firstName) {
                    setUserName(me.firstName);
                }
            } catch (error) {
                console.error("Error al cargar los datos del dashboard:", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchDashboardData();

        return () => {
            isMounted = false;
        };
    }, [currentUser?.id, isAdmin]);

    return {
        loading,
        userName,
        totalClients,
        totalOrders,
        totalSales,
        monthlySales,
        pendingOrders,
    };
};

export default UseDashboardData;
