"use client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = ({ dataset }) => {
    const data = {
        labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"],
        datasets: [
            dataset
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "bottom" },
            //title: { display: true, text: "OEE Anual" },
        },
    };

    return <Line data={data} options={options} />;
};

export default LineChart;
