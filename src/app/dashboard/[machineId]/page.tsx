"use client";

/* eslint-disable @next/next/no-img-element */
import { ErrorContent, Header } from '@/components';
import React, { useEffect, useState } from 'react';

import Layout from '../../../components/layout'
import VerticalBarChart from '../../../components/charts/verticalbarchart'
import HorizontalBarChart from '../../../components/charts/horizontalbarchart'
import OEEGauge from '../../../components/charts/oeegauge';
import LineChart from '../../../components/charts/linechart';

import { MachineMetrics } from '@/api/types';
import { getLastMetricsByMachine } from '@/api';
import { DashboardProps } from './types';
import moment from 'moment';

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

// const initialMetric: MachineMetric = {
//   id: 0,
//   oee: 0,
//   quality: 0,
//   performance: 0,
//   availability: 0,
//   scheduledTime: 0,
//   productionTime: 0,
//   productionTheoricalTime: 0,
//   downtime: 0,
//   partsProduced: 0,
//   partsDiscarded: 0,
//   date: null,
//   machineId: 0,
// };

const Dashboard = ({ params }: DashboardProps) => {
  const [metrics, setMetrics] = useState<MachineMetrics[] | null>([]);

  async function fetchMetrics() {
      const metrics = await getLastMetricsByMachine(params.machineId, 7);
      
      setMetrics(metrics);
  }

  useEffect(() => {
    fetchMetrics();
  }, []);

  function handleMetricDate(date?: string) {
    if (!date) return '';

    return moment(date).format('DD/MM/YYYY');
  }

  if (!metrics?.length) {
    return <ErrorContent title='Temos um problema' description='Não foi possível carregar as métricas da máquina selecionada.' />
  }

  return (
    <main>
      <Layout>
        <h2 className="text-2xl font-bold">Eficiência de Produção</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">{metrics[0].machine.description}</h2>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">{metrics[0].machine.localization}</h2>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">{handleMetricDate(metrics[0].date)}</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {/* OEE */}
          <div className="bg-white shadow-lg rounded-lg ">
            <OEEGauge data={metrics[0]} title="OEE - Último dia" />
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
