"use client";
import { RiLoader2Fill } from "react-icons/ri";
import React, { useState, useEffect } from "react";

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
  Tipo,
} from "@/interfaces/interfaces";
import CervezasTable from "@/components/CervezasTable";
import Load from "@/components/Load";
import Link from "next/link";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [cervezas, setCervezas] = useState<Cerveza[]>([]);
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [colores, setColores] = useState<Color[]>([]);
  const [graduaciones, setGraduaciones] = useState<Graduacion[]>([]);
  const [formData, setFormData] = useState({
    tipo: "",
    pais: "",
    color: "",
    graduacion: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes construir el query string con los valores de formData
    const queryString = `tipo_id=${formData.tipo}&pais_id=${formData.pais}&color_id=${formData.color}&graduacion_id=${formData.graduacion}`;

    setLoading(true);
    setCervezas(await fetchCervezasQuery(queryString));
    setLoading(false);

    // Puedes hacer algo con el queryString, como enviarlo a un servidor o realizar otras operaciones
  };

  useEffect(() => {
    const obtenerCervezas = async () => {
      try {
        const cervezasData = await fetchCervezas();

        setCervezas(cervezasData);

        const tiposData = await fetchTipos();
        setTipos(tiposData);

        const paisesData = await fetchPaises();
        setPaises(paisesData);

        const coloresData = await fetchColores();
        setColores(coloresData);

        const graduacionesData = await fetchGraduaciones();
        setGraduaciones(graduacionesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    setLoading(true);
    obtenerCervezas();
    setLoading(false);
  }, []);

  useEffect(() => {}, [cervezas]);

  return (
    <>
    <div>
      <h1 className="text-2xl font-bold text-center">Cervezas</h1>
      <div className="w-11/12 mx-auto border-2 p-4 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Filtro</h1>

        {loading ? <Load/>:(<form onSubmit={handleSubmit} className="flex flex-wrap">
          <div className="w-full md:w-1/4 p-2">
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

          <div className="w-full md:w-1/4 p-2">
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

              {paises.map((p) => (
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

          <div className="w-full md:w-1/4 p-2">
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

          <div className="w-full md:w-1/4 p-2">
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

          <div className="w-full p-2">
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Filtrar
            </button>
            <Link
              href="/Cervezas/add/"
              className="ml-2 bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Añadir
            </Link>
          </div>
        </form>)}

        <h1 className="text-2xl font-bold text-center">Lista</h1>

        {loading ? <Load /> : <CervezasTable cervezas={cervezas} />}
      </div>{" "}
    </div>
    </>
  );
};

export default Page;
