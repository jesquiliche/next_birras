import Image from "next/image";

import ChartComponent from "../components/Grafico";import PieChartComponent from "../components/tarta";
import BarChartComponent from "../components/Barras";
import {
  fetchCervezasPorPaises,
  fetchCervezasPorTipos,
  fetchConsultaTablas,
  fetchConsultaBD
} from "@/services/api";

type TableInfo = {
  TABLE_NAME: string;
  TABLE_ROWS: number | null;
};

export default async function Home() {
  const data = await fetchCervezasPorPaises();
  const tipos = await fetchCervezasPorTipos();
  const tablas = await fetchConsultaTablas();
  const BD=await fetchConsultaBD();
  //const BD =await fetchConsultaBD();

 // console.log(BD);

  const cervezas: TableInfo[] = tablas.filter(
    (item: TableInfo) => item.TABLE_NAME === "cervezas"
  );
  const colores: TableInfo[] = tablas.filter(
    (item: TableInfo) => item.TABLE_NAME === "colores"
  );
  const tipos1: TableInfo[] = tablas.filter(
    (item: TableInfo) => item.TABLE_NAME === "tipos"
  );

  const graduaciones: TableInfo[] = tablas.filter(
    (item: TableInfo) => item.TABLE_NAME === "graduaciones"
  );

  
  
  const numColores=colores[0].TABLE_ROWS;
  const numTipos=tipos1[0].TABLE_ROWS;
  const numCervezas=cervezas[0].TABLE_ROWS;
  const numGraduaciones=graduaciones[0].TABLE_ROWS;
  
  //console.log(tablas);

  return (
    <>
      <h1 className="text-2xl font-bold p-4 text-center">Estadisticas</h1>
      <div className="w-11/12 grid grid-cols-4 gap-4 mx-auto">
        <article className="bg-red-500 rounded-lg shadow-lg p-4">
          <h1 className="text-xl text-white text-center">Cervezas</h1>
          <p className="text-lg text-white text-center">{numCervezas}</p>
        </article>
        <article className="bg-gray-400 rounded-lg shadow-lg p-4">
          <h1 className="text-xl text-white text-center">Tipos</h1>
          <p className="text-lg text-white text-center">{numTipos}</p>
        </article>
        <article className="bg-blue-600 rounded-lg shadow-lg p-4">
          <h1 className="text-xl text-white text-center">Colores</h1>
          <p className="text-lg text-white text-center">{numColores}</p>
        </article>
        <article className="bg-yellow-600 rounded-lg shadow-lg p-4">
          <h1 className="text-xl text-white text-certer">Graduaciones</h1>
          <p className="text-lg text-white text-center">{numGraduaciones}</p>
        </article>
      </div>
      <div className="grid grid-cols-2">
        <PieChartComponent data={data} title="Cervezas por países" />
        <PieChartComponent data={tipos} title="Cervezas por tipos" />
        <BarChartComponent data={BD} />
      </div>
    </>
  );
}
