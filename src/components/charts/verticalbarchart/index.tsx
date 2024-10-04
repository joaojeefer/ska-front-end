"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const VerticalBarChart = ({ dataset }) => {
    const data = {
        labels: dataset.label,
        datasets: [
            dataset
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "bottom", display: false },
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

