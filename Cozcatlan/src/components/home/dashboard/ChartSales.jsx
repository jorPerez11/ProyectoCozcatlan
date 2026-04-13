import React from "react";
import Chart from 'react-apexcharts';

const ChartSales = () => {
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
            categories: ['Enero', 'Febrero','Marzo' ,'Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'], // Lo que aparece abajo
            title: { text: 'Meses' }
        },
        yaxis: {
            title: { text: 'Cantidad de ventas' }
        },
        tooltip: {
            theme: 'dark', // Cambia el cuadrito que sale al pasar el ratón
            x: { show: true }
        }
    };
    const series = [{ name: "ventas totales", data: [45, 52, 6, 56, 15, 29, 30, 94, 56, 10, 50, 20] }];

    return (

        <Chart options={options} series={series} type="area" height={280} />

    );

};

export default ChartSales;