"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HorizontalBarChart = () => {
    const data = {
        labels: ["Peças Produzidas", "Horas Paradas", "Refugos"],
        datasets: [
            {
                label: "Quantidade",
                data: [24200, 2650, 2630], // Valores como na imagem que o João mandou
                backgroundColor: ["#00bfff", "#ff4500", "#ff6347"],
            },
        ],
    };

    const options = {
        indexAxis: 'y', // Faz com que o gráfico seja horizontal
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Indicadores de Produção" },
        },
    };

    return <Bar data={data} options={options} />;
};

export default HorizontalBarChart;

