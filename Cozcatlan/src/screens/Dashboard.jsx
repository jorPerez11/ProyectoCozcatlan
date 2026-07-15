import React from "react";
// Importar los archivos CSS
import './DashboardStyle.css'; // CSS de la pantalla Dashboard
import './CardDashboardStyle.css'; // CSS DEL COMPONENTE CardDashboard
import './CardNotificationStyle.css' // CSS DEL COMPONENTE CardNotification

// Para importar los componentes
import CardDashboard from '../components/home/dashboard/CardDashboard.jsx';
import CardNotification from "../components/home/dashboard/CardNotification.jsx";
import ChartSales  from "../components/home/dashboard/ChartSales.jsx"
import UseDashboardData, { MONTH_LABELS } from "../hooks/Dashboard/UseDashboardData.jsx";

// Para importar las fotosº 
import photoIconClient from '../assets/IconoCliente.svg'
import photoIconOrders from '../assets/IconoOrdenes.svg'
import photoIconSales from '../assets/IconoVenta.svg'
import photoIconOrder from '../assets/IconoOrden.svg'
import photoIconDate from '../assets/Iconofecha.svg'
import photoIconRider from '../assets/IconoRider.svg'
import photoIconSelect from '../assets/IconSelect.svg'
import CozcaFooterPrivate from "../components/Footer/CozcaFooterPrivate.jsx";
import NavPrivate from "../components/PrivateNavBar/NavPrivate.jsx";



const currencyFormatter = new Intl.NumberFormat("es-SV", { style: "currency", currency: "USD" });
const numberFormatter = new Intl.NumberFormat("es-SV");

const Dashboard = () => {
    const {
        loading,
        userName,
        totalClients,
        totalOrders,
        totalSales,
        monthlySales,
        pendingOrders,
    } = UseDashboardData();

    return (


        <div className="Container-main min-vh-100">
            <main className="cozca-screen-wrapper d-flex flex-column min-vh-100">
                <NavPrivate/>
                <h1>Bienvenido{userName ? `, ${userName}` : ""}</h1>
                <hr className="break" />

                <div className="Container-Components p-3">
                    <div className="dashboard-grid">


                        <div className="h-100">
                            <CardDashboard
                                photo={photoIconClient}
                                title="Clientes"
                                subTitle={loading ? "..." : numberFormatter.format(totalClients)}
                            />
                        </div>


                        <div className="h-100">
                            <CardDashboard
                                photo={photoIconOrders}
                                title="Órdenes"
                                subTitle={loading ? "..." : numberFormatter.format(totalOrders)}
                            />
                        </div>


                        <div className="h-100">
                            <CardDashboard
                                photo={photoIconSales}
                                title="Venta total"
                                subTitle={loading ? "..." : currencyFormatter.format(totalSales)}
                            />
                        </div>

                        <div className="box main-chart bg-light-green shadow-sm">
                            <ChartSales categories={MONTH_LABELS} data={monthlySales} />
                        </div>

                        <div className="container-notifications box sidebar bg-light-green shadow-sm">

                            <h2>Òrdenes pendientes</h2>
                            {!loading && pendingOrders.length === 0 && (
                                <p className="text-muted">No hay órdenes pendientes.</p>
                            )}
                            {pendingOrders.map((order) => (
                                <CardNotification
                                    key={order.id}
                                    icon1={photoIconOrder}
                                    icon2={photoIconDate}
                                    icon3={photoIconRider}
                                    numberOrder={order.numberOrder}
                                    orderDate={order.orderDate}
                                    namePerson={order.namePerson}
                                    iconSelect={photoIconSelect}
                                    address={order.address}
                                />
                            ))}

                        </div>

                    </div>
                </div>

                <CozcaFooterPrivate/>

            </main>

        </div>







    );
}

export default Dashboard;