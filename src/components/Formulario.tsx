'use client'
import React, { useState, useEffect } from 'react';
import { Tipo, Pais, Color, Graduacion } from "@/interfaces/interfaces";
import { fetchTipos, fetchPaises, fetchColores, fetchGraduaciones } from "@/services/api";
import { Cerveza } from '@/interfaces/interfaces';
import { fetchCervezasQuery,fetchCervezas } from '@/services/api';

interface Props {
  data:Cerveza[]
}
const Formulario: React.FC<Props> = ({ data }) => {
  const [localData, setLocalData] = useState(data);
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [colores, setColores] = useState<Color[]>([]);
  const [graduaciones, setGraduaciones] = useState<Graduacion[]>([]);
  const [formData, setFormData] = useState({
    tipo: '',
    pais: '',
    color: '',
    graduacion: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
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

    fetchData();
  }, []);

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

 //   alert(queryString)
    setLocalData(await fetchCervezasQuery(queryString));
   
    
    // Puedes hacer algo con el queryString, como enviarlo a un servidor o realizar otras operaciones
  };


  return (
    <>
      <h1 className="text-2xl font-bold text-center">Filtro</h1>
      <form onSubmit={handleSubmit} className="flex flex-wrap">
        <div className="w-full md:w-1/4 p-2">
          <label htmlFor="tipo" className="block text-gray-700">
            Tipo:
          </label>
          <select
            name="tipo"
            id="tipo"
            onChange={handleOnChange}
            className="w-full p-2 border rounded bg-gray-100"
          >
            <option key="0" value="0">
              
            </option>

            {tipos.map((t) => (
              <option key={t.id} value={t.id}>
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
            className="w-full p-2 border bg-gray-100 rounded"
          >
              <option key="0" value="0">
              
              </option>
  
            {paises.map((p) => (
              <option key={p.id} value={p.id}>
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
            className="w-full p-2 border bg-gray-100 rounded"
          >
              <option key="0" value="0">
              
              </option>
  
            {colores.map((c) => (
              <option key={c.id} value={c.id}>
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
            className="w-full p-2 border rounded bg-gray-100"
          >
              <option key="0" value="0">
              
              </option>
  
            {graduaciones.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full p-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Enviar
          </button>
        </div>
      </form>
    </>
  );
};

export default Formulario;
