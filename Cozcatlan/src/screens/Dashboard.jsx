import React from "react";
// Importar los archivos CSS
import './DashboardStyle.css'; // CSS de la pantalla Dashboard
import './CardDashboardStyle.css'; // CSS DEL COMPONENTE CardDashboard
import './CardNotificationStyle.css' // CSS DEL COMPONENTE CardNotification

// Para importar los componentes
import CardDashboard from '../components/home/dashboard/CardDashboard.jsx';
import CardNotification from "../components/home/dashboard/CardNotification.jsx";
import ChartSales  from "../components/home/dashboard/ChartSales.jsx"

// Para importar las fotosº 
import photoIconClient from '../assets/IconoCliente.svg'
import photoIconOrders from '../assets/IconoOrdenes.svg'
import photoIconSales from '../assets/IconoVenta.svg'
import photoIconOrder from '../assets/IconoOrden.svg'
import photoIconDate from '../assets/Iconofecha.svg'
import photoIconRider from '../assets/IconoRider.svg'
import photoIconSelect from '../assets/IconSelect.svg'



const Dashboard = () => {
    return (

            
        <div className="Container-main min-vh-100">
            <main container d-flex align-items-center justify-content-center min-vh-100>

                <h1>Bienvenido, Kevin Castro</h1>
                <hr className="break" />

                <div className="Container-Components p-3"> {/* p-3 es clase de Bootstrap para padding */}
                    <div className="dashboard-grid">

                        {/* Card 1 */}
                        <div className="h-100">
                            <CardDashboard
                                photo={photoIconClient}
                                title="Clientes"
                                subTitle="10,104"
                            />
                        </div>

                        {/* Card 2 */}
                        <div className="h-100">
                            <CardDashboard
                                photo={photoIconOrders}
                                title="Órdenes"
                                subTitle="15,590"
                            />
                        </div>

                        {/* Card 3 */}
                        <div className="h-100">
                            <CardDashboard
                                photo={photoIconSales}
                                title="Venta total"
                                subTitle="200,500"
                            />
                        </div>

                        {/* Bloque ancho de abajo (productos) */}
                        <div className="box main-chart bg-light-green shadow-sm">
                            <ChartSales/>
                        </div>

                        {/* Bloque lateral alto (órdenes) */}
                        <div className="container-notifications box sidebar bg-light-green shadow-sm">
                            {/* Aquí van tus órdenes pendientes */}
                            <h2>Òrdenes pendientes</h2>
                            <CardNotification
                                icon1={photoIconOrder}
                                icon2={photoIconDate}
                                icon3={photoIconRider}
                                numberOrder="#101"
                                orderDate="2026-02-29"
                                namePerson="Kevin Castro"
                                iconSelect={photoIconSelect}
                                address="Colonia 29 de febrero,ayutuxtepeque"
                            />

                            <CardNotification
                                icon1={photoIconOrder}
                                icon2={photoIconDate}
                                icon3={photoIconRider}
                                numberOrder="#101"
                                orderDate="2026-02-29"
                                namePerson="Kevin Castro"
                                iconSelect={photoIconSelect}
                                address="Colonia 29 de febrero,ayutuxtepeque"
                            />

                            <CardNotification
                                icon1={photoIconOrder}
                                icon2={photoIconDate}
                                icon3={photoIconRider}
                                numberOrder="#101"
                                orderDate="2026-02-29"
                                namePerson="Kevin Castro"
                                iconSelect={photoIconSelect}
                                address="Colonia 29 de febrero,ayutuxtepeque"
                            />


                            <CardNotification
                                icon1={photoIconOrder}
                                icon2={photoIconDate}
                                icon3={photoIconRider}
                                numberOrder="#101"
                                orderDate="2026-02-29"
                                namePerson="Kevin Castro"
                                iconSelect={photoIconSelect}
                                address="Colonia 29 de febrero,ayutuxtepeque"
                            />


                        </div>

                    </div>
                </div>

            </main>

        </div>







    );
}

export default Dashboard;