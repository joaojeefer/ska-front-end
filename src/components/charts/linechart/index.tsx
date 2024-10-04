"use client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export const LineChart = ({ dataset, showLegend }) => {
    const data = {
        labels: dataset.labels,
        datasets: [
            dataset
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "bottom", display: showLegend },
            title: { display: true, text: dataset.title },
        },
        scales: {
            x: {
                ticks: {
                    maxRotation: 45, // Inclina as datas
                    minRotation: 45,
                },
            },
        },
    };

    return <Line data={data} options={options} />;
};
