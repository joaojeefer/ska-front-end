/* eslint-disable @next/next/no-img-element */
import { Header } from '@/components';
import React from 'react';

import Layout from '../../components/layout'
import VerticalBarChart from '../../components/charts/verticalbarchart'
import HorizontalBarChart from '../../components/charts/horizontalbarchart'
import OEEGauge from '../../components/charts/oeegauge';
import LineChart from '../../components/charts/linechart';

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


const Dashboard: React.FC = () => {
  return (
    <main>

      <Layout>
        <h1 className="text-2xl font-bold">Eficiência de Produção</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">Torno CNC 2500</h2>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">Usinagem Leve</h2>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">Junho</h2>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold">2024</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <div className="bg-white shadow-lg rounded-lg ">
            <OEEGauge />
          </div>

          <div className="grid grid-cols-1  gap-6 mt-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <VerticalBarChart />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <HorizontalBarChart />
            </div>

          </div>
          <div className="grid grid-cols-1 gap-6 mt-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold">OEE Anual</h2>
              <LineChart />
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold">Feedback</h2>
              <LineChart />
            </div>
          </div>
        </div>

      </Layout>
    </main>
  );
}

export default Dashboard;
