"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { HorizontalBarChartProps } from "./types";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const HorizontalBarChart = ({ dataset }: HorizontalBarChartProps) => {
    const data = {
        labels: dataset.label,
        datasets: [dataset],
    };

    const options = {
        indexAxis: 'y', // Faz com que o gráfico seja horizontal
        responsive: true,
        plugins: {
            legend: { position: "top", display: false },
            title: {
                display: true,
                text: dataset.title,
                font: { size: 18 }
            },
        },
    };

    return <Bar data={data} options={options} />;

};

