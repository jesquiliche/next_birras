'use client'
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartComponent = ({ data }) => {
  return (
    <div className='rounded-lg border-2 border-gray-200 shadow-lg p-4 col-span-2 w-11/12 mx-auto mt-4'>
      <h1 className='text-2xl font-bold text-center'>Tamaño de Tablas en MB</h1>
      <BarChart width={900} height={400} data={data}  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="TABLE_NAME" angle={-45} interval={0} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="data_size_mb" name="Tamaño de Datos (MB)" fill="#8884d8" />
        <Bar dataKey="index_size_mb" name="Tamaño de Índice (MB)" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
