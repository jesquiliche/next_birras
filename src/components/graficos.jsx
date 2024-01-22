'use client'
import React from 'react';
import { PieChart, Pie, Tooltip, Cell,Label,ResponsiveContainer } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { BarList, Bold, Card, Flex, Text, Title } from "@tremor/react";



export const PieChartComponent = ({ data, title }) => {
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#4CAF50', '#FF4500', '#7B68EE', '#FFD700'];

  return (
    <div className='rounded-lg border-2 border-gray-200 shadow-lg p-4 mx-auto mt-4'>
      <h1 className='text-md md:text-2xl font-bold text-center'>{title}</h1>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
            <Label value={data[0].text} position="center" />
          </Pie>
          <Tooltip formatter={(value, name) => [value, name]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const DonutChartComponent = ({ data, title }) => {
  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#4CAF50', '#FF4500', '#7B68EE', '#FFD700'];
 
  return (
    <div className='rounded-lg border-2 border-gray-200 shadow-lg p-4 mx-auto mt-4'>
      <h1 className='text-md md:text-2xl font-bold text-center'>{title}</h1>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={60}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
            <Label value={data[0].text} position="center" />
          </Pie>
          <Tooltip formatter={(value, name) => [value, name]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};


export const BarChartComponent = ({ data }) => {
  return (
    <div className='rounded-lg border-2 border-gray-200 shadow-lg p-4 col-span-2 mx-auto mt-4'>
      <h1 className='text-md md:text-2xl font-bold text-center'>Tamaño de Tablas en MB</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="TABLE_NAME" angle={-45} interval={0} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="data_size_mb" name="Tamaño de Datos (MB)" fill="#8884d8" />
          <Bar dataKey="index_size_mb" name="Tamaño de Índice (MB)" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const BarListComponent = ({ data, title, source,value }) => (
  <Card className="max-w-lg">
    <Title className="text-center text-dark font-bold text-md md:text-2xl mt-2">{title}</Title>
    <Flex className="mt-4">
      <Text>
        <Bold>{source}</Bold>
      </Text>
      <Text>
        <Bold>{value}</Bold>
      </Text>
    </Flex>
    <BarList data={data} className="mt-2" color="gray" />
  </Card>
);