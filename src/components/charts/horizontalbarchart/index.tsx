"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const HorizontalBarChart = ({ dataset }) => {
    const data = {
        //labels: ["Peças Produzidas", "Horas Paradas", "Refugos"],
        labels: dataset.label,
        datasets: [
            dataset
        ],
    };

    const options = {
        indexAxis: 'y', // Faz com que o gráfico seja horizontal
        responsive: true,
        plugins: {
            legend: { position: "top", display: false },
            title: {
                display: true,
                text: dataset.title,
                font: {
                    size: 18
                }
            },
        },


    };

    return <Bar data={data} options={options} />;

};

