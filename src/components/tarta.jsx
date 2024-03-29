'use client'
import React from 'react';
import { PieChart, Pie, Tooltip, Cell,Label } from 'recharts';

const PieChartComponent = ({ data, title }) => {
  // Definir colores para cada sección
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#4CAF50', '#FF4500', '#7B68EE', '#FFD700'];

  return (
    <div className='rounded-lg border-2 border-gray-200 shadow-lg p-4 mx-auto mt-4'>
      <h1 className='text-2xl font-bold text-center '>{title}</h1>
      <PieChart width={350} height={200}>
        <Pie data={data} dataKey="value" cx={175} cy={100} outerRadius={80} fill="#8884d8" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} >
              <Label value={entry.text} position="center" />
            </Cell>
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [value, name]} />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
