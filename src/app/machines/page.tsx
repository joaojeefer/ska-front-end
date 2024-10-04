'use client';

/* eslint-disable @next/next/no-img-element */
import { getMachines } from '@/api';
import { Machine } from '@/api/types';
import { ErrorContent, Header, SectionTitle } from '@/components';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Machines = () => {
  const [machines, setMachines] = useState<Machine[]>([]);

  const router = useRouter();

  async function getMachinesList() {
    const machines = await getMachines();

    if (!!machines?.length) setMachines(machines);
  }

  useEffect(() => {
    getMachinesList();
  }, []);

  function navigateToMachineDashboard(machineId: number) {
    router.push(`/dashboard/${machineId}`);
  }

  if (!machines.length) {
    return (
        <ErrorContent title='Temos um problema' description='Não existem máquinas cadastradas no banco de dados, no momento.' />
    );
  }

  return (
    <main className="min-h-full pb-6">
      <Header />
        
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 divide-y">
        <SectionTitle title="Lista de máquinas" />

        <div className="flex flex-col shadow-md rounded-md mt-6 px-3">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium border-neutral-300">
                    <tr>
                      <th scope="col" className="px-6 py-4">#</th>
                      <th scope="col" className="px-6 py-4">Descrição da máquina</th>
                      <th scope="col" className="px-6 py-4">Setor / Localização</th>
                      <th scope="col" className="px-6 py-4" />
                    </tr>
                  </thead>
                  <tbody>
                    {machines.map((machine) => (
                      <tr key={machine.id} className="border-b border-neutral-300">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          <p className="text-sm font-semibold leading-6 text-gray-900">{`${machine.id}`}</p>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <p className="text-sm leading-6 text-gray-900">{machine.description}</p>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <p className="text-sm leading-6 text-gray-900">{machine.localization}</p>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          <button
                            onClick={() => navigateToMachineDashboard(machine.id)}
                            type="button"
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Ver detalhes
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Machines;
