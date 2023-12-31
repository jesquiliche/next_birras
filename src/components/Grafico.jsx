'use client'
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ChartComponent = () => {
  const data = [
    { name: 'Enero', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Febrero', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Marzo', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Abril', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Mayo', uv: 1890, pv: 4800, amt: 2181 },
  ];

  return (
    <div className='rounded-lg border-2 border-gray-200 shadow-lg p-4 mx-auto mt-4'>
      <h1 className='text-2xl font-bold text-center'>Gráfico de Líneas</h1>
      <LineChart width={400} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default ChartComponent;
