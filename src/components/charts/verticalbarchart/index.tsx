// "use client";

// import { Bar } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const BarChart = () => {
//     const data = {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June'],
//         datasets: [
//             {
//                 label: 'Revenue',
//                 data: [12000, 19000, 3000, 5000, 20000, 30000],
//                 backgroundColor: 'rgba(54, 162, 235, 0.6)',
//                 borderColor: 'rgba(54, 162, 235, 1)',
//                 borderWidth: 1,
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'Revenue Over the Months',
//             },
//         },
//     };

//     return <Bar data={data} options={options} />;
// };

// export default BarChart;

"use client";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const VerticalBarChart = () => {
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
        responsive: true,
        plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: "Indicadores de Produção" },
        },
    };

    return <Bar data={data} options={options} />;
};

export default VerticalBarChart;

