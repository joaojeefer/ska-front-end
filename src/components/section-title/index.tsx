import React from 'react';
import { SectionTitleProps } from './types';

export const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <header className="bg-white shadow-md rounded-md">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">{title}</h2>
        </div>
    </header>
  );
};
