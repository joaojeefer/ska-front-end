"use client";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const LineChart = () => {
    const data = {
        labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"],
        datasets: [
            {
                position: 'bottom',
                label: "OEE Anual",
                data: [76, 78, 70, 68, 60, 88, 89], // Valores conforme gráfico da imagem
                borderColor: "#00bfff",
                backgroundColor: "rgba(0, 191, 255, 0.5)",
                fill: true,
            },
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
