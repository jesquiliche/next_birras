'use client'
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartComponent = ({ data, title }) => {
  return (
    <div className='rounded-lg border-2 border-gray-200 shadow-lg p-4 col-span-2 w-11/12 mx-auto mt-4'>
      <h1 className='text-2xl font-bold text-center'>{title}</h1>
      <BarChart width={800} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#8884d8" />
        {/* <Bar dataKey="pv" fill="#82ca9d" /> (Puedes agregar más barras según tus necesidades) */}
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
