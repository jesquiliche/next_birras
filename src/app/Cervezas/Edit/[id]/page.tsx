"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Tipo, Pais, Color, Graduacion } from "@/interfaces/interfaces";
import { useSession, signOut } from "next-auth/react";
import {
  fetchTipos,
  fetchPaises,
  fetchColores,
  fetchGraduaciones,
  fetchCervezasById,
} from "@/services/api";
import DisplayErrors from "@/components/DisplayErrors";
import Load from "@/components/Load";

interface CervezaData {
  nombre: string;
  descripcion: string;
  color_id: number;
  graduacion_id: number;
  tipo_id: number;
  pais_id: number;
  novedad: boolean | number;
  oferta: boolean | number;
  precio: number;
  foto: string;
  marca: string;
  file: File | null;
}

interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}
export default async function Edit({ params }: { params: { id: string } }) {
  const id = params.id;
  const [loading, setLoading] = useState(false);
  const [ok, setOK] = useState("");
  const [errors, setErrors] = useState<any>(null);
  const { data: session, status } = useSession();
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
    file: null,
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

        const data = await fetchCervezasById(id);
        setCerveza(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleOnChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    if (e.target.type === "checkbox") {
      const isChecked = (e.target as HTMLInputElement).checked;
      const { name, value } = e.target;
      const check = isChecked;

      setCerveza({
        ...cerveza,
        [name]: check,
      });
    } else if (e.target.type === "number" || e.target.type === "select-one") {
      const { name, value } = e.target;
      setCerveza({
        ...cerveza,
        [name]: +value,
      });
    } else {
      const { name, value } = e.target;
      setCerveza({
        ...cerveza,
        [name]: value,
      });
    }
  };

  const resetCampos = () => {
    setCerveza({
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
      file: null,
    });
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-center">Editar producto</h1>
      <div className="w-11/12 mx-auto border-2 rounded-lg shadow-lg py-2">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-3 w-11/12 mx-auto"
        >
          <div className="p-2 col-span-3">
            <label className="block w-full">Nombre:</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              id="nombre"
              maxLength={150}
              value={cerveza.nombre}
              onChange={handleOnChange}
              required
            ></input>
          </div>

          <div className="w-full p-2">
            <label htmlFor="tipo" className="block text-gray-700">
              Tipo:
            </label>
            <select
              name="tipo_id"
              id="tipo_id"
              onChange={handleOnChange}
              className="form-control"
              value={cerveza.tipo_id}
              required
            >
              {tipos.map((t) => (
                <option key={t.id} selected={t.id == cerveza.tipo_id}>
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
              value={cerveza.pais_id}
              className="form-control"
              required
            >
              {paises.map((p) => (
                <option
                  key={p.id}
                  value={p.id}
                  selected={p.id == cerveza.pais_id}
                >
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
              value={cerveza.color_id}
              className="form-control"
              required
            >
              {colores.map((c) => (
                <option
                  key={c.id}
                  value={c.id}
                  selected={c.id == cerveza.color_id}
                >
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
              value={cerveza.graduacion_id}
              className="form-control"
              required
            >
              {graduaciones.map((g) => (
                <option
                  key={g.id}
                  value={g.id}
                  selected={g.id == cerveza.graduacion_id}
                >
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
              value={cerveza.marca}
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
              step="0.01"
              onChange={handleOnChange}
              value={cerveza.precio}
              required
            ></input>
          </div>

          <div className="flex p-2 items-center">
            <input
              type="checkbox"
              onChange={handleOnChange}
              id="novedad"
              name="novedad"
              value={0}
              className="p-2 border rounded bg-gray-100"
            />
            <label className="ml-4 flex">Novedad</label>
            <input
              type="checkbox"
              id="oferta"
              name="oferta"
              onChange={handleOnChange}
              value={0}
              className="ml-4 p-2 border rounded bg-gray-100"
            />
            <label className="ml-4 flex">Oferta</label>
          </div>
          <div className="p-2 col-span-2">
            <img
              className="rounded-lg h-80 mt-2"
              id="image-preview"
              src={cerveza.foto}
              alt="Vista previa de la imagen"
            />
          </div>
          {loading && <Load />}
          <div className="p-2 items-center col-span-3">
            <label className="ml-4 flex">Descripción:</label>
            <textarea
              className="form-control row-span-4"
              id="descipcion"
              name="descripcion"
              value={cerveza.descripcion}
              onChange={handleOnChange}
              required
            ></textarea>
          </div>

          <div className="w-full p-2 col-span-3">
            {errors && <DisplayErrors errors={errors} />}
            {ok && <p className="bg-green-300 rounded p-4">{ok}</p>}
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded mt-2"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
