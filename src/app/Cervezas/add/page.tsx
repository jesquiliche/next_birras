"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Tipo, Pais, Color, Graduacion } from "@/interfaces/interfaces";
import {
  fetchTipos,
  fetchPaises,
  fetchColores,
  fetchGraduaciones,
} from "@/services/api";

interface CervezaData {
  nombre: string;
  descripcion: string;
  color_id: number | string;
  graduacion_id: number | string;
  tipo_id: number | string;
  pais_id: number | string;
  novedad: boolean;
  oferta: boolean;
  precio: number;
  foto: string;
  marca: string;
}

const Formulario: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [colores, setColores] = useState<Color[]>([]);
  const [graduaciones, setGraduaciones] = useState<Graduacion[]>([]);
  const [cerveza, setCerveza] = useState<CervezaData>({
    nombre: "",
    descripcion: "",
    color_id: 0,
    graduacion_id: 0,
    tipo_id: 0,
    pais_id: 0,
    novedad: true,
    oferta: false,
    precio: 0,
    foto: "",
    marca: "",
  });

  const [formData, setFormData] = useState({
    tipo: "",
    pais: "",
    color: "",
    graduacion: "",
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

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement >
  ) => {
    
    if (e.target.type === "checkbox") {
      const isChecked = (e.target as HTMLInputElement).checked;
      const { name, value } = e.target;
      setCerveza({
        ...cerveza,
        [name]: isChecked,
      });
    } else {
      const { name, value } = e.target;
      setCerveza({
        ...cerveza,
        [name]: value,
      });
    }

    console.log(cerveza);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes construir el query string con los valores de formData

    // Puedes hacer algo con el queryString, como enviarlo a un servidor o realizar otras operaciones
  };

  const handleImagenChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Crear una URL de objeto para la vista previa de la imagen
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center">Añadir producto</h1>
      <div className="w-11/12 mx-auto border-2 rounded-lg shadow-lg py-2">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-3 w-11/12 mx-auto"
        >
          <div className="w-full p-2">
            <label htmlFor="tipo" className="block text-gray-700">
              Tipo:
            </label>
            <select
              name="tipo_id"
              id="tipo_id"
              value={cerveza.tipo_id}
              onChange={handleOnChange}
              className="form-control"
              required
            >
              {tipos.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full p-2">
            <label htmlFor="pais" className="block text-gray-700">
              País:
            </label>
            <select
              name="pais_id"
              id="pais_id"
              onChange={handleOnChange}
              className="form-control"
              required
            >
              {paises.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full p-2">
            <label htmlFor="color" className="block text-gray-700">
              Color:
            </label>
            <select
              name="color_id"
              id="color_id"
              onChange={handleOnChange}
              className="form-control"
              required
            >
              {colores.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full p-2">
            <label htmlFor="graduacion" className="block text-gray-700">
              Graduación:
            </label>
            <select
              name="graduacion_id"
              id="graduacion_id"
              onChange={handleOnChange}
              className="form-control"
              required
            >
              {graduaciones.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="p-2">
            <label className="block w-full">Marca:</label>
            <input
              type="text"
              className="form-control"
              required
              name="marca"
              onChange={handleOnChange}
              id="marca"
            ></input>
          </div>
          <div className="p-2">
            <label className="block w-full">Precio:</label>
            <input
              type="number"
              className="form-control"
              name="precio"
              id="precio"
              onChange={handleOnChange}
              required
            ></input>
          </div>

          <div className="flex p-2 items-center">
            <input
              type="checkbox"
              onChange={handleOnChange}
              id="novedad"
              name="novedad"
              checked={cerveza.novedad}
              className="p-2 border rounded bg-gray-100"
            />
            <label className="ml-4 flex">Novedad</label>
            <input
              type="checkbox"
              id="oferta"
              name="oferta"
              checked={cerveza.oferta}
              onChange={handleOnChange}
              className="ml-4 p-2 border rounded bg-gray-100"
            />
            <label className="ml-4 flex">Oferta</label>
          </div>
          <div className="p-2 col-span-2">
            <label className="block w-full">Foto:</label>
            <input
              type="file"
              className="form-control"
              onChange={handleImagenChange}
              required
            ></input>
            <img
              className="rounded-lg h-80 mt-2"
              id="image-preview"
              src={imagePreview || ""}
              alt="Vista previa de la imagen"
              style={{
                display: imagePreview ? "block" : "none",
                maxWidth: "100%",
                margin: "0 auto",
              }}
            />
          </div>

          <div className="p-2 items-center col-span-3">
            <label className="ml-4 flex">Descripción:</label>
            <textarea
              className="form-control row-span-4"
              id="descipcion"
              name="descripcion"
              onChange={handleOnChange}
              required
            ></textarea>
          </div>

          <div className="w-full p-2 col-span-3">
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Formulario;
