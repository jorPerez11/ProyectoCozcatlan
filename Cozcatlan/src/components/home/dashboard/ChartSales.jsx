import React from "react";
import Chart from 'react-apexcharts';

const DEFAULT_CATEGORIES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const ChartSales = ({ categories = DEFAULT_CATEGORIES, data = Array(12).fill(0) }) => {
    const options = {
        chart: {
            id: "mi-grafico",
            fontFamily: 'Helvetica, Arial, sans-serif',
            toolbar: { show: false }, // Muestra u oculta el menú de descargar (PNG, SVG)
            zoom: { enabled: false }
        },
        colors: ['#7d9474'], // Colores de las líneas o barras
        stroke: {
            curve: 'smooth', // 'smooth' para curvas, 'straight' para líneas rectas
            width: 3
        },
        xaxis: {
            categories, // Lo que aparece abajo
            title: { text: 'Meses' }
        },
        yaxis: {
            title: { text: 'Ventas ($)' },
            labels: {
                formatter: (value) => `$${Math.round(value).toLocaleString('es-SV')}`
            }
        },
        tooltip: {
            theme: 'dark', // Cambia el cuadrito que sale al pasar el ratón
            x: { show: true },
            y: { formatter: (value) => `$${value.toFixed(2)}` }
        }
    };
    const series = [{ name: "Ventas totales", data }];

    return (

        <Chart options={options} series={series} type="area" height={280} />

    );

};

export default ChartSales;