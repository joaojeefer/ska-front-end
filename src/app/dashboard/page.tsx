/* eslint-disable @next/next/no-img-element */
"use client";
import { Header } from '@/components';
import React, { useEffect, useState } from 'react';

import Layout from '../../components/layout'
import VerticalBarChart from '../../components/charts/verticalbarchart'
import HorizontalBarChart from '../../components/charts/horizontalbarchart'
import OEEGauge from '../../components/charts/oeegauge';
import LineChart from '../../components/charts/linechart';

import { MachineMetric } from '@/api/types';
import { getMetricFromMachines } from '@/api';


// const allData = [
//   {
//     indicadores_id: 1, ind_oee: '49', ind_qualidade: '1', ind_performance: '1',
//     ind_disponibilidade: '1', tempo_programado: '1', tempo_em_producao: '1', tempo_teorico_producao: '1', tempo_paradas: '1',
//     pecas_produzidas: '', pecas_defeito: '1', maquina_id: '1'
//   },
//   {
//     indicadores_id: 2, ind_oee: '50', ind_qualidade: '2', ind_performance: '2',
//     ind_disponibilidade: '2', tempo_programado: '2', tempo_em_producao: '2', tempo_teorico_producao: '2', tempo_paradas: '2',
//     pecas_produzidas: '', pecas_defeito: '2', maquina_id: '2'
//   },
//   {
//     indicadores_id: 3, ind_oee: '51', ind_qualidade: '3', ind_performance: '3',
//     ind_disponibilidade: '', tempo_programado: '3', tempo_em_producao: '3', tempo_teorico_producao: '3', tempo_paradas: '3',
//     pecas_produzidas: '3', pecas_defeito: '3', maquina_id: '3'
//   },
//   {
//     indicadores_id: 4, ind_oee: '52', ind_qualidade: '4', ind_performance: '4',
//     ind_disponibilidade: '', tempo_programado: '4', tempo_em_producao: '4', tempo_teorico_producao: '4', tempo_paradas: '4',
//     pecas_produzidas: '4', pecas_defeito: '4', maquina_id: '4'
//   },
//   {
//     indicadores_id: 5, ind_oee: '53', ind_qualidade: '5', ind_performance: '5',
//     ind_disponibilidade: '', tempo_programado: '5', tempo_em_producao: '5', tempo_teorico_producao: '5', tempo_paradas: '5',
//     pecas_produzidas: '5', pecas_defeito: '5', maquina_id: '5'
//   },
// ]
const oeeData = {
  percent: 0.49,
  disponibilidade: 96,
  produtividade: 56,
  qualidade: 92
};

const datasetVertical = {
  title: "Disponibilidade",
  label: ["Tempo Programado", "Tempo Produzindo", "Tempo Perdas"],
  data: [500, 400, 100], // Valores como na imagem que o João mandou
  backgroundColor: ["#0000ff", "#00ff00", "#ff0000"],
};

const datasetHorizontal = {
  title: "Performance",
  label: ["Produção Teórico", "Produção Real", "Diferença"],
  data: [100, 83, 17], // Valores como na imagem que o João mandou
  backgroundColor: ["#0000ff", "#00ff00", "#ff0000"],
};

const datasetHorizontalQualidade = {
  title: "Qualidade",
  label: ["Peças Boas", "Peças Totais", "Peças Defeituosas"],
  data: [92, 100, 8],
  backgroundColor: ["#00ff00", "#0000ff", "#ff0000"],
};

const datasetLine = {
  position: 'bottom',
  label: "OEE - Ultimos 7 dias",
  data: [76, 78, 70, 68, 60, 88, 89],
  borderColor: "#00bfff",
  backgroundColor: "rgba(0, 191, 255, 0.5)",
  fill: true,
};




const Dashboard: React.FC = () => {

  const initialMetric: MachineMetric = {
    id: 0,
    oee: 0,
    quality: 0,
    performance: 0,
    availability: 0,
    scheduledTime: 0,
    productionTime: 0,
    productionTheoricalTime: 0,
    downtime: 0,
    partsProduced: 0,
    partsDiscarded: 0,
    date: null,
    machineId: 0,
  };

  const [metrics, setMetrics] = useState<MachineMetric>(initialMetric);

  async function fetchMetrics() {
    try {
      const response = await getMetricFromMachines(1);
      setMetrics(response);
    } catch (error) {
      console.error("Erro ao buscar métricas:", error);
    }
  }

  useEffect(() => {

    fetchMetrics();

  }, []);

  if (!metrics.id) {
    return <div>Carregando métricas...</div>;
  }

  return (
    <main>

      <Layout>
        <h1 className="text-2xl font-bold">Eficiência de Produção</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">Torno CNC 2500</h2>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">Setor B</h2>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">02/10/2024</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {/* OEE */}
          <div className="bg-white shadow-lg rounded-lg ">
            <OEEGauge data={metrics} title="OEE - Último dia" />
          </div>

          <div className="grid grid-cols-1  gap-6 mt-6">
            {/* Disponibilidade */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <VerticalBarChart dataset={datasetVertical} title={datasetVertical.title} />
            </div>
            {/* Performance */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <HorizontalBarChart dataset={datasetHorizontal} title={datasetHorizontal.title} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-6">
            {/* Qualidade */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <HorizontalBarChart dataset={datasetHorizontalQualidade} title={datasetHorizontalQualidade.title} />
            </div>
            {/* OEE - 7 dias*/}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <LineChart dataset={datasetLine} title="OEE - Ultimos 7 dias" showLegend={false} />
            </div>
          </div>
        </div>

      </Layout>
    </main>
  );
}

export default Dashboard;
