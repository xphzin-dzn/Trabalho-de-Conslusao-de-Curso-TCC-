import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// É necessário registrar os componentes do Chart.js que você irá usar.
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Componente MyChart
const MyChart = () => {
    // Opções de configuração para o gráfico
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Posição da legenda
            },
            title: {
                display: true,
                text: 'Exemplo de Gráfico de Barras', // Título do gráfico
            },
        },
    };

    // Dados de exemplo para o gráfico
    const data = {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho'],
        datasets: [
            {
                label: 'Vendas 2024',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
            },
            {
                label: 'Vendas 2023',
                data: [28, 48, 40, 19, 86, 27, 90],
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <div style={{ width: '100%', maxWidth: '700px', margin: 'auto' }}>
            <Bar options={options} data={data} />
        </div>
    );
};

export default MyChart;