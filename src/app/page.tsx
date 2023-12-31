import Image from "next/image";

import ChartComponent from "../components/Grafico";
import PieChartComponent from "../components/tarta";
import BarChartComponent from "../components/Barras";
import { fetchCervezasPorPaises } from "@/services/api";


export default async function Home() {
  const data=await fetchCervezasPorPaises();

  return (
    <>
      <h1 className="text-2xl font-bold p-4 text-center">Estadisticas</h1>
      <div className="w-11/12 grid grid-cols-4 gap-4 mx-auto">
        <article className="bg-red-500 rounded-lg shadow-lg p-4">
          <h1 className="text-xl text-white">Cervezas</h1>
        </article>
        <article className="bg-gray-400 rounded-lg shadow-lg p-4">
          <h1 className="text-xl text-white">Tipos</h1>
        </article>
        <article className="bg-blue-600 rounded-lg shadow-lg p-4">
          <h1 className="text-xl text-white">Colores</h1>
        </article>
        <article className="bg-yellow-600 rounded-lg shadow-lg p-4">
          <h1 className="text-xl text-white">Graduaciones</h1>
        </article>
      </div>
      <div className="grid grid-cols-2">
        <ChartComponent />
        <PieChartComponent data={data} title="Cervezas por países"/>
        <BarChartComponent data={data} title="Cervezas por paises"/>
      </div>
    </>
  );
}
