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
import { getMetricsByMachine } from '@/api';
import { DashboardProps } from './types';
import moment from 'moment';

const Dashboard = ({ params }: DashboardProps) => {
  const [metrics, setMetrics] = useState<MachineMetrics | null>(null);

  async function fetchMetrics() {
    const metrics = await getMetricsByMachine(params.machineId);
    setMetrics(metrics);
  }

  useEffect(() => {
    fetchMetrics();
  }, []);

  function handleMetricDate(date?: string) {
    if (!date) return '';

    return moment(date).format('DD/MM/YYYY');
  }

  console.log(metrics);

  function createAvailabilityMetricData(allData: MachineMetrics) {
    const data = {
      title: "Disponibilidade",
      label: ["Tempo Programado", "Tempo Produzindo", "Tempo Perdas"],
      data: [allData.productionTheoricalTime, allData.productionTime, allData.productionTheoricalTime - allData.productionTime],
      backgroundColor: ["#0000ff", "#00ff00", "#ff0000"],
    }
    return data;
  }

  function createPerformanceMetricData(allData: MachineMetrics) {
    const data = {
      title: "Performance",
      label: ["Produção Teórico", "Produção Real", "Diferença"],
      data: [allData.productionTime, allData.realProductionTime, (allData.productionTime - allData.realProductionTime)],
      backgroundColor: ["#0000ff", "#00ff00", "#ff0000"],
    }
    return data;
  }

  function createQualityMetricData(allData: MachineMetrics) {
    const data = {
      title: "Qualidade",
      label: ["Peças Boas", "Peças Totais", "Peças Defeituosas"],
      data: [(allData.partsProduced - allData.partsDiscarded), allData.partsProduced, allData.partsDiscarded],
      backgroundColor: ["#00ff00", "#0000ff", "#ff0000"],
    }
    return data;
  }

  function createOeeDataForPeriod(allData: MachineMetrics[]) {
    const labels: string[] = [];
    const oeeArray: number[] = [];

    allData.forEach((metric) => {
      if (metric.date) {
        const date = handleMetricDate(metric.date);
        labels.push(date);
      }
      oeeArray.push(metric.oee);
    });

    // Estrutura de dados para o gráfico
    const oeeData = {
      title: "Últimos 7 dias",
      labels: labels,
      data: oeeArray,
      borderColor: "#00bfff",
      backgroundColor: "rgba(0, 191, 255, 0.5)",
      fill: true,
    };
    return oeeData;
  }

  if (!metrics) {
    return <ErrorContent title='Temos um problema' description='Não foi possível carregar as métricas da máquina selecionada.' />
  }

  return (
    <main>
      <Layout>
        <h2 className="text-2xl font-bold">Eficiência de Produção</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">{metrics[3].machine.description}</h2>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">{metrics[3].machine.localization}</h2>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">{handleMetricDate(metrics[3].date)}</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {/* OEE */}
          <div className="bg-white shadow-lg rounded-lg ">
            <OEEGauge data={metrics[3]} title="OEE - Último dia" />
          </div>

          <div className="grid grid-cols-1  gap-6 mt-6">
            {/* Disponibilidade */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <VerticalBarChart dataset={createAvailabilityMetricData(metrics[3])} />
            </div>
            {/* Performance */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <HorizontalBarChart dataset={createPerformanceMetricData(metrics[3])} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-6">
            {/* Qualidade */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <HorizontalBarChart dataset={createQualityMetricData(metrics[3])} />
            </div>
            {/* OEE - 7 dias*/}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <LineChart dataset={createOeeDataForPeriod(metrics)} showLegend={false} />
            </div>
          </div>
        </div>

      </Layout>
    </main>
  );
}

export default Dashboard;
