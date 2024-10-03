"use client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = ({ dataset, title, showLegend }) => {
    const data = {
        labels: ["01/01/2024", "01/01/2024", "01/01/2024", "01/01/2024", "01/01/2024", "01/01/2024", "01/01/2024"],
        datasets: [
            dataset
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "bottom", display: showLegend },
            title: { display: true, text: title },
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

export default LineChart;
