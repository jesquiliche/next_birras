import CardBase from "../components/CardBase";
import PieChartComponent from "../components/tarta";
import BarChartComponent from "../components/Barras";
import DonutChartComponent from "../components/DonutChart";

import {
  fetchCervezasPorPaises,
  fetchCervezasPorTipos,
  fetchConsultaTablas,
  fetchConsultaBD,
} from "@/services/api";

type TableInfo = {
  TABLE_NAME: string;
  TABLE_ROWS: number | null;
};

export default async function Home() {
  const data = await fetchCervezasPorPaises();
  const tipos = await fetchCervezasPorTipos();
  const tablas = await fetchConsultaTablas();
  const BD = await fetchConsultaBD();

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

  const numColores = colores[0].TABLE_ROWS;
  const numTipos = tipos1[0].TABLE_ROWS;
  const numCervezas = cervezas[0].TABLE_ROWS;
  const numGraduaciones = graduaciones[0].TABLE_ROWS;

  return (
    <>
      <h1 className="text-2xl font-bold p-4 text-center">Estadisticas</h1>
      <div className="grid grid-cols-4 gap-4 w-11/12 mx-auto">
        <CardBase title="Cervezas" metric={numCervezas} percent={100} />
        <CardBase title="Tipos" metric={numTipos} percent={100} />
        <CardBase title="Colores" metric={numColores} percent={100} />
        <CardBase title="Graduaciones" metric={numGraduaciones} percent={100} />
      </div>
      <div className="grid grid-cols-2">
        <PieChartComponent data={data} title="Cervezas por países" />

        <DonutChartComponent data={tipos} title="Cervezas por tipos" />

        <BarChartComponent data={BD} />
      </div>
    </>
  );
}
