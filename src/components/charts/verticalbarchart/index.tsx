"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VerticalBarChart = ({ dataset }) => {
    const data = {
        labels: ["Peças Produzidas", "Horas Paradas", "Refugos"],
        datasets: [
            dataset
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: "Indicadores de Produção" },
        },
    };

    return <Bar data={data} options={options} />;
};

export default VerticalBarChart;

