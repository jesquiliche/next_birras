import CardBase from "../components/CardBase";
import {BarListComponent,PieChartComponent,BarChartComponent,DonutChartComponent} from "../components/graficos"
import DataTableStock from "@/components/StokTable";

import {
  fetchCervezasPorPaises,
  fetchCervezasPorTipos,
  fetchCervezasPorColores,
  fetchCervezasPorGraduaciones,
  fetchConsultaTablas,
  fetchConsultaBD,
  fetchStockPorPais,
} from "@/services/api";

type TableInfo = {
  TABLE_NAME: string;
  TABLE_ROWS: number | null;
};

export default async function Home() {
  const data = await fetchCervezasPorPaises();
  const tipos = await fetchCervezasPorTipos();
  const coloresData = await fetchCervezasPorColores();
  const graduacionesData = await fetchCervezasPorGraduaciones();
  const stock = await fetchStockPorPais();
  console.log(stock);
  
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
      <h1 className="text-md font-bold md:text-2xl  md:p-4 text-center">Estadisticas</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-11/12 mx-auto">
        <CardBase title="Cervezas" metric={numCervezas} percent={100} />
        <CardBase title="Tipos" metric={numTipos} percent={100} />
        <CardBase title="Colores" metric={numColores} percent={100} />
        <CardBase title="Graduaciones" metric={numGraduaciones} percent={100} />
      </div>
      <div className="grid grid-cols-1  md:grid-cols-2">
        <div className="w-11/12 mx-auto col-span-1">
        <PieChartComponent data={data} title="Cervezas por países" />
        </div>
        <div className="w-11/12 mx-auto col-span-1">
        <DonutChartComponent data={tipos} title="Cervezas por tipos" />
        </div>
        <div className="w-11/12 mx-auto col-span-1">        <PieChartComponent data={coloresData} title="Cervezas por colores" />
        </div>
        <div className="w-11/12 mx-auto col-span-1">
        <PieChartComponent
          data={graduacionesData}
          title="Cervezas por graduaciones"
        />
        </div>
        <div className="w-11/12 mx-auto col-span-1">
        <DonutChartComponent
          data={stock}
          title="Stock por paises"
        />
        
        </div>
        <div className="w-11/12 mx-auto col-span-1">
        <BarListComponent data={stock} 
        title="Stock por paises" source="Pais"
        value="Stock" />
       
        </div>
        <div className="w-11/12 mx-auto md:col-span-2">
        <BarChartComponent data={BD} />
        </div>
      </div>
    </>
  );
}
