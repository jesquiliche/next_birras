"use client";

import React, { useState, useEffect } from "react";
import Load from "@/components/Load";

import {
  fetchCervezas,
  fetchColores,
  fetchGraduaciones,
  fetchPaises,
  fetchTipos,
  fetchCervezasQuery,
} from "@/services/api";
import {
  Cerveza,
  Color,
  Graduacion,
  Pais,
  PaisesData,
  Tipo,
} from "@/interfaces/interfaces";
import CervezasTable from "@/components/CervezasTable";

import Link from "next/link";
import Cards from "@/components/Cards";

const Page = () => {
  //Paginación
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);

  const [actualizaPaginas, setActualizaPaginas] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [cervezas, setCervezas] = useState<Cerveza[]>([]);
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [paises, setPaises] = useState<PaisesData | undefined>(undefined);
  const [colores, setColores] = useState<Color[]>([]);
  const [graduaciones, setGraduaciones] = useState<Graduacion[]>([]);
  const [formData, setFormData] = useState({
    tipo: "",
    pais: "",
    color: "",
    graduacion: "",
    nombre: "",
    oferta: -1,
    novedad: -1,
  });

  const RenderPagination: React.FC = () => {
    // Define el valor máximo de botones de página a mostrar (en este caso, x)
    let x: number = 10;
    if (totalPages > 10) {
      x = 10;
    } else {
      x = totalPages;
    }

    const pageButtons = [];

    // Genera los botones de página en el rango calculado
    for (let i = 1; i <= x; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`flex  justify-center btn-page ${
            i === page ? "bg-gray-600" : "btn-page"
          }  hover:bg-gray-800`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }

    const retrocedePagina = () => {
      if (page > 1) {
        setPage(page - 1); // Resta 1 para retroceder de página si no estás en la primera página
      }
    };

    const primeraPagina = () => {
      if (page > 1) {
        setPage(1);
      }
    };

    const ultimaPagina = () => {
      if (page < totalPages) {
        setPage(totalPages);
      }
    };

    const avanzaPagina = () => {
      if (page < totalPages) {
        setPage(page + 1); // Suma 1 para avanzar de página si no estás en la última página
      }
    };
    return (
      <>
        <h4 className="text-center font-semibold">
          {totalRecords !== 0 ? `${page} de ${totalPages}` : ""}
        </h4>
        <div className="flex flex-col items-center mb-2">
          <div className="inline-flex mt-2">
            {/* Oculta los botones "<<" y "<" si estás en la primera página */}
            {page > 1 && (
              <>
                <button className="btn-page" onClick={primeraPagina}>
                  {"<<"}
                </button>
                <button className="btn-page" onClick={retrocedePagina}>
                  {"<"}
                </button>
              </>
            )}
            {pageButtons}
            {/* Oculta los botones ">>" y ">" si estás en la última página */}
            {page < totalPages && (
              <>
                <button onClick={avanzaPagina} className="btn-page">
                  {">"}
                </button>
                <button onClick={ultimaPagina} className="btn-page">
                  {">>"}
                </button>
              </>
            )}
          </div>
        </div>
      </>
    );
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    switch (name) {
      case "oferta":
        let valor: number = 0;

        valor = +value;

        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: valor,
        }));

        break;
      case "novedad":
        let valor1: number = 0;

        valor1 = +value;

        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: valor1,
        }));

        break;
      default:
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
    }
  };

  const CervezasQuery = async (queryString: string) => {
    // Aquí puedes construir el query string con los valores de formData

    const cervezas = await fetchCervezasQuery(queryString);
    setCervezas(cervezas.data);

    setTotalPages(cervezas.last_page);
    setTotalRecords(cervezas.total);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let queryString = `page=${page}&per_page=${limit}&tipo_id=${formData.tipo}&pais_id=${formData.pais}&color_id=${formData.color}&nombre=${formData.nombre}&graduacion_id=${formData.graduacion}`;
    if (formData.oferta != -1) {
      queryString += `&oferta=${formData.oferta}`;
    }
    if (formData.novedad != -1) {
      queryString += `&novedad=${formData.novedad}`;
    }

    await CervezasQuery(queryString);
    // Puedes hacer algo con el queryString, como enviarlo a un servidor o realizar otras operaciones
  };

  useEffect(() => {
    const obtenerCervezas = async () => {
      setLoading(true);
      try {
        const cervezasData = await fetchCervezas();

        setCervezas(cervezasData.data);
        setTotalPages(cervezasData.last_page);
        setTotalRecords(cervezasData.total);

        const tiposData = await fetchTipos();
        setTipos(tiposData.data);

        const paisesData = await fetchPaises();
        setPaises(paisesData);

        const coloresData = await fetchColores();
        setColores(coloresData);

        const graduacionesData = await fetchGraduaciones();
        setGraduaciones(graduacionesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    obtenerCervezas();
  }, []);

  useEffect(() => {
    if (actualizaPaginas) {
      const ObtenerDatos = async () => {
        const queryString = `page=${page}&per_page=${limit}&tipo_id=${formData.tipo}&pais_id=${formData.pais}&color_id=${formData.color}&graduacion_id=${formData.graduacion}`;

        await CervezasQuery(queryString);
      };
      ObtenerDatos();
      setActualizaPaginas(false);
    }
  }, [actualizaPaginas]);

  useEffect(() => {
    const ObtenerDatos = async () => {
      const queryString = `page=${page}&per_page=${limit}&tipo_id=${formData.tipo}&pais_id=${formData.pais}&color_id=${formData.color}&graduacion_id=${formData.graduacion}`;

      await CervezasQuery(queryString);
    };
    ObtenerDatos();
  }, [page]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center">Cervezas</h1>
      <div className="w-11/12 mx-auto border-2 p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Filtro</h1>

        {loading ? (
          <Load />
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-wrap">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="tipo" className="block text-gray-700">
                  Tipo:
                </label>
                <select
                  name="tipo"
                  id="tipo"
                  onChange={handleOnChange}
                  value={formData.tipo}
                  className="form-control"
                >
                  <option key="0" value="0"></option>

                  {tipos.map((t) => (
                    <option
                      key={t.id}
                      value={t.id}
                      selected={t.id == +formData.tipo}
                    >
                      {t.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="pais" className="block text-gray-700">
                  País:
                </label>
                <select
                  name="pais"
                  id="pais"
                  onChange={handleOnChange}
                  className="form-control"
                >
                  <option key="0" value="0"></option>

                  {paises && paises.data.map((p) => (
                    <option
                      key={p.id}
                      value={p.id}
                      selected={p.id == +formData.pais}
                    >
                      {p.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="color" className="block text-gray-700">
                  Color:
                </label>
                <select
                  name="color"
                  id="color"
                  onChange={handleOnChange}
                  className="form-control"
                >
                  <option key="0" value="0"></option>

                  {colores.map((c) => (
                    <option
                      key={c.id}
                      value={c.id}
                      selected={c.id == +formData.color}
                    >
                      {c.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="graduacion" className="block text-gray-700">
                  Graduación:
                </label>
                <select
                  name="graduacion"
                  id="graduacion"
                  onChange={handleOnChange}
                  className="form-control"
                >
                  <option key="0" value="0"></option>

                  {graduaciones.map((g) => (
                    <option
                      key={g.id}
                      value={g.id}
                      selected={g.id == +formData.graduacion}
                    >
                      {g.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="nombre" className="block text-gray-700">
                  Nombre:
                </label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  onChange={handleOnChange}
                  className="form-control"
                />
              </div>
              <div>
                <label htmlFor="oferta" className="block text-gray-700">
                  Oferta:
                </label>
                <select
                  name="oferta"
                  id="oferta"
                  onChange={handleOnChange}
                  className="form-control"
                >
                  <option key="0" value="-1"></option>

                  <option key="1" value="1">
                    Si
                  </option>
                </select>
              </div>
              <div>
                <label htmlFor="Novedad" className="block text-gray-700">
                  Novedad:
                </label>
                <select
                  name="novedad"
                  id="novedad"
                  onChange={handleOnChange}
                  className="form-control"
                >
                  <option key="0" value="-1"></option>

                  <option key="1" value="1">
                    Si
                  </option>
                </select>
              </div>
            </div>
            <div className="flex items-center p-2">
              <button type="submit" className="btn-primary">
                Filtrar
              </button>
              <Link href="/Cervezas/add/" className="btn-primary">
                Añadir
              </Link>
            </div>
          </form>
        )}

        <p className="text-center font-bold">Resultados : {totalRecords}</p>
        {totalRecords > limit && <RenderPagination />}
        {loading ? (
          <Load />
        ) : (
          <Cards
            cervezas={cervezas}
            setCervezas={setCervezas}
            setActualizaPaginas={setActualizaPaginas}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
