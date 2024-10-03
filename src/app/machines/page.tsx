'use client';

/* eslint-disable @next/next/no-img-element */
import { getMachines } from '@/api';
import { Machine } from '@/api/types';
import { ErrorContent, Header } from '@/components';
import React, { useEffect, useState } from 'react';

const Machines = () => {
  const [machines, setMachines] = useState<Machine[]>([]);

  async function getMachinesList() {
    const machines = await getMachines();

    if (!!machines?.length) setMachines(machines);
  }

  useEffect(() => {
    getMachinesList();
  }, []);

  if (!machines.length) {
    return (
        <ErrorContent title='Temos um problema' description='Não existem máquinas cadastradas no banco de dados, no momento.' />
    );
  }

  return (
    <div className="min-h-full">
      <Header />

      <main>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Lista de máquinas</h1>
          </div>
        </header>
        
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 divide-y">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-left text-sm font-light">
                    <thead className="border-b font-medium dark:border-neutral-500">
                      <tr>
                        <th scope="col" className="px-6 py-4">#</th>
                        <th scope="col" className="px-6 py-4">Descrição da máquina</th>
                        <th scope="col" className="px-6 py-4">Setor / Localização</th>
                        <th scope="col" className="px-6 py-4" />
                      </tr>
                    </thead>
                    <tbody>
                      {machines.map((machine) => (
                        <tr key={machine.id} className="border-b dark:border-neutral-500">
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
                              onClick={() => {}}
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
    </div>
  );
}

export default Machines;
