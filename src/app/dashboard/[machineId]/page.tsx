"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Charts, ErrorContent } from '@/components';
import Layout from '../../../components/layout'
import { MachineMetrics } from '@/api/types';
import { getLastMetricsByMachine } from '@/api';
import { DashboardProps } from './types';

const Dashboard = ({ params }: DashboardProps) => {
  // const [metrics, setMetrics] = useState<MachineMetrics | null>(null);
  const [metrics, setMetrics] = useState<MachineMetrics[] | null>([]);
  const [lastMetric, setLastMetric] = useState<MachineMetrics | null>(null);

  async function fetchMetrics() {
    let metrics = await getLastMetricsByMachine(params.machineId, 7);
    setLastMetric(metrics[0]);

    if (metrics != null)
      metrics = metrics.reverse();

    setMetrics(metrics);
  }

  useEffect(() => {
    fetchMetrics();
  }, []);

  function handleMetricDate(date?: string) {
    if (!date) return '';

    return moment(date).format('DD/MM/YYYY');
  }

  function createAvailabilityMetricData(allData: MachineMetrics) {
    const data = {
      title: "Disponibilidade",
      label: ["Tempo Programado", "Tempo Produzindo", "Tempo Perdas"],
      data: [allData.productionTheoricTIme, allData.realProductionTime, allData.productionTheoricTIme - allData.realProductionTime],
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

  if (!metrics?.length) {
    return <ErrorContent title='Temos um problema' description='Não foi possível carregar as métricas da máquina selecionada.' />
  }

  return (
    <main className="flex justify-center justify-center items-center min-h-screen w-full">
      <Layout>
        <h2 className="text-2xl font-bold text-center">Eficiência de Produção</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">{lastMetric.machine.description}</h2>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">{lastMetric.machine.localization}</h2>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">{handleMetricDate(lastMetric.date)}</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* OEE */}
          <div className="bg-white shadow-lg rounded-lg ">
            <Charts.OEEGauge data={lastMetric} title="OEE" />
          </div>

          <div className="grid grid-cols-1 gap-6 mt-6">
            {/* Disponibilidade */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <Charts.VerticalBarChart dataset={createAvailabilityMetricData(lastMetric)} />
            </div>
            {/* Performance */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <Charts.HorizontalBarChart dataset={createPerformanceMetricData(lastMetric)} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-6">
            {/* Qualidade */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <Charts.HorizontalBarChart dataset={createQualityMetricData(lastMetric)} />
            </div>
            {/* OEE - 7 dias*/}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <Charts.LineChart dataset={createOeeDataForPeriod(metrics)} showLegend={false} />
            </div>
          </div>
        </div>

      </Layout>
    </main>
  );
}

export default Dashboard;
