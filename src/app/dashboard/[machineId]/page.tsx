"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Charts, ErrorContent, Header, SectionTitle } from '@/components';
import { MachineMetrics } from '@/api/types';
import { getLastMetricsByMachine } from '@/api';
import { DashboardProps } from './types';
import { BarChartDataset, LineChartDataset } from '@/components/types';

const Dashboard = ({ params }: DashboardProps) => {
  const [metrics, setMetrics] = useState<MachineMetrics[]>([]);
  const [lastMetric, setLastMetric] = useState<MachineMetrics | null>(null);

  async function fetchMetrics() {
    const metrics = await getLastMetricsByMachine(params.machineId, 7);
    
    if (!!metrics?.length) {
      setLastMetric(metrics[0]);
      setMetrics(metrics.reverse());
    }
  }

  useEffect(() => {
    fetchMetrics();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleMetricDate(date?: string) {
    if (!date) return '';

    return moment(date).format('DD/MM/YYYY');
  }

  function createAvailabilityMetricData(allData: MachineMetrics): BarChartDataset {
    return {
      title: "Disponibilidade",
      label: ["Tempo Programado", "Tempo Produzindo", "Tempo Perdas"],
      data: [allData.productionTheoricTIme, allData.realProductionTime, allData.productionTheoricTIme - allData.realProductionTime],
      backgroundColor: ["#0000ff", "#00ff00", "#ff0000"],
    };
  }
  
  function createPerformanceMetricData(allData: MachineMetrics): BarChartDataset {
    return {
      title: "Performance",
      label: ["Produção Teórico", "Produção Real", "Diferença"],
      data: [allData.productionTime, allData.realProductionTime, (allData.productionTime - allData.realProductionTime)],
      backgroundColor: ["#0000ff", "#00ff00", "#ff0000"],
    };
  }

  function createQualityMetricData(allData: MachineMetrics): BarChartDataset {
    return {
      title: "Qualidade",
      label: ["Peças Boas", "Peças Totais", "Peças Defeituosas"],
      data: [(allData.partsProduced - allData.partsDiscarded), allData.partsProduced, allData.partsDiscarded],
      backgroundColor: ["#00ff00", "#0000ff", "#ff0000"],
    };
  }

  function createOeeDataForPeriod(allData: MachineMetrics[]): LineChartDataset {
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
    return {
      title: "Últimos 7 dias",
      labels: labels,
      data: oeeArray,
      borderColor: "#00bfff",
      backgroundColor: "rgba(0, 191, 255, 0.5)",
      fill: true,
    };
  }

  if (!metrics?.length || !lastMetric) {
    return <ErrorContent title='Carregando...' description='' />
  }

  return (
    <div className="min-h-full pb-6">
      <Header />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Eficiência de Produção" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-semibold">{lastMetric?.machine.description}</h2>
          </div>
          <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-semibold">{lastMetric?.machine.localization}</h2>
          </div>
          <div className="bg-white shadow-md rounded-md p-6">
            <h2 className="text-xl font-semibold">{handleMetricDate(lastMetric?.date)}</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* OEE */}
          <div className="grid bg-white shadow-md rounded-md">
            <Charts.OEEGauge data={lastMetric} title="OEE" />
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Disponibilidade */}
            <div className="bg-white shadow-md rounded-md p-6">
              <Charts.VerticalBarChart dataset={createAvailabilityMetricData(lastMetric)} />
            </div>
            {/* Performance */}
            <div className="bg-white shadow-md rounded-md p-6">
              <Charts.HorizontalBarChart dataset={createPerformanceMetricData(lastMetric)} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Qualidade */}
            <div className="bg-white shadow-md rounded-md p-6">
              <Charts.HorizontalBarChart dataset={createQualityMetricData(lastMetric)} />
            </div>
            {/* OEE - 7 dias*/}
            <div className="bg-white shadow-md rounded-md p-6">
              <Charts.LineChart dataset={createOeeDataForPeriod(metrics)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
